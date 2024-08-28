import { _properties } from "@/_data/images";
import Page from "@/components/page";
import LayoutWithImageHeader from "@/src/layout/layoutWithImageHeader";
import GlobalProperties from "@/src/sections/about-us/GlobalProperties";
import SignatureFeature from "@/src/sections/about-us/SignatureFeature";
import HomeGallery from "@/src/sections/home/HomeGallery";
import TestimonialSlider from "@/src/sections/home/TestimonialSlider";
import { ReactNode } from "react";

export default function AboutUs() {
  return (
    <Page title='About Us'>
      <div className=" w-full grow">
        <div className="w-full bg-[#e9ebfc]">
          <GlobalProperties />
          <SignatureFeature />
          <HomeGallery images={_properties.map((_) => _.image)} />
          <TestimonialSlider />
        </div>
      </div>
      </Page>
  );
}

AboutUs.getLayout = (page: ReactNode) => (
    <LayoutWithImageHeader
        title="About Us"
        bgImage={_properties[1].image}
    >
        {page}
    </LayoutWithImageHeader>
)
