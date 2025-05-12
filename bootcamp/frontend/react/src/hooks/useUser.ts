import { useContext } from "react";
import { UserContext } from "../contexts/user";

function useUser() {
  return useContext(UserContext);
}

export default useUser;
