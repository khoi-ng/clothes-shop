import Header from '@/components/LandingPage/Header';
import Featured from '@/components/LandingPage/Featured';

import prisma from '@/db/prisma';
import CheckoutMore from '@/components/LandingPage/CheckoutMore/CheckoutMore';
import Navbar from '@/components/Navbar';
import GridImageCanvas from '@/components/HoverImageEffects/GridImageCanvas';
import { getFeaturedProducts } from '../../src/db/prismaOperation';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    // Landing page
    <main className=''>
      <Navbar backgroundColor='bg-transparent' />
      <Header />
      <Featured featuredProducts={JSON.stringify(featuredProducts?.products)} />
      <CheckoutMore />
    </main>
  );
}
