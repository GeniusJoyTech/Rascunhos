import React, { useState } from "react";
import Menu from "./comp_Menu";
import Board from "./comp_Col";

export default function App() {
  const [parentJson, setParentJson] = useState([
    { id: 1, tarefa: "Exemplo de tarefa", dep: "selecione", atv: "selecione", resp: "selecione", board: "todo" },
    { id: 2, tarefa: "Tarefa 2", dep: "teste", atv: "selecione", resp: "selecione", board: "doing" },
    { id: 3, tarefa: "Tarefa 3", dep: "selecione", atv: "selecione", resp: "selecione", board: "done" },
  ]);

  // Função para edição dos campos
  const handleEditTarefa = (id, newValue) => {
    setParentJson((prev) =>
      prev.map((item) => (item.id === id ? { ...item, tarefa: newValue } : item))
    );
  };

  const handleEditAtividade = (id, newValue) => {
    setParentJson((prev) =>
      prev.map((item) => (item.id === id ? { ...item, atv: newValue } : item))
    );
  };

  const handleEditDepartamento = (id, newValue) => {
    setParentJson((prev) =>
      prev.map((item) => (item.id === id ? { ...item, dep: newValue } : item))
    );
  };

  const handleEditResponsavel = (id, newValue) => {
    setParentJson((prev) =>
      prev.map((item) => (item.id === id ? { ...item, resp: newValue } : item))
    );
  };

  // Função para remover a tarefa pelo ID
  const handleDeleteTarefa = (id) => {
    setParentJson((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Função para alterar o board da tarefa ao arrastar e soltar
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData("cardId", cardId);
  };

  const handleDrop = (e, board) => {
    const cardId = e.dataTransfer.getData("cardId");
    setParentJson((prev) =>
      prev.map((card) =>
        card.id === parseInt(cardId) ? { ...card, board } : card
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const boards = {
    todo: "Iniciar",
    doing: "Em progresso",
    done: "Prontas",
  };

  return (
    <div>
      <Menu json={parentJson} setJson={setParentJson} />
      <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
        {Object.entries(boards).map(([boardKey, boardTitle]) => (
          <Board 
          boardKey={boardKey} boardTitle={boardTitle} handleDragOver={handleDragOver} parentJson={parentJson}
          handleDeleteTarefa={handleDeleteTarefa} handleDragStart={handleDragStart}
          handleDrop={handleDrop} handleEditAtividade={handleEditAtividade} handleEditDepartamento={handleEditDepartamento}
          handleEditResponsavel={handleEditResponsavel} handleEditTarefa={handleEditTarefa}                    
          />
        ))}
      </div>
    </div>
  );
}
