import { useEffect, useState } from 'react'
import './styles/App.css';
import { AreaChart, ResponsiveContainer, Area, XAxis, Tooltip } from 'recharts';
import { v4 as uuid } from 'uuid';
import { DaysList } from './Components/DaysList';
import { Day } from './Components/Day';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { Modal, ModalContent } from './Components/Modal';
import { Button } from './Components/button';

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
  const [modalState, setModalState] = useState(
      {
        active: false,
        type: undefined,
        options: {}
      }
    )

  function modalConfirmation (newType, newOptions) {
    setModalState(
      {
        active: true,
        type: newType,
        options: newOptions
      }
    )
  }
  function easeModal () {
    setModalState(
      {
        active: false,
        type: undefined,
        options: {}
      }
    )    
  }

  let accSorted = structuredClone(achivements);
  accSorted = accSorted.sort((a, b) => b.date - a.date);
  accSorted.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA
  })
  
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

      <DaysList>
        {
          accSorted.map(element => {
            return (
              <Day
                key={uuid()} 
                dayContent={element}
                state={achivements}
                changeAccState={changeAccState}
                modalConfirmation={modalConfirmation}
              />
            )
          })
        }
      </DaysList>
      
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

      <Modal active={modalState.active}>
        {modalState.type === 'delete' &&
            <ModalContent 
              icon='🗑️'
              title='The entire day will be deleted.'
              buttons={['Delete', 'Cancel']}
              easeModal={easeModal}
              type={modalState.type}
              changeAccState={changeAccState}
              options={modalState.options}
            />
        }
        {modalState.type === 'exit' &&
          <ModalContent 
            icon='➡️'
            title='Exit? Changes wont be saved.'
            buttons={['Exit', 'Return']}
            easeModal={easeModal}
            type={modalState.type}
            changeAccState={changeAccState}
            options={modalState.options}
          />
        }
      </Modal>
      <Footer />
    </>
  )
}

export default App
