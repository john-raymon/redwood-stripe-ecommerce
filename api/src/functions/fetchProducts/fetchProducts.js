import { logger } from 'src/lib/logger'
import { fetchStripeProducts } from 'src/services/stripe/stripe'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async () => {
  logger.info('Invoked fetchProducts function')
  let statusCode = 200
  let header = {
    'Content-Type': 'application/json',
  }
  try {
    const response = await fetchStripeProducts()
    return {
      statusCode,
      header,
      body: JSON.stringify(response),
    }
  } catch (error) {
    statusCode = 500
    return {
      statusCode,
      header,
      body: JSON.stringify(
        (error && !error.success && error) || {
          success: false,
          message:
            'We are unable to display the products right now. Please try again later',
        }
      ),
    }
  }
}
