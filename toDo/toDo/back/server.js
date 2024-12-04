const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs'); // Módulo para manipulação de arquivos

// Middleware para interpretar JSON
app.use(express.json());

// Habilitar CORS para qualquer origem (qualquer máquina na rede)
app.use(cors());

// Caminho para o arquivo JSON onde as tarefas serão armazenadas
const tarefasFilePath = './tarefas.json';

// Função para ler os dados do arquivo JSON
const readTarefas = () => {
    try {
        const data = fs.readFileSync(tarefasFilePath, 'utf8');
        return JSON.parse(data); // Parse para JSON
    } catch (error) {
        return []; // Se falhar, retorna um array vazio
    }
};

// Função para salvar os dados no arquivo JSON
const writeTarefas = (tarefas) => {
    try {
        const data = JSON.stringify(tarefas, null, 2); // Formata o JSON
        fs.writeFileSync(tarefasFilePath, data, 'utf8');
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
    }
};

// Rota para retornar todas as tarefas
app.get('/tarefas', (req, res) => {
    const tarefas = readTarefas(); // Lê as tarefas do arquivo
    res.json(tarefas);
});

// Rota para adicionar novas tarefas
app.post('/tarefas', (req, res) => {
    const novaTarefa = req.body;
    const tarefas = readTarefas(); // Lê as tarefas do arquivo
    const ids = tarefas.map((item) => item.id);
    const nextId = Math.max(0, ...ids) + 1;
    novaTarefa.id = nextId
    tarefas.push(novaTarefa); // Adiciona a nova tarefa
    writeTarefas(tarefas); // Salva as tarefas de volta no arquivo
    res.status(201).json(novaTarefa); // Retorna a tarefa adicionada
});

// Rota para editar uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { tarefa, dep, atv, resp, board } = req.body;
    const tarefas = readTarefas(); // Lê as tarefas do arquivo

    // Encontra o índice da tarefa a ser atualizada
    const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(id));

    if (tarefaIndex !== -1) {
        // Atualiza os dados da tarefa
        tarefas[tarefaIndex] = { id: parseInt(id), tarefa, dep, atv, resp, board };
        writeTarefas(tarefas); // Salva as tarefas de volta no arquivo
        return res.json(tarefas[tarefaIndex]); // Retorna a tarefa atualizada
    } else {
        return res.status(404).json({ message: "Tarefa não encontrada" });
    }
});

// Rota para excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const tarefas = readTarefas(); // Lê as tarefas do arquivo

    const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(id));

    if (tarefaIndex !== -1) {
        // Remove a tarefa do array
        tarefas.splice(tarefaIndex, 1);
        writeTarefas(tarefas); // Salva as tarefas de volta no arquivo
        return res.status(204).end(); // Retorna um status 204 sem conteúdo
    } else {
        return res.status(404).json({ message: "Tarefa não encontrada" });
    }
});

// Rota apresentação
app.get('/', (req, res) => {
    res.json({status: 200, message: "tudo ok"});
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
