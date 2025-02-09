import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface ProductsItemProps {
  product: Product.ProductAttributes;
  selectedProduct?: General.CartItem;
}

export default function ProductsItem({
  product,
  selectedProduct,
}: ProductsItemProps) {
  const { addToCart, decreaseCartItem, increaseCartItem } = useCartStore();

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Product Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="auto"
          className={`hover:scale-110 transition-transform duration-300 object-cover ${
            product.isAvailable ? "opacity-100" : "opacity-50"
          }`}
        />
      </div>

      {/* Product Name */}
      <p className="mt-2 text-center text-sm font-semibold text-gray-800 line-clamp-1">
        {product.name}
      </p>

      {/* Price and Button */}
      <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
        <p className="text-sm font-semibold text-green-600 flex-1">
          {formatCurrency(product.price)}
        </p>
        {selectedProduct ? (
          <div className="flex gap-2">
            <Button
              variant={"destructive"}
              onClick={() => decreaseCartItem(String(product.id))}
              aria-label="Decrease quantity"
            >
              <FaAngleDown />
            </Button>

            <p className="my-auto">{selectedProduct.quantity}</p>

            <Button
              variant={"destructive"}
              onClick={() => increaseCartItem(String(product.id))}
              aria-label="Increase quantity"
            >
              <FaAngleUp />
            </Button>
          </div>
        ) : (
          <Button
            variant="destructive"
            className="text-sm w-full sm:w-auto"
            onClick={() => addToCart(product)}
            disabled={!product.isAvailable}
            aria-label={product.isAvailable ? "Add to cart" : "Out of stock"}
          >
            {product.isAvailable ? "+ Keranjang" : "Stok Habis"}
          </Button>
        )}
      </div>
    </div>
  );
}
