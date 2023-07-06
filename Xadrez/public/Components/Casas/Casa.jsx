import React from 'react';
import './css/Casa.css';

const CasaBranca = (props) => {
  const { id, peca, cor } = props;

  return (
    <div id={id} className={`Casa ${cor}`}>
      {peca}
    </div>
  );
}

export default CasaBranca;
