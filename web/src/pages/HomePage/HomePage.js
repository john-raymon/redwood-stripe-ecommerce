import { useContext, useEffect, useState } from 'react'

import { MetaTags } from '@redwoodjs/web'
import { Button } from 'lite-react-ui'

import { useCartContext } from 'src/context/CartContext'

const HomePage = () => {
  const [products, setProducts] = useState({})

  const [selectedProductPrices, setSelectedProductPrices] = useState({})

  useEffect(() => {
    fetch(`${window.RWJS_API_URL}/fetchProducts`)
      .then((response) => response.json())
      .then(({ success = false, products = [] }) => {
        if (success) {
          const productsModified = products
            .map((product) => {
              const prices = product.prices.reduce((acc, price) => {
                acc[price.id] = price
                return acc
              }, {})
              return { ...product, pricesById: prices }
            })
            .reduce((acc, product) => {
              acc[product.product.id] = product
              return acc
            }, {})
          setProducts(productsModified)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const { addToCart } = useCartContext()

  function handleChange(e) {
    console.log('e.target.name', e.target.name)
    console.log('e.target.value', e.target.value)
    setSelectedProductPrices({
      ...selectedProductPrices,
      [e.target.name]: e.target.value,
    })
  }

  // TODO: set-up quantity parameter
  function handleSubmit(e, productId) {
    e.preventDefault()
    const { product, pricesById } = products[productId]
    const selectedPrice = selectedProductPrices[productId]
    const cartItem = {
      product,
      price: pricesById[selectedPrice],
    }
    addToCart(cartItem, 1)
    // TODO: Add logic to add item to cart
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <ul className="w-full max-w-[45.75rem] mx-auto pb-[5rem] space-y-[6rem]">
        {Object.values(products).map(({ product, prices, pricesById }) => {
          return (
            <li key={product.id} className="w-full items-center">
              <div className="flex flex-col justify-center">
                <img
                  alt="Long-sleeve white shirt with 202> on it."
                  className="w-full"
                  src={product.images[0]}
                />
                <h2 className="uppercase text-merch-blue text-center">
                  {product.name}&nbsp;-&nbsp;
                  {selectedProductPrices[product.id] ? (
                    `$${
                      pricesById[selectedProductPrices[product.id]]
                        .unit_amount &&
                      (
                        pricesById[selectedProductPrices[product.id]]
                          .unit_amount / 100
                      ).toFixed(2)
                    } USD`
                  ) : (
                    <span className="opacity-[0.7]">
                      (Select a size to view price)
                    </span>
                  )}
                </h2>
                <form
                  name={product.id}
                  onChange={handleChange}
                  onSubmit={(e) => handleSubmit(e, product.id)}
                >
                  <select
                    required
                    name={product.id}
                    defaultValue={selectedProductPrices[product.id] || ''}
                    className="flex flex-shrink self-center border-b-2 border-merch-blue my-2 p-2 bg-transparent text-left mx-auto w-auto"
                  >
                    <option value="" disabled>
                      Select Size
                    </option>
                    {prices.map(({ id = '', nickname = '' }) => {
                      return (
                        <option value={id} key={id}>
                          {nickname}
                        </option>
                      )
                    })}
                  </select>
                  <Button className="mx-auto my-4 !border-[transparent] !bg-merch-blue !text-merch-yellow !uppercase !rounded-[1rem] !text-[1.1rem] !leading-[1.25rem] !py-[1.125rem]">
                    Add to cart
                  </Button>
                </form>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default HomePage
