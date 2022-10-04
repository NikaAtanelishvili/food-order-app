import styles from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import { useContext, useState } from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'
import { FIREBASE_ORDERS_URL } from '../../helper/config'

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$ ${Math.abs(cartCtx.totalAmount.toFixed(2))}` // total amount
  const hasItems = cartCtx.items.length > 0 // render order btn

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  // send order & user data to firebase
  const submitOrderHandler = async userData => {
    setIsSubmitting(true)
    await fetch(FIREBASE_ORDERS_URL, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart() // clear cart
  }

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // This ensures that the id of the to be added or removed item is passed here to remove handler
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  )

  const modalActions = (
    <div className={styles.actions}>
      <button onClick={props.onCloseCart} className={styles['button--alt']}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = (
    <>
      <p>Successfully set the order! ✅ </p>
      <div className={styles.actions}>
        <button onClick={props.onCloseCart} className={styles.button}>
          Close
        </button>
      </div>
    </>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
