import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'

const HeaderCartButton = props => {
  return (
    <button className={styles.button}>
      <span>
        <CartIcon className={styles.icon} />
      </span>
      <span>Yout Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  )
}

export default HeaderCartButton
