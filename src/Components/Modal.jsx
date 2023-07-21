import '../styles/modal.css'
import { Button } from './button'

export const ModalContent = ({ icon, title, buttons, easeModal, type, changeAccState, options }) => {
  const { state, dayContent, scrollY } = options
  const [leftButtonText, rightButtonText] = buttons
  const leftButtonClass = leftButtonText.toLowerCase()
  const style = {
    top: `${scrollY + (window.innerHeight / 2) - 150}px`
  }

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

  return (
    <div className="modal_container" style={style}>
      <div className="modal_icon">{icon}</div>
      <h3>{title}</h3>
      <div className="buttons">
        <Button className={leftButtonClass} text={leftButtonText} manageClick={manageActionClick} />
        <Button className='save' text={rightButtonText} manageClick={easeModal} />
      </div>
    </div>
  )
}

export const Modal = ({ active, children }) => {
  if (!active) return

  return (
    <div className="modal_background">
      {children}
    </div>
  )
}
