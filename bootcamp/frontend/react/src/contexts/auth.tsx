import { createContext, PropsWithChildren, useState } from "react";

interface User {
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
});

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  function login() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
