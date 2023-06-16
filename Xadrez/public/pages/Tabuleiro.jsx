import { useState } from 'react'
import CasaPreta from '../Components/Casas/CasaPreta'
import CasaBranca from '../Components/Casas/CasaBranca'

import PeaoB from '../Components/Peças/PeaoB'
import PeaoP from '../Components/Peças/PeaoP'

import './Tabuleiro.css'
function Tabuleiro() {

  return (
    <>
      <main>
        <div className='flexivel'>
          <div id="a" >
            <CasaBranca className="_8" />
            <CasaPreta className="_7" peca={<PeaoP/>}/>
            <CasaBranca className="_6"/>
            <CasaPreta className="_5"/>
            <CasaBranca className="_4"/>
            <CasaPreta className="_3"/>
            <CasaBranca className="_2" peca={<PeaoB/>}/>
            <CasaPreta className="_1"/>
          </div>
          <div id="b">
            <CasaPreta  className="_8"/>
            <CasaBranca className="_7" peca={<PeaoP/>}/>
            <CasaPreta  className="_6"/>
            <CasaBranca className="_5"/>
            <CasaPreta  className="_4"/>
            <CasaBranca className="_3"/>
            <CasaPreta  className="_2" peca={<PeaoB/>}/>
            <CasaBranca className="_1"/>

          </div>
          <div id="c">
            <CasaBranca className="_8"/>
            <CasaPreta  className="_7" peca={<PeaoP/>}/>
            <CasaBranca className="_6"/>
            <CasaPreta  className="_5"/>
            <CasaBranca className="_4"/>
            <CasaPreta  className="_3"/>
            <CasaBranca className="_2" peca={<PeaoB/>}/>
            <CasaPreta  className="_1"/>
          </div>
          <div id="d">
            <CasaPreta  className="_8"/>
            <CasaBranca className="_7" peca={<PeaoP/>}/>
            <CasaPreta  className="_6"/>
            <CasaBranca className="_5"/>
            <CasaPreta  className="_4"/>
            <CasaBranca className="_3"/>
            <CasaPreta  className="_2" peca={<PeaoB/>}/>
            <CasaBranca className="_1"/>

          </div>
          <div id="e">
            <CasaBranca className="_8"/>
            <CasaPreta  className="_7" peca={<PeaoP/>}/>
            <CasaBranca className="_6"/>
            <CasaPreta  className="_5"/>
            <CasaBranca className="_4"/>
            <CasaPreta  className="_3"/>
            <CasaBranca className="_2" peca={<PeaoB/>}/>
            <CasaPreta  className="_1"/>
          </div>
          <div id="f">
            <CasaPreta  className="_8"/>
            <CasaBranca className="_7" peca={<PeaoP/>}/>
            <CasaPreta  className="_6"/>
            <CasaBranca className="_5"/>
            <CasaPreta  className="_4"/>
            <CasaBranca className="_3"/>
            <CasaPreta  className="_2" peca={<PeaoB/>}/>
            <CasaBranca className="_1"/>
          </div>
          <div id="g">
            <CasaBranca className="_8"/>
            <CasaPreta  className="_7" peca={<PeaoP/>}/>
            <CasaBranca className="_6"/>
            <CasaPreta  className="_5"/>
            <CasaBranca className="_4"/>
            <CasaPreta  className="_3"/>
            <CasaBranca className="_2" peca={<PeaoB/>}/>
            <CasaPreta  className="_1"/>
          </div>
          <div id="h">
            <CasaPreta  className="_8"/>
            <CasaBranca className="_7" peca={<PeaoP/>}/>
            <CasaPreta  className="_6"/>
            <CasaBranca className="_5"/>
            <CasaPreta  className="_4"/>
            <CasaBranca className="_3"/>
            <CasaPreta  className="_2" peca={<PeaoB/>}/>
            <CasaBranca className="_1"/>
          </div>
        </div>
      </main>
    </>
  );
}

export default Tabuleiro
