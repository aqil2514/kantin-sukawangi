import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActiveToolLayoutProps } from "sanity";

function CustomActiveToolLayout(props: ActiveToolLayoutProps) {
  return (
    <div className="h-screen p-6 sm:p-8 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-start mb-6 space-x-0 sm:space-x-4">
        <Link href={"/admin"}>
          <Button className="w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Admin Dashboard
          </Button>
        </Link>
        <Link href={"/"}>
          <Button className="w-full sm:w-auto mt-4 sm:mt-0 px-6 py-3 bg-transparent border-2 border-blue-600 text-blue-600 rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Home
          </Button>
        </Link>
      </div>
      <div className="w-full h-full max-w-4xl mx-auto">
        {props.renderDefault(props)}
      </div>
    </div>
  );
}

export default CustomActiveToolLayout;
