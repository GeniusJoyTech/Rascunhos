import Menu from './Components/svg/Menu'
import Loja from './Components/Containers/Loja'
import Destaque from './Components/Containers/C_Destaque'
function App() {

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

export default App
