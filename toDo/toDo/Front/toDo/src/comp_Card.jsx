import React, { useState } from "react";

export default function Card({
    id,
    tarefa,
    dep,
    atv,
    resp,
    board,
    edTarefa,
    del,
    draggable,
    onDragStart,
}) {
    const [editing, setEditing] = useState(false); // Estado para controlar se estamos editando
    const [inputValue, setInputValue] = useState(tarefa); // Armazena o valor atual do input
    const [inputAtv, setInputAtv] = useState(atv); // Armazena o valor da Atividade
    const [inputDep, setInputDep] = useState(dep); // Armazena o valor do Departamento
    const [inputResp, setInputResp] = useState(resp); // Armazena o valor do Responsável

    const departamentos = ["selecione", "Marketing", "Suporte", "Gerência"];
    // const atividades = ["selecione", "Planejamento", "Execução", "Análise"];
    const responsaveis = ["selecione", "João", "Maria", "Carlos", "Ana"];

    // Função para alternar o estado de edição
    const toggleEditing = () => {
        setEditing(!editing);
        setInputValue(tarefa); // Reseta o valor do input para o valor original ao sair da edição
        setInputAtv(atv); // Reseta a Atividade ao sair da edição
        setInputDep(dep); // Reseta o Departamento ao sair da edição
        setInputResp(resp); // Reseta o Responsável ao sair da edição
    };

    // Função para lidar com mudanças no campo de tarefa
    const handleTarefaChange = (e) => {
        const newValue = e.target.value; // Captura o novo valor do input
        setInputValue(newValue); // Atualiza o estado local com o novo valor
    };

    // Função para salvar a tarefa no backend
    const handleSaveTarefa = () => {

        setEditing(false); // Desativa o modo de edição após salvar
        edTarefa({
            id: id,
            tarefa: inputValue,
            dep: inputDep,
            atv: inputAtv,
            resp: inputResp,
            board: board,
        });
    };

    // Função para lidar com mudanças nos outros campos
    const handleAtvChange = (e) => {
        const newValue = e.target.value;
        setInputAtv(newValue); // Atualiza o valor da Atividade localmente
    };

    const handleDepChange = (e) => {
        const newValue = e.target.value;
        setInputDep(newValue); // Atualiza o valor do Departamento localmente
    };

    const handleRespChange = (e) => {
        const newValue = e.target.value;
        setInputResp(newValue); // Atualiza o valor do Responsável localmente
    };

    return (
        <div
            className="card"
            draggable={draggable}
            onDragStart={(e) => onDragStart(e, id)}
            style={{
                padding: "10px",
                marginBottom: "8px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
            }}
        >
            <div>
                <div>
                    <label>Tarefa: </label>
                    <textarea
                        type="text"
                        value={inputValue} // Vincula o valor do input com o estado local
                        onChange={handleTarefaChange} // Atualiza o estado ao digitar
                        autoFocus
                        disabled={!editing} // Só pode editar quando está no modo de edição
                    />
                </div>

                <label>Departamento: </label>
                <select
                    value={inputDep}
                    onChange={handleDepChange}
                    style={{ marginBottom: "8px", width: "100%" }}
                    disabled={!editing}
                >
                    {departamentos.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                {/* <label>Atividade: </label>
                <select
                    value={inputAtv}
                    onChange={handleAtvChange}
                    style={{ marginBottom: "8px", width: "100%" }}
                    disabled={!editing}
                >
                    {atividades.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select> */}

                <label>Responsável: </label>
                <select
                    value={inputResp}
                    onChange={handleRespChange}
                    style={{ marginBottom: "8px", width: "100%" }}
                    disabled={!editing}
                >
                    {responsaveis.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div>

                    {editing ? (
                        <div>
                            <button onClick={handleSaveTarefa}>Salvar</button>
                            <button onClick={toggleEditing}>Cancelar</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={toggleEditing}>Editar</button>
                        </div>
                    )}
                </div>
                <button onClick={del}>Excluir</button>
            </div>
        </div>
    );
}
