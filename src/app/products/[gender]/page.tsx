import { notFound, useParams, usePathname } from 'next/navigation';

import { Gender, Products } from '@/interfaces';
import BentoCategoryCard from '@/components/BentoCategoryCard/BentoCategoryCard';
import Banner from '@/components/Banner';
import {
  getGenderCategories,
  getGenderCategoriesAndFeaturedProducts,
} from '@/db/prismaOperation';
import SimpleSwiperProductCarousel from '@/components/Swiper/SimpleSwiperProductCarousel/SimpleSwiperProductCarousel';

export default async function GenderFashionPage({
  params,
}: {
  params: { gender: string };
}) {
  const genderName = params.gender.toLocaleUpperCase();

  if (genderName === 'MEN' || genderName === 'WOMEN') {
    const categories = await getGenderCategoriesAndFeaturedProducts(genderName);

    const genderObject: Gender | null = await JSON.parse(
      JSON.stringify(categories)
    );

    const products: Products[] | undefined = await genderObject
      ?.featuredCollection?.products;
    // console.log(genderObject?.bannerUrls);

    return (
      <section className=' text-black sm:mx-5 md:mx-10 pb-20 w-full'>
        <Banner />
        <h2 className='text-3xl sm:text-4xl pb-4 font-semibold capitalize'>
          {params.gender}&apos;s Fashion
        </h2>
        <article className='flex flex-wrap gap-4'>
          {genderObject?.categories?.map((category, index) => (
            <BentoCategoryCard
              category={category}
              url={`/products/${params.gender}/${category.uriName}`}
              key={`${category}-categories-${index}`}
            />
          ))}
        </article>
        {products && (
          <article className='flex flex-wrap gap-4  '>
            <h4 className='font-bold text-lg pt-6 capitalize'>
              Popular Items for {products[0].genderName.toLocaleLowerCase()}
            </h4>
            <SimpleSwiperProductCarousel products={products} />{' '}
          </article>
        )}
      </section>
    );
  }

  notFound();
}
