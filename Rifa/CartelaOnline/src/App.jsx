import React from "react";
import NavBar from "./NavBar";
import TableCell from "./TableCell";
import ComprarNumero from "./ComprarNumero";

function App() {
  const data = {
    "headers": [],
    "rows": [
      ["Linha 1", "Dados 1", "Dados 2", "Dados 3", "Dados 1", "Dados 2", "Dados 3", "Dados 1", "Dados 2", "Dados 3"],
      ["Linha 1", "Dados 1", "Dados 2", "Dados 3", "Dados 1", "Dados 2", "Dados 3", "Dados 1", "Dados 2", "Dados 3"],
      ["Linha 1", "Dados 1", "Dados 2", "Dados 3", "Dados 1", "Dados 2", "Dados 3", "Dados 1", "Dados 2", "Dados 3"],
      ["Linha 2", "Dados 4", "Dados 5", "Dados 6", "Dados 1", "Dados 2", "Dados 3", "Dados 1", "Dados 2", "Dados 3"]
    ]
  }

  return (
    <>
      <NavBar />
      <ComprarNumero />
      {/* Aqui posso adicionar filtros. */}
      <table style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <TableCell key={index} tipo="th" texto={header} classe="" id={"th_" + index} estilo={{ border: "solid 1px #000", textAlign: "center" }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} tipo={"td"} texto={cell} classe="" id={"td_" + cellIndex} estilo={{ border: "solid 1px #000", textAlign: "center" }} click={() => { alert("olá Mundo") }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
