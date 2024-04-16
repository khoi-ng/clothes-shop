import NotFound from '@/app/not-found';
import ProductCard from '@/components/ProductCard';
import SimpleSwiperCategoriesCarousel from '@/components/Swiper/CategorySimpleSwiper/SimpleCategoriesCarousel';
import {
  getCategoryByUriNameAndGender,
  getGenderCategories,
} from '@/db/prismaOperation';
import { ICategory } from '@/interfaces';
import { Category } from '@prisma/client';

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

    const genderOBJ = await getGenderCategories(gender);
    const categories: Category[] | undefined = await genderOBJ?.categories;

    return (
      <section className=' text-black mx-5 md:mx-10 pb-20 w-full sm:mr-32'>
        <div className='flex items-center'>
          <h2 className='text-2xl sm:text-3xl pb-4 font-semibold capitalize'>
            {genderLowerCase.toLocaleLowerCase()}&apos;s {categoriesObject.name}
          </h2>
        </div>
        <article className=' mr-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
          {categoriesObject?.products?.map((product, index) => (
            <ProductCard
              product={product}
              url={`${categoriesObject.uriName}/${product.id}`}
              key={`${genderLowerCase}-category-item-${index}-${product.name}-div`}
            />
          ))}
        </article>
        {categories && (
          <article className='w-full  my-10 '>
            <div className='flex items-center'>
              <h4 className='font-bold text-lg pb-6 capitalize'>
                Check out more Categories
              </h4>
            </div>
            <div className='mr-10'>
              <SimpleSwiperCategoriesCarousel categories={categories} />
            </div>
          </article>
        )}
      </section>
    );
  }

  NotFound();
}
