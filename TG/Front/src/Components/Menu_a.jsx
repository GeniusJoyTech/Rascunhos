import Menu_1 from './Menu_1';
import Menu_2 from './Menu_2';
import Descricao from './Descricao';

import Seta_d from './Seta_d';
import Seta_e from './Seta_e';

function Menu_s(props) {
    return (
        <>
            <Menu_1 Seta_d = {Seta_d} Seta_e = {Seta_e}>
                
            </Menu_1>
            <Menu_2>
                <Descricao texto="Voltar"/>                
            </Menu_2>
        </>
    )
}
export default Menu_a;