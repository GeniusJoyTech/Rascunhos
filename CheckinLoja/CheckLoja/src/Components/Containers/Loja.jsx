function Loja(props) {
    return (
        <div className="lj">
            <div className="nl">
                <div className="ck">                </div>
                <div className="conteudo">
                    <div>
                        <p>{props.loja}</p>
                        <hr />
                    </div>
                    <p>{props.End}</p>
                    <div className="nl">
                    <p id="cep">{props.Cep}</p>
                    <p>{props.Num}</p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Loja;