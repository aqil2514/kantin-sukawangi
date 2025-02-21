import Image from "next/image";
import { useHomeData } from "./Provider";

export default function HeroSection() {
  const { data } = useHomeData();
  return (
    <div className="min-h-screen w-full bg-[url('/images/Section-Main.webp')] bg-center bg-cover grid grid-rows-[60%_auto] md:grid-rows-1 grid-cols-1 md:grid-cols-2">
      <div className="content-end justify-center flex-wrap flex">
        <div className="relative w-[256px] h-[256px] md:w-[512px] md:h-[512px]">
          <Image
            src={"/images/main-food.png"}
            fill
            sizes="auto"
            alt="Main Food"
            className="object-contain block mx-auto"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center px-8 -mt-28 md:mt-0 gap-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center md:text-right font-lora font-bold text-white">
          {data.companyName}
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl italic text-center md:text-right font-oswald text-white">
          {data.companyMotto}
        </h2>
      </div>
    </div>
  );
}
