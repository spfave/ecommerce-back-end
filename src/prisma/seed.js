import { prisma } from '../config/prisma-client.js';
import { categoryData } from './seeds/category-seeds.js';
import { productData } from './seeds/product-seeds.js';
import { tagData } from './seeds/tag-seeds.js';
import { productTagData } from './seeds/product-tag-seeds.js';

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
