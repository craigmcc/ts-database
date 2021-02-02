// DdlOperations -------------------------------------------------------------

// Data Definition Language (DDL) operations that a database integration
// must supply.  These operations are all specific to the particular database
// this instance is associated with.  If a particular operation is not
// supported in a specific integration implementation, it should throw
// NotSupportedError.

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import {
    ColumnName,
    ConstraintName,
    IndexName,
    TableAttributes,
    TableName,
} from "./types";

import {
    ColumnAttributes,
    ForeignKeyAttributes,
    IndexAttributes
} from "./types";

// Public Objects ------------------------------------------------------------

/**
 * The Data Definition Language (DDL) operations that an integration
 * implementation must support.
 */
export interface DdlOperations {

    /**
     * Add a new column (or columns) to an existing table.
     *
     * @param tableName         Name of an existing table
     * @param attributes        Attributes of the column to be added
     * @param options           Options for this operation
     */
    addColumn: (
        tableName: TableName,
        attributes: ColumnAttributes | ColumnAttributes[],
        options?: object,
    ) => Promise<void>;

    /**
     * Add a foreign key constraint to an existing column of an existing table.
     *
     * @param tableName         Name of existing table
     * @param columnName        Name of existing column
     * @param attributes        Attributes of the constraint to be added
     * @param options           Options for this operation
     *
     * @returns Name of the foreign key constraint that was created
     */
    addForeignKey: (
        tableName: TableName,
        columnName: ColumnName,
        attributes: ForeignKeyAttributes,
        options?: object,
    ) => Promise<ConstraintName>;

    /**
     * Add a new index to an existing table.
     *
     * @param tableName         Name of an existing table
     * @param attributes        Attributes of the index to be added
     * @param options           Options for this operation
     *
     * @return Name of the index that was created
     */
    addIndex: (
        tableName: TableName,
        attributes: IndexAttributes,
        options?: object,
    ) => Promise<IndexName>;

    /**
     * Add a new table with specified columns and options
     *
     * @param tableName         Name of a new table
     * @param attributes        Attributes of the columns to be created
     * @param options           Options for this operation
     */
    addTable: (
        tableName: TableName,
        attributes: ColumnAttributes[],
        options?: object, // TODO
    ) => Promise<void>;

    /**
     * Describe an existing table.
     *
     * @param tableName         Name of an existing table
     *
     * @throws TableNotFoundError if specified table does not exist
     */
    describeTable: (
        tableName: TableName,
        options?: object
    ) => Promise<TableAttributes>;

    /**
     * Drop an existing column from an existing table.
     *
     * @param tableName         Name of an existing table
     * @param columnName        Name of the column to be dropped
     * @param options           Options for this operation
     */
    dropColumn: (
        tableName: TableName,
        columnName: ColumnName,
        options?: object
    ) => Promise<void>;

    /**
     * Drop an existing foreign key constraint from an existing table.
     *
     * @param tableName         Name of an existing table
     * @param foreignKey        Name of the foreign key constraint to be dropped
     * @param options           Options for this operation
     */
    dropForeignKey: (
        tableName: TableName,
        foreignKey: ConstraintName,
        options?: object
    ) => Promise<void>;

    /**
     * Drop an existing index from an existing table.
     *
     * @param tableName         Name of an existing table
     * @param indexName         Name of the index to be dropped
     * @param options           Options for this operation
     */
    dropIndex: (
        tableName: TableName,
        indexName: IndexName,
        options?: object
    ) => Promise<void>;

    /**
     * Drop all rows from the specified table.
     *
     * @param tableName         Name of an existing table
     * @param options           Options for this operation
     */
    dropRows: (
        tableName: TableName,
        options?: object
    ) => Promise<void>;

    /**
     * Drop an existing table (and associated constraints).
     *
     * @param tableName         Name of an existing table
     * @param options           Options for this operation
     *
     * @throws TableNotFoundError if specified table does not exist
     */
    dropTable: (
        tableName: TableName,
        options?: object,
    ) => Promise<void>;

    /**
     * Drop all tables from this database.
     *
     * @param options           Options for this operation
     */
    dropTables: (
        options?: object,
    ) => Promise<void>;

}

export default DdlOperations;
