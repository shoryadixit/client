"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "./ui/extension/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Banner({ images }) {
  return (
    <div>
      {images.length === 0 ? (
        <div className="h-[60vh] bg-muted flex items-center justify-center rounded-md border border-dashed m-4">
          <Button
            asChild
            variant="secondary"
            className="shadow-lg border border-dashed hover:scale-[1.02]"
          >
            <Link href="/product/create">
              <h1 className="text-lg font-bold">Add Car..</h1>
            </Link>
          </Button>
        </div>
      ) : (
        <Carousel
          plugins={[
            AutoScroll({
              speed: 1.3,
            }),
          ]}
          carouselOptions={{
            loop: true,
          }}
        >
          <div className="relative w-full">
            <CarouselMainContainer className="h-[80vh]">
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <SliderMainItem key={index} className="bg-transparent">
                    <div className="relative overflow-hidden outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background">
                      <Image
                        src={image}
                        alt="Your alt text"
                        fill
                        className="embla__slide__img object-cover"
                      />
                    </div>
                  </SliderMainItem>
                ))}
            </CarouselMainContainer>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <CarouselThumbsContainer className="gap-x-1 ">
                {Array.isArray(images) &&
                  images.map((_, index) => (
                    <CarouselIndicator key={index} index={index} />
                  ))}
              </CarouselThumbsContainer>
            </div>
          </div>
        </Carousel>
      )}
    </div>
  );
}
