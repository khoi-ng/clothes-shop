import Header from '@/components/LandingPage/Header';
import Featured from '@/components/LandingPage/Featured';

import '../styles/landingpage.scss';

import prisma from '@/db/prisma';

const getFeaturedProducts = async () => {
  const featuredProducts = await prisma.featuredCollection.findFirst({
    where: {
      name: 'FeaturedProducts',
    },
    include: {
      products: {
        select: {
          imageUrl: true,
          price: true,
          name: true,
          description: true,
        },
      },
    },
  });
  return featuredProducts;
};

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    // Landing page
    <main className=''>
      <Header />
      <Featured featuredProducts={JSON.stringify(featuredProducts?.products)} />
    </main>
  );
}
