import type {
  IOContext,
  InstanceOptions,
  Serializable,
  GraphQLResponse,
} from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

import { SELLERS } from './queries'

console.log('GET_SELLERS ', SELLERS)

class CustomGraphQLError extends Error {
  public graphQLErrors: any

  constructor(message: string, graphQLErrors: any[]) {
    super(message)
    this.graphQLErrors = JSON.stringify(graphQLErrors)
  }
}

function throwOnGraphQLErrors<T extends Serializable>(message: string) {
  return function maybeGraphQLResponse(response: GraphQLResponse<T>) {
    if (response?.errors && response.errors.length > 0) {
      throw new CustomGraphQLError(message, response.errors)
    }

    return response
  }
}

export default class SellersIO extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.sellers-graphql@8.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        Cookie: `VtexIdclientAutCookie=${context.adminUserAuthToken}`,
      },
    })
  }

  public seller =  async (): Promise<any> => {

    const dataBody = {
      "items": [
          {
              "id": "1",
              "name": "Elefant",
              "account": "elefantqa",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "andrei1554",
              "name": "andrei & marcel srl",
              "account": "andrei1554",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "asircstroiegmailcom835",
              "name": "Seller 2 RO",
              "account": "asircstroiegmailcom835",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "aug964",
              "name": "22aug",
              "account": "aug964",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "catacompanytestsrl983",
              "name": "Seller 1 RO",
              "account": "catacompanytestsrl983",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "catatestsellergardners258",
              "name": "Seller 3 RO",
              "account": "catatestsellergardners258",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "catatestselleritaljapan295",
              "name": "Seller 4 RO",
              "account": "catatestselleritaljapan295",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "companienoua256",
              "name": "Companie Noua",
              "account": "companienoua256",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "companietest1407",
              "name": "Companie test1",
              "account": "companietest1407",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "companietest864",
              "name": "Companie test",
              "account": "companietest864",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "companycata31stroiero611",
              "name": "company cata31@stroie.ro",
              "account": "companycata31stroiero611",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "companyname899",
              "name": "Company name",
              "account": "companyname899",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "conttest108nov405",
              "name": "Cont test 1 08.nov",
              "account": "conttest108nov405",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "conttest205oct227",
              "name": "Cont Test 2 05oct",
              "account": "conttest205oct227",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "conttest5oct640",
              "name": "Cont Test 5.oct",
              "account": "conttest5oct640",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "conttest5octupdate640",
              "name": "Cont Test 5.oct Update",
              "account": "conttest5oct640",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "conttest620oct453",
              "name": "Cont test 6 20.oct",
              "account": "conttest620oct453",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "coretech",
              "name": "CORE Technologies SRL",
              "account": "coretech",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "customsoft982",
              "name": "CustomSoft",
              "account": "customsoft982",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "drumenprodcom243",
              "name": "Drumen & ProdCom",
              "account": "drumenprodcom243",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "drumenprodcom990",
              "name": "Drumen ProdCom",
              "account": "drumenprodcom990",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "e2etestingsrl049",
              "name": "E2E Testing SRL",
              "account": "e2etestingsrl049",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "easysales274",
              "name": "easysales easysales",
              "account": "easysales274",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "easysales345",
              "name": "EasySales",
              "account": "easysales345",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "easysales429",
              "name": "easySales429",
              "account": "easysales429",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "easysales685",
              "name": "Easy Sales",
              "account": "easysales685",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "easysaleseasysales049",
              "name": "EasySales EasySales",
              "account": "easysaleseasysales049",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "ionutsrl066",
              "name": "ionutsrl",
              "account": "ionutsrl066",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "md1191",
              "name": "md1 md1",
              "account": "md1191",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "md1765",
              "name": "md2 md2",
              "account": "md1765",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "md2742",
              "name": "md2 md2",
              "account": "md2742",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "newqa4testing149",
              "name": "NewQA4Testing",
              "account": "newqa4testing149",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "newsleer368",
              "name": "newsleer",
              "account": "newsleer368",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "qatesting16032020156",
              "name": "QA Testing 16032020_",
              "account": "qatesting16032020156",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "qatesting160322208",
              "name": "QA Testing 160322",
              "account": "qatesting160322208",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "qatestingsa054",
              "name": "QA Testing SA",
              "account": "qatestingsa054",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "radutestorder598",
              "name": "RaduTestOrder",
              "account": "radutestorder598",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "radutestordersagain564",
              "name": "RaduTestOrdersAgain",
              "account": "radutestordersagain564",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "rma1876",
              "name": "rma1",
              "account": "rma1876",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "rma2471",
              "name": "rma2",
              "account": "rma2471",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "ro1198",
              "name": "ro1 ro1",
              "account": "ro1198",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "ro2380",
              "name": "ro2 ro2",
              "account": "ro2380",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "ro3731",
              "name": "ro3 ro3",
              "account": "ro3731",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "ro6102",
              "name": "undefined undefined",
              "account": "ro6102",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "robertb515",
              "name": "robert b",
              "account": "robertb515",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "scurbanoutfilterssrl969",
              "name": "SC URBAN OUTFILTERS SRL",
              "account": "scurbanoutfilterssrl969",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "scvtextestingqasrl983",
              "name": "SC VTEX Testing & QA SRL",
              "account": "scvtextestingqasrl983",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sdfgsdf996",
              "name": "sdfgsdf",
              "account": "sdfgsdf996",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sell21octandrei113",
              "name": "Sell21oct_Andrei",
              "account": "sell21octandrei113",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sell21octcata664",
              "name": "sell21oct_cata",
              "account": "sell21octcata664",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sell21octrobert282",
              "name": "Sell21oct_Robert",
              "account": "sell21octrobert282",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sell22sept203",
              "name": "sell22sept",
              "account": "sell22sept203",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sell24sept451",
              "name": "sell24sept",
              "account": "sell24sept451",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sell29sept537",
              "name": "sell29sept",
              "account": "sell29sept537",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sell30sept617",
              "name": "sell30sept",
              "account": "sell30sept617",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "seller11oct035",
              "name": "seller11oct",
              "account": "seller11oct035",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": false
          },
          {
              "id": "seller14septembrie930",
              "name": "seller14septembrie",
              "account": "seller14septembrie930",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "seller19stroie233",
              "name": "Seller 19 stroie",
              "account": "seller19stroie233",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "seller21sept806",
              "name": "seller21sept",
              "account": "seller21sept806",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "seller22sept853",
              "name": "seller22sept",
              "account": "seller22sept853",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "seller7oct462",
              "name": "seller7oct",
              "account": "seller7oct462",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sellerfusionworks894",
              "name": "Seller Fusion Works",
              "account": "sellerfusionworks894",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sellernew14septembrie692",
              "name": "sellernew14septembrie",
              "account": "sellernew14septembrie692",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sellernou522",
              "name": "sellernou",
              "account": "sellernou522",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sellernou801",
              "name": "sellernou",
              "account": "sellernou801",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "sellernouelefant14septembrie903",
              "name": "sellernouelefant14septembrie",
              "account": "sellernouelefant14septembrie903",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "shopifyCustomsoft",
              "name": "shopifyCustomsoft",
              "account": null,
              "productCommissionPercentage": 10,
              "freightCommissionPercentage": 10,
              "isActive": true
          },
          {
              "id": "test104oct945",
              "name": "Test 1 04.oct",
              "account": "test104oct945",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "test10oct255",
              "name": "test10OCT",
              "account": "test10oct255",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "Test111",
              "name": "Flow",
              "account": null,
              "productCommissionPercentage": 34,
              "freightCommissionPercentage": 12,
              "isActive": true
          },
          {
              "id": "test280",
              "name": "test",
              "account": "test280",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "test28sept359",
              "name": "test 28 sept",
              "account": "test28sept359",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "testadina5oct064",
              "name": "TestAdina5Oct",
              "account": "testadina5oct064",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "testana303",
              "name": "Test Ana",
              "account": "testana303",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": false
          },
          {
              "id": "testcomp678",
              "name": "test comp",
              "account": "testcomp678",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "testcompany818",
              "name": "Seller 1 MD",
              "account": "testcompany818",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "testdec866",
              "name": "testdecembrie",
              "account": "testdec866",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "testingslr748",
              "name": "testingslr",
              "account": "testingslr748",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "testiviteb096",
              "name": "test iviteb",
              "account": "testiviteb096",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "testsrl539",
              "name": "Gigel SRl",
              "account": "testsrl539",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "vtextestsrl784",
              "name": "Tataru Andrei",
              "account": "vtextestsrl784",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": false
          },
          {
              "id": "vtxfmj5956",
              "name": "Seller Elefantqa TEST",
              "account": "vtxfmj5956",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "vtxonw1095",
              "name": "Seller2",
              "account": "vtxonw1095",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "vtxqrl9805",
              "name": "Seller1",
              "account": "vtxqrl9805",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          },
          {
              "id": "zzzzzzzz856",
              "name": "zzzzzzzz",
              "account": "zzzzzzzz856",
              "productCommissionPercentage": 0,
              "freightCommissionPercentage": 0,
              "isActive": true
          }
      ],
      "paging": {
          "total": 85
      }
    }

    throwOnGraphQLErrors(
      'Error getting items data from vtex.sellers-graphql'
    )

    return dataBody
  }
}
