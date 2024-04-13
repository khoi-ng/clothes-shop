import NotFound from '@/app/not-found';
import ParallaxSlider from '@/components/ParallaxSlider/ParallaxSlider';
import ProductCard from '@/components/ProductCard';
import prisma from '@/db/prisma';
import { Category, Gender, GENDER } from '@/interfaces';

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

const getGenderCategories = async (gender: GENDER) => {
  const genderFromDB = await prisma.gender.findFirst({
    where: {
      name: gender,
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          genderName: true,
          uriName: true,
          bentoUrls: true,
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

    const categories = await getGenderCategories(gender);

    const genderObjectString = JSON.stringify(categories);

    return (
      <section className=' text-black mx-10'>
        <div className='flex items-center'>
          <h2 className='text-4xl pb-4'>
            {gender}&apos;s {categoriesObject.name}
          </h2>
        </div>
        <article className='flex flex-wrap gap-4'>
          {categoriesObject?.products?.map((product, index) => (
            <ProductCard
              product={product}
              url={`${categoriesObject.uriName}/${product.id}`}
              key={`${genderLowerCase}-category-item-${index}-${product.name}-div`}
            />
          ))}
        </article>
        <article className='w-11/12  my-20'>
          <div className='flex items-center'>
            <h2 className='text-4xl pb-4'>Check out more Categories:</h2>
          </div>
          <ParallaxSlider
            genderObjectString={genderObjectString}
            currentCategoryID={categoriesObject.id}
          />
        </article>
      </section>
    );
  }

  NotFound();
}
