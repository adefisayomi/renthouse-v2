import Head from 'next/head';
import React, { forwardRef, ReactNode, FC } from 'react';

interface PropsPage {
  children: React.ReactNode;
  meta?: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  [key: string]: any;  // This allows for additional props
}

const Page: FC<PropsPage> = forwardRef<HTMLDivElement, PropsPage>(
  ({ children, meta, title, description, image, url, ...other }, ref) => (
    <>
      <Head>
        <title>{title ? `${title} | Rent-House®` : 'Rent-House® - Find Your Perfect Home'}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta name="description" content={description || 'Rent-House® is your trusted platform for finding and renting homes. Explore a wide range of properties tailored to your needs. Secure, easy, and fast house renting.'} />
        <meta name="keywords" content="house renting, home rental, Rent-House, property rental, apartment renting, find homes, secure renting, trusted rental service" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={title ? `${title} | Rent-House®` : 'Rent-House® - Find Your Perfect Home'} />
        <meta property="og:description" content={description || 'Explore a wide range of properties with Rent-House®. Your trusted platform for secure and easy house renting.'} />
        <meta property="og:image" content={image || 'https://www.rent-house.com/og-image.jpg'} />
        <meta property="og:url" content={url || 'https://www.rent-house.com'} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title ? `${title} | Rent-House®` : 'Rent-House® - Find Your Perfect Home'} />
        <meta name="twitter:description" content={description || 'Explore a wide range of properties with Rent-House®. Your trusted platform for secure and easy house renting.'} />
        <meta name="twitter:image" content={image || 'https://www.rent-house.com/og-image.jpg'} />
        <meta name="twitter:url" content={url || 'https://www.rent-house.com'} />

        {/* Additional meta tags */}
        {meta}
      </Head>

      <div ref={ref} {...other} className="w-full">
        {children}
      </div>
    </>
  )
);

Page.displayName = 'Page';

export default Page;
