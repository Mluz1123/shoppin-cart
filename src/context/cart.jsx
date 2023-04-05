import { createContext, useReducer } from 'react'
import { carReducer, cartInitialState } from '../reducer/cart'
//1.Crear Contexto
export const CartContext = createContext()

//Se separa todo lo que esta utiliznado los componentes para que tenga un estado global.
function useCartReducer() {
  const [state, dispatch] = useReducer(carReducer, cartInitialState)

  const addToCart = (product) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    })

  const removeFromCart = (product) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  return { state, addToCart, removeFromCart, clearCart }
}
//La dependencia de utilizar REACTCONTEX es minima
//2. Crear Provider
export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer()
  //FORMA DE REALIZARLO SIN EL USEREDUCER
  // const addToCart = (product) => {
  //   //Check si el producto ya esta en el carrito
  //   const productInCartIndex = cart.findIndex((item) => item.id === product.id)

  //   if (productInCartIndex >= 0) {
  //     //Forma utilizando structureClone
  //     const newCart = structuredClone(cart)
  //     newCart[productInCartIndex].quantity += 1
  //     return setCart(newCart)
  //   }

  //   //Si el producto no está en elcarrito
  //   setCart((prevState) => [
  //     ...prevState,
  //     {
  //       ...product,
  //       quantity: 1
  //     }
  //   ])
  // }

  // const removeFromCart = (product) => {
  //   setCart((prevState) => prevState.filter((item) => item.id !== product.id))
  // }

  // const clearCart = () => {
  //   setCart([])
  // }

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
