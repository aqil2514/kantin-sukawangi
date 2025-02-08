import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useContactData } from "./Provider";

export default function GoogleMaps() {
  const { staticData } = useContactData();
  const { map, googleMap } = staticData;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800">Lokasi Kami</h2>
      <div className="mt-4">
        <iframe
          width="100%"
          height="400"
          src={map}
          frameBorder="0"
          allowFullScreen
          className="rounded-lg shadow-lg"
        />
      </div>
      {googleMap && (
        <Link href={googleMap} target="_blank">
          <Button className="mt-4 text-white bg-blue-600 hover:bg-blue-800 transition duration-300 flex gap-2">
            <FaMapMarkedAlt />
            Lihat di Google Maps
          </Button>
        </Link>
      )}
    </section>
  );
}
