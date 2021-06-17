import React from "react";
import Header from "@Components/Header";
import Main from "@Components/Main";
import Table from "@Components/Table";

// *worked
// Promise.resolve([
//   { link: "#", product: "orange", img: "orange.png" },
//   { link: "#", product: "lemon", img: "lemon.png" },
// ]).then((data) => console.log(data));
//* /worked
//? fetch output list products

const App = () => {
  return (
    <>
      <Header />
      <Main />
      <Table />
    </>
  );
};

export default App;
