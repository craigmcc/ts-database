export { Connection } from "./Connection";
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
    ConstraintName,
    DataType,
    IndexName,
    OnDelete,
    OnUpdate,
    TableName,
} from "./types";

// Composite Data Types
export {
    ColumnAttributes,
    DataObject,
    ForeignKeyAttributes,
    IndexAttributes,
} from "./types";

