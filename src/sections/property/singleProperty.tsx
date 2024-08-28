"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Bath, BedDouble, Diamond, Sparkle, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { _properties } from "@/_data/images";


export default function SingleProperty () {
    return (
        <div className="w-full rounded-xl p-1 bg-white">

            <div className="w-full">
                <ImageSlider images={_properties.map((image) => image.image)} />
            </div>

            <div className="w-full flex flex-col items-start gap-2 px-2 py-3">
                <div className="w-full flex flex-col items-start gap-1">
                    <h3 className="scroll-m-20 text-sm capitalize font-semibold tracking-tight">
                    comform nest residence
                    </h3>
                    <p className="w-full flex items-center gap-2 text-muted-foreground text-xs ">
                        <MapPin className="w-4 text-primary" />
                        15, Admiralty Way, VI
                    </p>
                </div>

                <div className="w-full flex items-center gap-4">
                    <span className="flex items-center gap-2 text-[10px] capitalize text-muted-foreground">
                        <BedDouble className="w-4 text-primary" /> 5 Beds
                    </span>
                    <span className="flex items-center gap-2 text-[10px] capitalize text-muted-foreground">
                        <Bath className="w-4 text-primary" /> 5 bathrooms
                    </span>
                    <span className="flex items-center gap-2 text-[10px] lowercase text-muted-foreground">
                        <BedDouble className="w-4 text-primary" /> 8x10 m<sup className="-ml-2">2</sup>
                    </span>
                </div>
            </div>

            <div className="w-full flex items-center justify-between gap-2 px-2 py-3 border-t ">
                <h3 className="text-sm font-medium ">₦6,000,000 / <span className="text-[11px] text-muted-foreground">year</span></h3>
                <Button size='icon' className="rounded-full w-10 h-10" >
                    <ArrowRight className="w-4"/>
                </Button>
            </div>
        </div>
    )
}





export function ImageSlider ({images}: {images?: string[]}) {

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

    return (
        <Carousel setApi={setApi} className="w-full relative h-[200px] max-h-[200px] overflow-hidden rounded-xl">
            <div className="absolute w-fit left-0 p-3 rounded-xl items-center z-10">
                <Button size='sm' className="rounded-full flex items-center gap-2 text-xs">
                    <Sparkle className="w-4 " /> Popular
                </Button>
            </div>
            <div className="absolute w-fit right-0 p-3 rounded-xl items-center z-10">
                <div className="flex items-center gap-2">
                    <CarouselPrevious className="border-none"/>
                    <CarouselNext className="border-none"/>
                </div>
            </div>

            <div className="absolute w-fit right-0 bottom-0 p-3 rounded-xl items-center z-10">
                <Button size='icon' className="rounded-full bg-background hover:bg-slate-100 text-black" >
                    <Heart />
                </Button>
            </div>

            <CarouselContent className="rounded-xl">
                {
                    !images || images.length === 0 ? (
                        <CarouselItem>
                            <Skeleton className="w-full rounded-xl h-[200px]" />
                        </CarouselItem>
                    ) : (
                       images.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <img 
                                    src={image}
                                    alt='image'
                                    className="w-full h-full object-cover flex rounded-xl"
                                />
                              </div>
                            </CarouselItem>
                          ))
                    )
                }
            </CarouselContent>
        </Carousel>
    )
}
