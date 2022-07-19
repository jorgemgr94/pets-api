import app from "./app";

import Mongodb from "./config/mongodb";

// start database server
Mongodb.connect();

// start server
const PORT = process.env.PORT || 3000; // get from env util.
app.listen(PORT);

// eslint-disable-next-line no-console
console.log("Server on port", PORT);
