import ProductsLists from "./_ProductsList";
import Sidebar from "./_Sidebar";

export default function Products() {
  return (
    <div className="px-4 pt-36 pb-12 grid grid-cols-[20%_auto] h-screen">
      <Sidebar />
      <ProductsLists />
    </div>
  );
}
