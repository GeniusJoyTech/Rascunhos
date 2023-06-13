import "./css/Botao.css"

function Botao(props) {
  return (
    <button onClick={props.onClick}>
      {props.texto}
    </button>
  )
}

export default Botao;
