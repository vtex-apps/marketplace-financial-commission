/**
 * Used to return rejected results from a pool of promise's results
 * @param item result of a promise
 */
export function assertRejected(item: PromiseResult): item is RejectResult {
  return item.status === 'rejected'
}
