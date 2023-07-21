import '../styles/modal.css'

export const ModalContent = ({ icon, title, buttons, easeModal, type, changeAccState, options }) => {
  const { state, dayContent } = options

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
  function manageExit () {
    const previousState = JSON.parse(window.localStorage.getItem('achivements'))
    changeAccState(previousState)
  }

  return (
    <>
      <div className="modal_icon">{icon}</div>
      <h3>{title}</h3>
      <div className="buttons">
        <button 
          className={buttons[0].toLowerCase()}
          onClick={() => manageActionClick()}
        >
          {buttons[0]}
        </button>
        <button 
          className={buttons[1].toLowerCase()}
          onClick={() => easeModal()}
        >
          {buttons[1]}
        </button>
      </div>
    </>
  )
}

export const Modal = ({ active, children }) => {
  if (!active) return

  return (
    <div className="modal_background">
      <div className="modal_container">
        {children}
      </div>
    </div>
  )
}
