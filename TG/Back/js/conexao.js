import mysql from 'mysql2';
export default () => {
  const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'mobilis',
    password: 'password',
    database: 'mobilis',
    port: '3306'
  });
  //iniciando a conexao
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
  });
  return connection;
}