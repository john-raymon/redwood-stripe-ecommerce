import { useState, useContext, useEffect } from 'react'

const CartContext = React.createContext()

const CART_STORAGE_KEY = 'JOHNRAYMON_MERCH_CART'

function getStorageCartState() {
  const data = window.localStorage.getItem(CART_STORAGE_KEY)
  if (data) {
    return JSON.parse(data)
  }
  return undefined
}

function setStorageCartState(value) {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(value))
  } catch (error) {
    console.log(
      'Error while attempting to persist cart state in local storage',
      error
    )
  }
}

const defaultCartState = {
  products: {},
}

export const useCartContext = () => {
  const cart = useContext(CartContext)
  return cart
}

export const CartProvider = ({ children }) => {
  const [cartState, setCart] = useState(defaultCartState)

  useEffect(() => {
    const storageCartState = getStorageCartState()
    if (storageCartState) {
      setCart(storageCartState)
    }
  }, [])

  useEffect(() => {
    setStorageCartState(cartState)
  }, [cartState])

  function removeCartItem(id) {
    setCart((prevState) => {
      delete prevState.products[id]
      return {
        ...prevState,
        products: {
          ...prevState.products,
        },
      }
    })
  }

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
      const cartItem = prevState.products[price.id]
      if (cartItem) {
        return {
          ...prevState,
          products: {
            ...prevState.products,
            [price.id]: {
              ...cartItem,
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

  function checkout() {
    const lineItems = Object.entries(cartState.products).map(
      ([priceId, { quantity }]) => ({ price: priceId, quantity })
    )

    if (!lineItems.length) {
      return false
    }

    fetch(`${window.RWJS_API_URL}/createCheckoutSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineItems,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sorry we're having trouble taking you to checkout")
        }
        return response.json()
      })
      .then((response) => {
        if (response.checkoutSession) {
          return (window.location.href = response.checkoutSession.url)
        } else {
          throw new Error("Sorry we're having trouble taking you to checkout")
        }
      })
      .catch(() => {
        alert("Sorry we're having trouble taking you to checkout")
      })
  }

  const totalQuantity = Object.values(cartState.products).reduce(
    (acc, { quantity }) => {
      return +acc + +quantity
    },
    0
  )

  const cart = {
    cart: cartState,
    addToCart,
    totalQuantity,
    checkout,
    removeCartItem,
  }

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}
