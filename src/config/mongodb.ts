import { connect, ConnectOptions } from "mongoose";

// const config = {
// 	MONGO_DATABASE: process.env.MONGO_DATABASE,
// 	MONGO_USER: process.env.MONGO_USER,
// 	MONGO_PASSWORD: process.env.MONGO_PASSWORD,
// 	MONGO_HOST: process.env.MONGO_HOST
// };

(async () => {
	try {
		const mongooseOptions: ConnectOptions = {
			// authSource: "admin"
			// user: config.MONGO_USER,
			// pass: config.MONGO_PASSWORD
		};

		// const db = await connect(
		// 	`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`,
		// 	mongooseOptions
		// );

		// TODO: Put this on env files.
		const db = await connect(
			`mongodb+srv://admin:uW5JFQhkp8cyvVb@demo.7kei7.mongodb.net/Demo?retryWrites=true&w=majority`,
			mongooseOptions
		);

		// eslint-disable-next-line no-console
		console.log("MongoDB connected to: ", db.connection.name);
	} catch (error) {
		console.error(error);
	}
})();
