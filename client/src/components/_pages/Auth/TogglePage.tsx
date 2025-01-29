import { useRouter } from "next/navigation";
import { ActivePage, useAuthContext } from "./Provider";

export default function TogglePage() {
  const { setActivePage, activePage } = useAuthContext();
  const router = useRouter();

  const isLogin = activePage === "login";

  const toggleHandler = (value: ActivePage) => {
    setActivePage(value);
    router.replace("/auth?page=" + value);
  };

  return (
    <div className={`flex ${isLogin ? "justify-start": "justify-end"}`}>
    <div className="relative w-40 mt-4 bg-indigo-600 rounded-xl overflow-hidden">
      {/* Background transition */}
      <div
        className={`absolute duration-500 transition-transform ${
          isLogin ? "translate-x-[90px]" : "translate-x-[-68px]"
        } inset-0 bg-indigo-700`}
      />
      {/* Text for Login and Register */}
      <div className="flex justify-around px-4 py-2 rounded-xl relative">
        <div
          onClick={() => toggleHandler("register")}
          role="button"
          className="text-white font-bold font-macondo cursor-pointer"
        >
          Register
        </div>
        <div
          onClick={() => toggleHandler("login")}
          role="button"
          className="text-white font-bold font-macondo cursor-pointer"
        >
          Login
        </div>
      </div>
    </div>
    </div>
  );
}
