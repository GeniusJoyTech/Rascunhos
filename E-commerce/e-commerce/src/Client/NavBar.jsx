import React from "react";
export default function NavBar({setExibirCarrinho}) {
    const abrirCarrinho = () => {
        setExibirCarrinho(true);
      };
    return (
        <div className="navbar flex justAro aliCenter">
            <h1 className="no-break">Loja Weriton</h1>
            <div id="navegadores" className="flex justBet">
                <a href="#inicio">Início</a>
                <a href="#loja">Loja</a>
                <a href="#sobre">Sobre Mim</a>
                <a onClick={abrirCarrinho}>Carrinho</a>
            </div>
        </div>
    );
}