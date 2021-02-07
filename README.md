# @craigmcc/ts-database

Generic interface for dialect-independent low level
operations on a variety of database implementations.
This interface is primarily oriented towards use cases
like migrations, tooling, and executable Node scripts
that perform database operations.

This interface does not strive to be a full-fledged
ORM (use something like Sequelize if you want that),
or support the full range of complexity that SQL-based
databases actually support.  It's primary purpose is to
make it easy to write small things quickly and easily.

A couple of technology issues are important to understand:
* This interface was developed in Typescript,
  with the target code level set to **es6**,
  so your execution environment must support this.
  As with essentially all Typescript based libraries,
  it is usable directly from JavaScript code also.
* Nearly all of the logic is based on native Promises,
  so your execution environment must support this.
  You can use either async/await or then/catch
  approaches (I prefer the former), but there is
  no support for the legacy Javascript style of
  passing a callback function to be called when
  an operation is completed.

## Installation

Install the generic interface into your Node-based
application:

```shell
npm install @craigmcc/ts-database
```

In addition, you will need to select an appropriate
implementation, based on the database dialect you will
be using.  For example, to interact with a Postgres
database, install this:

```shell
npm install @craigmcc/ts-database-postgres
```

NOTE:  Although you must declare an implementation
dependency in your *package.json* file, all of your
actual code will use the APIs in this package.
Selection of which implementation to use is deferred
to when you create a *Connection* instance, and
pass it a *ConnectionURI* or *ConnectionAttributes*
instance, which includes an identifier for which
dialect implementation to delegate operations to.

## Versioning Note

As the **0.x.y** version number indicates, the current
APIs are under active development, and will definitely
be changing as that occurs.  Once the APIs are stable,
a version **1.0.0** will be released, and normal
semantic versioning updates will then be used.

## API Documentation

This package, and related implementation packages,
were built with Typescript, and include Typescript
type definitions.  If your own project does not use
Typescript (or if your favorite editor does not support
using Typescript types), you can manually open the
following files, all found in the
*node_modules/@craigmcc/ts-database* directory, to
examine the relevant documentation comments:

Filename | Description
--- | ---
dist/index.d.ts | Top level exports.
dist/types.d.ts | Basic scalar and object definitions.
dist/Connection.d.ts | Overall *Connection* class you will be interacting with.
dist/ConnectionOperations.d.ts | Connection methods for connecting to and disconnecting from a database.
dist/DdlOperations.d.ts | Connection methods for Data Description Language (DDL) operations, for managing tables, indexes, and the like.
dist/DmlOperations.d.ts | Connection methods for Data Manipulation Language (DML) operations, for manipulating the data content in your database.

## Instantiating A Connection

To utilize this interface, you must first create a new
*Connection* object, passing it either a *ConnectionURI*
includes all the configuration information required
(see below for an example), or a *ConnectionAttributes*
object that spreads the same configuration information
across it's fields.

We'll use the Postgres implementation as an example.

```typescript
import connection from "@craigmcc/ts-database";

// Details of the format depend on which dialect you are using
const CONNECTION_URI = "postgres://myusername:mypassword@myhostname:5432/mydatabase";

const db = await connection(CONNECTION_URI);
try {
    await db.connect();
} catch (error) {
    // Deal with connection failure error
}
```

The *connection()* function returns a new *Connection*
instance, after using the dialect information to select
which implementation will be used.

When your application is ready to shut down, call
*db.disconnect()* to gracefully shut down the connection
to your database.

You can call the variable that receives the new
connection instance anything you want.  I like *db*
because it is short and sweet, and indicates exactly
what this object is for.  If your application consists
of multiple modules, you can also export it.

## Interacting With The Database

All of your actual interactions will be calls to methods
of this *Connection* object, looking like this:

```typescript
// Set the values of the customers we want to look up
const myLastName = "Flintstone";

// Set up a variable to receive SELECT results:
let rows: DataObject[] = [];

// Perform the SELECT operation
try {
    rows = await db.select("customers", {
        columns: [ "id", "first_name", "last_name" ],
        orderBy: [ "last_name", "first_name" ],
        where: {
            clause: "last_name = $1",
            values: [ myLastName ]
        }
    })
} catch (error) {
    // Deal with any error that occurred
}
```

One detail of the *where* field is interesting --
you can separate the actual WHERE clause (the part
that goes after **WHERE** in the generated SQL)
from the list of values used for the replacement
markers (starting with *$1* but going as high as you
like).  You can instead hard code the values into
the *clause* you specify, but that makes **YOU**
reponsible for:
* Properly converting Javascript values to the
  correct types.
* Properly quoting and escaping values for the
  way your database requires them.
* (MOST IMPORTANT) - **YOU** are now responsible
  for avoiding SQL injection attacks, since these
  values are most typically gathered from application
  users.
  
It's much easier to let the database implementation
deal with these sorts of details.  As an added bonus,
the *clause* phrases will be much shorter, and
therefore easier to read and understand.

If this SELECT operation succeeds, it will return an
array of *DataObject*, one per matching row.  (If no
rows matched your criteria, the array length will be
zero.)  The fields in each object will be those of the
columns you requested ("id", "first_name", and "last_name"
in this example).  If you omit the "columns" property,
all columns from the "customers" table will be returned.

## Supported Database Operations

The public methods of *Connection* provide a very
rich set of operations you can perform, including:
* Data manipulations (delete, insert, select, update).
* Adding and dropping tables.
* Adding and dropping columns on existing tables.
* Adding and dropping indexes and foreign key constraints.

Feel free to explore the *DdlOperations* and
*DmlOperations* files mentioned above - these are
all the public methods on your *Connection* object.
