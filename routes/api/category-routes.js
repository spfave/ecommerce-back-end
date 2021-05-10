const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// Get all categories including associated products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categoryData.length) {
      res.status(404).json({ message: "No categories found" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Find one category by its id with associated products
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
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
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
