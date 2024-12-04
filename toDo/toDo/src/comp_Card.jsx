import React, { useState } from "react";

export default function Card({
  tarefa,
  dep,
  atv,
  resp,
  edTarefa,
  edAtv,
  edDep,
  edResp,
  del,
  draggable,
  onDragStart,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const departamentos = ["selecione", "Marketing", "Suporte", "Gerência"];
  const atividades = ["selecione", "Planejamento", "Execução", "Análise"];
  const responsaveis = ["selecione", "João", "Maria", "Carlos", "Ana"];

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      style={{
        padding: "8px",
        margin: "8px 0",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "grab",
      }}
    >
      {isEditing ? (
        <>
          <label>Tarefa: </label>
          <input
            type="text"
            value={tarefa}
            onChange={edTarefa}
            style={{ marginBottom: "8px", width: "100%" }}
          />

          <label>Departamento: </label>
          <select
            value={dep}
            onChange={edDep}
            style={{ marginBottom: "8px", width: "100%" }}
          >
            {departamentos.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label>Atividade: </label>
          <select
            value={atv}
            onChange={edAtv}
            style={{ marginBottom: "8px", width: "100%" }}
          >
            {atividades.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label>Responsável: </label>
          <select
            value={resp}
            onChange={edResp}
            style={{ marginBottom: "8px", width: "100%" }}
          >
            {responsaveis.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <h4>{tarefa}</h4>
          <p>Departamento: {dep}</p>
          <p>Atividade: {atv}</p>
          <p>Responsável: {resp}</p>
        </>
      )}

      <div>
        <button onClick={toggleEditing}>
          {isEditing ? "Salvar" : "Editar"}
        </button>
        <button onClick={del}>Deletar</button>
      </div>
    </div>
  );
}
