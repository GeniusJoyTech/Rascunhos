import React, { useState } from "react";

export default function Menu({ setJson }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddValue = (e) => {
    e.preventDefault();

    
    setJson({
        tarefa: inputValue,
        dep: "selecione",
        atv: "selecione",
        resp: "selecione",
        board: "todo",
      },
    );

    setInputValue("");
  };

  return (
    <form onSubmit={handleAddValue} style={{ padding: "16px", display:"flex" }}>
      <textarea
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite o nome da tarefa"
        style={{
          padding: "8px",
          marginRight: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button type="submit" style={{maxHeight: "100px"}}>Adicionar descrição da tarefa Tarefa</button>
    </form>
  );
}
