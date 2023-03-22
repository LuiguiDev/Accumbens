import { useState } from 'react'
import './styles/App.css';
import { DaysList } from './Components/DaysList';
import { v4 as uuidv4 } from 'uuid';
import { Day } from './Components/Day';
import { Header } from './Components/Header';

function App() {
  const initialState = JSON.parse(localStorage.getItem('achivements')) || [
    { 
      day: 'Today',
      task: ['Code', 'Study english'],
    }
  ];
  const [achivements, setAchivements] = useState([
    { 
      id: uuidv4(),
      date: 'Today',
      content: ['Code', 'Study english'],
      editable: false
    },
    {
      id: uuidv4(),
      date: 'Yesterday',
      content: ['Sleep well', 'Chapter resume'],
      editable: false
    },
    {
      id: uuidv4(),
      date: '04-03-23',
      content: ['Nothing relatable'],
      editable: false
    }
  ]);

  function changeAccState (newState) {
    setAchivements(newState);
  }

  return (
    <>
      <Header 
        overallState={achivements}
        changeAccState={changeAccState}
      />
      <main className="tonalli_list">
        <DaysList 
          key={uuidv4()}
          achivements={achivements}
          id={uuidv4()}
          changeAccState={changeAccState}
        />
      </main>
    </>
  )
}

export default App
