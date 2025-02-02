import { NextStudio } from "next-sanity/studio";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import config from "../../../../../sanity.config";

export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  const session = await auth();
  const user = session?.user as Auth.User;

  // Jika tidak ada session atau bukan admin, tampilkan 404
  if (!user || user.role !== "admin") {
    return notFound();
  }

  return <NextStudio config={config} />;
}