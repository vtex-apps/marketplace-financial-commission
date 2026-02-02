[<i class="fa-brands fa-github"></i> Source code](https://github.com/vtex-apps/marketplace-financial-commission)

> ⚠️ This app is no longer maintained by VTEX. This means support and maintenance are no longer provided.

This app and all affiliated services are provided “as is”, without warranty of any kind, either express or implied. Neither the publisher nor its partners, affiliates, employees, or contractors guarantees that this app will meet your requirements, provide uninterrupted use, or operate without delay or without error. Neither the publisher nor its partners, affiliates, employees, or contractors assumes responsibility for any errors or malfunctions in the app and will not provide any support or maintenance.

All provisions and warranties of any kind, express or implied, including but not limited to any guarantees of performance, process integrity, or particular functionalities, are hereby disclaimed and excluded unless otherwise prohibited or restricted by applicable law.

# Financial commission for Marketplace

The Marketplace Financial App is responsible for displaying and generating sales commissions from affiliated sellers.

## Installation

Install `vtex.marketplace-financial-app` and `vtex.marketplace-financial-commission-cron` in your account.

```powershell
vtex install vtex.marketplace-financial-app@0.1.x
```

```powershell
vtex install vtex.marketplace-financial-commission-cron@1.1.x
```

> For more information about the `vtex.marketplace-financial-commission-cron` app [click here](https://github.com/vtex-apps/marketplace-financial-commission-cron).

## App behavior

- **Dashboard module**

   - List and filter all sellers
   - Aggregation of commissions for all orders in the range. 
   - Totalizers for the specified date range.
- **Orders Module**

  - List and filter all orders of the salesperson
  - List and filter all vendors' invoices
  - Order status and amount to be invoiced
  - At the end of the invoicing cycle, the orders to be posted are those with status Invoiced.
  - Once an order is created, the current commission will be fixed and will not change with a change in the seller's commission.
  - Detail per order commission per item. 

- **Invoices Module**

  - List All Seller Invoices at the end of the billing cycle. The orders to be counted are the ones with status: Partial, Paid, or Unpaid
  - email sent to Sellers
  
## Components financial commission

This app allows you to create an interface to display information about sellers' commissions.

Add the `components-financial-commission` to the `dependencies` section of your app's `manifest.json` file.

```powershell
"dependencies":{
  "vtex.components-financial-commission": "0.x"
}
```

Import the components that you need in your project, for example:

```jsx
import { detail as Detail } from 'vtex.components-financial-commission'

return (
    <Detail
      dataSellers={dataSellers}
      ordersQuery={SEARCH_ORDERS}
      invoiceMutation={CREATE_INVOICE}
      invoicesQuery={SELLER_INVOICES}
      settingsQuery={GET_SETTINGS}
    />
  )

/** Types */
interface DetailProps {
  account?: string
  dataSellers?: {
    getSellers: {
      pagination: Pagination
      sellers: [DataSellerSelect]
    }
  }
  ordersQuery: DocumentNode
  invoiceMutation: DocumentNode
  invoicesQuery: DocumentNode
  settingsQuery?: DocumentNode
}
```

The components available with the assigned types:

```jsx
import { settings as Settings } from 'vtex.components-financial-commission'

return (
    <Settings
      getSellersQuery={GET_SELLERS}
      createSettingsMutation={CREATE_SETTINGS}
      getSettingsQuery={GET_SETTINGS}
      editToken={EDIT_TOKEN}
      createTokenMutation={CREATE_TOKEN}
      getTokenQuery={GET_TOKEN}
    />
  )

/** Types */
interface DetailProps {
  account?: string
  dataSellers?: {
    getSellers: {
      pagination: Pagination
      sellers: [DataSellerSelect]
    }
  }
  ordersQuery: DocumentNode
  invoiceMutation: DocumentNode
  invoicesQuery: DocumentNode
  settingsQuery?: DocumentNode
}
```

```tsx
import { commissionReport as Report } from 'vtex.components-financial-commission'

return (
    <Report
      getSellersQuery={GET_SELLERS}
      searchStatsQuery={SEARCH_STATS}
      searchSellersQuery={SEARCH_SELLERS}
    />
  )

/** Types */
interface ReportProps {
  getSellersQuery: DocumentNode
  searchStatsQuery: DocumentNode
  searchSellersQuery: DocumentNode
}
```

```tsx
import { settingsDetail as SettingsDetail } from 'vtex.components-financial-commission'

return (
    <SettingsDetail
      createTokenMutation={CREATE_TOKEN}
      editToken={EDIT_TOKEN}
      getTokenQuery={GET_TOKEN}
      createSettingsMutation={CREATE_SETTINGS}
      getSettingsQuery={GET_SETTINGS}
    />
  )

/** Types */

interface SettingsDetailProps {
  createTokenMutation: DocumentNode
  editToken: DocumentNode
  getTokenQuery: DocumentNode
  createSettingsMutation: DocumentNode
  getSettingsQuery: DocumentNode
}
```

```jsx
import { invoiceDetail as InvoiceDetail } from 'vtex.components-financial-commission'

return (
    <InvoiceDetail
      invoiceQuery={GET_INVOICE}
      getTemplate={GET_TEMPLATE}
      sendEmail={SEND_EMAIL}
    />
  )

/** Types */

interface InvoiceDetailProps {
  invoiceQuery: DocumentNode
  getTemplate: DocumentNode
  sendEmail: DocumentNode
}
```

Use the types to identify the data to pass between component props.

> See more details about this app related to the technical topics [Components financial](https://github.com/vtex-apps/components-financial-commission/)

## Interfaces

To access the Dashboard of Commission Report App, search for the option **Orders** and then the option **Commission Report**.

The first screen that will show you is the dashboard

![image](https://user-images.githubusercontent.com/8409481/186941126-111f908c-67a9-4122-9241-c53fec81246d.png)

The filter for this section allows you:

1. Choose a seller name or multiple seller names to get only the information related to the sellers selected
2. Choose the start and final date of the commission reports.
3. Filter the information with the values selected.
4. Clear filters.

![image](https://user-images.githubusercontent.com/8409481/186941198-65549f07-0e03-408a-b77d-0a578a13cedb.png)

To view details of seller orders and invoices, press the actions button, then `Detail`.

![image](https://user-images.githubusercontent.com/8409481/186941256-5f7c8432-452b-4a0b-b8d2-a7a4afbbb0dd.png)

In the **Seller Invoice Detail**window, you can view the seller's orders and invoices. (If you come from the previous window, the filter has the status order by default `invoiced`, remove the value of the filter to get the status of all orders).

![image](https://user-images.githubusercontent.com/8409481/186941300-6a22973b-6f1b-418b-9fd5-f3ad5e7e0ccb.png)

Invoice detail:

![image](https://user-images.githubusercontent.com/8409481/186941386-e0e33978-d641-48a9-a79b-75b59ec4dd63.png)

The **Settings** section was built to define the integration type.

If you select the integration option `External`, you will need to add the token for an external app to retrieve seller orders and invoices.

Press the button `Generate a new one` to get the credentials to connect with external services

![image](https://user-images.githubusercontent.com/8409481/186941525-03be452e-cf31-48cd-985a-5d63fe0cfb60.png)

The Internal option does not require a token because the information about orders and invoices is searched in the VTEX database.

Only you must select the billing cycle [Daily, WEEKLY, MONTHLY]

![image](https://user-images.githubusercontent.com/8409481/186941617-3681e6b0-38a0-47dd-bdeb-38695c38b5b8.png)

Each seller has its own settings to be configured. To assign a different configuration to the seller, you must scroll to the **sellers' list**. Then, press the button `Actions` and then `Detail`.

![image](https://user-images.githubusercontent.com/8409481/186941674-813561c1-8c38-46db-b16d-a8ddda054b52.png)

Generate a token to get the information from external sources only for the selected seller. (The option Billing Cycle only will be available if, in the Settings window, the chosen option selected for the type of integration is `Internal`).

![image](https://user-images.githubusercontent.com/8409481/186941726-00bd56f3-858d-4654-a660-46b67b7148cf.png)
