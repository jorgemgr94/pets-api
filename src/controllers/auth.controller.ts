import jwt from "jsonwebtoken";
import { Response, RequestHandler, Request } from "express";
import User from "../models/User";
import Joi from "joi";

interface IUser {
	username: string;
	email: string;
	password: string;
}

const signUpValidation = async <T>(data: T, schema: Joi.ObjectSchema) => {
	const { error } = await schema.validate(data);
	return error;
};

export const signUp: RequestHandler = async (req: Request, res: Response) => {
	try {
		// Validate the data
		const { username, email, password } = req.body;
		const data: IUser = { username, email, password };
		const userSchema = Joi.object({
			username: Joi.string().min(4).max(30).required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(6).required()
		});

		const error = await signUpValidation(data, userSchema);
		if (error) {
			return res
				.status(406)
				.json({ error: `Error in User Data : ${error.message}` });
		}

		// Save the User
		const newUser = new User(data);
		newUser.password = await newUser.encryptPassword(password);
		const { _id } = await newUser.save();

		// Create a token
		// TODO: Aqui podemos agregar el rol del usuario.
		const token = jwt.sign({ _id, username }, "salt-jwt", {
			expiresIn: 60 * 60 * 24 // 24 hours
		});

		return res.status(200).json({ token });
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

// export const signIn = async (req, res) => {
// 	try {
// 		// Request body email can be an email or username
// 		const userFound = await User.findOne({ email: req.body.email }).populate(
// 			"roles"
// 		);

// 		if (!userFound) return res.status(400).json({ message: "User Not Found" });

// 		const matchPassword = await User.validatePassword(userFound.password);

// 		if (!matchPassword)
// 			return res.status(401).json({
// 				token: null,
// 				message: "Invalid Password"
// 			});

// 		const token = jwt.sign({ id: userFound._id }, config.SECRET, {
// 			expiresIn: 86400 // 24 hours
// 		});

// 		res.json({ token });
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// ...

// export const signin = async (req: Request, res: Response) => {
//     const { error } = signinValidation(req.body);
//     if (error) return res.status(400).json(error.message);
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(400).json('Email or Password is wrong');
//     const correctPassword = await user.validatePassword(req.body.password);
//     if (!correctPassword) return res.status(400).json('Invalid Password');

//     // Create a Token
//     const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'] || '');
//     res.header('auth-token', token).json(token);
// };

// export const profile = async (req: Request, res: Response) => {
//     const user = await User.findById(req.userId, { password: 0 });
//     if (!user) {
//         return res.status(404).json('No User found');
//     }
//     res.json(user);
// };
