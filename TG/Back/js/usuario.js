import conexao from './conexao.js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const db = conexao();
const key = "Este é um exemplo de senha para o jwt que sera passado para criptografia do token. 1234568745621@!#)(*&¨%$!@#$%¨&`{}^`"

const Usuario = {
  login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    const query = 'SELECT * FROM db_usuario WHERE email = ? AND senha = ?';
    db.query(query, [email, senha], (err, result) => {
      if (err) {
        console.log('Erro durante a consulta');
        console.log(err);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }
      if (result.length === 0) {
        console.log('Senha ou email errado');
        return res.status(401).send('Usuário ou senha incorretos');
      }

      console.log('Status(200) Email e senha conferidos na base de dados');
      const user = result[0];
      const token = jwt.sign({ email: user.email, tipo: user.tipo }, key);
      const { senha, ...rest } = user
      res.status(200).json({ user: rest, token });
    });
  },
  //logout(){},
  //trocaSenha(){},
  ///////////////////////////////////////////////  
  end() {
    db.end;
  },
}

export function authMiddleware(req, res, next) {

  try {
    const authorization = req.headers.authorization
    const [, token] = authorization.split(" ") // Bearer token
    if (!token) return res.status(401).json("token is missing!");
    jwt.verify(token, key);
    next()
  } catch (error) {
    return res.status(401).json("unauthorized")
  }
}


export default Usuario;