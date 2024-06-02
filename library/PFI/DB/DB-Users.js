import { Database, column } from "../../DB/db.mjs";
import Table from "../../DB/table.mjs";

const USERNAME = "username";
const NAME = "name";
const PASSWORD = "password";
const IS_ADMIN = "isAdmin";

/**
 * Class that manages the Users table
 */
class Users extends Table {
    constructor() {

        super("users", [
            column(USERNAME, "TEXT PRIMARY KEY"),
            column(NAME, "TEXT"),
            column(PASSWORD, "TEXT"),
            column(IS_ADMIN, "BIT"),
        ]);
    }

    /**
     * Adds an user to the database
     * @param {string} username Unique name of the user
     * @param {string} name Display name of the user
     * @param {string} password Password of the user
     * @param {boolean|undefined} isAdmin Determines if the user is an admin or not
     * @returns Promise of the addition
     */
    async add(username, name, password, isAdmin = false) {
        return Database.db.add(this.TABLE_NAME, [
            column(USERNAME, username),
            column(NAME, name),
            column(PASSWORD, password),
            column(IS_ADMIN, isAdmin)
        ]);
    };

    /**
     * Adds the default users
     */
    async default() {
        await this.add("HJette", "Hugo", "password", false);
        await this.add("SGauthier", "Samuel", "password", true);
    };
};

/**
 * Table of users
 */
const USERS = new Users();

/**
 * Checks if an user has the given credentials
 * @param {*} username Unique name of the user
 * @param {*} password Password of the user
 * @returns An user has the given credentials
 */
const isValidUser = async (username, password) => {
    let user = await USERS.get(username);

    return user != undefined && user.password == password
};

/**
 * Checks if the user is an admin
 * @param {*} username Unique name of the user
 * @returns The user is an admin
 */
const isAdmin = async (username) => {
    let user = await USERS.get(username);

    return user != undefined && user.isAdmin;
};

export {
    USERS,

    isValidUser,
    isAdmin
};