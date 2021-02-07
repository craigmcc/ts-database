// index ---------------------------------------------------------------------

// Main object for this library.

// Exported Modules ----------------------------------------------------------

// Public Interfaces
export { Connection } from "./Connection";
export { ConnectionOperations } from "./ConnectionOperations";
export { DdlOperations } from "./DdlOperations";
export { DmlOperations } from "./DmlOperations";

// Convenience Error subclasses
export {
    ColumnNotFoundError,
    DatabaseError,
    DuplicateColumnError,
    DuplicateIndexError,
    DuplicateTableError,
    IndexNotFoundError,
    InvalidNameError,
    NotConnectedError,
    NotSupportedError,
    Source,
    TableNotFoundError,
} from "./errors";

// Primitive Data Types
export {
    ColumnName,
    ConnectionURI,
    ConstraintName,
    DatabaseName,
    DataType,
    HostName,
    IndexName,
    OnDelete,
    OnUpdate,
    TableName,
} from "./types";

// Composite Data Types
export {
    ColumnAttributes,
    ConnectionAttributes,
    DataObject,
    ForeignKeyAttributes,
    IndexAttributes,
    SelectCriteria,
    TableAttributes,
    WhereCriteria,
} from "./types";


// Internal Modules ---------------------------------------------------------

import { Connection } from "./Connection";
import { InvalidNameError } from "./errors";
import { ConnectionURI, ConnectionAttributes } from "./types";

// Public Objects ------------------------------------------------------------

/**
 * Return a new Connection instance that is suitable for use with the
 * database type specified by dialectName.  The caller MUST call connect(),
 * passing in appropriate configurationn information, to establish a
 * live link to the specified database.
 *
 * @param params                    Configuration parameters for the
 *                                  new Connection instance
 */
export async function connection
    (params: ConnectionURI | ConnectionAttributes): Promise<Connection>
{
    let dialectName = "UNKNOWN";
    if (typeof params === "string") {
        dialectName = params.split(":")[0];
    } else if (params.dialect) {
        dialectName = params.dialect;
    }
//    console.info(`connection: Looking for dialect '${dialectName}'`);
    const moduleName = registrations.get(dialectName);
    if (moduleName) {
//        console.info(`connection: Loading module '${moduleName}' for dialect '${dialectName}'`);
        const module = await import(moduleName);
        return module.default(params);
    } else {
        throw new InvalidNameError(`connection: Unknown dialect '${dialectName}'`);
    }
}

/**
 * Can be called by an @craigmcc/ts-database implementation to register
 * the ability to handle connections for the specified dialectName.
 * It is possible to replace predefined registrations as well.
 *
 * @param dialectName               Supported dialect
 * @param moduleName                Javascript module to be imported
 */
export const register = (dialectName: string, moduleName: string): void => {
//    console.info(`TsDatabase.register('${dialectName}', '${moduleName}')`);
    registrations.set(dialectName, moduleName);
}

// Private Objects -----------------------------------------------------------

// Key = dialectName, Value = moduleName, seeded with known versions
const registrations = new Map<string, string>();

// Seed registrations known implementations
register("postgres", "@craigmcc/ts-database-postgres");

export default connection;
