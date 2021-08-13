import { Router } from "express";
const router = Router();

import * as petsCtrl from "../controllers/pets.controller";

router.get("/pets", petsCtrl.getPets);
router.get("/pets/:id", petsCtrl.getPet);
router.post("/pets", petsCtrl.createPet);
router.delete("/pets/:id", petsCtrl.deletePet);
router.put("/pets/:id", petsCtrl.updatePet);

export default router;
