import NotFound from '@/app/not-found';
import prisma from '@/db/prisma';
import { Category, GENDER } from '@/interfaces';

const getCategoryByGender = async (gender: GENDER, uri: string) => {
  const genderFromDB = await prisma.category.findFirst({
    where: {
      uriName: uri,
      genderName: gender,
    },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          description: true,
          price: true,
        },
      },
    },
  });
  return genderFromDB;
};

export default async function CategoryPage({
  params,
}: {
  params: { gender: string; category: string };
}) {
  const genderLowerCase = params.gender;
  const gender = genderLowerCase.toLocaleUpperCase();
  if (gender === 'MEN' || gender === 'WOMEN') {
    const category = await getCategoryByGender(gender, params.category);
    const categoriesObject: Category | null = await JSON.parse(
      JSON.stringify(category)
    );

    if (!category || !categoriesObject) {
      NotFound();
      return;
    }

    return (
      <section className='bg-black pt-24 text-white'>
        <h2 className='text-6xl'>
          {gender} Category {categoriesObject.name} Products
        </h2>
        {categoriesObject?.products?.map((product, index) => (
          <div
            key={`${genderLowerCase}-category-item-${index}-${product.name}-div`}
          >
            <a
              href={`${categoriesObject.uriName}/${product.id}`}
              key={`${genderLowerCase}-category-item-${index}-${product.name}`}
            >
              {product.name}
            </a>
          </div>
        ))}
      </section>
    );
  }

  NotFound();
}
