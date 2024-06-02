import { Database, column } from "../../DB/db.mjs";
import Table from "../../DB/table.mjs";
import { equals, and } from "../../DB/utilities.mjs";
import { GLOBALS } from "../GLOBALS.js";
import { ACCESSORIES } from "./DB-Accessories.js";
import { MATCHAS } from "./DB-Matchas.js";
import { USERS } from "./DB-Users.js";

const ID = "id";
const USERNAME = "username";
const ID_ITEM = "idItem";
const TYPE = "type";
const QUANTITY = "quantity";

/**
 * Class that manages the Cart Table
 */
class Cart extends Table {
    constructor() {
        super("cart", [
            column(ID, "INTEGER PRIMARY KEY AUTOINCREMENT"),
            column(USERNAME, "TEXT NOT NULL"),
            column(ID_ITEM, "INTEGER NOT NULL"),
            column(TYPE, "TEXT NOT NULL"),
            column(QUANTITY, "INTEGER"),
        ]);
    }

    /**
     * Adds an item to the user's cart
     * @param {string} username Name of the target user
     * @param {*} id_item Identifier of the item
     * @param {string} type Type of the item
     * @param {int} quantity Quantity of the item
     * @returns Promise of the addition
     */
    async add(username, id_item, type, quantity = 1) {

        // If invalid quantity, skip
        if (quantity <= 0)
            return Promise.resolve();

        // If user doesn't exist, skip
        if (!await userExists(username))
            return Promise.resolve();

        // If item doesn't exist
        if (!await itemExists(id_item, type))
            return Promise.resolve();

        // Try to get the item
        let item = await this.get_item(username, id_item, type);

        // If item exists, update
        if (item != undefined) {
            return this.update(item[ID], [
                column(QUANTITY, quantity + item[QUANTITY])
            ]);
        }

        // Add to cart
        return Database.db.add(this.TABLE_NAME, [
            column(USERNAME, username),
            column(ID_ITEM, id_item),
            column(TYPE, type),
            column(QUANTITY, quantity),
        ]);
    };

    /**
     * Removes an item from the user's cart
     * @param {string} username Name of the target user
     * @param {*} id_item Identifier of the item
     * @param {string} type Type of the item
     * @param {int} quantity Quantity to remove. Any quantity below 0 will completely delete the entry
     * @returns Promise of the removal
     */
    async remove(username, id_item, type, quantity = -1) {

        // If user doesn't exist, skip
        if (!await userExists(username))
            return Promise.resolve();

        // If item doesn't exist, skip
        if (!await itemExists(id_item, type))
            return Promise.resolve();

        let item = await this.get_item(username, id_item, type);

        // If cart item doesn't exist, skip
        if (item == undefined)
            return Promise.resolve();

        // If want to delete or results to 0, delete
        if (quantity < 0 || item[QUANTITY] - quantity <= 0)
            return this.delete(item[ID]);

        // Update
        return this.update(item[ID], [
            column(QUANTITY, item[QUANTITY] - quantity)
        ]);
    };

    /**
     * Clears the cart of the given user
     * @param {string} username Name of the uer
     * @returns Promise of the clear
     */
    async clear(username)
    {
        let items = await this.get_cart(username);

        for (let index = 0; index < items.length; index++)
            await this.remove(username, items[index][ID_ITEM], items[index][TYPE]);

        return Promise.resolve();
    };

    /**
     * Tries to fetch the item of the given user with the given ID
     * @param {*} username Name of the user
     * @param {*} id_item Unique identifier of the item
     * @param {*} type Type of the item
     * @returns Promise of the fetch
     */
    async get_item(username, id_item, type) {
        let conditions = and(
            equals(ID_ITEM, id_item),
            equals(USERNAME, username),
            equals(TYPE, type),
        );

        return (await this.get_all(`WHERE ${conditions}`))[0];
    };

    /**
     * Fetches all the items in the cart of the given user
     * @param {string} username Unique name of the target user
     * @param {boolean|undefined} fetchComplete Determines if the cart should also fetch the informations of the item
     * @returns List of items in the cart
     */
    async get_cart(username, fetchComplete = undefined) {
        this.log(`Select all from cart of '${username}'.`);

        let items = await this.get_all(`WHERE ${equals(USERNAME, username)}`);

        if (!fetchComplete)
            return items;

        for (let index = 0; index < items.length; index++) {
            const i = items[index];
            let table = get_table_for_type(i[TYPE]);

            if (table == undefined)
                continue;

            let item = await table.get(i[ID_ITEM]);
            item[TYPE] = i[TYPE];

            items[index] = item;
        }

        return items;
    };

    /**
     * Fetches the total price of the cart for the given user
     * @param {string} username Name of the user
     * @returns Total price of the cart
     */
    async get_cart_total(username)
    {
        this.log(`Select total from cart of '${username}'.`);

        let items = await this.get_all(`WHERE ${equals(USERNAME, username)}`);
        let total = 0;

        for (let index = 0; index < items.length; index++) {
            const i = items[index];
            let table = get_table_for_type(i[TYPE]);

            if (table == undefined)
                continue;

            let item = await table.get(i[ID_ITEM]);
            let itemTotal = item["price"] * (i[QUANTITY]);

            if (itemTotal == undefined)
                continue;

            total += itemTotal;
        }

        return total;
    };

    async delete_product(id_item, type)
    {
        this.log(`Delete all instances of '${id_item}'.`);
        let carts = await this.get_all(`WHERE ${equals(ID_ITEM, id_item)}`);

        for (let index = 0; index < carts.length; index++)
            {
                console.log(carts[index]);
                await this.delete(carts[index][ID]);
            }

        let table = get_table_for_type(type);

        if (table != undefined)
            await table.delete(id_item);
    };
};

/**
 * Table of carts
 */
const CART = new Cart();

/**
 * Check if the given item exists
 * @param {*} id_item Identifier of the item
 * @param {*} type Type of the item
 * @returns The item exists
 */
const itemExists = async (id_item, type) => {

    let table = get_table_for_type(type);
    let item = undefined;

    if (table != undefined)
        item = table.get(id_item);

    return item != undefined;
};

/**
 * Fetches the table corresponding to the given type
 * @param {*} type Type of the item
 * @returns Table or undefined
 */
const get_table_for_type = (type) => {
    let table = undefined;

    if (type == GLOBALS.MATCHA_TYPE)
        table = MATCHAS;

    if (type == GLOBALS.ACCESSORIES_TYPE)
        table = ACCESSORIES;

    return table;
};

/**
 * Checks if the given user exists
 * @param {*} username Unique name of the user
 * @returns The user exists
 */
const userExists = async (username) => {
    let user = await USERS.get(username);
    return user != undefined;
};

export {
    CART,
};
