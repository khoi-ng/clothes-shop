import Navbar, { NavbarComponent } from '@/components/Navbar';

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
      <body>
        <div>
          <Navbar fontColor='text-white' backgroundColor='bg-black' />
        </div>

        {children}
      </body>
    </html>
  );
}
