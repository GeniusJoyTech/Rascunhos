import './css/Card_func.css'
function Card(props) {
  return (
    
      <div className="card_func" id={props.id}>
        <div>
          <div className='container'>
            {/*<img className="img_perfil" src="https://img.freepik.com/fotos-gratis/a-paisagem-bonita-do-sol-da-praia-com-um-barco_1112-212.jpg" alt=""></img>*/}
            <div>
              <div>
                <p>Nome: {props.nome}</p>
                <hr />
                <p>status: {props.entrada}</p>
              </div>
              <hr />
            </div>
          </div>
          <div>

            <div className='container'>
              <p>Loja Atual: </p><p>{props.mercado}</p>
            </div>
            <div className="container">
              <p>Endereço: </p><p>{props.endereco}</p>
            </div>
            <div className="container">
              <p>Atividade: </p><p>{props.atividade}</p>
            </div>
            <div className="container">
              <p>botao: </p><p>{props.botao}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Card;