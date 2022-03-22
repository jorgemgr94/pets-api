import { Router } from "express";
// import Joi from "joi";
import { signUp } from "../controllers/auth.controller";
// import { Response, Request, NextFunction } from "express";

const router = Router();

router.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});

// const signUpValidation = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const { username, email, password } = req.body;

// 	const payload = {
// 		username,
// 		email,
// 		password
// 	};

// 	const userSchema = Joi.object({
// 		username: Joi.string().min(4).max(30).required(),
// 		email: Joi.string().email().required(),
// 		password: Joi.string().min(6).required()
// 	});

// 	const { error } = userSchema.validate(payload);
// 	if (error) {
// 		return res
// 			.status(406)
// 			.json({ error: `Error in User Data : ${error.message}` });
// 	} else {
// 		next();
// 	}
// };

router.post("/sign-up", /*[signUpValidation],*/ signUp);
// router.post("/sign-in", signIn);

export default router;
