/**
 * Converts the value in a SQL format
 * @param {*} value Value to format
 * @returns Formatted value
 */
const convert_to_sql = (value) => {
    if (typeof value === 'string' || value instanceof String)
        return `'${value}'`;
    return value;
};

/**
 * Creates a SQL statement for a comparaison between two values
 * @param {*} column Name of the column
 * @param {*} value Value to compare
 * @returns SQL comparaison
 */
const equals = (column, value) => {
    return `${column} = ${convert_to_sql(value)}`;
};

const and = (...conditions) => {
    return conditions.join(" AND ");
};

export {
    convert_to_sql,
    equals,
    and
};