import { useState, useContext } from 'react'

const CartContext = React.createContext()

const defaultCartState = {
  products: {},
}

export const useCartContext = () => {
  const cart = useContext(CartContext)
  return cart
}

export const CartProvider = ({ children }) => {
  const [cartState, setCart] = useState(defaultCartState)

  /**
   *
   * @param {*} productData an object with the product object, price object that's being added to the cart
   * @param {*} quantityIncrement should be used when adding a new cart item to a cart
   * @param {*} newQuantity should be used when overriding an existing cart item's quantity
   */
  function addToCart(productData, quantityIncrement = 1, newQuantity = null) {
    const { price, product } = productData
    setCart((prevState) => {
      // products are listed by their price variants id, not the product ids
      if (prevState.products[price.id]) {
        const cartItem = prevState.products[price.id]
        return {
          ...prevState,
          products: {
            ...prevState.products,
            [price.id]: {
              product,
              price,
              quantity: newQuantity || cartItem.quantity + quantityIncrement,
            },
          },
        }
      } else {
        return {
          ...prevState,
          products: {
            ...prevState.products,
            [price.id]: {
              product,
              price,
              quantity: quantityIncrement,
            },
          },
        }
      }
    })
  }

  const totalQuantity = Object.values(cartState.products).reduce(
    (acc, { quantity }) => {
      return acc + quantity
    },
    0
  )

  const cart = {
    cart: cartState,
    addToCart,
    totalQuantity,
  }

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}
