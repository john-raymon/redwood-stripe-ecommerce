import { logger } from 'src/lib/logger'
import { validate } from '@redwoodjs/api'

const stripeClient = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const fetchStripeProducts = async () => {
  try {
    const { data = [] } = await stripeClient.products.list()
    return { success: true, products: data }
  } catch (error) {
    logger.error('fetchStripeProducts', error)
    return { success: false, error }
  }
}

export const fetchPricesForProduct = async (productId = '') => {
  try {
    const { data = [] } = await stripeClient.prices.list({
      product: productId,
    })
    return { success: true, prices: data }
  } catch (error) {
    logger.error('fetchPricesForProduct', error)
    return { success: false, error }
  }
}

export const createCheckoutSession = async (lineItems) => {
  validate(lineItems, 'List of items', {
    presence: true,
  })
  const session = await stripeClient.checkout.sessions.create({
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
    line_items: lineItems,
    mode: 'payment',
  })
  return session
}
