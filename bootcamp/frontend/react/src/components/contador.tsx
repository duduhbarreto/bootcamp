import { useEffect, useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);
  const [dobro, setDobro] = useState(0);

  function incrementar() {
    setContador(contador + 1);
  }

  function dobrar() {
    setDobro(contador * 2);
  }

  function buscarDadosIniciaisDoContador() {
    // Simula uma chamada a uma API
    // Retorna o valor do contador
    return 0;
  }

  // Executa apenas uma vez quando o componente é montado
  useEffect(() => {
    setContador(buscarDadosIniciaisDoContador());
  }, []);

  // Executa sempre que o contador muda e o dobro também
  useEffect(() => {
    console.log("contador: ", contador);
    console.log("dobro: ", dobro);
  }, [contador, dobro]);

  return (
    <>
      <div>
        <div>Contador: {contador}</div>
        <button onClick={incrementar}>Incrementar</button>
        <button onClick={dobrar}>Dobro do contador</button>
        <div>Contador2: {dobro}</div>
      </div>
    </>
  );
}

export default Contador;
