import { notFound, useParams, usePathname } from 'next/navigation';
import prisma from '@/db/prisma';
import { GENDER, Gender } from '@/interfaces';
import BentoCategoryCard from '@/components/BentoCategoryCard/BentoCategoryCard';
import Banner from '@/components/Banner';

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

export default async function GenderFashionPage({
  params,
}: {
  params: { gender: string };
}) {
  const genderName = params.gender.toLocaleUpperCase();
  if (genderName === 'MEN' || genderName === 'WOMEN') {
    const categories = await getGenderCategories(genderName);

    const genderObject: Gender | null = await JSON.parse(
      JSON.stringify(categories)
    );
    // console.log(genderObject?.bannerUrls);

    return (
      <section className=' text-black max-md:mx-0 mx-10'>
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
      </section>
    );
  }

  notFound();
}
