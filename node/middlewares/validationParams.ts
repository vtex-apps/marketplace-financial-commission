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

    case 'Generate': {
      const { dateStart, dateEnd } = query

      if (
        (!dateStart && dateEnd) ||
        (dateStart && !dateEnd) ||
        (dateStart && dateEnd)
      ) {
        isRequerid(dateStart, 'dateStart')
        isRequerid(dateEnd, 'dateEnd')
        isValidDate(dateStart, 'dateStart')
        isValidDate(dateEnd, 'dateEnd')

        numberOfDays(new Date(dateStart), new Date(dateEnd))

        isToday(dateEnd)
      }

      break
    }

    case 'ListSellers': {
      const { page, pageSize } = query

      isRequerid(page, 'page')
      isRequerid(pageSize, 'pageSize')

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
      400,
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
      400,
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
      400,
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
      400,
      validationMessage.DEFAULT_ERRORMESSAGE_FIELD_IS_REQUIRED,
      {
        field: name,
      },
      { type: typeof value }
    )
  }
}

function numberOfDays(date1: Date, date2: Date) {
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
  const numberDays = (date2utc - date1utc) / day + 1

  if (numberDays > 30) {
    throw new CustomError(
      400,
      validationMessage.ERROR_MESSAGE_DATE_BETWEEN_DAYS,
      {
        field: `dateStart and dateEnd `,
      },
      { type: typeof date1 }
    )
  }
}

function isToday(dateEnd: string) {
  const [date1] = new Date().toISOString().split('T')

  console.info(date1)

  if (date1 === dateEnd) {
    throw new CustomError(
      400,
      validationMessage.ERROR_MESSAGE_DATE_END_EQUAL_OR_GREATER,
      {
        field: `dateEnd `,
      },
      { type: typeof date1 }
    )
  }

  if (dateEnd >= date1) {
    throw new CustomError(
      400,
      validationMessage.ERROR_MESSAGE_DATE_END_EQUAL_OR_GREATER,
      {
        field: `dateEnd `,
      },
      { type: typeof date1 }
    )
  }
}

class CustomError extends Error {
  public field: any
  public type: any

  // eslint-disable-next-line max-params
  constructor(
    public status: number,
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
