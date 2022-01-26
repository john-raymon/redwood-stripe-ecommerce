import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useCartContext } from 'src/context/CartContext'

const CartPage = () => {
  const { addToCart, cart, removeCartItem } = useCartContext()
  function updateQuantity(id, newQuantity) {
    addToCart({ price: { id } }, null, newQuantity)
  }
  return (
    <>
      <MetaTags title="Cart" description="Cart page" />

      <div className="flex flex-col w-full md:max-w-[50%] mx-auto px-6 space-y-2">
        <ul className="w-full">
          {Object.values(cart.products).map(({ product, quantity, price }) => {
            return (
              <li key={price.id}>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex items-center">
                    <button
                      onClick={() => removeCartItem(price.id)}
                      className="mr-2 focus:outline-0 text-red-600 font-bold opacity-[0.4] hover:opacity-[1] text-center"
                    >
                      x
                    </button>
                    <div className="flex items-center pr-2">
                      <div className="aspect-square h-40">
                        <img
                          alt={`${product.name}`}
                          src={product.images[0]}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <p className="text-left pl-2">Shoes - {price.nickname}</p>
                    </div>
                  </div>
                  <div className="flex flex flex-col items-center">
                    <p className="text-right">$100.00</p>
                    <div className="flex flex-auto flex-row justify-between w-[7rem] space-x-1">
                      <button
                        onClick={() => updateQuantity(price.id, +quantity - 1)}
                        className="px-2"
                      >
                        -
                      </button>
                      <input
                        onChange={(e) =>
                          updateQuantity(price.id, e.target.value)
                        }
                        name={price.id}
                        className="w-full text-center"
                        type="number"
                        pattern="[0-9]*"
                        value={quantity}
                      />
                      <button
                        onClick={() => updateQuantity(price.id, +quantity + 1)}
                        className="px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default CartPage
