import { createContext, ReactNode, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

const initialData = {
  name: "Tiago",
  jwtToken: localStorage.getItem("jwt-token"),
};

const UserContext = createContext({
  user: initialData,
  setJwtToken: (token: string) => {},
});

function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState(initialData);

  function setJwtToken(token: string) {
    localStorage.setItem("jwt-token", token);
    setUser((prev) => ({ ...prev, token }));
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setJwtToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
