# Financial commission for Marketplace

# API REST
## List Sellers
![](https://img.shields.io/static/v1?label=&message=POST&color=brightgreen) `https://{{accountmarketplace}}.myvtex.com/_v/sellers/list`

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

