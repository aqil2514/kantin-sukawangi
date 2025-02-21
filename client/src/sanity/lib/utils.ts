import { getSession } from "next-auth/react";

export const getUserName = async () => {
  const session = await getSession();
  const user = session?.user as Auth.User;
  return user?.name || "Anonymous";
};