import React from 'react'
import './EmailModal.scss'
function EmailModal({active,setActive}) {
  return (
    <>
   {active &&(
    <div className={`EmailModal ${active ? 'active' : ''}`}>
        <div className="EmailModal__overlay">
            <div className="EmailModal__content">
                <p className="EmailModal__content-title">Мы выслали еще одно письмо <br />
                    на указанную тобой почту <br />
                    example@gmail.com
                </p>
                <p className="EmailModal__content-text">
                    Не забудь проверить <br />
                    ящик “Спам”!11!!!!
                </p>
                <button className='EmailModal__content-btn'
                onClick={() => setActive(false)}
                >Понятно!!1!</button>
            </div>
        </div>
    </div>
   )}
    </>
  )
}

export default EmailModal