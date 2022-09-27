import { useReducer } from 'react'
import { act } from 'react-dom/test-utils'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART_ITEM') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    const existingCardItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )

    const existionCartItem = state.items[existingCardItemIndex]

    let updatedItems

    if (existionCartItem) {
      // if item already exists
      const updatedItem = {
        ...existionCartItem,
        amount: existionCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCardItemIndex] = updatedItem
    } else {
      // if item isnot selected yet
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'REMOVE_CART_ITEM') {
    const existingCardItemIndex = state.items.findIndex(
      item => item.id === action.id
    )

    const existingItem = state.items[existingCardItemIndex] // item which is going to be deleted

    const updatedTotalAmount = state.totalAmount - existingItem.price // total price decreses bye 1x of item

    let updatedItem
    let updatedItems

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
      updatedItems = [...state.items]
      updatedItems[existingCardItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  return defaultCartState // default
}

const CardProvider = props => {
  // 1. state snapshot 2. function, which allows you to dispatch an action to the reducer
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = item => {
    // dispatch call has some property, which allows you to identify that action, 2.  forward the item as part of the action.
    dispatchCartAction({ type: 'ADD_CART_ITEM', item: item })
    console.log(item)
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE_CART_ITEM', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CardProvider
