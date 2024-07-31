import React from "react";

export default function ComprarNumero() {
    return (
        <form action="/submit_form" method="POST">

            <div style={{
                top: "10vh", /* Ajuste a posição conforme necessário */
                left: "10vw",
                zIndex: "1000",
                padding:"8px",
                borderRadius:'4px',
                backgroundColor:"#d9d9d9"
            }} className="flex fixo vw80 vh80 flexCol justBet">
                <div className="bordSolid1px">
                    <label for="nome">Nome:</label>
                    <input style={{width:"90%"}} type="text" id="nome" name="nome" required />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" />
                </div>
                <div>
                    <label for="mensagem">Mensagem:</label>
                    <textarea id="mensagem" name="mensagem" rows="4" required></textarea>
                </div>
                <div className="flex prc100 justBet">
                    <button type="submit">Enviar</button>
                    <button type="submit">Cencelar</button>
                </div>
            </div>


        </form>
    )
}