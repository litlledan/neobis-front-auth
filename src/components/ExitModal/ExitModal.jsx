import React from 'react'
import './ExitModal.scss'
import { Link } from 'react-router-dom'


const ExitModal = ({active,setActive}) => {
  return (
   <>
   {active &&
    <div className={`ExitModal ${active ? 'active' : ''}`}>
       <div className="ExitModal__overlay">
        <div className="ExitModal__content">
            <p className="ExitModal__content-p">Выйти?</p>
            <p className="ExitModal__content-text">Точно выйти?</p>
            <button className="ExitModal__content-btn">
               <Link to="/" className='ExitModal__link'>
                 Да, точно
               </Link>
             </button>  
            <p className="ExitModal__content-n"
            onClick={()=>setActive(false)}
            >Нет, остаться</p>
        </div>
       </div>
    </div>
   }
   </>
  )
}

export default ExitModal
