import { Router } from "express";
const router = Router();

import * as PetsController from "../controllers/pets.controller";
// import { verifyToken, isAdmin } from "../middlewares/auth.middleware";

router.get("/", PetsController.getPets);
router.post("/", /*[verifyToken, isAdmin],*/ PetsController.createPet); // TODO: Protected route

// TODO: Test this nomenclature
router
	.route("/:id")
	.get(PetsController.getPet)
	.put(PetsController.updatePet)
	.delete(PetsController.deletePet);

// TODO: Distinct this ruote types.
// PUT: To update existing resources.
// PATCH: To update existing resources. It only updates the fields that were supplied, leaving the others alone

export default router;
