import '../globals.css';

export const metadata = {
  title: 'Clothing Store Demo by Duy Khoi Nguyen',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
