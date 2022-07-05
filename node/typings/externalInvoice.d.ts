const enum TypeStatusInvoice {
  PAID = 'paid',
  UNPAID = 'unpaid',
  PARTIAL = 'partial',
}

export interface InvoiceExternal {
  status: TypeStatusInvoice
  createdDate: string
  seller: SellerData
  jsonData: string
}

export interface SellerData {
  name: string
  id: string
  contact: ContactData
}

export interface ContactData {
  phone?: string
  email: string
}

export interface EmailInvoiceData {
  id?: string
  status: string
  createdDate: string
  seller: SellerData
  jsonData: JSON
}
