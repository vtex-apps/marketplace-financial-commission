export function getDatesInvoiced(): DatesInvoice {
  const yesterdayDateMonth = new Date(
    new Date().setDate(new Date().getDate() - 1)
  )

  return {
    invoicedDateInit: yesterdayDateMonth
      .toISOString()
      .split('T')[0]
      .concat('T00:00:00.001Z'),
    invoicedDateEnd: yesterdayDateMonth
      .toISOString()
      .split('T')[0]
      .concat('T23:59:59.999Z'),
  }
}
