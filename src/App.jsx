import { useEffect, useState } from 'react'
import './styles/App.css';
import { DaysList } from './Components/DaysList';
import { v4 as uuidv4 } from 'uuid';
import { Day } from './Components/Day';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { AreaChart, ResponsiveContainer, Area, XAxis, Tooltip } from 'recharts';
import { Modal } from './Components/Modal';

function CustomTooltip ({ active, payload, label }) {
  if (!active) return null

  return (
    <div className="tooltip">
      <h4>{payload[0].payload.date}</h4>
      <p>{payload[0].value}</p>
    </div>
  )
}

function App() {
  const initialState = JSON.parse(localStorage.getItem('achivements')) || [];
  const [achivements, setAchivements] = useState(initialState);
  const [data, setData] = useState([])
  const [modalIsActive, setModalIsActive] = useState(false)
  const [modalType, setModalType] = useState('')

  function modalConfirmation (newType) {
    setModalIsActive(true)
    setModalType(newType)
  }
  
  useEffect(() => {
    const newData = structuredClone(data)

    achivements.forEach(day => {
      newData.push({
        date: day.date,
        value: day.content.length
      }
      )
      setData(newData)
    })
  }, [achivements])

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
        modalConfirmation={modalConfirmation}
      />
      
      <ResponsiveContainer width='100%' height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'  >
              <stop offset='0%' stopColor='#09b276' stopOpacity={0.4} />
              <stop offset='75%' stopColor='#09b276' stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="value" stroke="#09b276" fill='url(#color)' />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
      <p>This week</p>

      <Modal active={modalIsActive} type={modalType}/>

      <Footer />
    </>
  )
}

export default App
