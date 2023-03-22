import { useState } from "react";
import { v4 as uuid } from "uuid";
import '../styles/header.css'

export function Header ({ overallState, changeAccState }) {
  const [day, setDay] = useState(
    {
      id: uuid(),
      content: [],
      date: undefined,
      editable: false
    }
  );
  const [prevMode, setPrevMode] = useState(false)

  function addAcc (e) {
    e.preventDefault();

    const inputValue = e.target[0].value
    const newState = structuredClone(day)

    newState.content.push(inputValue)
    setDay(newState)
  }

  function AddDayPrev () {
    return (
      <button 
        className="add_day_prev"
        onClick={() => setPrevMode(false)}
      >
      Add Day
      </button>
    )
  }
  function AddDayExtended ({overallState, changeAccState}) {

    function manageAddDay () {
      const newState = structuredClone(overallState);
      newState.push(day)
      changeAccState(newState)
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
            <input type="text" placeholder="Ex: Read 20min"/>
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
        <button className="add_day" onClick={manageAddDay}>Add day</button>
    </div>
    )
  }
  return (
    <header>
      <h1>1% better everyday</h1>
      <p>Write your accomplishments everyday to stay motivated</p>
      {prevMode ? <AddDayPrev /> : <AddDayExtended overallState={overallState} changeAccState={changeAccState} />}
    </header>
  )
}