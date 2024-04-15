import Footer from '@/components/Footer/footer';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-slate-50 flex flex-col min-h-screen'>
        <Navbar fontColor='text-white' backgroundColor='bg-black' />
        <main className='grow'>
          <section className='max-md:mx-6 mx-20'>{children}</section>
        </main>
        <Footer />
      </body>
    </html>
  );
}