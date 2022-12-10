import { createContext, useState, ReactNode } from "react";

type LoginContextType = {
  membership: boolean;
  setMembership: React.Dispatch<React.SetStateAction<boolean>>;
};
type Props = {
  children: ReactNode;
};

export const LoginContext = createContext<LoginContextType>(
  {} as LoginContextType
);

export const LoginProvider: React.FC<Props> = ({ children }) => {
  const [membership, setMembership] = useState<boolean>(false);

  const value = {
    membership,
    setMembership,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
