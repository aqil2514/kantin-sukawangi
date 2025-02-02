"use client";
import { createContext, useContext } from "react";

interface AboutContextPage {
  children: React.ReactNode;
  staticData: Page.AboutUs;
}

type AboutContextProps = Omit<AboutContextPage, "children">;

const AboutContext = createContext<AboutContextProps>({} as AboutContextProps);

export default function AboutProvider({
  children,
  staticData,
}: AboutContextPage) {
  const value: AboutContextProps = {
    staticData,
  };

  return (
    <AboutContext.Provider value={value}>{children}</AboutContext.Provider>
  );
}

export const useAboutContext = () => useContext(AboutContext);
