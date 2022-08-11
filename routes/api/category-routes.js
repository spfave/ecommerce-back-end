const router = require('express').Router();
// const prisma = require('../config/prisma-client');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// The `/api/categories` endpoint
// Get all categories including associated products
router.get('/', async (req, res) => {
  try {
    const categoryData = await prisma.category.findMany({
      include: {
        products: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    if (!categoryData.length) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get one category by its `id` with associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await prisma.category.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        products: true,
      },
    });

    if (!categoryData) {
      res.status(400).json({ message: `No category found for this id` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await prisma.category.create({
      data: req.body,
    });

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update a category by its `id`
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found for this id` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete a category by its `id`
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await prisma.category.delete({
      where: { id: parseInt(req.params.id) },
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found for this id` });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
