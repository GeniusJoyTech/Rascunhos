import './reset.css';
import Menu from './Menu.jsx';
import InfoContainer from './InfoContainer';
import MainContainer from './MainContainer.jsx';
function App() {

  return (
    <>
      <Menu />
      <div style={{display:'flex', width: '100vw',}}>
        <InfoContainer />
        <MainContainer />

      </div>
    </>
  )
}

export default App
