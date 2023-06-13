import "./css/Input.css"

function Input(props){
    return (
        <div className="p">
        <label for={props.id}>{props.texto}</label>
        <input type={props.type} id={props.id} name={props.nome}></input>
        </div>
    );

}

export default Input;
