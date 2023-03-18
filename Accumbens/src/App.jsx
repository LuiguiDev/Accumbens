import { useState } from 'react'
import './styles/App.css';
import { Card } from './Components/Card';
import achivements from './achivements'

function App() {
  const [tonalli, setTonalli] = useState([
    'Read 30 minutes',
    'Coding 1 hour',
    'Starting new project',
    'Starting new draw',
    'Work out',
    'Walk my dogs'
  ]);
  const [date, setDate] = useState('');

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
        <Card achivements={tonalli} editable={false} />
      </main>
    </>
  )
}

export default App
