import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
	username: string;
	email: string;
	password: string;
}

interface IUserDocument extends IUser, Document {
	encryptPassword: (password: string) => Promise<string>;
	validatePassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
	findByUsername: (username: string) => Promise<IUserDocument>;
}

const userSchema = new Schema<IUserDocument>(
	{
		username: {
			type: String,
			unique: true
		},
		email: {
			type: String,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

userSchema.methods.encryptPassword = async (
	password: string
): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (
	password: string
): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
};

userSchema.statics.findByUsername = function (username: string) {
	return this.findOne({ username });
};

export default model<IUserDocument, IUserModel>("User", userSchema);
