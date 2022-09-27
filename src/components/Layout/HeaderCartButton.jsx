import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'

import { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'

const HeaderCartButton = props => {
  const [buttonIsHighlighed, setButtonIsHighlighed] = useState(false)
  const cartCtx = useContext(CartContext)

  const { items } = cartCtx

  const numberOfCardItems = items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  )

  useEffect(() => {
    if (items.length === 0) return // when app is started

    setButtonIsHighlighed(true)

    const btnAnimationTimer = setTimeout(() => {
      setButtonIsHighlighed(false)
    }, 300)

    return () => {
      clearTimeout(btnAnimationTimer)
    }
  }, [items])

  const btnClasses = `${styles.button} ${buttonIsHighlighed ? styles.bump : ''}`

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span>
        <CartIcon className={styles.icon} />
      </span>
      <span>Yout Cart</span>
      <span className={styles.badge}>{numberOfCardItems}</span>
    </button>
  )
}

export default HeaderCartButton
