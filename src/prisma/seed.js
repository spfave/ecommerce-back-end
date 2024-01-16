const { PrismaClient } = require('@prisma/client');

const categoryData = require('./seeds/category-seeds');
const productData = require('./seeds/product-seeds');
const tagData = require('./seeds/tag-seeds');
const productTagData = require('./seeds/product-tag-seeds');

const prisma = new PrismaClient();

async function seedAll() {
	await prisma.category.createMany({
		data: categoryData,
		skipDuplicates: true,
	});
	console.log('\n----- CATEGORIES SEEDED -----\n');

	await prisma.product.createMany({ data: productData });
	console.log('\n----- PRODUCTS SEEDED -----\n');

	await prisma.tag.createMany({ data: tagData, skipDuplicates: true });
	console.log('\n----- TAGS SEEDED -----\n');

	for (const productTag of productTagData) {
		await prisma.product.update({
			where: { id: productTag.productId },
			data: {
				tags: { connect: { id: productTag.tagId } },
			},
		});
	}
	console.log('\n----- PRODUCT TAGS SEEDED -----\n');
}

seedAll()
	.then(async () => {
		await prisma.$disconnect();
		process.exit(0);
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
