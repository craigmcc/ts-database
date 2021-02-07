// DmlOperations -------------------------------------------------------------

// Data Manipulation Language (DML) operations that a database integration
// must supply.  If a particular operation is not supported in a specific
// integration implementation, it should throw NotSupportedError.

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import {
    DataObject, SelectCriteria,
    TableName, WhereCriteria,
} from "./types";

// Public Objects ------------------------------------------------------------

/**
 * The Data Manipulation Language (DML) operations that an integration
 * implementation must support.
 */
export interface DmlOperations {

    /**
     * Delete zero or more rows that match the specified criteria.
     *
     * @param tableName         Table name from which to delete rows
     * @param where             Where criteria to specified matching rows
     * @param options           Options for this operation
     *
     * @returns Number of rows that were deleted
     *
     * @throws TableNotFoundError if specified table does not exist
     */
    delete: (
        tableName: TableName,
        where: WhereCriteria,
        options?: object
    ) => Promise<number>;

    /**
     * Insert one or more new rows into the specified table.
     *
     * @param tableName         Table into which a new row is inserted
     * @param rows              Array of data values (keyed by column name)
     * @param options           Options for this operation
     *
     * @returns Number of rows that were inserted
     *
     * @throws TableNotFoundError if specified table does not exist
     */
    insert: (
        tableName: TableName,
        rows: DataObject | DataObject[],
        options?: object
    ) => Promise<number>;

    /**
     * Select zero or more rows that match the specified criteria from the
     * specified table.  If no rows match, an empty array will be returned.
     *
     * @param tableName         Table from which to select rows
     * @param criteria          Selection criteria defining what rows to match
     * @param options           Options for this operation
     *
     * @returns Array of DataObject containing the matching rows
     *
     * @throws TableNotFoundError if specified table does not exist
     */
    select: (
        tableName: TableName,
        criteria: SelectCriteria,
        options?: object
    ) => Promise<DataObject[]>;

    /**
     * Drop all rows from the specified table.
     *
     * @param tableName         Name of an existing table
     * @param options           Options for this operation
     *
     * @throws TableNotFoundError if specified table does not exist
     */
    truncate: (
        tableName: TableName,
        options?: object
    ) => Promise<void>;

    /**
     * Update zero or more rows that match the specified criteria in the
     * specified table.  Only the columns included in the values will be
     * updated.  The keys in the first values object determine which columns
     * will be included in the UPDATE statement.
     *
     * @param tableName         Table name for which to update rows
     * @param values            Name/values to be updated
     * @param where             WHERE criteria for this update
     *
     * @returns Number of rows that were updated
     *
     * @throws TableNotFoundError if specified table does not exist
     */
    update: (
        tableName: TableName,
        values: DataObject,
        where: WhereCriteria,
        options?: object
    ) => Promise<number>;

}

export default DmlOperations;
