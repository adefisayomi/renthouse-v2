import { ReactNode } from "react";
import Layout from ".";
import Image from "next/image";
import BreadcrumbHeader from "@/components/Breadcrumbs";

interface CustomLayoutProps {
  title: string;
  children: ReactNode;
  bgImage: string;
}

export default function LayoutWithImageHeader({ title, children, bgImage }: CustomLayoutProps) {
  return (
    <Layout>
      <div className="dark:bg-background bg-[#fbfcfe] relative">
        <header className="w-full flex items-center justify-center h-72 md:h-96 flex-col gap-4 relative">
          <Image
            src={bgImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
          <h1 className="text-4xl capitalize text-center font-semibold z-10 text-white cursor-default ">{title}</h1>
          <div className="z-10">
            <BreadcrumbHeader className="text-white " />
          </div>
        </header>

        <div className="w-full min-h-screen flex flex-col">
          {children}
        </div>
      </div>
    </Layout>
  );
}
