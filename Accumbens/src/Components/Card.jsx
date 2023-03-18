import { useState } from 'react';
import '../styles/card.css';

export function Card({  }) {
  const [editable, setEditable] = useState(false);
  const initialState = JSON.parse(localStorage.getItem('achivements')) || [];
  const [achivements, setAchivements] = useState(initialState);

  function getDate () {
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();

    return `${dd}-${mm}-${yy}`
  }
  function editTonalli() {
    setEditable(prevState => !prevState)
  };
  function deleteTonalli() {
    console.log('Detele tonalli?')
  };
  function updateLocalStorage (newState) {
    window.localStorage.setItem('achivements', JSON.stringify(newState))
  }
  function manageAddAcomplish (e) {
    e.preventDefault();

    const inputValue = e.target[0].value;
    const newState = [...achivements, inputValue];

    setAchivements(newState);
    updateLocalStorage(newState);
  }

  return(
    <div className="card">
      <div className="paper">
        <h3 >DD-MM-YY</h3>
        <button className='edit' onClick={editTonalli}>
          🖋️
        </button>
        {editable && 
          <form onSubmit={manageAddAcomplish}>
            <input type="text" placeholder='Ex: Read 20min' />
            <button className='add'>+</button>
          </form>
        }
        <ul>
          {
            achivements.map((element, index) => {
              return(
                <li contentEditable={editable} key={index}>{element}</li>
              )
            })
          }
        </ul>
        {editable &&
        <div className='edit_buttons'>
          <button className='delete'>Delete</button>
          <button className='exit'>Exit</button>
          <button className='save'>Save</button>
        </div>
        }
      </div>
    </div>
  )
}