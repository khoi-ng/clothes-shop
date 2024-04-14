import NotFound from '@/app/not-found';
import ParallaxSlider from '@/components/ParallaxSlider/ParallaxSlider';
import ProductCard from '@/components/ProductCard';
import prisma from '@/db/prisma';
import {
  getCategoryByUriNameAndGender,
  getGenderCategories,
} from '@/db/prismaOperation';
import { ICategory, Gender, GENDER } from '@/interfaces';

export default async function CategoryPage({
  params,
}: {
  params: { gender: string; category: string };
}) {
  const genderLowerCase = params.gender;
  const gender = genderLowerCase.toLocaleUpperCase();
  if (gender === 'MEN' || gender === 'WOMEN') {
    const category = await getCategoryByUriNameAndGender(
      gender,
      params.category
    );
    const categoriesObject: ICategory | null = await JSON.parse(
      JSON.stringify(category)
    );

    if (!category || !categoriesObject) {
      NotFound();
      return;
    }

    const categories = await getGenderCategories(gender);

    const genderObjectString = JSON.stringify(categories);

    return (
      <section className=' text-black mx-5 md:mx-10 pb-20 w-full'>
        <div className='flex items-center'>
          <h2 className='text-2xl sm:text-3xl pb-4 font-semibold capitalize'>
            {genderLowerCase.toLocaleLowerCase()}&apos;s {categoriesObject.name}
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
        <article className='w-full  my-20'>
          <div className='flex items-center'>
            <h2 className='text-2xl sm:text-3xl pb-4 font-semibold capitalize'>
              Check out more Categories
            </h2>
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
