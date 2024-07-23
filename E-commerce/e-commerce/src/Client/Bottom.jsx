import React from "react";
export default function Bottom() {

    return (
        <div className="bottom p32 flex justAro">
            <div className="prc33 center">
                <h2 >Loja Weriton</h2>
                <hr className="line-b" />
                <p>Todos os direitos reservados.</p>

                <p>Lorem ipsum.</p>

                <p>Outras informações importantes.</p>
                <hr className="line-b" />
                <p>Aqui Weriton você pode adicionar informações que acha pertinente sobre a sua loja, cnpj se tiver, missão, valores, etc.</p>
            </div>
            <div className="prc33 center">
                <h2>Sobre Mim</h2>
                <hr className="line-b" />
                <p>
                    Meu nome é Weriton Bastos Simas, conhecido publicamente como Weriton Simas. Nasci em 15 de maio de 1987 em Ipirá, Bahia, e atualmente resido em Taboão da Serra, São Paulo. Sou casado e pai de um filho.
                    Atualmente, exerço o cargo ministerial de Presbítero na Assembleia de Deus Ministério do Belém em São Paulo, no setor 45. Além de pregar o Evangelho, sou professor de Teologia na FAESP (Faculdade Evangélica de São Paulo), na extensão de Taboão da Serra, e também escritor.
                </p>

            </div>

            <div className="prc33 center">

                <h2>Redes sociais</h2><hr className="line-b" />
                <p>Clique na imagem da rede social que deseja ser redirecionado.</p>
                <hr className="line-b" />

                <div className="flex prc100 justAro">
                    <div className="flex aliCenter">
                        <a href="#"><img src="\src\assets\Bottom\facebook.png" alt="facebook image." /></a>
                    </div>
                    <div className="flex">
                        <a href="#"><img src="\src\assets\Bottom\whatsapp.png" alt="whatsapp image." /></a>
                    </div>
                    <div className="flex">
                        <a href="#"><img src="\src\assets\Bottom\instagram.png" alt="instagram image." /></a>
                    </div>
                </div>
            </div>
        </div >
    );
}