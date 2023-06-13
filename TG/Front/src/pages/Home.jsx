import { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import useFetching from '../hooks/useFetching'

import Menu_s from '../Components/Menu_s'
import Menu_p from '../Components/Menu_p'

import Card from '../Components/Card'

import Informacoes from '../Components/Informacoes'
import P_container from '../Components/P_container'

const r_s_atv = '/supervisor/atividade';
const r_s_rot = '/supervisor/roteiro';
const r_p_atv = '/promotor/atividade';
const r_p_rot = '/promotor/roteiro';
const r_s_ft = '/promotor/foto';

let tipo;
try {
    const user = JSON.parse(localStorage.getItem('user'));
    tipo = user.tipo;
    
} catch (error) {
    // Trate o erro aqui
    console.error('Parece que usuario não possui as credenciais de acesso:', error);
}


function Home() {

    //    const { data: s_atividade } = useFetching(r_s_atv);
    switch (tipo) {
        case "promotor":

            const { data: p_roteiro } = useFetching(r_p_rot);
            return (
                <>
                    <Informacoes texto="Roteiro" />
                    <P_container>

                        {p_roteiro && p_roteiro.map((item, index) => (
                            <Card
                                key={index}
                                mercado={`${item.nome}`}
                                endereco={`${item.endereco}`}
                                botao="Ver atividades"
                            />
                        ))}
                    </P_container>
                    <Menu_p />

                </>
            );
        case "supervisor":
            const { data: s_roteiro } = useFetching(r_s_rot);
            return (
                <>

                    <Menu_s />
                    <P_container>

                        {s_roteiro && s_roteiro.map((item, index) => (
                            <Card
                                key={index}
                                nome={`${item.nUsu}`}
                                status={`${item.status}`}
                                mercado={`${item.nome}`}
                                endereco={`${item.endereco}`}
                                atividade={`${item.atividade}`}
                            />
                        ))}
                    </P_container>
                    <Informacoes texto="Titulo" />

                </>
            );
        case "administrador":
            return (
                <>
                    <p>Olá administrador</p>
                </>
            );
    };
}

export default Home;