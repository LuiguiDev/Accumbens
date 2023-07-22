import { useEffect, useState } from 'react'
import '../styles/modal.css'
import { Button } from './button'

export const ModalContent = ({ icon, title, buttons, easeModal, type, changeAccState, options }) => {
  const [midPoint, setMidPoint] = useState(0)
  const { state, dayContent, scrollY } = options
  const [leftButtonText, rightButtonText] = buttons
  const leftButtonClass = leftButtonText.toLowerCase()

  function manageActionClick () {
    if (type === 'delete') {
      const newState = state.filter(({id}) => id != dayContent.id);

      changeAccState(newState)
      window.localStorage.setItem('achivements', JSON.stringify(newState))
      easeModal()
    }else if (type === 'exit') {
      const previousState = JSON.parse(window.localStorage.getItem('achivements'))
      changeAccState(previousState)
      easeModal()
    }else {
      console.log('can not manage this')
    }
  }

  useEffect(() => {
    function setStyles () {
      const element = document.querySelector('.modal_container')

      if (element) {
        const elementMidPoint = element.offsetHeight / 2
        const midPoint = scrollY + (window.innerHeight / 2) - elementMidPoint

        setMidPoint(midPoint)
      }
    } 

    setStyles() 
  }, [])

  return (
    <div className="modal_container" style={{top: midPoint}}>
      <div className='icon_container'>
        <div className="modal_icon">{icon}</div>
      </div>
      <h3>{title}</h3>
      <div className="buttons">
        <Button className={leftButtonClass} text={leftButtonText} manageClick={manageActionClick} />
        <Button className='exit' text={rightButtonText} manageClick={easeModal} />
      </div>
    </div>
  )
}

export const Modal = ({ active, children, easeModal }) => {
  if (!active) {
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
    return      
  }

  const body = document.querySelector('body')
  body.style.overflow = 'hidden'

  return (
    <div className="modal_background">
      {children}
    </div>
  )
}
