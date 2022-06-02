# Financial commission for Marketplace

# API REST
 > **Warning** 
 > Some endpoints exposed by this app are meant to be used in integrations. Pay attention to the Authorization header in each of the REST endpoints. If they require type: bearer it means that a token must be generated using this endpoint or via the admin panel.

 <br />

## List Sellers
![](https://img.shields.io/static/v1?label=&message=GET&color=blue) `https://{{accountmarketplace}}.myvtex.com/_v/sellers/list`

This endpoint lists all Sellers.

##### PATH PARAMS
| accountmarketplace  |
| ------------ |
|  Name of the VTEX account of the marketplace. |

```bash
curl --request GET \
  --url https://example.myvtex.com/_v/sellers/list
```

#### **Response**

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
	"items": [
		{
			"id": "1",
			"name": "seller name",
			"account": "seller account",
			"productCommissionPercentage": 0,
			"freightCommissionPercentage": 0,
			"isActive": true
		},
		{
			...
		}
	],
	"paging": {
		"total": 90
	}
}
```
__________________________________________________

## Generate Dashboard
![](https://img.shields.io/static/v1?label=&message=POST&color=brightgreen) `https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/{{accountmarketplace}}/master/dashboard/generate`

This endpoint is in charge of generating the commissions dashboard.

<br />

#### **Headers**
| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| X-VTEX-API-AppKey       | string      | Yes       |The AppKey configured by the merchant             |
| X-VTEX-API-AppToken     | string      | Yes       |The AppToken configured by the merchant           | 

<br />

#### **Path parameters**

| accountmarketplace  |
| ------------ |
|  Name of the VTEX account of the marketplace. |

<br />

#### **Request parameters allowed**
| Attribute   | Type        | Mandatory | Description |
| ----------- | ----------- |---------- | ----------- |
| dateStart   | string      | No        |Start date of generation in ```"yyyy-mm-dd"``` format          |
| dateEnd     | string      | No        |End date of generation in ```"yyyy-mm-dd"``` format            | 

<br />

```bash
curl --request POST \
  --url 'https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/example/master/dashboard/generate?dateStart=2022-04-25&dateEnd=2022-04-30' \
  --header 'X-VTEX-API-AppKey: 12345' \
  --header 'X-VTEX-API-AppToken: 12345'
```
<br />

#### **Response** 

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`\
If the number of days is less than 5 days

```json
{
	"Sellers": [
		{
			"Id": "vtex_marketplace_financial_commission_sellersdashboards-DSH-example-2022-01-16",
			"Href": "http://api.vtex.com/api/dataentities/vtex_marketplace_financial_commission_sellersdashboards/documents/DSH-example-2022-01-16?an=example&_schema=0.0.1",
			"DocumentId": "DSH-example-2022-01-16"
		}
	],
	"Statistics": [
		{
			"Id": "vtex_marketplace_financial_commission_statisticsdashboards-DSH-Statistics-example-2022-01-16",
			"Href": "http://api.vtex.com/api/dataentities/vtex_marketplace_financial_commission_statisticsdashboards/documents/DSH-Statistics-example-2022-01-16?an=example&_schema=0.0.1",
			"DocumentId": "DSH-Statistics-example-2022-01-16"
		}
	]
}
```
\
If the number of days is greater than 5 days

```json
{
	"message": "We are processing your request, please validate in 15 minutes."
}
```
<br />

> **Note** If the volume of information to be generated is large, it is recommended to do it for each day of the month.

__________________________________________________

## Search Sellers Dashboard
![](https://img.shields.io/static/v1?label=&message=GET&color=blue) `https://{{accountmarketplace}}.myvtex.com/_v/dashboard/sellers/search`

Retrieve commission information of the sellers,  for a specific date range, from the orders that are invoiced in VTEX.

<br />

#### **Path parameters**

| accountmarketplace  |
| ------------ |
|  Name of the VTEX account of the marketplace. |

<br />

#### **Request parameters allowed**
| Attribute     | Type        | Mandatory | Description |
| -----------   | ----------- |---------- | ----------- |
| dateStart     | string      | Yes       | Start date of consulting  in ```"yyyy-mm-dd"``` format          |
| dateEnd       | string      | Yes       | End date of consulting  in ```"yyyy-mm-dd"``` format            |
| page          | number      | Yes       | Page Number                                                     |
| pageSize      | number      | Yes       | Number of items per page                                        |
| sellersId     | string      | No        | Sellers to be returned in the query. Separate the seller's Id with commas. For example ```sellersId=sellerId1,sellerId2,sellerId3```. You can also leave empty to get all sellers. | 
| reIndex       | boolean     | No        | Performs reindex of the search by refreshing and updating the information. | 

<br />

```bash
curl --request GET \
  --url 'https://example.myvtex.com/_v/dashboard/sellers/search?dateStart=2022-04-01&dateEnd=2022-04-30&page=1&pageSize=20&reIndex=true' \
```
<br />

#### **Response** 

| Attribute          | Type        | Description                                      |
| --------------     | ----------- |------------------------------------------------- |
| dateStart          | string      | Start date of consulting  in ```"yyyy-mm-dd"``` format  |
| dateEnd            | string      | End date of consulting  in ```"yyyy-mm-dd"``` format    |
| sellers            | object      | Array with sellers                                      |
| id                 | string      | Seller id                                               |
| account            | string      | Seller account                                          |
| name               | string      | Seller name                                             |
| statistics         | object      | Object with seller's totals                             |
| ordersCount        | number      | Number of orders                                        |
| totalComission     | number      | Total commission value                                  |
| totalComission     | number      | Total order value                                       |
| outstandingBalance | number      | Total invoiced value                                    |


![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
	"dateStart": "2022-04-01",
	"dateEnd": "2022-04-30",
	"sellers": [
		{
			"id": "sellerId1",
			"account": "sellerId1",
			"name": "sellerId1_Name",
			"statistics": {
				"ordersCount": 252,
				"totalComission": 396.11,
				"totalOrderValue": 3784,
				"outstandingBalance": 0
			}
		},
    {
      ...
    }
	],
	"pagination": {
		"currentPage": 1,
		"pageSize": 20,
		"totalPage": 5
	}
}

```

<br />

### Search for specific sellersId
> When specifying one or more sellers in the search in the service it will additionally return the ```statistics``` object, returning the total statistics.

```bash
curl --request GET \
  --url 'https://example.myvtex.com/_v/dashboard/sellers/search?dateStart=2022-04-01&dateEnd=2022-04-30&page=1&pageSize=20&sellersId=sellerId1&reIndex=true' \
```
<br />

#### **Response** 

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
	"dateStart": "2022-04-01",
	"dateEnd": "2022-04-30",
	"sellers": [
		{
			"id": "sellerId1",
			"account": "sellerId1",
			"name": "sellerId1_Name",
			"statistics": {
				"ordersCount": 252,
				"totalComission": 396.11,
				"totalOrderValue": 3784,
				"outstandingBalance": 0
			}
		}
	],
	"statistics": {
		"ordersCount": 252,
		"totalComission": 396.11,
		"totalOrderValue": 3784
	},
	"pagination": {
		"currentPage": 1,
		"pageSize": 1,
		"totalPage": 1
	}
}

```

<br />
__________________________________________________

## Search Statistics Dashboard
![](https://img.shields.io/static/v1?label=&message=GET&color=blue) `https://{{accountmarketplace}}.myvtex.com/_v/dashboard/statistics/search`

Retrieve totals information of the sellers,  for a specific date range, from the orders that are invoiced in VTEX.

<br />

#### **Path parameters**

| accountmarketplace  |
| ------------ |
|  Name of the VTEX account of the marketplace. |

<br />

#### **Request parameters allowed**
| Attribute     | Type        | Mandatory | Description |
| -----------   | ----------- |---------- | ----------- |
| dateStart     | string      | Yes       | Start date of consulting  in ```"yyyy-mm-dd"``` format  |
| dateEnd       | string      | Yes       | End date of consulting  in ```"yyyy-mm-dd"``` format    | 

<br />

```bash
curl --request GET \
  --url 'https://example.myvtex.com/_v/dashboard/statistics/search?dateStart=2022-04-01&dateEnd=2022-04-30' \
```
<br />

#### **Response** 

| Attribute          | Type        | Description                                      |
| --------------     | ----------- |------------------------------------------------- |
| dateStart          | string      | Start date of consulting  in ```"yyyy-mm-dd"``` format  |
| dateEnd            | string      | End date of consulting  in ```"yyyy-mm-dd"``` format    |
| statistics         | object      | Object with seller's totals                             |
| ordersCount        | number      | Number of orders                                        |
| totalComission     | number      | Total commission value                                  |
| totalComission     | number      | Total order value                                       |

<br />

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
	"dateStart": "2022-04-01",
	"dateEnd": "2022-04-30",
	"statistics": {
		"ordersCount": 264,
		"totalComission": 398.61,
		"totalOrderValue": 4716.8
	}
}

```

<br />
__________________________________________________

## Search Orders
![](https://img.shields.io/static/v1?label=&message=GET&color=blue) `https://{{accountmarketplace}}.myvtex.com/_v/private/orders`

Retrieve a list of orders according to the filters described below, for a specific date range, from the orders placed in VTEX. 

<br />

> **Note** The date range is the creation date of the orders if the filtered status is ```Invoiced``` it will be filtered by invoice date in VTEX.

<br />

#### **Path parameters**

| accountmarketplace  |
| ------------ |
|  Name of the VTEX account of the marketplace. |

<br />

#### **Authorization**
> **Type** ```Bearer Token```

| Attribute | Type        | Mandatory | Description |
| ----------| ----------- |---------- | ----------- |
| Token     | string      | Yes       |The token configured by the marketplace in financial commission             |


<br />

#### **Request filters allowed**
| Attribute     | Type        | Mandatory | Description |
| -----------   | ----------- |---------- | ----------- |
| dateStart     | string      | Yes       | Start date of consulting  in ```"yyyy-mm-dd"``` format  |
| dateEnd       | string      | Yes       | End date of consulting  in ```"yyyy-mm-dd"``` format    |
| page          | number      | Yes       | Page Number                                             |
| perpage       | number      | Yes       | Number of items per page                                |
| sellerId      | string      | Yes       | Seller ID                                               |
| status        | string      | No        | Order Status Value                                      | 

<br />

##### **Order Status avaible to filter**

| Status                               | 
| ----------------------------------   | 
| waiting-for-sellers-confirmation     | 
| payment-pending                      | 
| payment-approved                     | 
| ready-for-handling                   | 
| handling                             | 
| invoiced                             |
| canceled                             |  

<br />

```bash
curl --request GET \
  --url 'https://example.myvtex.com/_v/private/orders?dateStart=2022-04-01&dateEnd=2022-01-30&page=1&perpage=100&sellerId=sellerId1' \
  --header 'Authorization: Bearer abcdefghijk12345'
```
<br />

#### **Response** 

| Attribute                   | Type        | Description                                             |
| ----------------------------| ----------- |-------------------------------------------------------- |
| data                        | object      | Order detail                                            |
| orderId                     | string      | Order Id                                                |
| sellerOrderId               | string      | Order Seller Id                                         |
| totalOrderValue             | number      | Payment value                                           |
| totalComission              | number      | Commission on payment value                             |
| status                      | string      | Order status                                            |
| statusDescription           | string      | Status description                                      |
| creationDate                | string      | Order creation date                                     |
| rate                        | object      | Rate detail object                                      |
| itemId                      | string      | Item id                                                 |
| nameItem                    | string      | Item name                                               |
| rate                        | object      | Array object to contain the rates configured by item    |
| freightCommissionPercentage | number      | Freight commission percentage                           |
| productCommissionPercentage | number      | Product commission percentage                           |
| paging                      | object      | Paging details object                                   |
| total                       | number      | Total number of items                                   |
| pages                       | number      | Paging total pages                                      |
| currentPage                 | number      | Current page                                            |
| perPage                     | number      | Paging total per Page                                   |

<br />

> **Warning**
>* Throttling: Each account can make up to 5000 requests per minute.
>* The maximum number of items per page is 100.
>* The maximum number of pages to process is 30, if the number of pages is more than 30, you must refine the filter.

<br />

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
	"data": [
		{
			"orderId": "123456789-01",
			"sellerOrderId": "GCB-123456789-01",
			"totalOrderValue": 27,
			"totalComission": 6.75,
			"status": "payment-approved",
			"statusDescription": "Pagamento Aprovado",
			"creationDate": "2022-05-25T11:08:01.3004547+00:00",
			"rate": [
				{
					"itemId": "116",
					"nameItem": "Sare marina grunjoasa Solaris, 500 g",
					"rate": {
						"freightCommissionPercentage": 0,
						"productCommissionPercentage": 25
					}
				}
			]
		},
		{
			...
		}
  ],
	"paging": {
		"total": 232,
		"pages": 3,
		"currentPage": 1,
		"perPage": 100
	}
}

```
<br />
__________________________________________________

## Create Token
![](https://img.shields.io/static/v1?label=&message=POST&color=brightgreen) `https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/{{accountmarketplace}}/master/_v/token/{{sellerId}}`

Create a security token for a specific seller.

<br />

#### **Headers**
| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| X-VTEX-API-AppKey       | string      | Yes       |The AppKey configured by the merchant             |
| X-VTEX-API-AppToken     | string      | Yes       |The AppToken configured by the merchant           | 

<br />

#### **Path parameters**

| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| accountmarketplace      | string      | Yes       | Name of the VTEX account of the marketplace.             |
| sellerId                | string      | Yes       | Seller Id                                                | 

<br />

```bash
curl --request POST \
  --url https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/example/master/_v/token/sellerId1 \
  --header 'X-VTEX-API-AppKey: 12345' \
  --header 'X-VTEX-API-AppToken: 12345'
```
<br />

#### **Response** 

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`\

```json
{
	"message": "Successful token creation",
	"sellerId": "sellerId1",
	"autheticationToken": "abcdefghijk123456789",
	"creationDate": "2022-05-31T19:56:26.291Z",
	"resultVBase": [
		{
			"path": "/example/master/buckets/vtex.marketplace-financial-commission/TokenConfig/files/martketplaceSellerID1",
			"hash": "F5C201AD90EBF1C5E7D8F9412334"
		}
	]
}

```

<br />
__________________________________________________

## Get Token
![](https://img.shields.io/static/v1?label=&message=GET&color=blue) `https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/{{accountmarketplace}}/master/_v/token/{{sellerId}}`

Retrieves the token information created for a specific seller.

<br />

#### **Headers**
| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| X-VTEX-API-AppKey       | string      | Yes       |The AppKey configured by the merchant             |
| X-VTEX-API-AppToken     | string      | Yes       |The AppToken configured by the merchant           | 

<br />

#### **Path parameters**

| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| accountmarketplace      | string      | Yes       | Name of the VTEX account of the marketplace.             |
| sellerId                | string      | Yes       | Seller Id                                                | 

<br />

```bash
curl --request GET \
  --url https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/example/master/_v/token/sellerId1 \
  --header 'X-VTEX-API-AppKey: 12345' \
  --header 'X-VTEX-API-AppToken: 12345'
```
<br />

#### **Response** 

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`\

```json
{
	"account": "sellerId1",
	"autheticationToken": "abcdefghijk123456789",
	"enabled": true,
	"name": "sellerId1_name",
	"id": "sellerId1"
}

```

<br />
__________________________________________________

## Update Token
![](https://img.shields.io/static/v1?label=&message=PUT&color=orange) `https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/{{accountmarketplace}}/master/_v/token/{{sellerId}}`

Allows you to update the status of the token

<br />

#### **Headers**
| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| X-VTEX-API-AppKey       | string      | Yes       |The AppKey configured by the merchant             |
| X-VTEX-API-AppToken     | string      | Yes       |The AppToken configured by the merchant           | 

<br />

#### **Path parameters**

| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| accountmarketplace      | string      | Yes       | Name of the VTEX account of the marketplace.             |
| sellerId                | string      | Yes       | Seller Id                                                | 

<br />

```bash
curl --request PUT \
  --url https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/example/master/_v/token/sellerId1 \
  --header 'X-VTEX-API-AppKey: 12345' \
  --header 'X-VTEX-API-AppToken: 12345'
```
<br />

#### **Request Body Example** 

| Attribute                   | Type        | Description                                             |
| ----------------------------| ----------- |-------------------------------------------------------- |
| enabled                     | boolean     | Indicates whether the token is enabled or disabled.     |


```json
{
	"enabled": true
}

```

<br />

#### **Response** 

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`\

```json
{
	"message": "Successful token update",
	"sellerId": "sellerId1",
	"lastModificationDate": "2022-05-31T19:57:54.745Z",
	"resultVBase": [
		{
			"path": "/example/master/buckets/vtex.marketplace-financial-commission/TokenConfig/files/martketplaceSellerID1",
			"hash": "6ADD1F2B0F5614326400BA0F3132456"
		}
	]
}

```
