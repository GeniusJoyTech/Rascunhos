import React, { useState } from "react";

export default function Menu({ json, setJson }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddValue = (e) => {
    e.preventDefault();

    const ids = json.map((item) => item.id);
    const nextId = Math.max(0, ...ids) + 1;

    setJson([
      ...json,
      {
        id: nextId,
        tarefa: inputValue,
        dep: "selecione",
        atv: "selecione",
        resp: "selecione",
        board: "todo",
      },
    ]);

    setInputValue("");
  };

  return (
    <form onSubmit={handleAddValue} style={{ padding: "16px" }}>
      <input
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
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}
