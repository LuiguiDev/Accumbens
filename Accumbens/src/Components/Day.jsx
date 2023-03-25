import { useState } from "react";
import { v4 as uuid } from "uuid";

export function Day ({ dayContent, state, changeAccState}) {
  const [contentChanged, setContentChanged] = useState([])
  
  function editTonalli (selectedId) {
    const newState = structuredClone(state)
    const findedIndex = state.findIndex(({id}) => id === selectedId);
    const findedCard = newState[findedIndex]

    if(!findedCard) return
    if(findedCard) {
      findedCard.editable = !findedCard.editable
      changeAccState(newState)
    }
  };
  function manageSubmit (e) {
    e.preventDefault();

    const newState = structuredClone(state);
    const inputValue = e.target[0].value;
    const finded = newState.find(({id}) => id === dayContent.id)

    finded.content.push(inputValue)
    changeAccState(newState)
  }
  function manageDelete() {
    if(confirm('Are you sure you want to delete this entire day?')){
      const newState = state.filter(({id}) => id != dayContent.id);

      changeAccState(newState)
      window.localStorage.setItem('achivements', JSON.stringify(newState))
    }else{
      console.log('Keep editing')
    }
  };
  function manageExit () {
    const previousState = JSON.parse(window.localStorage.getItem('achivements'))
    changeAccState(previousState)
  };
  function manageSave () {
    const newState = structuredClone(state)
    const finded = newState.find(({id}) => id === dayContent.id)

    finded.editable = false;
    changeAccState(newState);
    window.localStorage.setItem('achivements', JSON.stringify(newState))
  };

  function manageChange (index, e) {   // not working
    const newState = structuredClone(state);
    const card = newState.find(({id}) => id === dayContent.id)
    let content = card.content;

    content[index] = e.target.textContent;
    changeAccState(newState)
  }

  function deleteLiElement (selectedIndex) {
    const newState = structuredClone(state)
    const finded = newState.find(({id}) => id === dayContent.id)
    const filtered = finded.content.filter((element) => {
      return element != dayContent.content[selectedIndex]
    })
    
    finded.content = filtered
    changeAccState(newState)
  }

  return (
    <div className="paper">
      <div className="header">
        <h3>{dayContent.date}</h3>
        <button 
          className='edit'
          onClick={() => editTonalli(dayContent.id)}
        >
          {dayContent.editable? 'Editing' : 'Edit'}
        </button>
      </div>
      {dayContent.editable && 
        <form onSubmit={manageSubmit}>
          <input type="text" placeholder='Ex: Read 20min' />
          <button className='add'>+</button>
        </form>
      }
      <ul className={dayContent.editable ? 'list_editable' : ''}>
        {dayContent.content?.map((task, index) => {
          return (
            <li key={uuid()}>
              <p
                hidden={!dayContent.editable} 
                className="cross"
                onClick={() => deleteLiElement(index)}
              >
                x
              </p>
              <p
                className="li_text"
                id={index}
              >
                {task}
              </p>
            </li>
          )
        })}
      </ul>
      {dayContent.editable &&
        <div className='edit_buttons'>
          <button className='button delete' onClick={manageDelete}>Delete</button>
          <button className='button exit' onClick={manageExit}>Exit</button>
          <button className='button save' onClick={manageSave}>Save</button>
        </div>
      }
    </div>
  )
}