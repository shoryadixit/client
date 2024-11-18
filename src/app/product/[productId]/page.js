import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/ui/extension/carousel";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Page({ params }) {
  const authToken = (await cookies()).get("connect.sid");
  const slug = (await params).productId;
  const res = await fetch(`http://localhost:8080/api/getCar/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${authToken.name}=${authToken.value}`,
    },
    credentials: "include",
  });
  const { data: car } = await res.json();

  console.log(car);

  return (
    <div className="flex items-center h-[80vh] justify-center gap-10">
      <div className="max-w-lg">
        {car.images.length > 0 ? (
          <Carousel>
            <CarouselNext className="top-1/3 -translate-y-1/3" />
            <CarouselPrevious className="top-1/3 -translate-y-1/3" />
            <CarouselMainContainer className="h-[450px]">
              {Array.isArray(car.images) &&
                car.images.map((image, index) => (
                  <SliderMainItem key={index} className="bg-transparent">
                    <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background overflow-hidden">
                      <Image src={image} alt="car" width={500} height={500} />
                    </div>
                  </SliderMainItem>
                ))}
            </CarouselMainContainer>
            <CarouselThumbsContainer>
              {Array.isArray(car.images) &&
                car.images.map((image, index) => (
                  <SliderThumbItem
                    key={index}
                    index={index}
                    className="bg-transparent"
                  >
                    <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background overflow-hidden">
                      <Image src={image} alt="car" width={500} height={500} />
                    </div>
                  </SliderThumbItem>
                ))}
            </CarouselThumbsContainer>
          </Carousel>
        ) : (
          <div className="h-60 w-60 bg-gray-200 rounded-xl flex items-center justify-center">
            <p>No Images</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-center gap-2 ml-4 max-w-lg">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {car?.title}
        </h2>
        <blockquote className="mt-2 border-l-2 pl-6 italic">
          {car?.description}
        </blockquote>
      </div>
    </div>
  );
}
