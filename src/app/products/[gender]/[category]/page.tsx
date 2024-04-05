'use client';

import { notFound, useParams, usePathname } from 'next/navigation';
import {
  Gender,
  getCategory,
  getAllProductsByCategory,
} from '../../../../data/data';

export default function Category() {
  const params = useParams<{ gender: Gender; category: string }>();
  const gender = params.gender;
  const category = getCategory(gender, params.category);
  const products = getAllProductsByCategory(gender, params.category);
  const pathname = usePathname();

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h2>
        {gender} Category {category.displayTitle}
      </h2>

      {products?.map((product, index) => (
        <a
          href={`${pathname}/${product.id}`}
          key={`${gender}-category-items-${index}-${product.name}`}
        >
          {product.name}
        </a>
      ))}
    </div>
  );
}
