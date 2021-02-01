// ConnectionOperations ------------------------------------------------------

// Operations against an instance of a delegated implementation.

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import {
    ConnectionAttributes, ConnectionURI,
    DatabaseName
} from "./types";

// Public Objects ------------------------------------------------------------

/**
 * The operations supported against an instance of a delegated implementation.
 */
export interface ConnectionOperations {

    /**
     * Create and add a new database to this environment, and switch(?) to it.
     *
     * @param databaseName      Name of the database to be created
     * @param options           Options for this operation - TODO
     */
    addDatabase: (
        databaseName: DatabaseName,
        options?: object
    ) => Promise<void>;

    /**
     * Connect to the database environment specified by the configuration
     * parameters passed when this instance was created.
     */
    connect: () => Promise<void>

    /**
     * Is this delegated instance currently connected to its database environment?
     */
    connected: boolean;

    /**
     * Disconnect from the database environment.
     */
    disconnect: () => Promise<void>;

    /**
     * Drop an existing database from this environment.
     *
     * @param databaseName      Name of an existing database
     * @param options           Options for this operation
     */
    dropDatabase: (
        databaseName: string,
        options?: object
    ) => Promise<void>;

    // TODO - switchDatabase(databaseName) on same instance?

}

export default ConnectionOperations;
