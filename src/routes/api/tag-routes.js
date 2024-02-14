import { Router } from 'express';
import { prisma } from '../../config/prisma-client.js';

export const router = Router();

// The `/api/tags` endpoint
// Get all tags including associated product data
router.get('/', async (req, res) => {
	try {
		const tagData = await prisma.tag.findMany({
			include: { products: true },
			orderBy: { id: 'asc' },
		});

		if (!tagData) {
			res.status(404).json({ message: `No tags found` });
		}

		res.status(200).json(tagData);
	} catch (error) {
		res.status(500).json(error);
	}
});

// Get one tag by its `id` with associated products
router.get('/:id', async (req, res) => {
	try {
		const tagData = await prisma.tag.findUnique({
			where: { id: parseInt(req.params.id) },
			include: { products: true },
		});

		if (!tagData) {
			res.status(404).json({ message: `No tag found for this id` });
		}

		res.status(200).json(tagData);
	} catch (error) {
		res.status(500).json(error);
	}
});

// Create a new tag
router.post('/', async (req, res) => {
	try {
		const tagData = await prisma.tag.create({ data: req.body });
		res.status(200).json(tagData);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Update a tag's by its `id`
router.put('/:id', async (req, res) => {
	try {
		const tagData = await prisma.tag.update({
			where: { id: parseInt(req.params.id) },
			data: req.body,
		});

		if (!tagData) {
			res.status(404).json({ message: `No tag found for this id` });
			return;
		}

		res.status(200).json(tagData);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Delete on tag by its `id`
router.delete('/:id', async (req, res) => {
	try {
		const tagData = await prisma.tag.delete({
			where: { id: parseInt(req.params.id) },
		});

		if (!tagData) {
			res.status(404).json(`No tag found for this id`);
			return;
		}

		res.status(200).json(tagData);
	} catch (error) {
		res.status(500).json(error);
	}
});
