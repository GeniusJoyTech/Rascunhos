import React from "react";
export default function NavBar({setExibirCarrinho}) {
    // const abrirCarrinho = () => {
    //     setExibirCarrinho(true);
    //   };
    return (
        <div className="navbar flex justAro aliCenter">
            <h1 id="titulo">Rifa Online</h1>
            <div id="navegadores" className="flex justBet">
                {/* <a onClick={abrirCarrinho}>Carrinho</a> */}
            </div>
        </div>
    );
}