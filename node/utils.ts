export function getDatesInvoiced(): DatesInvoice {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

  const [formattedDate] = yesterday.toISOString().split('T')

  return {
    dateInvoiceInitial: formattedDate.concat('T00:00:00.001Z'),
    dateInvoiceEnd: formattedDate.concat('T23:59:59.999Z'),
    formattedDate,
  }
}

export function createToken(): string {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const charactersLength = characters.length

  for (let i = 0; i < 70; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}
