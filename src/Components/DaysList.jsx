import '../styles/card.css';

export function DaysList({ children }) {

  // sort the days descending accorting to their dates
  return(
    <main className="day_list ">
      { children }
    </main>
  )
}