"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProducts } from "./Provider";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const { setProducts, initProducts } = useProducts();
  const [sortBy, setSortBy] = useState<General.SortOption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi utilitas untuk sorting
  const sortProducts = (
    products: Product.ProductAttributes[],
    sortBy: General.SortOption[]
  ): Product.ProductAttributes[] => {
    const sorted = [...products];
    sortBy.forEach((sortOption) => {
      switch (sortOption.value) {
        case "abjad":
          sorted.sort((a, b) =>
            sortOption.order === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          );
          break;
        case "harga":
          sorted.sort((a, b) =>
            sortOption.order === "asc" ? a.price - b.price : b.price - a.price
          );
          break;
        case "ketersediaan":
          sorted.sort((a, b) =>
            sortOption.order === "asc"
              ? Number(b.isAvailable) - Number(a.isAvailable)
              : Number(a.isAvailable) - Number(b.isAvailable)
          );
          break;
        default:
          break;
      }
    });
    return sorted;
  };

  // Efek untuk melakukan filter dan sorting
  useEffect(() => {
    let filteredProducts = [...initProducts];

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sortedProducts = sortProducts(filteredProducts, sortBy);
    setProducts(sortedProducts);
  }, [searchTerm, sortBy, initProducts, setProducts]);

  // Handler untuk input nama
  const inputNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handler untuk sorting
  const sortHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const value = target.dataset.sortBy as General.SortOption["value"];
    const order = target.value as General.SortOption["order"];

    // Validasi value yang diizinkan
    const validValue: General.SortOption["value"][] = [
      "abjad",
      "harga",
      "ketersediaan",
    ];
    if (!validValue.includes(value)) return;

    const isNotDuplicate = !sortBy.some((sort) => sort.value === value);

    if (isNotDuplicate) {
      setSortBy([...sortBy, { value, order }]);
    } else {
      const updatedSortBy = sortBy.map((sort) =>
        sort.value === value ? { ...sort, order } : sort
      );
      setSortBy(updatedSortBy);
    }
  };

  // Fungsi untuk memeriksa apakah sorting aktif
  const isActive = (value: string, order: string) =>
    sortBy.some((sort) => sort.value === value && sort.order === order);

  // Handler untuk reset ke default
  const resetHandler = () => {
    setSearchTerm("");
    setSortBy([]);
    setProducts(initProducts);
  };

  return (
    <ScrollArea className="p-4 border-2 border-double rounded-xl border-slate-500">
      <Input placeholder="Cari Produk..." value={searchTerm} onChange={inputNameHandler} />

      <div>
        <h3 className="font-sans">Urut Berdasarkan :</h3>

        <div>
          <h4 className="font-sans">Harga :</h4>
          <RadioGroup className="flex justify-center gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                data-sort-by="harga"
                value="asc"
                id="termurah"
                checked={isActive("harga", "asc")}
                onClick={sortHandler}
              />
              <Label
                htmlFor="termurah"
                className={`${
                  isActive("harga", "asc") ? "text-blue-500 font-bold" : ""
                }`}
              >
                Termurah
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                data-sort-by="harga"
                value="desc"
                id="termahal"
                checked={isActive("harga", "desc")}
                onClick={sortHandler}
              />
              <Label
                htmlFor="termahal"
                className={`${
                  isActive("harga", "desc") ? "text-blue-500 font-bold" : ""
                }`}
              >
                Termahal
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h4 className="font-sans">Abjad :</h4>
          <RadioGroup className="flex justify-center gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                data-sort-by="abjad"
                value="asc"
                id="a-z"
                checked={isActive("abjad", "asc")}
                onClick={sortHandler}
              />
              <Label
                htmlFor="a-z"
                className={`${
                  isActive("abjad", "asc") ? "text-blue-500 font-bold" : ""
                }`}
              >
                A-Z
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                data-sort-by="abjad"
                value="desc"
                id="z-a"
                checked={isActive("abjad", "desc")}
                onClick={sortHandler}
              />
              <Label
                htmlFor="z-a"
                className={`${
                  isActive("abjad", "desc") ? "text-blue-500 font-bold" : ""
                }`}
              >
                Z-A
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={resetHandler} variant="secondary" className="w-full">
          Default
        </Button>
      </div>
    </ScrollArea>
  );
}