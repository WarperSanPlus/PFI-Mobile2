/**
 * BY: WarperSan
 * Feel free to use this where you want. You just need to credit me ;)
 */

import * as SQLite from 'expo-sqlite/legacy';
import { equals } from './utilities.mjs';

class Database {

    static db;

    /**
     * @param {*} name Name of the database
     * @param {*} isSilent Determines if the database will notice of its actions
     */
    constructor(name, isSilent = false) {
        // Connect
        db = SQLite.openDatabase(name);
        created_tables_cache = [];
        Database.isSilent = isSilent;
    };

    //#region Transactions

    /**
     * Calls a transaction for the given callback
     * @param {*} callback The content of the transaction
     * @param {*} errorCallback Called when an errror occured
     * @param {*} successCallback Called when the transaction succeed
     * @returns Promise of this transaction
     */
    transaction(callback, errorCallback = null, successCallback = null) {
        return new Promise((resolve, reject) => {
            try {
                db.transaction(
                    tx => callback(tx),
                    function (error) {
                        if (errorCallback != null)
                            errorCallback(tx, error);

                        console.error("Transaction Error:", error);
                        reject(error);
                    },
                    function (tx, resultSet) {
                        if (successCallback != null)
                            successCallback(tx, resultSet);

                        resolve(resultSet);
                    }
                );
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    /**
     * Calls a transaction with a SQL request
     * @param {*} request SQL request to execute
     * @param {*} params Parameters of the request
     * @param {*} successCallback Called when the transaction succeed
     * @param {*} errorCallback Called when an errror occured
     * @returns Promise of this transaction
     */
    sql_transaction(request, params = [], successCallback = null, errorCallback = null) {
        return this.transaction(tx => {
            tx.executeSql(
                request,
                params,
                function (tx, resultSet) {
                    if (successCallback != null)
                        successCallback(tx, resultSet);
                },
                function (tx, error) {
                    if (errorCallback != null)
                        errorCallback(tx, error);

                    console.error(error);
                }
            );
        }
        );
    }

    //#endregion

    //#region Utilities

    /**
     * Checks if the given table exists in the database
     * @param {*} name Name of the table is the database
     * @returns Is the given table exists?
     */
    async table_exists(name) {
        if (created_tables_cache.includes(name))
            return true;

        var tables = [];

        await this.sql_transaction(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}';`,
            undefined,
            function (tx, resultSet) {
                // Update cache
                for (let index = 0; index < resultSet.rows._array.length; index++) {
                    const element = resultSet.rows._array[index];
                    tables.push(element.name);
                }
            }
        );

        created_tables_cache = tables;

        let tableFound = created_tables_cache.includes(name);

        this.log(tableFound ? `The table '${name}' was found.` : `No table has the name '${name}'.`);

        return tableFound;
    };

    /**
     * Gets the column's name of the primary key of the given table
     * @param {*} name Name of the table in the database
     * @returns Name of the primary key of the given table
     */
    async get_pk(name) {
        // If the table doesn't exist, skip
        if (!await this.table_exists(name))
            return undefined;

        var primary_key_name = undefined;
        await this.sql_transaction(`SELECT name FROM pragma_table_info('${name}') WHERE pk`, [], function (tx, r) {
            if (r.rows.length > 0) {
                primary_key_name = r.rows._array[0].name;
            }
        });

        this.log(`The primary key of the table '${name}' is '${primary_key_name}'.`);

        return primary_key_name;
    };

    /**
     * Checks if the database is locked and resets it if requested
     * @param {*} resetIfLocked Determines if the database should be reset if locked
     * @param {*} callback Called when the database has been reset
     * @returns Promise of the check
     */
    async check_locked(resetIfLocked, callback = undefined) {
        let deleteDB = false;

        await this.sql_transaction("PRAGMA lock_timeout", null, function (e) {
            if (e == undefined || !resetIfLocked)
                return;

            //deleteDB = true;
        });

        if (deleteDB) {
            this.log("Dropping the database.");
            let name = db._db._name;
            db.closeSync();
            db.deleteAsync();
            db = SQLite.openDatabase(name);

            if (callback != undefined)
                await callback();
        }

        return Promise.resolve();
    };

    //#endregion

    //#region CRUD

    /**
     * Deletes the given table
     * @param {*} name Name of the table in the database
     * @returns Promise of this deletion
     */
    async nuke_table(name) {
        this.log(`Nuking table '${name}'.`);

        // If the table doesn't exist, skip
        if (!await this.table_exists(name))
            return Promise.resolve();

        var cache = created_tables_cache;

        return await this.sql_transaction(
            `DROP TABLE IF EXISTS ${name};`,
            [],
            function () {
                // https://stackoverflow.com/a/5767357
                const index = cache.indexOf(name);
                if (index > -1) {
                    cache.splice(index, 1);
                }
            }
        );
    };

    /**
     * Creates an empty table with the given name and the given columns
     * @param {*} name Name of the table in the database
     * @param {*} columns Columns of the table
     * @returns Promise of this creation
     */
    async create_table(name, columns) {

        this.log(`Creating table '${name}'.`);

        // If table was already created
        if (await this.table_exists(name))
            return Promise.resolve();

        var args = columns.map(c => c.name + " " + c.value);
        var cache = created_tables_cache;

        return this.sql_transaction(
            `CREATE TABLE IF NOT EXISTS ${name} (${args.join(", ")})`,
            [],
            () => cache.push(name),
        );
    };

    /**
     * Fetches the first item in the table that matches the given condition
     * @param {*} name Name of the table in the database
     * @param {*} callback Called when the selection succeed
     * @param {*} columns Columns to fetch
     * @param {*} condition Condition of the selection
     * @returns Promise of the selection
     */
    async select(name, callback, columns = "*", condition = "") {

        this.log(`Select from the table '${name}'.`);

        // If condition empty, skip
        if (columns.trim().length == 0) {
            callback(undefined);
            return Promise.resolve();
        }

        return this.selectAll(name, (r) => { callback(r[0]); }, columns, condition + " LIMIT 1");
    };

    /**
     * Fetches all items in the table that match the given condition
     * @param {*} name Name of the table in the database
     * @param {*} callback Called when the selection succeed
     * @param {*} columns Columns to fetch
     * @param {*} condition Condition of the selection
     * @returns Promise of the selection
     */
    async selectAll(name, callback, columns = "*", condition = "") {

        this.log(`Select all from the table '${name}'.`);

        // If condition empty, skip
        if (columns.trim().length == 0) {
            callback(undefined);
            return Promise.resolve();
        }

        // If table doesn't exist, skip
        if (!await this.table_exists(name)) {
            console.error(`Table '${name}' does not exists.`);
            return Promise.resolve();
        }

        return this.sql_transaction(
            `SELECT ${columns} FROM ${name} ${condition};`,
            [],
            (_, results) => callback(results.rows._array),
            () => callback(undefined)
        );
    };

    /**
     * Adds an item to the given table
     * @param {*} name Name of the table in the database
     * @param {*} columns Columns of the new item
     * @returns Promise of this addition
     */
    async add(name, columns) {

        this.log(`Inserting a new value to the table '${name}'.`);

        // Get the column name of the PK
        var primary_key = await this.get_pk(name);

        // If no primary key was defined, skip
        if (primary_key == undefined) {
            this.log(`No primary key was defined in '${name}'.`);
            return Promise.resolve();
        }

        // Get the value for the new PK
        const pk = columns.find(c => c.name == primary_key);

        if (pk != undefined) {
            var count = 0;

            // Check if any value already has this PK
            await this.sql_transaction(
                `SELECT ${primary_key} FROM ${name} WHERE ${equals(primary_key, pk.value)}`,
                [],
                (tx, r) => count = r.rows.length
            );

            // If one has, skip
            if (count != 0) {
                this.log("Tried to insert an item with a primary key already used.");
                return Promise.resolve();
            }
        }

        var values = columns.map(e => "?");
        var names = columns.map(e => e.name);

        return this.sql_transaction(
            `INSERT INTO ${name} (${names.join(", ")}) VALUES (${values.join(", ")});`,
            columns.map(e => e.value)
        );
    };

    /**
     * Removes the item at the given id in the given table
     * @param {*} name Name of the table in the database
     * @param {*} id ID of the item to remove
     * @returns Promise of this removal
     */
    async remove(name, id) {

        this.log(`Removing a value to the table '${name}'.`);

        // Get the column name of the PK
        var primary_key = await this.get_pk(name);

        // If np primary key was defined, skip
        if (primary_key == undefined) {
            this.log(`No primary key was defined in '${name}'.`);
            return Promise.resolve();
        }

        return this.sql_transaction(
            `DELETE FROM ${name} WHERE ${equals(primary_key, id)}`
        );
    };

    /**
     * Updates the item at the given id with the given columns in the given table
     * @param {*} name Name of the table in the database
     * @param {*} id ID of the item to update
     * @param {*} columns New values of the item
     * @returns Promise of this update
     */
    async update(name, id, columns) {

        this.log(`Update an entry in the table '${name}'.`);

        // Get the column name of the PK
        var primary_key = await this.get_pk(name);

        // If no primary key was defined, skip
        if (primary_key == undefined) {
            this.log(`No primary key was defined in '${name}'.`);
            return Promise.resolve();
        }

        var query = columns.map(c => c.name + " = ?");

        return this.sql_transaction(
            `UPDATE ${name} SET ${query.join(", ")} WHERE ${equals(primary_key, id)}`,
            columns.map(e => e.value)
        );

    };

    //#endregion

    //#region Log

    /**
     * Determines if the database will notice of its actions
     */
    static isSilent;

    log(message) {

        // Cancel message if silent
        if (Database.isSilent)
            return;

        console.log(message);
    };

    //#endregion
};

const column = (name, value) => {
    return {
        name: name,
        value: value
    };
};

export { Database, column };