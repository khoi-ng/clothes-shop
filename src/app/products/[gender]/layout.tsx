import prisma from '@/db/prisma';
import { Gender, GENDER } from '@/interfaces';
import CategorySideNav from '@/components/CategorySideNav/CategorySideNav';
import NotFound from '@/app/not-found';
import { getGenderCategories } from '@/db/prismaOperation';
import Footer from '@/components/Footer/footer';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    gender: string;
    category: string;
    productId: string;
  };
}) {
  const genderName = params.gender.toLocaleUpperCase();
  if (genderName === 'MEN' || genderName === 'WOMEN') {
    const categories = await getGenderCategories(genderName);

    const genderObject: Gender | null = await JSON.parse(
      JSON.stringify(categories)
    );

    if (genderObject) {
      return (
        <html lang='en'>
          <body className='bg-slate-50 flex flex-col min-h-screen'>
            {/* <Navbar /> */}
            <main className='grow'>
              <section className='max-md:mx-6 mx-24 pt-36 '>
                <div className=' flex max-md:flex-col '>
                  <CategorySideNav genderObject={genderObject} />
                  {children}
                </div>
              </section>
              {/* <div className='push h-20'></div> */}
            </main>

            <Footer />
          </body>
        </html>
      );
    }
    NotFound();
  }
}
