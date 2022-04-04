declare module '*.png'
declare module '*.css'
declare module '*.gql'
declare module 'vtex.render-runtime'
declare module 'vtex.native-types'
declare module '*.graphql'


interface TableProps {
  schemaTable: {
    properties:{
      id?: {
        title: string,
        width: number,
        cellRenderer?: () => void
      },
      seller?:{
        title: string,
        width: number,
      },
      totalOrders?:{
        title: string,
        width: number,
      },
      amountOrders?:{
        title: string,
        width: number,
      },
      totalCommission?:{
        title: string,
        width: number,
      },
      outstanding?:{
        title: string,
        width: number,
      },
      actions?:{
        title: string,
        width: number,
        cellRenderer?: () => void
      }
    }
  }
  itemTable: []
  actions: []
  totalizers?: StatsTotalizer[]
  toolbar?:  {
    newLine: {
      label: string,
      handleCallback: () => void
    }
  }

}
interface FilterProps {
  dataWithoutFilter?: []
  setDataWithoutFilter?: any
  startDatePicker?: Date
  finalDatePicker?: Date
  locale: string
  optionsSelect?: []
  setStartDate?: any
  setFinalDate?: any
}
interface SettingsProps {
  openModal: boolean
  setOpenModal: (open: boolean) => void
}

interface StatsTotalizer {
  label: string
  value: string
  iconBackgroundColor?: string
  icon?: object
}

enum SortOrder {
  ASC = 'ASC',
  DSC = 'DSC',
}

type Sorted = {
  /** order of the sorting */
  order?: SortOrder
  /** reference prop */
  by?: string
}

interface TableData {
  items: any
  schemaTable: any
}
