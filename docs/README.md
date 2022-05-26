# Financial commission for Marketplace

# API REST
## List Sellers
![](https://img.shields.io/static/v1?label=&message=GET&color=brightgreen) `https://{{accountmarketplace}}.myvtex.com/_v/sellers/list`

This endpoint lists all Sellers.

##### PATH PARAMS
| accountmarketplace  |
| ------------ |
|  Name of the VTEX account of the marketplace. |

```bash
curl --request GET \
  --url https://example.myvtex.com/_v/sellers/list
```

##### RESPONSE

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

This endpoint is in charge of generating the commissions dashboard..

#### **Headers**
| Attribute               | Type        | Mandatory | Description |
| ----------------------- | ----------- |---------- | ----------- |
| X-VTEX-API-AppKey       | string      | Yes       |The AppKey configured by the merchant             |
| X-VTEX-API-AppToken     | string      | Yes       |The AppToken configured by the merchant           | 

#### **Path parameters**

| accountmarketplace  |
| ------------ |
|  Name of the VTEX account of the marketplace. |

#### **Request parameters allowed**
| Attribute   | Type        | Mandatory | Description |
| ----------- | ----------- |---------- | ----------- |
| dateStart   | string      | No        |Start date of generation in ```"yyyy-mm-dd"``` format          |
| dateEnd     | string      | No        |End date of generation in ```"yyyy-mm-dd"``` format            | 



```bash
curl --request POST \
  --url 'https://app.io.vtex.com/vtex.marketplace-financial-commission/v0/example/master/dashboard/generate?dateStart=2022-04-25&dateEnd=2022-04-30' \
  --header 'X-VTEX-API-AppKey: 12345' \
  --header 'X-VTEX-API-AppToken: 12345'
```

##### RESPONSE

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

