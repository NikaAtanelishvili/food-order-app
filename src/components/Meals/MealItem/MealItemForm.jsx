import styles from './MealItemForm.module.css'
import Input from '../../UI/Input'

import { useRef, useState } from 'react'

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true)

  const amountInputRef = useRef()

  const submitHandler = e => {
    e.preventDefault()

    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 0 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false)
      return
    }

    props.onAddToCart(enteredAmountNumber)
  }

  /* to use useRef on costum componenets, go to costum component and wrap 
  funtion with React.forwardRef so it become argument. then add ref argument 
  to the funtion and put ref atribute.
   */

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input // to Input.JS (making better input)
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid number (1 - 5).</p>}
    </form>
  )
}

export default MealItemForm
