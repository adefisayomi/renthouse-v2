import { _properties } from "@/_data/images";
import Page from "@/components/page";
import { Button } from "@/components/ui/button";
import LayoutWithImageHeader from "@/src/layout/layoutWithImageHeader";
import HomeFilterForm from "@/src/sections/filter/HomeFilterForm";
import SingleProperty from "@/src/sections/property/singleProperty";
import { HomeSearchBox } from "@/src/sections/SearchForms/HomeSearchBox";
import { ReactNode } from "react";

export default function Lisings () {
  return (
    <Page title="Browse all of our listings">
      <div className=" w-full grow bg-[#e9ebfc]">
        <div className="w-full mx-auto md:absolute md:top-64 relative z-20 -top-[70px]">
          <HomeSearchBox hideFilter />
        </div>

        <div className="w-full flex items-start  max-w-8xl mx-auto">
          <div className="w-full hidden md:block max-w-[300px] min-h-screen h-full bg-theme-dark">
            <HomeFilterForm />
            <PropertyNotFound />
          </div>

          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2  gap-4 px-2 md:px-8 py-8">
          {
            Array.from({length: 16}).map((_, index) => (
              <SingleProperty key={index} />
            ))
          }
        </div>
        </div>
      </div>
      </Page>
  );
}

Lisings.getLayout = (page: ReactNode) => (
    <LayoutWithImageHeader
        title="Property Listing"
        bgImage={_properties[0].image}
    >
        {page}
    </LayoutWithImageHeader>
)

const PropertyNotFound = () => {
  return (
    <div className="p-8 flex flex-col items-start pl-10 gap-2">
      <h2 className="text-lg text-left font-semibold text-white">Didn’t find what you <br /> are looking for?</h2>
      <p className="text-xs text-white">Let us know your specification and our team will reach out to assit.</p>
      <Button className="w-full h-12 mt-4">
        Get in Touch
      </Button>
    </div>
  )
}