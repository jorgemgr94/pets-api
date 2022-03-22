import { Router } from "express";
const router = Router();

import petsRoutes from "./pets.routes";
import authRoutes from "./auth.routes";

router.use("/pets", petsRoutes);
router.use("/auth", authRoutes);

export default router;
