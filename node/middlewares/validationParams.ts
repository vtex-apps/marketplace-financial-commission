import { validationMessage } from '../constants'

export async function validationParams(type: string, query: any) {
  switch (type) {
    case 'Sellers': {
      const { dateStart, dateEnd, page, pageSize } = query

      isRequerid(dateStart, 'dateStart')
      isRequerid(dateEnd, 'dateEnd')
      isRequerid(page, 'page')
      isRequerid(pageSize, 'pageSize')
      isValidDate(dateStart, 'dateStart')
      isValidDate(dateEnd, 'dateEnd')

      break
    }

    case 'Orders': {
      const { sellerName, dateStart, dateEnd, page, perpage } = query

      isRequerid(dateStart, 'dateStart')
      isRequerid(dateEnd, 'dateEnd')
      isRequerid(page, 'page')
      isRequerid(perpage, 'perpage')
      isRequerid(sellerName, 'sellerName')
      isValidDate(dateStart, 'dateStart')
      isValidDate(dateEnd, 'dateEnd')
      break
    }

    case 'Statistics': {
      const { dateStart, dateEnd } = query

      isRequerid(dateStart, 'dateStart')
      isRequerid(dateEnd, 'dateEnd')
      isValidDate(dateStart, 'dateStart')
      isValidDate(dateEnd, 'dateEnd')
      break
    }

    default:
      break
  }
}

function isValidDate(dateString: string, name: string) {
  // First check for the pattern
  const regexDate = new RegExp(/^\d{4}-\d{1,2}-\d{1,2}$/)

  if (!regexDate.test(dateString)) {
    throw new CustomError(
      validationMessage.ERROR_MESSAGE_DATE_FORMAT,
      {
        field: name,
      },
      { type: typeof dateString }
    )
  }

  // Parse the date parts to integers
  const parts = dateString.split('-')
  const day = parseInt(parts[2], 10)
  const month = parseInt(parts[1], 10)
  const year = parseInt(parts[0], 10)

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    throw new CustomError(
      validationMessage.ERROR_MESSAGE_DATE_RANGE_MONTH_AND_YEAR,
      {
        field: name,
      },
      { type: typeof dateString }
    )
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29
  }

  // Check the range of the day
  const rangeday = day > 0 && day <= monthLength[month - 1]

  if (!rangeday) {
    throw new CustomError(
      validationMessage.ERROR_MESSAGE_DATE_RANGE_DAY,
      {
        field: name,
      },
      { type: typeof dateString }
    )
  }
}

function isRequerid(value: string | number, name: string) {
  if (!value || value === '' || value === null) {
    throw new CustomError(
      validationMessage.DEFAULT_ERRORMESSAGE_FIELD_IS_REQUIRED,
      {
        field: name,
      },
      { type: typeof value }
    )
  }
}

class CustomError extends Error {
  public field: any
  public type: any

  constructor(
    message: string,
    { field }: { field: string },
    { type }: { type: string }
  ) {
    super(message)
    this.field = field
    this.type = type
    this.stack = ''
  }
}
