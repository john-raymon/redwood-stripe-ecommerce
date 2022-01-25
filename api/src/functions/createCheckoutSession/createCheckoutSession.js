import { logger } from 'src/lib/logger'
import { createCheckoutSession } from 'src/services/stripe/stripe'

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
export const handler = async (event, context) => {
  logger.info('Invoked createCheckoutSession function')

  let statusCode = 200

  const headers = {
    'Content-Type': 'application/json',
  }

  const { lineItems } = JSON.parse(event.body)

  try {
    const checkoutSession = await createCheckoutSession(lineItems)
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        success: true,
        checkoutSession,
      }),
    }
  } catch (error) {
    statusCode = 500
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        error,
        success: false,
      }),
    }
  }
}
