import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

// export interface IPayload {
//   _id: string;
//   iat: number;
// }

// export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const token = req.header('token');
//       if (!token) return res.status(401).json('Access Denied');
//       const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || '') as IPayload;
//       req.userId = payload._id;
//       next();
//   } catch (e) {
//       res.status(400).send('Invalid Token');
//   }
// }

// TODO: Implement this.
// Has the consumer not provided authentication credentials? Was their SSO Token invalid/timed out? 👉 401 Unauthorized.
// Was the consumer correctly authenticated, but they don’t have the required permissions/proper clearance to access the resource? 👉 403 Forbidden.
export const verifyToken = async (req, res, next) => {
	const token = req.headers["x-access-token"];

	if (!token) return res.status(403).json({ message: "No token provided" });

	try {
		const decoded = jwt.verify(token, config.SECRET);
		req.userId = decoded.id;

		const user = await User.findById(req.userId, { password: 0 });
		if (!user) return res.status(404).json({ message: "No user found" });

		next();
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized!" });
	}
};

export const isAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId);
		const roles = await Role.find({ _id: { $in: user.roles } });

		for (let i = 0; i < roles.length; i++) {
			if (roles[i].name === "admin") {
				next();
				return;
			}
		}

		return res.status(403).json({ message: "Require Admin Role!" });
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error });
	}
};
