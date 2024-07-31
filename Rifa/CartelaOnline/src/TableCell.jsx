import React from "react";

export default function TableCell({ tipo, texto, classe, id, estilo, click }) {
  const CellTag = tipo === "th" ? "th" : "td";
  return (
    <CellTag className={classe} id={id} style={estilo} onClick={click}>
      {texto}
    </CellTag>
  );
}
