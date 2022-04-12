export function getDatesInvoiced(): DatesInvoice {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

  const [formattedDate] = yesterday.toISOString().split('T')

  return {
    dateInvoiceInitial: formattedDate.concat('T00:00:00.001Z'),
    dateInvoiceEnd: formattedDate.concat('T23:59:59.999Z'),
    formattedDate,
  }
}
