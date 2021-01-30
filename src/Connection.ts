// Connection ----------------------------------------------------------------

// Information documenting a possibly-live connection to a particular database
// environment (via a dialect-specific integration implementation).

// External Modules ----------------------------------------------------------

// Internal Modules ----------------------------------------------------------

import DdlOperations from "./DdlOperations";
import DmlOperations from "./DmlOperations";

// Public Objects ------------------------------------------------------------

// TODO - should this be a concrete class?  Passing config to constructor instead of connect()?
/**
 * The connection to a particular database environment.  It cannot be used
 * for any actual operations until a successful connect() call is performed.
 */
export  interface Connection extends DdlOperations, DmlOperations {

    /**
     * Establish a connection to the specified database environment,
     * based on the specified configuration.
     */
    connect: (configuration: object) => Promise<void>; // TODO - argument type

    /**
     * Has a valid connection to a database environment been established?
     */
    readonly connected: boolean;

    /**
     * Disconnect the currently established connection to the current
     * database environment (if any).
     */
    disconnect: () => Promise<void>;

}

export default Connection;
