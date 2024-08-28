import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

// Define metadata for the page
export const metadata: Metadata = {
  title: "Page not found",
  description: "This page cannot be found",
};

// Functional component for the 404 page
const NotFound = () => {
  return (
    <main className='w-full h-screen flex items-center justify-center p-2'>
      <div className='flex flex-col gap-7 items-center'>
        <Image
          src='/error404.png'
          priority
          width={300}
          height={300}
          className='w-[200px] sm:w-[300px] h-auto'
          draggable={false}
          alt='Page not found'
          layout='intrinsic' // Ensures the image size is known to optimize layout
        />
        <div className='flex items-center flex-col gap-3'>
          <h1 className='text-4xl font-semibold capitalize text-slate-800 dark:text-slate-100 text-center'>
            Oops!!
          </h1>
          <p className='text-lg font-medium text-slate-600 dark:text-slate-100 text-center'>
            This page you are looking for could not be found.
          </p>
        </div>
        <Link href='/' passHref>
          <Button className='h-12 px-8'>Back To Home</Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
