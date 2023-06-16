import { useState } from 'react'
import CasaPreta from '../Components/Casas/CasaPreta'
import CasaBranca from '../Components/Casas/CasaBranca'

import PeaoB from '../Components/Peças/PeaoB'
import PeaoP from '../Components/Peças/PeaoP'

import './Tabuleiro.css'
import BispoP from '../Components/Peças/BispoP'
import BispoB from '../Components/Peças/BispoB'
import TorreB from '../Components/Peças/TorreB'
import TorreP from '../Components/Peças/TorreP'
import CavaloP from '../Components/Peças/CavaloP'
import CavaloB from '../Components/Peças/CavaloB'
import ReiB from '../Components/Peças/ReiB'
import ReiP from '../Components/Peças/ReiP'
import RainhaB from '../Components/Peças/RainhaB'
import RainhaP from '../Components/Peças/RainhaP'
function Tabuleiro() {

  return (
    <>
      <main>
        <div className='flexivel'>
          <div id="a" >
            <CasaBranca peca={<TorreP id="TorreP"/>} />
            <CasaPreta peca={<PeaoP />} />
            <CasaBranca  />
            <CasaPreta />
            <CasaBranca  />
            <CasaPreta  />
            <CasaBranca  peca={<PeaoB />} />
            <CasaPreta  peca={<TorreB />} />
          </div>
          <div id="b">
            <CasaPreta peca={<CavaloP />} />
            <CasaBranca peca={<PeaoP />} />
            <CasaPreta  />
            <CasaBranca />
            <CasaPreta />
            <CasaBranca />
            <CasaPreta peca={<PeaoB />} />
            <CasaBranca peca={<CavaloB />} />

          </div>
          <div id="c">
            <CasaBranca  peca={<BispoP />} />
            <CasaPreta  peca={<PeaoP />} />
            <CasaBranca  />
            <CasaPreta  />
            <CasaBranca  />
            <CasaPreta  />
            <CasaBranca  peca={<PeaoB />} />
            <CasaPreta  peca={<BispoB />} />
          </div>
          <div id="d">
            <CasaPreta  peca={<RainhaP />}/>
            <CasaBranca  peca={<PeaoP />} />
            <CasaPreta  />
            <CasaBranca />
            <CasaPreta  />
            <CasaBranca  />
            <CasaPreta  peca={<PeaoB />} />
            <CasaBranca  peca={<RainhaB />}/>

          </div>
          <div id="e">
            <CasaBranca  peca={ <ReiP/> } />
            <CasaPreta  peca={<PeaoP />} />
            <CasaBranca  />
            <CasaPreta  />
            <CasaBranca  />
            <CasaPreta  />
            <CasaBranca  peca={<PeaoB />} />
            <CasaPreta   peca={ <ReiB/> }/>
          </div>
          <div id="f">
            <CasaPreta  peca={<BispoP />} />
            <CasaBranca  peca={<PeaoP />} />
            <CasaPreta  />
            <CasaBranca />
            <CasaPreta  />
            <CasaBranca  />
            <CasaPreta  peca={<PeaoB />} />
            <CasaBranca  peca={<BispoB />} />
          </div>
          <div id="g">
            <CasaBranca  peca={<CavaloP />} />
            <CasaPreta  peca={<PeaoP />} />
            <CasaBranca  />
            <CasaPreta  />
            <CasaBranca  />
            <CasaPreta  />
            <CasaBranca  peca={<PeaoB />} />
            <CasaPreta  peca={<CavaloB />} />
          </div>
          <div id="h">
            <CasaPreta  peca={<TorreP />} />
            <CasaBranca  peca={<PeaoP />} />
            <CasaPreta  />
            <CasaBranca />
            <CasaPreta  />
            <CasaBranca  />
            <CasaPreta  peca={<PeaoB />} />
            <CasaBranca  peca={<TorreB />} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Tabuleiro
