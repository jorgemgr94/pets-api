import { connect, ConnectOptions, Mongoose } from "mongoose";
class Mongodb {
	private MONGODB_URI = `mongodb+srv://admin:uW5JFQhkp8cyvVb@demo.7kei7.mongodb.net/Demo?retryWrites=true&w=majority`;
	private mongooseOptions: ConnectOptions = {
		// authSource: "admin"
		// user: config.MONGO_USER,
		// pass: config.MONGO_PASSWORD
	};
	public db: Mongoose;

	async connect() {
		try {
			this.db = await connect(this.MONGODB_URI, this.mongooseOptions);

			// eslint-disable-next-line no-console
			console.log(`Mongodb connected to: ${this.db.connection.name}`);
		} catch (error) {
			console.error(error);
		}
	}
}

export default new Mongodb();
