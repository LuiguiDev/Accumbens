import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Button } from "./button";

export function Day ({ dayContent, state, changeAccState, modalConfirmation}) {
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
  function manageDelete(e) {
    const scrollY = window.scrollY;
    
    modalConfirmation('delete', {state, dayContent, scrollY})
  };
  function manageExit () {
    const scrollY = window.scrollY;

    modalConfirmation('exit', {scrollY})
  };
  function manageSave () {
    const newState = structuredClone(state)
    const finded = newState.find(({id}) => id === dayContent.id)

    finded.editable = false;
    changeAccState(newState);
    window.localStorage.setItem('achivements', JSON.stringify(newState))
  };
  function checkDate () {
    const stringToNumbers = dayContent.date.split('-')
    const currentDate = new Date()
    const cardDate = new Date(stringToNumbers[0], stringToNumbers[1] - 1, stringToNumbers[2])

    currentDate.setHours(0, 0, 0, 0)
    cardDate.setHours(0, 0, 0, 0)

    const difference = (currentDate - cardDate) / (1000 * 60 * 60 * 24)

    if(difference === 0) {
      return 'Today'
    }else if(difference === 1) {
      return 'Yesterday'
    }else{
      return `${difference} days ago`
    }
  }
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
    <div className="paper" >
      <div className="header">
        <h3>{checkDate()}</h3>
        {dayContent.editable === false &&
          <button 
            className='edit'
            onClick={() => editTonalli(dayContent.id)}
          >
            Edit
          </button>
        }
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
                <small>❌</small>
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
          <Button className='delete' text='Delete' manageClick={manageDelete} />
          <Button className='exit' text='Exit' manageClick={manageExit} />
          <Button className='save' text='Save' manageClick={manageSave} />
        </div>
      }
    </div>
  )
}