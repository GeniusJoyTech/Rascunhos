import React from 'react';
import './css/Casa.css';

const CasaBranca = (props) => {
  const { id, peca } = props;

  return (
    <div id={id} className="Casa Branca">
      {peca}
    </div>
  );
}

export default CasaBranca;
