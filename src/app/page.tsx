import Image from 'next/image';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Header></Header>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <h2>Home</h2>
      </div>
    </main>
  );
}
