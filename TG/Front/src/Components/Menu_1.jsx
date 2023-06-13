import { menu_vai, menu_volta } from "./js/menu.js"
import "./css/menu.css"

import Seta_d from './Seta_d';
import Seta_e from './Seta_e';

function Menu_1(props) {
    return (
        <>
            <div id="menu_icn" className="menu f">
                <div onClick = {menu_vai}   id="vai"><Seta_d/></div>
                <div onClick = {menu_volta} id="volta" ><Seta_e/></div>
                {props.children}  
            </div>
        </>
    )
}

export default Menu_1;