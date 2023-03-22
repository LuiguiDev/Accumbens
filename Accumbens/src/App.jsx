import { useEffect, useState } from 'react'
import './styles/App.css';
import { DaysList } from './Components/DaysList';
import { v4 as uuidv4 } from 'uuid';
import { Day } from './Components/Day';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';

function App() {
  const initialState = JSON.parse(localStorage.getItem('achivements')) || [];
  const [achivements, setAchivements] = useState(initialState);

  function changeAccState (newState) {
    setAchivements(newState);
  }

  return (
    <>
      <Header 
        overallState={achivements}
        changeAccState={changeAccState}
      />
      <DaysList 
        key={uuidv4()}
        achivements={achivements}
        id={uuidv4()}
        changeAccState={changeAccState}
      />
      <Footer />
    </>
  )
}

export default App
