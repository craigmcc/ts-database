// Connection ----------------------------------------------------------------

// Combined object that incorporates all delegated operations into a single
// object from the perspective of the user.

// Internal Modules ----------------------------------------------------------

import ConnectionOperations from "./ConnectionOperations";
import DdlOperations from "./DdlOperations";
import DmlOperations from "./DmlOperations";

// Public Objects -----------------------------------------------------------

export interface Connection extends ConnectionOperations, DdlOperations, DmlOperations {

}

export default Connection;
