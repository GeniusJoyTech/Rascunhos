import React from "react";
import Card from "./comp_Card";

export default function Board({ title, tasks, handleEditTarefa, handleDeleteTarefa }) {
  const edTarefa = (tarefa) => {
        
    console.log(tarefa);
};
  return (
    <div>
      <h4>{title}</h4>
      <div>
        {tasks.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            tarefa={item.tarefa}
            dep={item.dep}
            atv={item.atv}
            resp={item.resp}
            edTarefa={edTarefa}
            del={() => handleDeleteTarefa(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
