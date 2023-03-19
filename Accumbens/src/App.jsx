import { useState } from 'react'
import './styles/App.css';
import { Card } from './Components/Card';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const initialState = JSON.parse(localStorage.getItem('achivements')) || [    { 
    day: 'Today',
    task: ['Code', 'Study english'],
  }
];
  const [achivements, setAchivements] = useState([
    { 
      date: 'Today',
      content: ['Code', 'Study english'],
      editable: false
    }
]);

  return (
    <>
      <header>
        <h1>1% better everyday</h1>
        <div className='add_day'>
          <p style={{color: 'white'}}>
            Write your accumplish everyday to stay motivated
          </p>
          <button>
            Add day
          </button>
        </div>
      </header>
      <main className="tonalli_list">
        {achivements.map(element => {
          return(
            <Card 
              key={uuidv4()}
              achivements={achivements}
              id={uuidv4()}
            />
          )
        })}        
      </main>
    </>
  )
}

export default App
