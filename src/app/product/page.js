"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCars(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchCars = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://server-vczs.onrender.com/api/getAllCars?search=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        setCars(data.data.cars);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 sm:p-10 lg:p-16 flex-col flex gap-5">
      <h1 className="text-2xl font-bold">Product List</h1>
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by title or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      )}

      {!loading && cars.length > 0 && (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {cars.map((car) => (
            <ProductCard key={car._id} car={car} />
          ))}
        </div>
      )}

      {!loading && cars.length === 0 && <p>No cars found.</p>}
    </div>
  );
}
