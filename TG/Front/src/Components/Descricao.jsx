function Descricao(props){
    return (
        <div style={{ right:'0', width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
            <div className="vazio"></div><p>{props.texto}</p>
        </div>
    );
}
export default Descricao;