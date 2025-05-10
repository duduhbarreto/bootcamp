import Mensagem from "../components/mensagem";
import { UserProvider } from "../contexts/user";

export default function Home() {
  return (
    <UserProvider>
      <Mensagem mensagem={"Hello, world!"} />
    </UserProvider>
  );
}
