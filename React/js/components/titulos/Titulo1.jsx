import './titulo.css'

function Titulo1(props) {
    return (
        <div className='titulo _1'>
            <h1>{props.titulo}</h1>
            <hr className='linhaTitulo'/>
        </div>
    );
}
export default Titulo1;