'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Server Error",
  description: "An unexpected error occurred on the server.",
};

// Functional component for the 500 error page
const Error500 = () => {
  return (
    <main className='w-full h-screen flex items-center justify-center p-2'>
      <div className='flex flex-col gap-7 items-center'>
        <Image
          src='/error500.png'
          priority
          width={300}
          height={300}
          className='w-[200px] sm:w-[300px] h-auto'
          draggable={false}
          alt='Server Error'
          layout='intrinsic' // Ensures image has known dimensions for layout
        />
        <div className='flex items-center flex-col gap-3'>
          <h1 className='text-4xl font-semibold capitalize text-slate-800 dark:text-slate-100 text-center'>
            Oops!!
          </h1>
          <p className='text-lg font-medium text-slate-600 dark:text-slate-100 text-center'>
            Service Unavailable.
          </p>
        </div>
        <Link href='/' passHref>
          <Button className='h-12 px-8'>Back To Home</Button>
        </Link>
      </div>
    </main>
  );
};

export default Error500;
