import { notFound, useParams, usePathname } from 'next/navigation';
import prisma from '@/db/prisma';
import { GENDER, Gender } from '@/interfaces';

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

    const categoriesObject: Gender | null = await JSON.parse(
      JSON.stringify(categories)
    );

    return (
      <section className='pt-24 bg-black text-white'>
        {categoriesObject?.categories?.map((category, index) => (
          <div key={`${category}-categories-${index}`}>
            <a href={`/products/${params.gender}/${category.uriName}`}>
              {category.name}
            </a>
          </div>
        ))}
      </section>
    );
  }
  // const pathname = await usePathname();

  //   const categories = await getGenderCategories(gender);

  //   if (categories) {
  //     return (
  //       <section className='pt-20 bg-black text-white'>
  //         {categories.map((category, index) => (
  //           <div key={`${gender}-categories-${index}`}>
  //             <a href={`${pathname}/${category.pathName}`}>
  //               {category.displayTitle}
  //             </a>
  //           </div>
  //         ))}
  //       </section>
  //     );
  //   }

  notFound();
}
