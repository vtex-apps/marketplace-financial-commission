
![discount-1](https://user-images.githubusercontent.com/8409481/186940326-28bafc96-6cbd-436d-9361-7a738abdbb26.png)


# Financial commission for Marketplace

Marketplace Financial App is an application that is responsible for displaying, generating sales commissions from affiliated sellers.

## **Install**:

Install `vtex.marketplace-financial-app` and `vtex.marketplace-financial-commission-cron` in your account.

```powershell
vtex install vtex.marketplace-financial-app@0.1.x
```

```powershell
vtex install vtex.marketplace-financial-commission-cron@1.1.x
```

> **Note**. For more information about the `vtex.marketplace-financial-commission-cron` app [click here](https://github.com/vtex-apps/marketplace-financial-commission-cron).

</br>

## **Features**:

- **Dashboard module**

   - List and filter all sellers
   - Aggregation of commissions for all orders in the range. 
   - Totalizers for the specified date range.
- **Orders Module**

  - List and filter all orders of the salesperson
  - List and filter all vendor's invoices
  - Order status and amount to be invoiced
  - At the end of the invoicing cycle, the orders to be posted are those with status Invoiced.
  - Once an order is created, the current commission will be fixed and will not change with a change in the seller's commission.
  - Detail per order commission per item. 

- **Invoices Module**

  - List All Seller Invoices at the end of the billing cycle, the orders to be counted are the ones with status: Partial, Paid or Unpaid
  - email sent to Sellers
  
</br>

## **Components financial commission**:

This app allows you create the interface to show the information about the commissions of the sellers.

Add the components financial app in your new apps in the section dependencies of the manifest file.

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

Use the types to identify the data to pass between props of the components.

`⚠️` See more details about this app related with the technical topics [Components financial](https://github.com/vtex-apps/components-financial-commission/)

</br>

## Interfaces

To access of the Dashboard of Commission Report App search the option **Orders** and then the option **Commission Report**.

The first screen that be will show you is the dashboard

![image](https://user-images.githubusercontent.com/8409481/186941126-111f908c-67a9-4122-9241-c53fec81246d.png)

The filter for this section allows you:

1. Choose a seller name o multi seller names to get only the information related to the sellers selected
2. Choose the start and final date of the commission reports.
3. Filter the information with the values selected.
4. Clear filters.

![image](https://user-images.githubusercontent.com/8409481/186941198-65549f07-0e03-408a-b77d-0a578a13cedb.png)

To go to detail of seller orders and invoices, press the actions button and then `Detail`

![image](https://user-images.githubusercontent.com/8409481/186941256-5f7c8432-452b-4a0b-b8d2-a7a4afbbb0dd.png)

In the window **Seller Invoice Detail**, you can see the sellers orders and invoices. (If you come from the previous window, the filter has the status order by default `invoiced`, remove the value of the filter to get the status of all orders).

![image](https://user-images.githubusercontent.com/8409481/186941300-6a22973b-6f1b-418b-9fd5-f3ad5e7e0ccb.png)

Invoice detail:

![image](https://user-images.githubusercontent.com/8409481/186941386-e0e33978-d641-48a9-a79b-75b59ec4dd63.png)

The **Settings** section was built to define the integration type.

If you select the integration option `External`, it will be necessary to add the token of an external app to provide the information of orders and invoices of sellers.

Press the button `Generate a new one` to get the credentials of connect with external services

![image](https://user-images.githubusercontent.com/8409481/186941525-03be452e-cf31-48cd-985a-5d63fe0cfb60.png)

The Internal option not requires a token because the information of orders and invoices is search in the VTEX database.

Only you must select the billing cycle [Daily, WEEKLY, MONTHLY]

![image](https://user-images.githubusercontent.com/8409481/186941617-3681e6b0-38a0-47dd-bdeb-38695c38b5b8.png)

Each seller has its settings to be configured. To assign a different configuration to the seller, you must scroll to the **sellers' list**. Then, press the button `Actions` and then `Detail`.

![image](https://user-images.githubusercontent.com/8409481/186941674-813561c1-8c38-46db-b16d-a8ddda054b52.png)

Generate a token to get the information from external sources only for the selected seller. (The option Billing Cycle only will be available if in the Settings window the chosen option selected for the type integration is `Internal`).

![image](https://user-images.githubusercontent.com/8409481/186941726-00bd56f3-858d-4654-a660-46b67b7148cf.png)

</br>

## API REST  
   
Endpoints exposed for the integration process with the financial commission app, for more information [click here](docs/API_REST_README.md).

</br>

### Important:

`🚫` Please, don't upload the file `yarn.lock`. Remove this file of the `commit`.

`✅` When you clone the project, create your work branch from `develop`.

`✅` Upload your changes by making a `pull request`.

`⚠️` Not forget to update the version and documentation. This last only if this is necessary.
