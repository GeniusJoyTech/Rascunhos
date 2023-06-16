import { useState } from 'react'
import CasaPreta from '../Components/Casas/CasaPreta'
import CasaBranca from '../Components/Casas/CasaBranca'

import PeaoB from '../Components/Peças/PeaoB'

import './Tabuleiro.css'
function Tabuleiro() {

  return (
    <>
      <main>
        <div className='flexivel'>
          <div id="a" >
            <CasaBranca className="_8" peca={<PeaoB/>}/>
            <CasaPreta className="_7" />
            <CasaBranca className="_6"/>
            <CasaPreta className="_5"/>
            <CasaBranca className="_4"/>
            <CasaPreta className="_3"/>
            <CasaBranca className="_2" />
            <CasaPreta className="_1"/>
          </div>
          <div id="b">
            <CasaPreta className="_1"></CasaPreta>
            <CasaBranca className="_2"></CasaBranca>
            <CasaPreta className="_3"></CasaPreta>
            <CasaBranca className="_4"></CasaBranca>
            <CasaPreta className="_5"></CasaPreta>
            <CasaBranca className="_6"></CasaBranca>
            <CasaPreta className="_7"></CasaPreta>
            <CasaBranca className="_8"></CasaBranca>

          </div>
          <div id="c">
            <CasaBranca className="_1"></CasaBranca>
            <CasaPreta className="_2"></CasaPreta>
            <CasaBranca className="_3"></CasaBranca>
            <CasaPreta className="_4"></CasaPreta>
            <CasaBranca className="_5"></CasaBranca>
            <CasaPreta className="_6"></CasaPreta>
            <CasaBranca className="_7"></CasaBranca>
            <CasaPreta className="_8"></CasaPreta>
          </div>
          <div id="d">
            <CasaPreta className="_1"></CasaPreta>
            <CasaBranca className="_2"></CasaBranca>
            <CasaPreta className="_3"></CasaPreta>
            <CasaBranca className="_4"></CasaBranca>
            <CasaPreta className="_5"></CasaPreta>
            <CasaBranca className="_6"></CasaBranca>
            <CasaPreta className="_7"></CasaPreta>
            <CasaBranca className="_8"></CasaBranca>

          </div>
          <div id="e">
            <CasaBranca className="_1"></CasaBranca>
            <CasaPreta className="_2"></CasaPreta>
            <CasaBranca className="_3"></CasaBranca>
            <CasaPreta className="_4"></CasaPreta>
            <CasaBranca className="_5"></CasaBranca>
            <CasaPreta className="_6"></CasaPreta>
            <CasaBranca className="_7"></CasaBranca>
            <CasaPreta className="_8"></CasaPreta>
          </div>
          <div id="f">
            <CasaPreta className="_1"></CasaPreta>
            <CasaBranca className="_2"></CasaBranca>
            <CasaPreta className="_3"></CasaPreta>
            <CasaBranca className="_4"></CasaBranca>
            <CasaPreta className="_5"></CasaPreta>
            <CasaBranca className="_6"></CasaBranca>
            <CasaPreta className="_7"></CasaPreta>
            <CasaBranca className="_8"></CasaBranca>
          </div>
          <div id="g">
            <CasaBranca className="_1"></CasaBranca>
            <CasaPreta className="_2"></CasaPreta>
            <CasaBranca className="_3"></CasaBranca>
            <CasaPreta className="_4"></CasaPreta>
            <CasaBranca className="_5"></CasaBranca>
            <CasaPreta className="_6"></CasaPreta>
            <CasaBranca className="_7"></CasaBranca>
            <CasaPreta className="_8"></CasaPreta>
          </div>
          <div id="h">
            <CasaPreta className="_1"></CasaPreta>
            <CasaBranca className="_2"></CasaBranca>
            <CasaPreta className="_3"></CasaPreta>
            <CasaBranca className="_4"></CasaBranca>
            <CasaPreta className="_5"></CasaPreta>
            <CasaBranca className="_6"></CasaBranca>
            <CasaPreta className="_7"></CasaPreta>
            <CasaBranca className="_8"></CasaBranca>
          </div>
        </div>
      </main>
    </>
  );
}

export default Tabuleiro
