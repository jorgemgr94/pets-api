import { Response, RequestHandler, Request } from "express";
import Pet from "../models/Pet";

export const createPet: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const petFound = await Pet.findOne({ url: req.body.url });
		if (petFound)
			return res.status(303).json({ message: "the url already exists" });

		const newPet = new Pet(req.body);
		const savedPet = await newPet.save();
		res.json(savedPet);
	} catch (error) {
		return res.status(404).json(error);
	}
};

export const getPets: RequestHandler = async (req: Request, res: Response) => {
	try {
		// const pets = await Pet.find();
		const pets = ["Hello"];

		return res.json(pets);
	} catch (error) {
		return res.status(404).json(error);
	}
};

export const getPet: RequestHandler = async (req: Request, res: Response) => {
	const petFound = await Pet.findById(req.params.id);

	if (!petFound) return res.status(204).json();

	return res.json(petFound);
};

export const deletePet: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { id } = req.params;

	try {
		const petFound = await Pet.findByIdAndDelete(id);
		return res.json(petFound);
	} catch (error) {
		return res.status(404).json(error);
	}
};

export const updatePet: RequestHandler = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { id } = req.params;
	const { body } = req;

	try {
		const petUpdated = await Pet.findByIdAndUpdate(id, body, {
			new: true
		});
		return res.json(petUpdated);
	} catch (error) {
		return res.status(404).json(error);
	}
};
