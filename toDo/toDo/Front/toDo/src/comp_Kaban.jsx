import React, { useState, useEffect } from "react";
import Menu from "./comp_Menu";
import Card from "./comp_Card";

const url = "http://192.168.0.24:3000/";

export default function App() {
  const [parentJson, setParentJson] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar carregamento
  const [error, setError] = useState(null); // Para lidar com erros

  // Busca as tarefas ao montar o componente
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await fetch(url + "tarefas");
        if (!response.ok) {
          throw new Error("Erro ao buscar tarefas");
        }
        const data = await response.json();
        setParentJson(data); // Atualiza o estado com as tarefas
      } catch (err) {
        setError(err.message); // Captura erros de requisição
      } finally {
        setLoading(false); // Carregamento concluído
      }
    };

    fetchTarefas();
  }, []);

  // Adiciona uma nova tarefa e atualiza o backend
  const handleAddTarefa = async (novaTarefa) => {
    try {
      const response = await fetch(url + "tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaTarefa),
      });
      console.log(novaTarefa);
      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa");
      }

      const createdTarefa = await response.json();
      setParentJson((prev) => [...prev, createdTarefa]); // Atualiza o estado com a nova tarefa
    } catch (err) {
      setError(err.message); // Captura erros de adição
    }
  };

  // Função de edição de tarefa
  const handleEditTarefa = async (updatedTarefa) => {
    // console.log(updatedTarefa);
    try {
      const response = await fetch(url + `tarefas/${updatedTarefa.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTarefa),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar tarefa");
      }

      const updated = await response.json();
      setParentJson((prev) =>
        prev.map((item) => (item.id === updatedTarefa.id ? updated : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para excluir tarefa
  const handleDeleteTarefa = async (id) => {
    try {
      const response = await fetch(url + `tarefas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir tarefa");
      }

      setParentJson((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

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
    doing: "Fazendo",
    done: "Pronta",
  };

  if (loading) {
    return <div>Carregando tarefas...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <Menu json={parentJson} setJson={handleAddTarefa} />
      <div style={{ display: "flex", gap: "16px", padding: "16px" }}>
        {Object.entries(boards).map(([boardKey, boardTitle]) => (
          <div
            key={boardKey}
            onDrop={(e) => handleDrop(e, boardKey)}
            onDragOver={handleDragOver}
            style={{
              flex: 1,
              padding: "16px",
              backgroundColor: "#f4f4f4",
              border: "1px solid #ccc",
              borderRadius: "8px",
              minHeight: "200px",
              maxHeight: "80vh",
              overflowY:"auto"
            }}
          >
            <h3>{boardTitle}</h3>
            {parentJson
              .filter((card) => card.board === boardKey)
              .map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  tarefa={card.tarefa}
                  dep={card.dep}
                  atv={card.atv}
                  resp={card.resp}
                  board={card.board}
                  edTarefa={(task) => handleEditTarefa(task)}
                  del={() => handleDeleteTarefa(card.id)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id)}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
