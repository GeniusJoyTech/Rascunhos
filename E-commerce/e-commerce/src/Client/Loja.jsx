import React from "react";

export default function Loja({items}) {
  if (!items || items.length === 0) {
    return (
      <div style={{height:"95vh"}} className="flex aliCenter justCen"><p>Não há itens à venda.</p></div>
    );
  }
  return (
    <div className="loja flex flexWrap justAro m32">
      {items.map((item) => (
        <div key={item.id} className="loja-item">
          <img className="loja-img" src={item.imgSrc} alt={item.title} />
          <div className="center">
            <div className="card-loja">
              <input
                type="checkbox"
                className="input-collapse"
                id={`card-${item.id}`}
              />
              <label htmlFor={`card-${item.id}`} className="label-collapse">
                {item.title}
              </label>
              <div className="card-content">
                <p>{item.description}</p>
              </div>
            </div>
            <div className="flex aliCenter">
              <div className="flex prc50 justCen">
                <p>
                  <b>$</b>
                  {item.price}
                </p>
              </div>
              <button>Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
