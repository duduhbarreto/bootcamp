import { useState } from "react";

function useContador() {
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador(contador + 1);
  }

  function decrementar() {
    setContador(contador - 1);
  }

  return {
    contador,
    incrementar,
    decrementar,
  };
}

export default useContador;
