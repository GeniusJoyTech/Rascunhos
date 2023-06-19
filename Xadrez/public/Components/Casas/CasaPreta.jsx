import './css/Casa.css'
const CasaPreta = (props) =>{
    const { id, peca } = props;
    return(
        <div id={id} className="Casa Preta">
            {peca}
        </div>
    );
}

export default CasaPreta;