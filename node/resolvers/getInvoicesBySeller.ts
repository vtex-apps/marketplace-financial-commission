import { MOCK_INVOICES } from '../mocks/invoices'

export const getInvoicesBySeller = async (
  _: unknown,
  __: unknown
): Promise<any> => {
  return MOCK_INVOICES
}
