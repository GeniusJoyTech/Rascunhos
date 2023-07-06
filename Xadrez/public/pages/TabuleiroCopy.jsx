import { useState } from 'react'

import './css/Tabuleiro.css'

import CasaPreta from '../Components/Casas/CasaPreta'
import CasaBranca from '../Components/Casas/CasaBranca'

import Peao from '../Components/Peças/Peao'

import Bispo from '../Components/Peças/Bispo'
import Torre from '../Components/Peças/Torre'
import Cavalo from '../Components/Peças/Cavalo'
import Rei from '../Components/Peças/Rei'
import Rainha from '../Components/Peças/Rainha'

function Tabuleiro() {
  const [casaA, setA] = useState({
    a8: { peca: <Torre id="TorreP1" cor="p"/>, cor: 'Branca' },
    a7: { peca: <Peao id="PeaoP1" cor="p" />, cor: 'Preta' },
    a6: { peca: null, cor:'Branca'},
    a5: { peca: null, cor:'Preta'},
    a4: { peca: null, cor:'Branca'},
    a3: { peca: null, cor:'Preta'},
    a2: { peca: <Peao id="PeaoB1" cor="b"/>, cor:'Branca'},
    a1: { peca: <Torre id="TorreB1" cor="b"/>, cor:'Preta'},
  });

  return (
    <>
       <main>
        <div className="flexivel">
          {Object.keys(A).map((casaId) => (
            <div key={casaId}>
              {A[casaId] && (
                <Casa
                  id={casaId}
                  peca={A[casaId].peca}
                  cor={A[casaId].cor}
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {
        /*
        <main>
        <div className='flexivel'>
          <div id="a" >
            <CasaBranca id={'a8'} peca={<TorreP id="TorreP1"/>} />
            <CasaPreta  id={'a7'} peca={<PeaoP id="PeaoP1"/>} />
            <CasaBranca id={'a6'}  />
            <CasaPreta  id={'a5'} />
            <CasaBranca id={'a4'}/>
            <CasaPreta  id={'a3'}/>
            <CasaBranca id={'a2'} peca={<PeaoB id="PeaoB1"/>} />
            <CasaPreta  id={'a1'} peca={<TorreB id="TorreB1"/>} />
          </div>
          <div id="b">
            <CasaPreta  id={'b8'} peca={<CavaloP id="CavaloP1"/>} />
            <CasaBranca id={'b7'} peca={<PeaoP id="PeaoP2"/>} />
            <CasaPreta  id={'b6'}  />
            <CasaBranca id={'b5'} />
            <CasaPreta  id={'b4'} />
            <CasaBranca id={'b3'} />
            <CasaPreta  id={'b2'} peca={<PeaoB id="PeaoB2"/>} />
            <CasaBranca id={'b1'} peca={<CavaloB id="CavaloB1"/>} />

          </div>
          <div id="c">
            <CasaBranca id={'c8'}  peca={<BispoP id="BispoP1"/>} />
            <CasaPreta  id={'c7'}  peca={<PeaoP id="PeaoP3"/>} />
            <CasaBranca id={'c6'}  />
            <CasaPreta  id={'c5'}  />
            <CasaBranca id={'c4'}  />
            <CasaPreta  id={'c3'}  />
            <CasaBranca id={'c2'}  peca={<PeaoB id="PeaoB3"/>} />
            <CasaPreta  id={'c1'}  peca={<BispoB id="BispoB1"/>} />
          </div>
          <div id="d">
            <CasaPreta  id={'d8'}  peca={<RainhaP id="RainhaP"/>}/>
            <CasaBranca id={'d7'}  peca={<PeaoP id="PeaoP4"/>} />
            <CasaPreta  id={'d6'}  />
            <CasaBranca id={'d5'} />
            <CasaPreta  id={'d4'}  />
            <CasaBranca id={'d3'}  />
            <CasaPreta  id={'d2'}  peca={<PeaoB id="PeaoB4"/>} />
            <CasaBranca id={'d1'}  peca={<RainhaB id="RainhaB"/>}/>

          </div>
          <div id="e">
            <CasaBranca id={'e8'}  peca={ <ReiP id="ReiP"/> } />
            <CasaPreta  id={'e7'}  peca={<PeaoP id="PeaoP5"/>} />
            <CasaBranca id={'e6'}  />
            <CasaPreta  id={'e5'}  />
            <CasaBranca id={'e4'}  />
            <CasaPreta  id={'e3'}  />
            <CasaBranca id={'e2'}  peca={<PeaoB id="PeaoB5"/>} />
            <CasaPreta  id={'e1'}   peca={ <ReiB id="ReiB"/> }/>
          </div>
          <div id="f">
            <CasaPreta  id={'f8'}  peca={<BispoP id="BispoP2"/>} />
            <CasaBranca id={'f7'}  peca={<PeaoP id="PeaoB6"/>} />
            <CasaPreta  id={'f6'}  />
            <CasaBranca id={'f5'} />
            <CasaPreta  id={'f4'}  />
            <CasaBranca id={'f3'}  />
            <CasaPreta  id={'f2'}  peca={<PeaoB id="PeaoB6"/>} />
            <CasaBranca id={'f1'}  peca={<BispoB id="BispoB2"/>} />
          </div>
          <div id="g">
            <CasaBranca id={'g8'}  peca={<CavaloP id="CavaloP2"/>} />
            <CasaPreta  id={'g7'}  peca={<PeaoP id="PeaoP7"/>} />
            <CasaBranca id={'g6'}  />
            <CasaPreta  id={'g5'}  />
            <CasaBranca id={'g4'}  />
            <CasaPreta  id={'g3'}  />
            <CasaBranca id={'g2'}  peca={<PeaoB id="PeaoB7"/>} />
            <CasaPreta  id={'g1'}  peca={<CavaloB id="CavaloB2"/>} />
          </div>
          <div id="h">
            <CasaPreta  id={'h8'}  peca={<TorreP id="TorreP2"/>} />
            <CasaBranca id={'h7'}  peca={<PeaoP id="PeaoP8"/>} />
            <CasaPreta  id={'h6'}  />
            <CasaBranca id={'h5'} />
            <CasaPreta  id={'h4'}  />
            <CasaBranca id={'h3'}  />
            <CasaPreta  id={'h2'}  peca={<PeaoB id="PeaoB8"/>} />
            <CasaBranca id={'h1'}  peca={<TorreB id="TorreB2"/>} />
          </div>
        </div>
      </main>
        */
      }
    </>
  );
}

export default TabuleiroCopy
