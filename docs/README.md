# Financial commission for Marketplace

# API REST
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

> :warning: If the volume of information to be generated is large, it is recommended to do it for each day of the month.

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
  --url 'https://example.myvtex.com/_v/dashboard/sellers/search?dateStart=2022-05-25&dateEnd=2022-05-25&page=1&pageSize=100&reIndex=true' \
```
<br />

#### **Response** 

![](https://img.shields.io/static/v1?label=&message=200&color=green) `OK`

```json
{
	"dateStart": "2022-05-25",
	"dateEnd": "2022-05-25",
	"sellers": [
		{
			"id": "1",
			"account": "sellerAccount",
			"name": "sellerAccount",
			"statistics": {
				"ordersCount": 0,
				"totalComission": 0,
				"totalOrderValue": 0,
				"outstandingBalance": 0
			}
		},
		{
			...
		} 
    ],
  "pagination": {
  "currentPage": 1,
  "pageSize": 100,
  "totalPage": 1
	}
}

```


