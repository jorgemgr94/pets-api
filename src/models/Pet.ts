import { Schema, model } from "mongoose";

const petSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		gender: {
			type: String,
			enum: ["male", "female"]
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export default model("Pet", petSchema);
