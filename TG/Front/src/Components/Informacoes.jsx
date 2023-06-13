import './css/informacoes.css'

function Informacoes(props){
    return(
        <div className='inform'>
            {props.texto}
        </div>
    );
}
export default Informacoes;