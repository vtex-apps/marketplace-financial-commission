// eslint-disable-next-line import/no-nodejs-modules
import crypto from 'crypto'
/**
 * Creates a random string with a prefix
 * @example
 * randomId('sellerA') => "sellerA-5322552a1592"
 */
export function randomId(prefix: string) {
  const length = 6

  return crypto.randomBytes(length).toString('hex').replace(/^/, `${prefix}_`)
}
