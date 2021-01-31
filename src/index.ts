import {
    ConnectionAttributes,
    ConnectionURI,
} from "./types";
import {InvalidNameError} from "./errors";

export { Connection } from "./Connection";
export { ConnectionOperations } from "./ConnectionOperations";
export { DdlOperations } from "./DdlOperations";
export { DmlOperations } from "./DmlOperations";

// Convenience Error subclasses
export {
    DatabaseError,
    InvalidNameError,
    NotConnectedError,
    NotSupportedError,
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
} from "./types";
