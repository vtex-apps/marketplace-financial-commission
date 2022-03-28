declare module '*.png'
declare module '*.css'
declare module 'vtex.render-runtime'
declare module 'vtex.native-types'


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
  totalizers?: TotalizerProps
  toolbar?:  {
    newLine: {
      label: string,
      handleCallback: () => void
    }
  }

}
interface FilterProps {
  listSellers?: []
  sellersDashboard?: []
  startDatePicker?: Date
  finalDate?: Date
  locale: string
  optionsSelect?: []
}
interface TotalizerProps {
  item: [
    {
      label: string
      value: number
      iconBackgroundColor: string
      icon: object
    }
  ]
}
interface SettingsProps {
  openModal: boolean
  setOpenModal: (open: boolean) => void
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
