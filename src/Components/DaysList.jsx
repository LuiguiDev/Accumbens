import '../styles/card.css';
import { Day } from './Day';
import { Children } from 'react';


export function DaysList({ children }) {

  // sort the days descending accorting to their dates
  return(
    <main className="day_list ">
      { children }
    </main>
  )
}