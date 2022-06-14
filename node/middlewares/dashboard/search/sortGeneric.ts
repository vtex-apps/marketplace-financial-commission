export const sortGeneric = (
  arr: any[],
  fieldsArray = 'totalComission DESC'
) => {
  let result = 0

  const fields = fieldsArray.split(',')

  fields.forEach((element) => {
    arr.sort((a, b) => {
      const [field, order] = element.split(' ')

      if (field.includes('id') || field.includes('name')) {
        if (order === 'DESC') {
          result = String(b[field]).localeCompare(a[field])

          return result
        }

        if (order === 'ASC') {
          result = String(a[field]).localeCompare(b[field])

          return result
        }

        return 0
      }

      if (order === 'DESC') {
        const field2 = 'ordersCount'

        result =
          b.statistics[field] - a.statistics[field] ||
          b.statistics[field2] - a.statistics[field2]

        return result
      }

      if (order === 'ASC') {
        const field2 = 'ordersCount'

        result =
          a.statistics[field] - b.statistics[field] ||
          a.statistics[field2] - b.statistics[field2]

        return result
      }

      return 0
    })

    return result
  })

  return arr
}
