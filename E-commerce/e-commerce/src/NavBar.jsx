import React from "react";
export default function NavBar() {

    return (
        <div className="navbar flex justAro aliCenter">
            <h1 id="titulo">Loja Weriton</h1>
            <div id="navegadores" className="flex justBet">
                <a>Início</a>
                <a>Loja</a>
                <a>Cursos</a>
                <a>Livros</a>
                <a>Carrinho</a>
            </div>
        </div>
    );
}