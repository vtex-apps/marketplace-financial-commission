export function getDatesInvoiced(dateRange?: DateRange): DatesInvoice {
  if (dateRange?.start !== undefined && dateRange?.end !== undefined) {
    const start = new Date(dateRange.start)
    const end = new Date(dateRange.end)
    const [formattedDateInitial] = start.toISOString().split('T')
    const [formattedDateEnd] = end.toISOString().split('T')

    return {
      dateInvoiceInitial: formattedDateInitial.concat('T00:00:00.001Z'),
      dateInvoiceEnd: formattedDateEnd.concat('T23:59:59.999Z'),
      formattedDate: formattedDateInitial,
    }
  }

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const [formattedDate] = yesterday.toISOString().split('T')

  return {
    dateInvoiceInitial: formattedDate.concat('T00:00:00.001Z'),
    dateInvoiceEnd: formattedDate.concat('T23:59:59.999Z'),
    formattedDate,
  }
}

export function createKeyToken(): string {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  const charactersLength = characters.length

  for (let i = 0; i < 70; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export function numberOfDays(date1: Date, date2: Date) {
  const date1utc = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  )

  const date2utc = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  )

  const day = 1000 * 60 * 60 * 24

  return (date2utc - date1utc) / day + 1
}
