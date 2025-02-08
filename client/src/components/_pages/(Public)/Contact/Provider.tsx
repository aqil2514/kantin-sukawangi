import { createContext, useContext } from "react";

interface ContactProviderProps {
  children: React.ReactNode;
  staticData: Page.ContactPage;
}

type ContactContextProps = Pick<ContactProviderProps, "staticData">;

const ContactContext = createContext<ContactContextProps>(
  {} as ContactContextProps
);

export default function ContactProvider({
  children,
  staticData,
}: ContactProviderProps) {
  const value: ContactContextProps = {
    staticData,
  };
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}

export const useContactData = () => useContext(ContactContext);
