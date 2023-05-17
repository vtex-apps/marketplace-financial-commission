import xmlbuilder from 'xmlbuilder'
import Papa from 'papaparse'

import { getInvoice } from './getInvoice'

function generateXMLNode(parent: any, obj: any): void {
  Object.entries(obj).forEach(([key, value]) => {
    // eslint-disable-next-line no-restricted-globals
    const nodeName = isNaN(Number(key)) ? key : `n${key}`

    if (typeof value === 'object' && value !== null) {
      const childNode = parent.ele(nodeName)

      generateXMLNode(childNode, value)
    } else {
      parent.ele(nodeName, {}, value)
    }
  })
}

function generateXML(data: any[]): string {
  const root = xmlbuilder.create('items')

  data.forEach((item) => {
    const entry = root.ele('item')

    generateXMLNode(entry, item)
  })

  return root.end({ pretty: true })
}

function flattenObject(obj: any, prefix = ''): any {
  return Object.entries(obj).reduce((acc: any, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null) {
      return { ...acc, ...flattenObject(value, newKey) }
    }

    acc[newKey] = value

    return acc
  }, {})
}

function generateCSV(data: any[]): string {
  const flattenedData = data.map((item) => flattenObject(item))

  return Papa.unparse(flattenedData)
}

type FileType = 'xml' | 'csv'

type GenerateFileFunction = (invoice: any) => string

type GenerateFileObject = {
  [key in FileType]: GenerateFileFunction
} & {
  default: () => never
}

const generateFile: GenerateFileObject = {
  xml: (invoice: any) => generateXML([invoice]),
  csv: (invoice: any) => generateCSV([invoice]),
  default: () => {
    throw new Error('Invalid file type')
  },
}

export async function generateFileByType(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: {
        params: { type },
      },
    },
  } = ctx

  const invoice = await getInvoice(ctx)

  if (!invoice) {
    throw new Error('Invoice not found')
  }

  console.info('invoice: ', invoice)
  const genarator =
    generateFile[type as keyof GenerateFileObject] || generateFile.default

  const file = genarator(invoice)

  ctx.status = 200
  ctx.set('Content-Type', 'application/{type}')
  ctx.set('Content-Disposition', `attachment; filename=${invoice?.id}.${type}`)
  ctx.body = file

  ctx.set('Cache-Control', 'no-cache')
  await next()
}
