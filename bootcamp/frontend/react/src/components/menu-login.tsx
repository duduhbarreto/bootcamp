import User from "./usuario";
import useUser from "../hooks/useUser";

function MenuLogin() {
  const { user } = useUser();

  fetch("", {
    headers: {
      Authorization: `Bearer ${user.jwtToken}`,
    },
  });

  return user ? <User user={user.name} /> : <a href="/login">Login</a>;
}

export default MenuLogin;
