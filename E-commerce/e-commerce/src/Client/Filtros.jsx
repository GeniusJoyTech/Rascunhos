import React, { useState } from "react";

export default function Filtros() {
    return (
        <div id="filtro" className="sticky-div flex justAro aliCenter flexWrap">
            <div id="filtro_busca">
                <BarraPesquisa
                    items={[]} />
            </div>
            <div id="filtro_outros" className="flex justAro aliCenter no-break">
                <div>
                    <input type="radio" name="flexRadioDefault" id="f_radio_todos"/>
                    <label for="f_radio_todos">
                        Todos
                    </label>
                </div>
                <div>
                    <input type="radio" name="flexRadioDefault" id="f_radio_livros" />
                    <label for="f_radio_livros">
                        Apenas livros
                    </label>
                </div>
                <div>
                    <input type="radio" name="flexRadioDefault" id="f_radio_cursos" />
                    <label for="f_radio_cursos">
                        Apenas cursos
                    </label>
                </div>
            </div>
        </div>
    )
}

function BarraPesquisa({ items }) {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    const handleSearch = (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);

        if (searchQuery) {
            setFilteredItems(
                items.filter(item =>
                    item.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredItems(items);
        }
    };

    return (
        <div>
            <input
                className="prc100"
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Buscar..."
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
