import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express, { Response, NextFunction, Request } from "express";
import routes from "./routes/index.routes";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const { NODE_ENV, CORS_ORIGINS } = process.env;

// Middleware
if (NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(helmet());
app.use(
	cors({
		origin: CORS_ORIGINS
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes /api/v1
app.use("/api/v1", routes);

// TODO: Move this interface from here
interface IPlatformError {
	status?: number;
	message?: string;
}

// Error handling
app.use((req: Request, res: Response, next: NextFunction) => {
	const error: IPlatformError = {
		status: 404,
		message: "Not found"
	};

	next(error);
});

app.use((error: IPlatformError, req: Request, res: Response) => {
	res.status(error.status || 500).json({
		error: {
			status: error.status || 500,
			message: error.message || "Internal Server Error"
		}
	});
});

export default app;
