'use client';

import { usePathname } from 'next/navigation';

export default function Products() {
  const pathname = usePathname();
  return (
    <>
      <h2> Products</h2>
    </>
  );
}
