import { Schema, model } from "mongoose";

const petSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model("Pet", petSchema);
