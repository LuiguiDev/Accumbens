import { useState } from "react";
import { v4 as uuid } from "uuid";
import '../styles/header.css'

export function Header ({ overallState, changeAccState }) {
  const darkModeIntitialState = JSON.parse(window.localStorage.getItem('dark-mode')) || false
  // States
  const [day, setDay] = useState(
    {
      id: uuid(),
      content: [],
      date: undefined,
      editable: false
    }
  );
  const [prevMode, setPrevMode] = useState(true);
  const [darkMode, setDarkMode] = useState(darkModeIntitialState);
  const body = document.querySelector('body');

  body.setAttribute('data-theme', darkMode ? 'dark' : 'light')

  // Functions
  function changeMode () {
    const body = document.querySelector('body')
    if (darkMode) {
      body.setAttribute('data-theme', 'light')
      setDarkMode(false)
      window.localStorage.setItem('dark-mode', false)
    }else if (!darkMode) {
      body.setAttribute('data-theme', 'dark')
      setDarkMode(true)
      window.localStorage.setItem('dark-mode', true)
    }
  }
  function addAcc (e) {
    e.preventDefault();

    const inputValue = e.target[0].value
    const newState = structuredClone(day)

    newState.content.push(inputValue)
    setDay(newState)
  };
  function shrinkAddDay () {
    setPrevMode(true)
  };

  //Components
  const AddDayPrev = () => {
    return (
      <button 
        className="add_day_prev"
        onClick={() => setPrevMode(false)}
      >
      Add Day
      </button>
    )
  };
  const AddDayExtended = ({overallState, changeAccState}) => {
    const [emptySend, setEmptySend] = useState(false)
    const [emptyDate, setEmptyDate] = useState(false)

    function manageAddDay () {
      // checking whether the user miss add a date or add tasks
      if(day.content.length === 0) {
        setEmptySend(true)
      }
      if(day.date === undefined) {
        setEmptyDate(true)
        return
      }

      const newState = structuredClone(overallState);
      setEmptySend(false)
      setEmptyDate(false)

      newState.push(day);
      changeAccState(newState);
      setDay({
        id: uuid(),
        content: [],
        date: undefined,
        editable: false
      });
      window.localStorage.setItem('achivements', JSON.stringify(newState))
    };
    function manageDateChange (e) {
      const dateValue= e.target.value
      const newDayState = structuredClone(day)

      newDayState.date = dateValue;
      setDay(newDayState)
    };

    return (
      <div className="card">
        <div className="inputs">
          <input 
            type="date"
            id="date_input"
            value={day.date}
            onChange={manageDateChange}
          />
          <form className="add_acc" onSubmit={addAcc}>
            <input id="add_input" type="text" placeholder="Ex: Read 20min"/>
            <button className="add" type="submit"> +</button>
          </form>
        </div>
        <ul className="content">
          {day.content.length === 0 && 
            <p className="li_element">Heare will be displayed your accomplishments</p>
          }
          {emptySend === true &&
            <p className="errorMessage">Add at least one task</p>
          }
          {
            emptyDate === true &&
            <p className="errorMessage">Missing the date</p>
          }
          {day.content.map(element => {
            return (
              <li className="li_element" key={uuid()}>
                {element}
              </li>
            )
          })}
        </ul>
        <div className="buttons_sc">
          <button className="close_day" onClick={shrinkAddDay}>Close</button>
          <button className="add_day" onClick={manageAddDay}>Add day</button>
        </div>
    </div>
    )
  };

  return (
    <>
      <header>
        <h1>The Done List</h1>
        <button 
          className='theme_button'
          onClick={changeMode}
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </header>
      <div className="add_day_container">
        <p>Write your accomplishments everyday to stay motivated</p>
        {prevMode ? <AddDayPrev /> : <AddDayExtended overallState={overallState} changeAccState={changeAccState} />}
      </div>
    </>
  )
}