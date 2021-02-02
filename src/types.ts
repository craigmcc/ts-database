// types ---------------------------------------------------------------------

// Typescript type definitions that integrating applications must be aware of.

// Primitive Data Types ------------------------------------------------------

// Connection URI, conventional format is ([] indicates an optional part):
// {dialect}://{username}:{password}@{host}[:{port}]/{database}
export type ConnectionURI = string;

// Column Data Types (inspired by Sequelize)
export enum DataType {
    BIGINT = "BIGINT",              // 64-bit integer
    BOOLEAN = "BOOLEAN",            // Boolean
    DATE = "DATE",                  // Date-only
    DATETIME = "DATETIME",          // Date+Time
    INTEGER = "INTEGER",            // 32-bit integer
    SMALLINT = "SMALLINT",          // 16-bit integer
    STRING = "STRING",              // Character varying
    TIME = "TIME",                  // Time-only
    TINYINT = "TINYINT",            // 8-bit integer
}

// Name data types for specific object names
export type ColumnName = string;
export type ConstraintName = string;
export type DatabaseName = string;
export type HostName = string;
export type IndexName = string;
export type TableName = string;

// Values for specific fields
export type OnDelete = "CASCADE" | "NO ACTION" | "RESTRICT";
export type OnUpdate = "CASCADE" | "NO ACTION" | "RESTRICT";

// Composite Data Types ------------------------------------------------------

// Attributes of a new column being added.
export interface ColumnAttributes {
    allowNull: boolean,             // Allow null values? [false]
    autoIncrement?: boolean;        // Auto-incrementing? [false]
    defaultValue?: string;          // Default value if not specified [none]
    name: ColumnName;               // Name of the column to be added
    primaryKey?: boolean;           // Is this (part of) the primary key? [false]
    type: DataType;                 // Data type of this column
}

// Connection attributes when passed as an object
export interface ConnectionAttributes {
    database?: DatabaseName;        // Database to connect to
    dialect: string;                // Database dialect (used to pick
                                    // available implementation)
    host?: HostName;                // Connection host [localhost]
    password?: string;              // User password to authenticate
    port?: number;                  // Connection port [dialect default]
    username?: string;              // User username to authenticate
}

// A data object passed in (insert, update) or returned (select, update)
// whose keys are column names, and values are corresponding values.
export interface DataObject {
    [name: string]: any;            // Key is column name
}

// Attributes of a new foreign key being added.
export interface ForeignKeyAttributes {
    columnName: ColumnName | ColumnName[];  // Column name(s) in the foreign table
    onDelete?: OnDelete;            // On delete [none]
    onUpdate?: OnUpdate;            // On update [none]
    name?: ConstraintName;          // Name of this constraint [inferred]
    tableName: TableName;           // Name of the foreign table
}

// Attributes of a new index being created.
export interface IndexAttributes {
    columnName: ColumnName | ColumnName[];  // Column name(s) to comprise the index
    name?: IndexName;               // Name of this index [inferred]
    unique?: boolean;               // Is this index unique? [false]
}

// Criteria for a select() operation.
export interface SelectCriteria {
    columns?: string[]              // Array of column names to return [*]
    limit?: number,                 // Maximum rows returned [no limit]
    offset?: number,                // Zero-relative offset to first returned row [0]
    orderBy?: string;               // ORDER BY clause contents (that go after ORDER BY)
    where?: WhereCriteria;          // WHERE clause contents (that go after WHERE)
}

// Attributes of an existing table being described.
export interface TableAttributes {
    columns: ColumnAttributes[];    // Column attributes of this table
    name: TableName;                // Name of this table
}

// Criteria for the WHERE clause that will be constructed for
// delete(), select(), and update() calls.
export interface WhereCriteria {
    clause: string;                 // Contents that go after WHERE,
                                    // with optional replacement params ($1, $2, etc.)
    values?: any[];                 // Values for replacement params (first is for $1)
}
