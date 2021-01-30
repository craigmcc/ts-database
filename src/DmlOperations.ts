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
     * Insert a new row (or rows) into the specified table.
     *
     * @param tableName         Table into which a new row is inserted
     * @param dataObject        Data values (keyed by column name)
     * @param options           Options for this operation
     */
    insert: (
        tableName: TableName,
        dataObject: DataObject | DataObject[],
        options?: object
    ) => Promise<DataObject>;

}

export default DmlOperations;
