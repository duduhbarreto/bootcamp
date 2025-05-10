interface Props {
  user: string;
}

function User({ user }: Props) {
  return <h2>{user}</h2>;
}

export default User;

// import { useEffect, useState } from "react";

// function Usuario() {
//   const [nomeUsuario, setNomeUsuario] = useState(null);
//   const [contador, setContador] = useState(1);

//   function carregarUsuario() {
//     if (contador % 2 === 0) {
//       console.log("Carregando usuário...", contador);

//       fetch(`https://jsonplaceholder.typicode.com/users/${contador}`)
//         .then((response) => response.json())
//         .then((data) => setNomeUsuario(data.name));
//     }

//     if (contador <= 10) {
//       setTimeout(() => {
//         setContador((prevContador) => prevContador + 1);
//       }, 2000);
//     }
//   }

//   useEffect(carregarUsuario, [contador]);

//   return <div>{nomeUsuario ? <p>{nomeUsuario}</p> : <p>Carregando...</p>}</div>;
// }

// export default Usuario;
