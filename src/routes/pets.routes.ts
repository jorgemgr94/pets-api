import { Router } from "express";
const router = Router();

import * as PetsController from "../controllers/pets.controller";

router.get("/pets", PetsController.getPets);
router.get("/pets/:id", PetsController.getPet);
router.post("/pets", PetsController.createPet);
router.delete("/pets/:id", PetsController.deletePet);
router.put("/pets/:id", PetsController.updatePet);

export default router;
