import useAuth from "../hooks/useAuth";
import useContador from "../hooks/useContador";

function ContadorHook2() {
  const { user, login } = useAuth();
  const { contador, incrementar, decrementar } = useContador();

  console.log("ContadorHook2: ", user);

  return (
    <div>
      {user && <p>Usuário: {user.name}</p>}
      <button onClick={login}>Login</button>

      <div>
        <div>Contador: {contador}</div>
        <button onClick={incrementar}>Incrementar</button>
        <button onClick={decrementar}>Decrementar</button>
      </div>
    </div>
  );
}

export default ContadorHook2;
