import Card from "./comp_Card";

export default function Board({boardKey, boardTitle, parentJson, handleDeleteTarefa, handleDragOver, handleDragStart, handleDrop, handleEditAtividade, handleEditDepartamento, handleEditResponsavel, handleEditTarefa}){
    return(<>
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
              maxHeight:"80vh",
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
                  edTarefa={(e) => handleEditTarefa(card.id, e.target.value)}
                  edAtv={(e) => handleEditAtividade(card.id, e.target.value)}
                  edDep={(e) => handleEditDepartamento(card.id, e.target.value)}
                  edResp={(e) => handleEditResponsavel(card.id, e.target.value)}
                  del={() => handleDeleteTarefa(card.id)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, card.id)}
                />
              ))}
          </div>
    </>);
}