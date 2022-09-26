import styles from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = props => {
  return (
    <form className={styles.form}>
      <Input // to Input.JS (making better input)
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
    </form>
  )
}

export default MealItemForm
