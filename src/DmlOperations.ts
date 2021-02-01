// DmlOperations -------------------------------------------------------------

// Data Manipulation Language (DML) operations that a database integration
// must supply.  If a particular operation is not supported in a specific
// integration implementation, it should throw NotSupportedError.

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import {
    DataObject,
    TableName,
} from "./types";

// Public Objects ------------------------------------------------------------

/**
 * The Data Manipulation Language (DML) operations that an integration
 * implementation must support.
 */
export interface DmlOperations {

    /**
     * Insert a new row into the specified table, and return the resulting row.
     *
     * @param tableName         Table into which a new row is inserted
     * @param row               Data values (keyed by column name)
     * @param options           Options for this operation
     */
    insert: (
        tableName: TableName,
        row: DataObject,
        options?: object
    ) => Promise<DataObject>;

    /**
     * Insert new rows into the specified table, and return the resulting rows.
     *
     * @param tableName         Table into which new rows are inserted
     * @param rows              Data values (keyed by column name)
     * @param options           Options for this operation
     */
    inserts: (
        tableName: TableName,
        row: DataObject[],
        options?: object
    ) => Promise<DataObject[]>;

}

export default DmlOperations;
