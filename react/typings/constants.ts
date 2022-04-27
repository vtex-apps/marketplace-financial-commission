type StatusOptions = {
  [key: string]: {
    bgColor: string
    fontColor: string
  }
}

export const status: StatusOptions = {
  'waiting-for-sellers-confirmation': {
    bgColor: '#134CD8',
    fontColor: '#FFF',
  },
  'payment-pending': {
    bgColor: '#134CD8',
    fontColor: '#FFF',
  },
  'payment-approved': {
    bgColor: '#8BC34A',
    fontColor: '#FFF',
  },
  'ready-for-handling': {
    bgColor: '#134CD8',
    fontColor: '#FFF',
  },
  handling: {
    bgColor: '#134CD8',
    fontColor: '#FFF',
  },
  invoiced: {
    bgColor: '#134CD8',
    fontColor: '#FFF',
  },
  canceled: {
    bgColor: '#FF4C4C',
    fontColor: '#FFF',
  },
}
