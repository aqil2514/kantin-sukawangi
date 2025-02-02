import { auth } from "@/auth";
import Admin from "@/components/_pages/Admin";
import { notFound } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session) notFound();
  const user = session.user as Auth.User;

  if (user.role === "admin") return <Admin />;
}
