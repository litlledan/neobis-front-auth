import React from 'react'
import './Welcom.scss'
import boy from '../../assets-images/boy.png'
import { useState } from 'react'
import ExitModal from '../ExitModal/ExitModal'


const Welcom = () => {
    const[open,setOpen]=useState(false)
  return (
    <div className='Welcom'>
        <div className="Welcom__container">
      <div className="Welcom__content">
        <h2 className='Welcom__content-h'>Добро пожаловать!</h2>
        <p className='Welcom__content-p'>Lorby - твой личный репетитор</p>
        <img src={boy} alt="boy" className='Welcom__content-img' />
        <button className='Welcom__content-btn'
         onClick={()=>setOpen(true)}
        >Выйти</button>
      </div>
    </div>
    <ExitModal active={open} setActive={setOpen}/>
    </div>
  )
}

export default Welcom
