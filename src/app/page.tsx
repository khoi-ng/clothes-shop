import Header from '@/components/LandingPage/Header';
import Featured from '@/components/LandingPage/Featured';

import CheckoutMore from '@/components/LandingPage/CheckoutMore/CheckoutMore';

import { getFeaturedProducts } from '../../src/db/prismaOperation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer/Footer';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    // Landing page
    <main className=''>
      <Navbar />
      <Header />
      <Featured featuredProducts={JSON.stringify(featuredProducts?.products)} />
      <CheckoutMore />
      <Footer />
    </main>
  );
}
