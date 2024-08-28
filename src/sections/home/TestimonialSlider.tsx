"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Rating from "@/components/Rating";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export default function TestimonialSlider() {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    // Set count and current when API is initialized
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    // Cleanup to avoid memory leaks
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const handleSetActive = (index: number) => api?.scrollTo(index);

  return (
    <div className="w-full bg-slate-100 md:h-[80vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-8xl mx-auto px-4 py-8">
        <div className="w-full flex items-center justify-center flex-col gap-2 mb-6">
          <h2 className="text-xs uppercase text-primary font-medium text-center">
            Hear from our
          </h2>
          <h1 className="text-2xl md:text-3xl md:font-bold capitalize font-semibold text-center">
            Happy Home Owners!
          </h1>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          setApi={setApi} // Set the API using the setApi function
        >
          <div className="w-full h-full flex items-center justify-center">
          <div className="absolute hidden md:flex left-0 top-0 h-full w-[35%] bg-gradient-to-r from-slate-100 via-slate-100/0 to-transparent dark:from-background dark:via-background/0 z-10" />
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className={` md:pl-4 md:basis-1/3 md:flex-[0_0_50%]`}>
                <div className="p-1">
                  <Testimonial key={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute hidden md:flex right-0 top-0 h-full w-[35%] bg-gradient-to-l from-slate-100 via-slate-100/0 to-transparent dark:from-background dark:via-background/0 z-10" />
          </div>

          <div className="flex items-center justify-center pt-8 gap-1 w-full">
            <CarouselPrevious variant="ghost" />
            <div className="w-fit flex items-center gap-1">
              {Array.from({ length: count }).map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => handleSetActive(index)}
                  active={index + 1 === current}
                />
              ))}
            </div>
            <CarouselNext variant="ghost" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

const Testimonial = () => {
  return (
    <div className="w-full p-3 md:p-6 rounded-lg flex bg-white h-64 justify-between border flex-col items-start gap-3">
      <Rating />
      <p className="text-muted-foreground text-[11px]">
        Arcu ac tortor dignissim convallis aenean et tortor at.Ac turpis egestas
        sed tempus urna et. Quisque eu pellentesque erat, eget bibendum ipsum.
        Cras euismod massa sed lacus lacinia, quis porta libero consectetur. In
        pulvinar lobortis eros vitae dapibus. Vestibu Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dolore.
      </p>

      <div className="w-fit mx-auto flex items-center gap-1 md:gap-2">
        <Image
          src={
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="image"
          width={200}
          height={200}
          className="w-8 h-8 md:w-10 md:h-10 rounded-sm object-cover"
        />
        <div className="flex flex-col items-start">
          <h4 className="text-[11px] capitalize font-semibold">melanin king</h4>
          <h5 className="text-[10px] text-muted-foreground lowercase">
            photographer
          </h5>
        </div>
      </div>
    </div>
  );
};

const DotButton = ({
  onClick,
  active,
}: {
  onClick: () => void;
  active: boolean;
}) => {
  return (
    <button
      className={cn("w-1 h-1 md:w-2 md:h-2 rounded-full bg-gray-400", {
        "bg-primary": active,
      })}
      onClick={onClick}
    />
  );
};
