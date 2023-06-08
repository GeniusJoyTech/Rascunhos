import React from 'react'
import Menu from '../../Components/Containers/C_Menu'
import Loja from '../../Components/Containers/Loja'
import Destaque from '../../Components/Containers/C_Destaque'
const Roteiro = () => {

  return (
    <>
      <Menu />
      <Destaque>
        
      <Loja
        loja="Mercadinho Chelly"
        End="Rua Antonio Girão"
        Cep="18051260"
        Num="40"
      />
      </Destaque>

    </>
  )
}

export default Roteiro
