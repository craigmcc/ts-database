// types ---------------------------------------------------------------------

// Typescript type definitions that integrating applications must be aware of.

// Primitive Data Types ------------------------------------------------------

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

