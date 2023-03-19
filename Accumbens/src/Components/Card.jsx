import { useState } from 'react';
import '../styles/card.css';
import { v4 as uuid } from 'uuid';

function Day ({ date, content, editable }) {
  function editTonalli() {
    
  };
  function manageDelete() {};
  function manageExit () {};
  function manageSave () {};

  return (
    <div className="paper">
    <button className='edit' onClick={editTonalli}>🖋️</button>
    <h3>{date}</h3>
      <form >
        <input type="text" placeholder='Ex: Read 20min' />
        <button className='add'>+</button>
      </form>
      {content.map(task => {
        return (
          <li key={uuid()}>{task}</li>
        )
      })}
    <div className='edit_buttons'>
      <button className='delete' onClick={manageDelete}>Delete</button>
      <button className='exit' onClick={manageExit}>Exit</button>
      <button className='save' onClick={manageSave}>Save</button>
    </div>
  </div>

  )
}

export function Card({ achivements, id }) {
  console.log(achivements)

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
              date={element.date}
              content={element.content}
              editable={element.editable}
            />
          )
        })
      }
    </div>
  )
}