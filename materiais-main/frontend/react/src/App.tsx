// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import ContadorHook from "./components/contador-hook";
import ContadorHook2 from "./components/contador-hook-2";
import { AuthProvider } from "./contexts/auth";
// import Mensagem from "./components/mensagem";
// import ListaFrutas from "./components/lista-frutas";
// import Contador from "./components/contador";
// import Usuario from "./components/usuario";
// import ContadorHook from "./components/contador-hook";
// import ContadorHook2 from "./components/contador-hook-2";
// import Home from "./pages";

function App() {
  return (
    <AuthProvider>
      <ContadorHook />
      <ContadorHook2 />
    </AuthProvider>
  );

  // return <Home />;

  // const [count, setCount] = useState(0);

  // const message = "Outra mensagem!";
  // const message2 = "Olá, React!";

  // return (
  //   <>
  //     <Mensagem mensagem={message} user={"Tiago"} />

  //     {/*
  //     <form action="">
  //       <input
  //         type="text"
  //         onChange={(event) => {
  //           console.log(event.target.value);
  //         }}
  //       />
  //     </form>

  //      */}

  //     {/* <ListaFrutas /> */}

  //     {/* <Usuario />

  //     <Contador /> */}

  //     <ContadorHook />
  //     <ContadorHook2 />

  //     {/* <Mensagem mensagem="Olá, React!" /> */}
  //   </>
  // );

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // );
}

export default App;
