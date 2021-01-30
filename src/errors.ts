// errors --------------------------------------------------------------------

// Classes defining error that may be returned by internal operations,
// or by those delegated to dialect-specific implementations.

// Base Error Class ----------------------------------------------------------

export type Source = string | Error;

export abstract class DatabaseError extends Error {

    constructor(source: Source, context?: string) {
        super(source instanceof Error ? source.message : source);
        this.context = context ? context : undefined;
        this.error = "DatabaseError"
        this.inner = source instanceof Error ? source : undefined;
    }

    context: string | undefined;
    error: string;
    inner: Error | undefined;

}

// Specific Error Classes ----------------------------------------------------

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

