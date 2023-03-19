import { useState } from 'react';
import '../styles/card.css';
import { v4 as uuid } from 'uuid';

function Day ({ dayContent, state, changeAchivementsState}) {
  function editTonalli (selectedId) {
    const newState = structuredClone(state)
    const findedIndex = state.findIndex(({id}) => id === selectedId);
    const findedCard = newState[findedIndex]

    if(!findedCard) return
    if(findedCard) {
      findedCard.editable = !findedCard.editable
      changeAchivementsState(newState)
    }
  };
  function manageSubmit (e) {
    e.preventDefault();

    const newState = structuredClone(state);
    const inputValue = e.target[0].value;
    const finded = newState.find(({id}) => id === dayContent.id)

    finded.content.push(inputValue)
    changeAchivementsState(newState)
  }
  function manageDelete() {
    if(confirm('Are you sure you want to delete this entire day?')){
      const newState = state.filter(({id}) => id != dayContent.id);

      changeAchivementsState(newState)
    }else{
      console.log('Keep editing')
    }
  };
  function manageExit () {};
  function manageSave () {};

  return (
    <div className="paper">
    <button className='edit' onClick={() => editTonalli(dayContent.id)}>🖋️</button>
    <h3>{dayContent.date}</h3>
    {dayContent.editable && 
      <form onSubmit={manageSubmit}>
        <input type="text" placeholder='Ex: Read 20min' />
        <button className='add'>+</button>
      </form>
    }
    {dayContent.content.map(task => {
      return (
        <li key={uuid()}>{task}</li>
      )
    })}
    {dayContent.editable &&
      <div className='edit_buttons'>
        <button className='delete' onClick={manageDelete}>Delete</button>
        <button className='exit' onClick={manageExit}>Exit</button>
        <button className='save' onClick={manageSave}>Save</button>
      </div>
    }
  </div>

  )
}

export function Card({ achivements, changeAchivementsState}) {
  function getDate () {
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();

    return `${dd}-${mm}-${yy}`
  };
  function updateLocalStorage (newState) {
    window.localStorage.setItem('achivements', JSON.stringify(newState))
  };
  function manageAddAcomplish (e) {
    e.preventDefault();

    const inputValue = e.target[0].value;
    const newState = [...achivements, {
      task: inputValue,
      }];

    setAchivements(newState);
    updateLocalStorage(newState);

    e.target[0].value = '';
  };


  return(
    <div className="day_list">
      {
        achivements.map(element => {
          return (
            <Day
              key={uuid()} 
              dayContent={element}
              state={achivements}
              changeAchivementsState={changeAchivementsState}
            />
          )
        })
      }
    </div>
  )
}