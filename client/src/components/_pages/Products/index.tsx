import MobileSidebar from "./_MobileSidebar";
import ProductsLists from "./_ProductsList";
import Sidebar from "./_Sidebar";

export default function Products() {
  return (
    <div className="px-4 pt-36 pb-12 grid grid-cols-1 md:grid-cols-[0_20%_auto] h-screen">
      <MobileSidebar />
      <Sidebar />
      <ProductsLists />
    </div>
  );
}
