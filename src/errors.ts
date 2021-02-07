// errors --------------------------------------------------------------------

// Classes defining error that may be returned by internal operations,
// or by those delegated to dialect-specific implementations.

// Base Error Class ----------------------------------------------------------

export type Source = string | Error;

export abstract class DatabaseError extends Error {

    constructor(source: Source, context?: string) {
        super(source instanceof Error ? source.message : source);
        if (source instanceof Error) {
            // @ts-ignore
            if (source.code) {
                // @ts-ignore
                this.code = source.code;
            }
        }
        this.context = context ? context : undefined;
        this.error = "DatabaseError"
        this.inner = source instanceof Error ? source : undefined;
    }

    code: string | undefined;           // Dialect-specific (if present)
    context: string | undefined;        // Description of error context
    error: string;                      // Error class name
    inner: Error | undefined;           // Inner error being wrapped
                                        // (if source is an Error)

}

// Specific Error Classes ----------------------------------------------------

/**
 * The specified column does not exist.
 */
export class ColumnNotFoundError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "ColumnNotFoundError";
}

/**
 * The specified column is a duplicate.
 */
export class DuplicateColumnError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "DuplicateColumnError";
}

/**
 * The specified index is a duplicate.
 */
export class DuplicateIndexError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "DuplicateIndexError";
}

/**
 * The specified table is a duplicate.
 */
export class DuplicateTableError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "DuplicateTableError";
}

/**
 * The specified index does not exist.
 */
export class IndexNotFoundError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "IndexNotFoundError";
}

/**
 * A specified name does not conform to valid SQL syntax requirements
 */
export class InvalidNameError extends DatabaseError {
    constructor(source: Source, context?: string, invalidName?: string) {
        super(source, context);
        this.invalidName = invalidName ? invalidName : undefined;
    }
    error = "InvalidNameError";
    invalidName: string | undefined;
}

/**
 * An operation has been requested on a disconnected Connection.
 */
export class NotConnectedError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "NotConnectedError";
}

/**
 * The requested operation is not supported by this implementation.
 */
export class NotSupportedError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "NotSupportedError";
}

/**
 * The specified table does not exist.
 */
export class TableNotFoundError extends DatabaseError {
    constructor(source: Source, context?: string) {
        super(source, context);
    }
    error = "TableNotFoundError";
}

