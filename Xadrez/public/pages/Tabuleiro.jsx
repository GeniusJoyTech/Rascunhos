import { useState } from 'react'
import CasaPreta from '../Components/Casas/CasaPreta'
import CasaBranca from '../Components/Casas/CasaBranca'

function Tabuleiro() {

  return (
    <>
      
    <div id="a" className='flexivel'>
      <CasaBranca id="_8"/>
      <CasaPreta id="_7"/>
      <CasaBranca id="_6"/>
      <CasaPreta id="_5"/>
      <CasaBranca id="_4"/>
      <CasaPreta id="_3"/>
      <CasaBranca id="_2"/>
      <CasaPreta id="_1"/>
    
    </div>
    <div id="b" className='flexivel'></div>
    <div id="c" className='flexivel'></div>
    <div id="d" className='flexivel'></div>
    <div id="e" className='flexivel'></div>
    <div id="f" className='flexivel'></div>
    <div id="g" className='flexivel'></div>
    </>
  )
}

export default Tabuleiro
