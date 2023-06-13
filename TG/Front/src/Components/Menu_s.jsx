import Menu_1 from './Menu_1';
import Menu_2 from './Menu_2';
import Descricao from './Descricao';

import Binoculos from './binoculos';
import Users from './Users';
import Logout from './Logout';
import Task from './Task';

function Menu_s(props) {
    return (
        <>
            <Menu_1>
                <Binoculos />
                <Users />
                <Task/>

                <Logout />


            </Menu_1>
            <Menu_2>
                <Descricao texto="Roteiros" />
                <Descricao texto="Promotores" />
                <Descricao texto="Atividades" />
                <Descricao texto="Logout" />
            </Menu_2>
        </>
    )
}
export default Menu_s;