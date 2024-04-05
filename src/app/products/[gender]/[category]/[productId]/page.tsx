'use client';

import { notFound, useParams } from 'next/navigation';
import { Gender, getOneProduct, existCategory } from '../../../../../data/data';

export default function Category() {
  const params = useParams<{
    gender: Gender;
    productId: string;
    category: string;
  }>();

  const gender = params.gender;
  const product = getOneProduct(gender, params.productId);

  if (!existCategory(params.category, gender) || !product) {
    notFound();
  }

  return (
    <h2>
      {gender} Product {product.name}
    </h2>
  );
}
