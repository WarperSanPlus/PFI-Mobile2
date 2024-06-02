/**
 * BY: WarperSan
 * Feel free to use this where you want. You just need to credit me ;)
 */

import { Database } from "./db.mjs";
import { equals } from "./utilities.mjs";

/**
 * Class that manages a table in the database
 */
class Table {

    /**
     * Name of this table in the database
     */
    TABLE_NAME;

    /**
     * All the columns in this table
     */
    columns;

    /**
     * @param {Database} db Database used by this table
     * @param {string} tableName Name of this table in the database
     * @param {*} columns 
     */
    constructor(tableName, columns = []) {

        this.TABLE_NAME = tableName;
        this.columns = columns;
    };

    /**
     * Creates the table 
     * @param {*} nuke_table Determines if it tries to delete the table before creating it 
     */
    async create(nuke_table = false) {

        // Nuke table
        if (nuke_table)
            await Database.db.nuke_table(this.TABLE_NAME);

        // Create table
        await Database.db.create_table(this.TABLE_NAME, this.columns);
    };

    //#region CRUD

    /**
     * Fetches the item with the given ID in the table
     * @param {*} id ID of the item to remove
     * @returns {{} | undefined} Item fetched
     */
    async get(id) {
        let results = undefined;

        await Database.db.select(this.TABLE_NAME, r => results = r ?? undefined, "*", `WHERE ${equals(this.columns[0].name, id)}`);

        return results;
    };

    /**
     * Fetches all items in the table that match the given condition 
     * @param {string} condition Condition of the selection
     * @returns {[]} Items fetched
     */
    async get_all(condition = "") {
        let results = [];

        await Database.db.selectAll(this.TABLE_NAME, r => results = r ?? [], "*", condition);

        return results;
    };

    /**
     * Deletes the item with the given ID
     * @param {*} id ID of the item to remove
     * @returns Promise of the removal
     */
    delete(id) { return Database.db.remove(this.TABLE_NAME, id); };

    /**
     * Updates the item with the given id to the given column
     * @param {*} id ID of the item
     * @param {*} columns New columns
     * @returns Promise of the update
     */
    async update(id, columns) { return Database.db.update(this.TABLE_NAME, id, columns); };

    /**
     * Resets the database
     * @returns Promise of the reset
     */
    async reset() {
        await this.create(true);
        return this.default();
    };

    //#endregion

    //#region Log

    log(message) { Database.db.log(message); };

    //#endregion

    //#region Virtual

    async add() {
        console.error(`No add method was defined by '${this.TABLE_NAME}'.`);
        return Promise.resolve();
    };

    async default() {
        this.log(`No default values defined by '${this.TABLE_NAME}'.`);
        return Promise.resolve();
    };

    //#endregion
};

export default Table;