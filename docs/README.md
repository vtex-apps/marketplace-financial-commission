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


## API REST  
   
Endpoints exposed for the integration process with the financial commission app, for more information [click here](https://github.com/vtex-apps/marketplace-financial-commission/blob/develop/docs/API_REST_README.md).
