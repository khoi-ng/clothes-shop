import { PrismaClient, Genders, Category } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.gender.create({
    data: {
      name: Genders.MEN,
    },
  });
  console.log(category);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
