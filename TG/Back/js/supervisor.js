import conexao from './conexao.js';

const db = conexao();

const Supervisor = {
    verRot(req, res) {
        const q_rot = `SELECT db_usuario.nome as nUsu, db_usuario.status, db_loja.nome, db_loja.endereco, db_atv.atividade
        FROM db_roteiro
        LEFT JOIN db_usuario ON db_roteiro.id_usu = db_usuario.id_usu
        LEFT JOIN db_atv ON db_roteiro.id_atv = db_atv.id_atv
        left join db_loja on db_atv.id_lj = db_loja.id_lj`;
        db.query(q_rot, (err, result) => {
            if (err) {
                console.log('Erro durante a consulta do roteiro, erro de servidor');
                console.log(err);
                return res.status(500)
                    .json({ mensagem: 'Erro interno do servidor durante a consulta do servidor' });
            }
            console.log('Retornando roteiros.');
            return res.status(200).json(result);
        });
    },
    verAtv(req, res) {
        const q_atv = 'select * from db_atv';
        db.query(q_atv, (err, result) => {
            if (err) {
                console.log('Erro durante a consulta da atividade, erro de servidor');
                console.log(err);
                return res.status(500)
                    .json({ mensagem: 'Erro interno do servidor durante a consulta do servidor' });
            }
            console.log('Retornando atividades.');
            return res.status(200).json(result);
        });
    },
}

export default Supervisor;