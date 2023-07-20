const ModalContent = ({ icon, title, buttons }) => {
  return (
    <>
      <div className="modal_icon">{icon}</div>
      <h3>{title}</h3>
      <div className="buttons">
        <button className={buttons[0].toLowerCase()}>{buttons[0]}</button>
        <button className={buttons[1].toLowerCase()}>{buttons[1]}</button>
      </div>
    </>
  )
}

export const Modal = ({ active, type }) => {
  if (!active) return

  return (
    <div className="modal_background">
      <div className="modal_container">
        {type === 'delete' &&
          <ModalContent 
            icon='🗑️'
            title='The entire day will be deleted'
            buttons={['Delete', 'Cancel']}
          />
        }
        {type === 'exit' &&
          <ModalContent 
            icon='➡️'
            title='Exit? Changes wont be saved'
            buttons={['Exit', 'Return']}
          />
        }
      </div>
    </div>
  )
}
