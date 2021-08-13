import app from "./app";
import "./config/mongodb";

app.listen(app.get("port"));
// eslint-disable-next-line no-console
console.log("Server on port ", app.get("port"));
