import Container from "@/components/Layouts/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function Contact({
  staticData,
}: {
  staticData: Page.ContactPage;
}) {
  const {
    title,
    description,
    address,
    phone,
    emails,
    map,
    socialMedia,
    googleMap,
  } = staticData;

  return (
    <Container
      type="main"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 py-10"
    >
      <div className="flex flex-col space-y-8">
        {/* Peta (Google Maps Embed) */}
        {map ? (
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
            {/* TODO : Peta google map ga muncul. Fix nanti */}
            {googleMap && (
              <Link href={googleMap} target="_blank">
                <Button className="mt-4 text-white bg-blue-600 hover:bg-blue-800 transition duration-300 flex gap-2">
                  <FaMapMarkedAlt />
                  Lihat di Google Maps
                </Button>
              </Link>
            )}
          </section>
        ) : (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Lokasi Kami</h2>
            <p className="mt-4 text-gray-600">Belum Ditambahkan</p>
          </section>
        )}
      </div>

      <div className="flex flex-col space-y-8 bg-white shadow-lg px-4 pb-4">
        <section className="text-center my-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {title || "Belum Ditambahkan"}
          </h1>
          <p className="text-lg text-gray-600">
            {description || "Slogan Belum Ditambahkan"}
          </p>
        </section>

        {/* Alamat dan Nomor Telepon */}
        <section className="mt-8 space-y-6">
          <div className="text-lg text-gray-700">
            <h2 className="font-semibold text-2xl">Alamat</h2>
            <p className="mt-2">{address || "Belum Ditambahkan"}</p>
          </div>

          <div className="text-lg text-gray-700">
            <h2 className="font-semibold text-2xl">Nomor Telepon</h2>
            <p className="mt-2">{phone || "Nomor Telepon Belum Ditambahkan"}</p>
            {phone && (
              <Link href={`https://wa.me/${phone}`} target="_blank">
                <Button className="mt-4 text-white bg-green-600 hover:bg-green-800 transition duration-300">
                  Hubungi via WhatsApp
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Email */}
        {emails && emails.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Email</h2>
            <ul className="list-none mt-4 space-y-2">
              {emails.map((email, index) => (
                <li key={index} className="text-lg text-gray-700">
                  {email.email || "Belum Ditambahkan"}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Media Sosial */}
        {socialMedia && socialMedia.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Ikuti Kami</h2>
            <ul className="flex flex-wrap gap-6 mt-4">
              {socialMedia.map((social, index) => (
                <li key={index} className="text-lg text-gray-700">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Ikuti Kami</h2>
            <p className="mt-4 text-gray-600">Social Media Belum Ditambahkan</p>
          </section>
        )}
      </div>
    </Container>
  );
}
