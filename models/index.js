// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Product-Category relations
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Product-Tag relations
Product.belongsToMany(Tag, {
  through: { model: ProductTag, unique: false },
  as: "product_tags",
});

Tag.belongsToMany(Product, {
  through: { model: ProductTag, unique: false },
  as: "tag_products",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
