import React, { createContext, useContext } from "react";

interface HomeProps {
  children: React.ReactNode;
  data: Page.Home;
  servedProducts: Product.ProductAttributes[];
}

export type HomeContextProps = Omit<HomeProps, "children">;

const HomeContext = createContext<HomeContextProps>({} as HomeContextProps);

export default function HomeProvider({
  children,
  data,
  servedProducts,
}: HomeProps) {
  return (
    <HomeContext.Provider value={{ data, servedProducts }}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeData = () => useContext(HomeContext);
