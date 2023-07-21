import '../styles/button.css'

export const Button = ({ className, manageClick, text }) => {
  return(
    <button
      className={className}
      onClick={(e) => manageClick(e)}
    >
      {text}
    </button>
  )
}