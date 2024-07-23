import React from "react";

export default function Filtros() {
    return (
        <div className="sticky-div flex justAro aliCenter">
            <div style={{width: "40%"}}><p>Pesquisa</p></div>
            <div style={{width: "60%"}} className="flex justAro aliCenter">
                <p>Filtro 1</p>
                <p>Filtro 2</p>
                <p>Filtro 3</p>
            </div>
        </div>
    )
}