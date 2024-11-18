"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { MdDelete } from "react-icons/md";
import { MenuIcon, PenTool } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard({ car }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleDeletePost = async (id) => {
    try {
      const res = await fetch(`/api/deleteCar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="rounded-md border relative shadow-xl hover:scale-[1.025] transition-all hover:bg-muted ease-in-out duration-500 flex flex-col gap-4 p-4">
      {car.createdBy === user?._id && (
        <div className="absolute right-0 top-0 z-10 bg-white rounded-full shadow-xl border m-1">
          <Popover>
            <PopoverTrigger
              asChild
              className="hover:bg-gray-200 hover:text-black p-2 rounded-full"
            >
              <MenuIcon size={30} />
            </PopoverTrigger>
            <PopoverContent sideOffset={2} align={"end"} className="w-fit p-2">
              <div className="flex text-sm flex-col gap-2 w-fit">
                <Button
                  variant="secondary"
                  onClick={() => handleDeletePost(car._id)}
                  className="flex items-center h-fit gap-1 justify-start hover:bg-red-100 hover:text-red-500"
                >
                  <MdDelete color="red" />
                  <p className="text-xs font-bold">Delete</p>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/product/${car._id}/edit`)}
                  className="flex items-center h-fit gap-2 justify-star hover:bg-green-100 hover:text-emerald-600"
                >
                  <PenTool color="green" />{" "}
                  <p className="text-xs font-bold">Edit</p>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
      <Link href={`/product/${car._id}`}>
        <div>
          <Image
            src={car.images[0] || "https://picsum.photos/200/300"}
            alt={car.title}
            width={300}
            height={100}
            className="object-cover w-full h-[300px] rounded-md drop-shadow-md"
          />
          <div className="flex flex-col items-start justify-between w-full h-full gap-2 ml-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              {car.title}
            </h2>
            <blockquote className="mt-2 border-l-2 pl-6 italic line-clamp-5">
              {car.description}
            </blockquote>
          </div>
        </div>
      </Link>
    </div>
  );
}
