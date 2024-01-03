const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// The `/api/products` endpoint
// Get all products including associated category and tag data
router.get('/', async (req, res) => {
	try {
		const productData = await prisma.product.findMany({
			include: { category: true, tags: true },
		});

		if (!productData) {
			res.status(404).json({ message: 'No products found' });
			return;
		}

		res.status(200).json(productData);
	} catch (error) {
		res.status(500).json(error);
	}
});

// Get one product by its `id` with associated category and tag data
router.get('/:id', async (req, res) => {
	try {
		const productData = await prisma.product.findUnique({
			where: { id: parseInt(req.params.id) },
			include: { category: true, tags: true },
		});

		if (!productData) {
			res.status(400).json({ message: `No product found for this id` });
			return;
		}

		res.status(200).json(productData);
	} catch (error) {
		res.status(500).json(error);
	}
});

// Create a new product
router.post('/', async (req, res) => {
	/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
	try {
		const { productName, price, stock, categoryId, tagIds } = req.body;
		const mapTagIds = tagIds?.map((id) => ({ id }));

		const productData = await prisma.product.create({
			data: {
				productName,
				price,
				stock,
				categoryId,
				tags: {
					connect: mapTagIds,
				},
			},
			include: {
				category: true,
				tags: true,
			},
		});

		res.status(200).json(productData);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Update a product by its `id`
router.put('/:id', async (req, res) => {
	try {
		const { productName, price, stock, categoryId, tagIds } = req.body;

		const productTagData = await prisma.product.findUnique({
			where: { id: parseInt(req.params.id) },
			select: { tags: { select: { id: true } } },
		});
		// console.log(`productTagData: `, productTagData);

		const productTagIds = productTagData.tags.map(({ id }) => id);
		const newProductTagIds = tagIds.filter((tagId) => !productTagIds.includes(tagId));
		const oldProductTagIds = productTagIds.filter((tagId) => !tagIds.includes(tagId));
		// console.log(`newProductTags: `, newProductTagIds);
		// console.log(`oldProductTags: `, oldProductTagIds);

		const productData = await prisma.product.update({
			where: { id: parseInt(req.params.id) },
			data: {
				productName,
				price,
				stock,
				categoryId,
				tags: {
					connect: newProductTagIds.map((id) => ({ id })),
					disconnect: oldProductTagIds.map((id) => ({ id })),
				},
			},
			include: { tags: true },
		});
		// console.log(`productData: `, productData);

		res.status(200).json(productData);
	} catch (error) {
		res.status(400).json(error);
	}
});

// Delete a product by its `id`
router.delete('/:id', async (req, res) => {
	try {
		const productData = await prisma.product.delete({
			where: { id: parseInt(req.params.id) },
		});

		// if (!productData) {
		//   res.status(404).json({ message: `No product found for this id` });
		//   return;
		// }

		res.status(200).json(productData);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
