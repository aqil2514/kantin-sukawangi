import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() {
  const session = useSession();
  const user = session.data?.user as Auth.User;

  const toTitleCase = (str: string) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="flex items-center gap-4 p-1 md:p-4 rounded-lg bg-gray-700 shadow-md hover:shadow-lg transition-shadow">
      <Image
        src={user.image as string}
        alt="User Image"
        width={50}
        height={50}
        className="rounded-full border border-gray-600"
      />
      <div>
        <p className="text-white text-xs lg:text-xs xl:text-sm font-medium">{user.name}</p>
        <p className="text-gray-400 text-xs lg:text-xs xl:text-sm">{toTitleCase(user.role as string)}</p>
      </div>
    </div>
  );
}
