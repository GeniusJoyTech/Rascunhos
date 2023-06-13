import "./css/menu.css"
import Descricao from "./Descricao";
function Menu_2(props) {
    return (
        <>
            <div id="menu_desc" className="menu a">

                <Descricao texto="Voltar" />
                {props.children}
            </div>
        </>
    )
}

export default Menu_2;