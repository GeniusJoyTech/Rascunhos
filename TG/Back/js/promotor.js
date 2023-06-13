import conexao from './conexao.js';
let idSupervisor;
const db = conexao();
const Promotor = {
    verRot(req, res) {
        const id_usu = req.headers.id;
        const q_rot = `
        SELECT db_loja.nome, db_loja.endereco FROM db_roteiro INNER JOIN db_atv ON db_roteiro.id_atv = db_atv.id_atv INNER JOIN db_loja ON db_loja.id_lj = db_atv.id_lj INNER JOIN db_usuario on db_roteiro.id_usu = db_usuario.id_usu LEFT join db_d_visita on db_roteiro.id_rot = db_d_visita.id_rot where db_usuario.id_usu = ? group by db_atv.id_lj;
        
            `;




        db.query(q_rot, [id_usu], (err, result) => {
            if (err) {
                console.log('Erro durante a consulta do roteiro, erro de servidor');
            console.log(id_usu);
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
   //registrarFoto(){}
    
}

export default Promotor;