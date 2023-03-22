import { useState } from "react";
import { v4 as uuid } from "uuid";
import '../styles/header.css'

export function Header ({ overallState, changeAccState }) {
  // States
  const [day, setDay] = useState(
    {
      id: uuid(),
      content: [],
      date: undefined,
      editable: false
    }
  );
  const [prevMode, setPrevMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Functions
  function changeMode () {
    const body = document.querySelector('body')
    if (darkMode) {
      body.setAttribute('data-theme', 'dark')
      setDarkMode(false)
    }else if (!darkMode) {
      body.setAttribute('data-theme', 'light')
      setDarkMode(true)
    }
  }
  useState(() => {
    changeMode()
  }, []);
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
    function manageAddDay () {
      if(day.content.length === 0) return

      const newState = structuredClone(overallState);

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
            <li className="li_element">Heare will be displayed your accomplishments</li>
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