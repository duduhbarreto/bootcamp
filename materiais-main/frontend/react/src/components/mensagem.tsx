import MenuLogin from "./menu-login";

interface Props {
  mensagem: string;
}

function Mensagem({ mensagem }: Props) {
  return (
    <div>
      <h1>{mensagem}</h1>
      <MenuLogin />
    </div>
  );
}

export default Mensagem;

// // function Container({ mensagem, children }) {
// //   return (
// //     <div className="text-red-100 bg-red-500">
// //       {children}
// //       <h1>{mensagem}</h1>
// //     </div>
// //   );
// // }

// function Mensagem({ mensagem, user }) {
//   // if (user) {
//   //   return (
//   //     <div className="text-red-100 bg-red-500 flex">
//   //       <h2>{user}</h2>
//   //       <h1>{mensagem}</h1>
//   //     </div>
//   //   );
//   // }

//   // if (user2) {
//   //   return (
//   //     <div className="text-red-100 bg-red-500 flex">
//   //       <h2>{user2}</h2>
//   //       <h1>{mensagem}</h1>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="text-red-100 bg-red-500 flex">
//       <h2>{user ?? "Visitante"}</h2>
//       <h1>{mensagem}</h1>

//       {/* {(mensagem || user) && <h2>{user || mensagem}</h2>} */}
//       {/* <h1>{mensagem}</h1> */}
//     </div>
//   );
// }

// export default Mensagem;
