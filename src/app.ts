import express from "express";
import morgan from "morgan";
import cors from "cors";

import petsRoutes from "./routes/pets.routes";

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(petsRoutes);

export default app;
