import { useState } from 'react';
import '../styles/card.css';
import { v4 as uuid } from 'uuid';
import { Day } from './Day';


export function DaysList({ achivements, changeAchivementsState}) {
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