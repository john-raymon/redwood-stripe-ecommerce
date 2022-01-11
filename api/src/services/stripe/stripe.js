import { logger } from 'src/lib/logger'

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
