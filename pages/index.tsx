import { _properties } from "@/_data/images";
import Page from "@/components/page";
import LayoutWithImageHeader from "@/src/layout/layoutWithImageHeader";
import HomeGallery from "@/src/sections/home/HomeGallery";
import TestimonialSlider from "@/src/sections/home/TestimonialSlider";
import WhyChooseUs from "@/src/sections/home/WhyChooseUs";
import SingleProperty from "@/src/sections/property/singleProperty";
import { HomeSearchBox } from "@/src/sections/SearchForms/HomeSearchBox";
import { ReactNode } from "react";

export default function Home() {
  return (
    <Page>
      <div className="w-full grow">
      <div className="w-full mx-auto md:absolute md:top-64 relative z-20 -top-[70px]">
        <HomeSearchBox />
      </div>

      <div className="w-full bg-[#edefff] px-2 py-8 md:py-20 md:h-screen flex flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-3 mb-6 md:mb-8">
          <p className="text-xs font-medium uppercase text-primary text-center">explore properties</p>
          <h2 className="text-xl md:text-3xl capitalize font-bold text-center">confort living solution</h2>
        </div>

        <div className="w-full grid md:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {
            Array.from({length: 4}).map((_, index) => (
              <SingleProperty key={index} />
            ))
          }
        </div>
      </div>

      <div className="w-full flex flex-col">
        <HomeGallery images={_properties.map((_) => _.image)} />
        <WhyChooseUs />
        <TestimonialSlider />
      </div>
    </div>
    </Page>
  );
}

Home.getLayout = (page: ReactNode) => (
  <LayoutWithImageHeader
    title="Property Listing"
    bgImage={_properties[0].image}
  >
    {page}
  </LayoutWithImageHeader>
)