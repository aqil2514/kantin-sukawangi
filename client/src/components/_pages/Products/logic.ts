import { useState, useEffect } from "react";
import { useProducts } from "./Provider";

export const useProductFilter = () => {
  const { setProducts, initProducts } = useProducts();
  const [sortBy, setSortBy] = useState<General.SortOption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi utilitas untuk sorting produk
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

  //TODO : Ada bug di sekitar sini. Jadi, kalo filter dan sort aktif dan terjadi event, semua sort dan filter hilang

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

  return {
    searchTerm,
    sortBy,
    inputNameHandler,
    sortHandler,
    isActive,
    resetHandler,
  };
};
