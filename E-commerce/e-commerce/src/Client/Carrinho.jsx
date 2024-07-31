import React from "react";
export default function Carrinho({ exibir, setExibir, items, remover }) {
  const fecharCarrinho = () => {
    setExibir(false);
  };
  const agruparItemsCarrinho = (items) => {
    const groupedItems = items.reduce((acc, item) => {
      const foundItem = acc.find(accItem => accItem.id === item.id);
      if (foundItem) {
        if (foundItem.mod === "Físico") {
          foundItem.quantity += 1;
          foundItem.totalPrice += parseFloat(item.price);
        }
      } else {
        acc.push({ ...item, quantity: 1, totalPrice: parseFloat(item.price) });
      }
      return acc;
    }, []);
    return groupedItems;
  };

  const itemsAgrupados = agruparItemsCarrinho(items);

  return (
    <>
      {exibir && (
        <div className="carrinho opact_easeInOut_efect_05s">
          <div className="flex justEnd">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 26"
              width="26px"
              height="26px"
              onClick={fecharCarrinho}
              style={{ cursor: 'pointer' }}
            >
              <path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z" />
            </svg>
          </div>
          <div className="flex justCen">
            <h2 style={{ height: 'auto' }}>Carrinho de Compras</h2>
          </div>
          <hr className="line" />
          <div id="conteudoCarrinho" className="prc100">
            {/* Conteúdo do carrinho */}

            {
              items && items.length > 0 ?
                itemsAgrupados.map((item) => (
                  <div>
                    <p> {item.cat}  {item.mod}: {item.title} <br />Valor: <b>$</b>{item.totalPrice.toFixed(2)}</p> Quantidade: {item.quantity} <button onClick={() => remover(item.id)}>Remover</button>
                    <br /><br />
                  </div>
                ))
                :
                <div className="flex prc100 prcH100 flex aliCenter justCen scrolY">
                  <p>Nada no carrinho!</p>
                </div>
            }
          </div>
          <hr className="line" />
          <div className="prc100 flex justCen">
            <button>Finalizar Compra</button>
          </div>
        </div>
      )}
    </>
  );
}
