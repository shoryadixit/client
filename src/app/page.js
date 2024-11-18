import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const res = await fetch("https://server-vczs.onrender.com/api/getAllCars", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await res.json();
  return (
    <div>
      <main>
        <Banner images={data.carImages} />
      </main>
      <div className="p-10 flex flex-col gap-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {`All Car's`}
        </h1>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {data.cars.map((car) => (
            <ProductCard key={car._id} car={car} />
          ))}
          {data.cars.length === 10 ? (
            <Link href={"/product"} className="group">
              <div className="p-2 rounded-md text-4xl flex h-full gap-2 font-semibold border items-center justify-center">
                See More{" "}
                <MoveRightIcon className="group-hover:ml-4 transition-all ease-in-out duration-500" />
              </div>
            </Link>
          ) : (
            data.cars.length === 0 && (
              <p>
                <span className="text-2xl font-semibold">No More Cars</span>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
