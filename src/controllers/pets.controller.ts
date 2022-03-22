import { Response, RequestHandler, Request, NextFunction } from "express";
import Pet from "../models/Pet";

export const createPet: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const pet = new Pet(req.body);
		const savedPet = await pet.save();
		res.json(savedPet);
	} catch (error) {
		return res.status(500).json(error);
	}
};

// TODO: Implement /pets?offset=5&limit=5 to pagination.
// GET: /books?published=true&page=2&page_size=10
export const getPets: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const pets = await Pet.find();
		return res.json(pets);
	} catch (error) {
		next(error);
	}
};

export const getPet: RequestHandler = async (req: Request, res: Response) => {
	try {
		const pet = await Pet.findById(req.params.id);
		if (!pet) return res.status(204).json();
		return res.json(pet);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const deletePet: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const pet = await Pet.findByIdAndDelete(id);
		return res.json(pet);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export const updatePet: RequestHandler = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		const { body } = req;

		const pet = await Pet.findByIdAndUpdate(id, body, {
			new: true
		});

		return res.json(pet);
	} catch (error) {
		return res.status(500).json(error);
	}
};
