'use client';
import { GENDERS } from '@/data/data';
import { usePathname } from 'next/navigation';

export default function Products() {
  const pathname = usePathname();
  return (
    <>
      <h2> Products</h2>
      {GENDERS.map((gender, index) => (
        <div key={`products-${gender}-link-${index}`}>
          <a href={`${pathname}/${gender}`}>{gender}</a>
        </div>
      ))}
    </>
  );
}
