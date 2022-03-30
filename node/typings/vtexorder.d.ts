interface VtexOrder {
  orderId: string
  sequence: string
  marketplaceOrderId: string
  marketplaceServicesEndpoint: string
  sellerOrderId: string
  origin: string
  affiliateId: string
  salesChannel: string
  merchantName?: any
  status: string
  statusDescription: string
  value: number
  creationDate: string
  lastChange: string
  orderGroup: string
  totals: Total[]
  items: Item[]
  marketplaceItems: any[]
  clientProfileData: ClientProfileData
  giftRegistryData?: any
  marketingData?: any
  ratesAndBenefitsData: RatesAndBenefitsData
  shippingData: ShippingData
  paymentData: PaymentData
  packageAttachment: PackageAttachment
  sellers: Seller[]
  callCenterOperatorData?: any
  followUpEmail: string
  lastMessage?: any
  hostname: string
  invoiceData?: any
  changesAttachment?: any
  openTextField?: any
  roundingError: number
  orderFormId: string
  commercialConditionData?: any
  isCompleted: boolean
  customData?: any
  storePreferencesData: StorePreferencesData
  allowCancellation: boolean
  allowEdition: boolean
  isCheckedIn: boolean
  marketplace: Marketplace
  authorizedDate?: any
  invoicedDate?: any
  cancelReason?: any
  itemMetadata: ItemMetadata
  subscriptionData?: any
  taxData?: any
  checkedInPickupPointId?: any
  cancellationData?: any
  clientPreferencesData: ClientPreferencesData
}

interface ClientPreferencesData {
  locale: string
  optinNewsLetter?: any
}

interface ItemMetadata {
  Items: Item2[]
}

interface Item2 {
  Id: string
  Seller: string
  Name: string
  SkuName: string
  ProductId: string
  RefId: string
  Ean?: string
  ImageUrl: string
  DetailUrl: string
  AssemblyOptions: AssemblyOption[]
}

interface AssemblyOption {
  Id: string
  Name: string
  Required: boolean
  InputValues: InputValues
  Composition?: any
}

interface InputValues {
  'vtex.subscription.key.frequency': Vtexsubscriptionkeyfrequency
  'vtex.subscription.key.purchaseday': Vtexsubscriptionkeyfrequency
}

interface Vtexsubscriptionkeyfrequency {
  MaximumNumberOfCharacters: number
  Domain: string[]
}

interface Marketplace {
  baseURL: string
  isCertified?: any
  name: string
}

interface StorePreferencesData {
  countryCode: string
  currencyCode: string
  currencyFormatInfo: CurrencyFormatInfo
  currencyLocale: number
  currencySymbol: string
  timeZone: string
}

interface CurrencyFormatInfo {
  CurrencyDecimalDigits: number
  CurrencyDecimalSeparator: string
  CurrencyGroupSeparator: string
  CurrencyGroupSize: number
  StartsWithCurrencySymbol: boolean
}

interface Seller {
  id: string
  name: string
  logo: string
  fulfillmentEndpoint: string
}

interface PackageAttachment {
  packages: Package[]
}

interface Package {
  items: ItemPackages[]
  courier?: any
  invoiceNumber: string
  invoiceValue: number
  invoiceUrl: string
  issuanceDate: Date
  trackingNumber?: any
  invoiceKey: string
  trackingUrl?: any
  embeddedInvoice: string
  type: string
  courierStatus?: any
  cfop?: any
  restitutions: Restitutions
  volumes?: any
  EnableInferItems?: any
}

interface Restitutions {
  Refund: Refund
}

interface Refund {
  value: number
  giftCardData?: any
  items: ItemRefund[]
}

interface ItemRefund {
  id: string
  quantity: number
  price: number
  description?: any
}

interface ItemPackages {
  itemIndex: number
  quantity: number
  price: number
  description: string
  unitMultiplier: number
}

interface PaymentData {
  giftCards: any[]
  transactions: Transaction[]
}

interface Transaction {
  isActive: boolean
  transactionId: string
  merchantName: string
  payments: Payment[]
}

interface Payment {
  id: string
  paymentSystem: string
  paymentSystemName: string
  value: number
  installments: number
  referenceValue: number
  cardHolder?: any
  cardNumber?: any
  firstDigits?: any
  lastDigits?: any
  cvv2?: any
  expireMonth?: any
  expireYear?: any
  url?: any
  giftCardId?: any
  giftCardName?: any
  giftCardCaption?: any
  redemptionCode?: any
  group: string
  tid?: any
  dueDate?: any
  connectorResponses: Content
  giftCardProvider?: any
  giftCardAsDiscount?: any
  koinUrl?: any
  accountId?: any
  parentAccountId?: any
  bankIssuedInvoiceIdentificationNumber?: any
  bankIssuedInvoiceIdentificationNumberFormatted?: any
  bankIssuedInvoiceBarCodeNumber?: any
  bankIssuedInvoiceBarCodeType?: any
  billingAddress?: any
}

interface ShippingData {
  id: string
  address: Address
  logisticsInfo: LogisticsInfo[]
  trackingHints?: any
  selectedAddresses: Address[]
}

interface LogisticsInfo {
  itemIndex: number
  selectedSla: string
  lockTTL: string
  price: number
  listPrice: number
  sellingPrice: number
  deliveryWindow?: any
  deliveryCompany: string
  shippingEstimate: string
  shippingEstimateDate?: any
  slas: Sla[]
  shipsTo: string[]
  deliveryIds: DeliveryId[]
  deliveryChannel: string
  pickupStoreInfo: PickupStoreInfo
  addressId: string
  polygonName?: any
  pickupPointId?: any
  transitTime: string
}

interface DeliveryId {
  courierId: string
  courierName: string
  dockId: string
  quantity: number
  warehouseId: string
  accountCarrierName: string
}

interface Sla {
  id: string
  name: string
  shippingEstimate: string
  deliveryWindow?: any
  price: number
  deliveryChannel: string
  pickupStoreInfo: PickupStoreInfo
  polygonName?: any
  lockTTL: string
  pickupPointId?: any
  transitTime: string
}

interface PickupStoreInfo {
  additionalInfo?: any
  address?: any
  dockId?: any
  friendlyName?: any
  isPickupStore: boolean
}

interface RatesAndBenefitsData {
  id: string
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[]
}

interface RateAndBenefitsIdentifier {
  description?: string
  featured: boolean
  id: string
  name: string
  matchedParameters: MatchedParameters
  additionalInfo?: any
}

interface MatchedParameters {
  'combo@Marketing'?: string
  paymentMethodId?: string
  'product@CatalogSystem'?: string
}

interface ClientProfileData {
  id: string
  email: string
  firstName: string
  lastName: string
  documentType: string
  document?: any
  phone: string
  corporateName?: any
  tradeName?: any
  corporateDocument?: any
  stateInscription?: any
  corporatePhone?: any
  isCorporate: boolean
  userProfileId: string
  customerClass?: any
}

interface Item {
  uniqueId: string
  id: string
  productId: string
  ean?: string
  lockId: string
  itemAttachment: ItemAttachment
  attachments: any[]
  quantity: number
  seller: string
  name: string
  refId: string
  price: number
  listPrice: number
  manualPrice?: any
  priceTags: PriceTag[]
  imageUrl: string
  detailUrl: string
  components: any[]
  bundleItems: any[]
  params: any[]
  offerings: any[]
  sellerSku: string
  priceValidUntil?: any
  commission: number
  tax: number
  preSaleDate?: string
  additionalInfo: AdditionalInfo
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  isGift: boolean
  shippingPrice?: any
  rewardValue: number
  freightCommission: number
  priceDefinition: PriceDefinition
  taxCode: string
  parentItemIndex?: any
  parentAssemblyBinding?: any
  callCenterOperator?: any
  serialNumbers?: any
  assemblies: any[]
  costPrice: number
}

interface PriceDefinition {
  sellingPrices: SellingPrice[]
  calculatedSellingPrice: number
  total: number
}

interface SellingPrice {
  value: number
  quantity: number
}

interface AdditionalInfo {
  brandName: string
  brandId: string
  categoriesIds: string
  categories: Category[]
  productClusterId: string
  commercialConditionId: string
  dimension: Dimension
  offeringInfo?: any
  offeringType?: any
  offeringTypeId?: any
}

interface Dimension {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}

interface Category {
  id: number
  name: string
}

interface PriceTag {
  name: string
  value: number
  isPercentual: boolean
  identifier: string
  rawValue: number
  rate?: any
  jurisCode?: any
  jurisType?: any
  jurisName?: any
}

interface ItemAttachment {
  content: Content
  name?: any
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Content {}

interface Total {
  id: string
  name: string
  value: number
}
