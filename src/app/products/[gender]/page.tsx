'use client';

import { notFound, useParams, usePathname } from 'next/navigation';
import { GENDERS, getCategories, Gender, CATEGORY } from '../../../data/data';

export default function GenderFashionPage() {
  const params = useParams<{ gender: Gender }>();
  const gender = params.gender;
  const pathname = usePathname();
  const categories: CATEGORY[] | null = getCategories(gender);

  if (categories) {
    return (
      <>
        {categories.map((category, index) => (
          <div key={`${gender}-categories-${index}`}>
            <a href={`${pathname}/${category.pathName}`}>
              {category.displayTitle}
            </a>
          </div>
        ))}
      </>
    );
  }

  notFound();
}
