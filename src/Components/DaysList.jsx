import '../styles/card.css';
import { v4 as uuid } from 'uuid';
import { Day } from './Day';


export function DaysList({ achivements, changeAccState}) {

  // sort the days descending accorting to their dates
  let accSorted = structuredClone(achivements);
  accSorted = accSorted.sort((a, b) => b.date - a.date);
  accSorted.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA
  })

  function getDate () {
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();

    return `${dd}-${mm}-${yy}`
  };
  function updateLocalStorage (newState) {
    window.localStorage.setItem('achivements', JSON.stringify(newState))
  };
  function manageAddAcomplish (e) {
    e.preventDefault();

    const inputValue = e.target[0].value;
    const newState = [...achivements, {
      task: inputValue,
      }];

    setAchivements(newState);
    updateLocalStorage(newState);

    e.target[0].value = '';
  };

  return(
    <main className="day_list ">
      {
        accSorted.map(element => {
          return (
            <Day
              key={uuid()} 
              dayContent={element}
              state={achivements}
              changeAccState={changeAccState}
            />
          )
        })
      }
    </main>
  )
}