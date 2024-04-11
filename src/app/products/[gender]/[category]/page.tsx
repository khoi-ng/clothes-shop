import NotFound from '@/app/not-found';
import ProductCard from '@/components/ProductCard';
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
      <section className=' text-black mx-10'>
        <h2 className='text-4xl pb-4'>
          {gender}&apos;s {categoriesObject.name}
        </h2>
        <article className='flex flex-wrap gap-4'>
          {categoriesObject?.products?.map((product, index) => (
            <ProductCard
              product={product}
              url={`${categoriesObject.uriName}/${product.id}`}
              key={`${genderLowerCase}-category-item-${index}-${product.name}-div`}
            />
          ))}
        </article>
      </section>
    );
  }

  NotFound();
}
