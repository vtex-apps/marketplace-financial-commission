import readFile from '../utils/readFile'

const MESSAGE_BODY = readFile('../assets/invoiceDetail.html')

export const invoiceDetailMessage = {
  Name: 'invoice-detail',
  FriendlyName: 'Invoice Detail',
  // Description: null,
  IsDefaultTemplate: false,
  // AccountId: null,
  // AccountName: null,
  // ApplicationId: null,
  IsPersisted: true,
  IsRemoved: false,
  Type: '',
  Templates: {
    email: {
      To: '{{message.to}}',
      // CC: null,
      // BCC: null,
      Subject: 'Invoice Detail',
      Message: MESSAGE_BODY,
      Type: 'E',
      ProviderId: '00000000-0000-0000-0000-000000000000',
      // ProviderName: null,
      IsActive: true,
      withError: false,
    },
    sms: {
      Type: 'S',
      // ProviderId: null,
      // ProviderName: null,
      IsActive: false,
      withError: false,
      Parameters: [],
    },
  },
}
