/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  IOContext,
  InstanceOptions,
  Serializable,
  GraphQLResponse,
} from '@vtex/api'
import { AppGraphQLClient } from '@vtex/api'

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

export default class DashboardIO extends AppGraphQLClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.sellers-graphql@8.x', context, {
      ...options,
      headers: {
        ...options?.headers,
        Cookie: `VtexIdclientAutCookie=${context.adminUserAuthToken}`,
      },
    })
  }

  public dashboard = async (): Promise<Dashboards> => {
    console.info('ENTRE AL DASHBOARD')
    const dataBody = {
      dateStart: '2022-03-21',
      dateEnd: '2022-03-21',
      sellers: [
        {
          id: 'customsoft982',
          account: 'customsoft982',
          name: 'CustomSoft',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'test104oct945',
          account: 'test104oct945',
          name: 'Test 1 04.oct',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'drumenprodcom243',
          account: 'drumenprodcom243',
          name: 'Drumen & ProdCom',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testadina5oct064',
          account: 'testadina5oct064',
          name: 'TestAdina5Oct',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sellerfusionworks894',
          account: 'sellerfusionworks894',
          name: 'Seller Fusion Works',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'conttest5oct640',
          account: 'conttest5oct640',
          name: 'Cont Test 5.oct',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'conttest620oct453',
          account: 'conttest620oct453',
          name: 'Cont test 6 20.oct',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'easysales274',
          account: 'easysales274',
          name: 'easysales easysales',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'catacompanytestsrl983',
          account: 'catacompanytestsrl983',
          name: 'Seller 1 RO',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'md1765',
          account: 'md1765',
          name: 'md2 md2',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'md2742',
          account: 'md2742',
          name: 'md2 md2',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'catatestselleritaljapan295',
          account: 'catatestselleritaljapan295',
          name: 'Seller 4 RO',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'seller21sept806',
          account: 'seller21sept806',
          name: 'seller21sept',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'seller7oct462',
          account: 'seller7oct462',
          name: 'seller7oct',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'ro3731',
          account: 'ro3731',
          name: 'ro3 ro3',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'qatesting16032020156',
          account: 'qatesting16032020156',
          name: 'QA Testing 16032020_',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testdec866',
          account: 'testdec866',
          name: 'testdecembrie',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'asircstroiegmailcom835',
          account: 'asircstroiegmailcom835',
          name: 'Seller 2 RO',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'robertb515',
          account: 'robertb515',
          name: 'robert b',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testiviteb096',
          account: 'testiviteb096',
          name: 'test iviteb',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'newsleer368',
          account: 'newsleer368',
          name: 'newsleer',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'rma1876',
          account: 'rma1876',
          name: 'rma1',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sell22sept203',
          account: 'sell22sept203',
          name: 'sell22sept',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'conttest5octupdate640',
          account: 'conttest5oct640',
          name: 'Cont Test 5.oct Update',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'companyname899',
          account: 'companyname899',
          name: 'Company name',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sdfgsdf996',
          account: 'sdfgsdf996',
          name: 'sdfgsdf',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sellernew14septembrie692',
          account: 'sellernew14septembrie692',
          name: 'sellernew14septembrie',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'vtextestsrl784',
          account: 'vtextestsrl784',
          name: 'Tataru Andrei',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'companycata31stroiero611',
          account: 'companycata31stroiero611',
          name: 'company cata31@stroie.ro',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'Test111',
          account: '',
          name: 'Flow',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'test10oct255',
          account: 'test10oct255',
          name: 'test10OCT',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'andrei1554',
          account: 'andrei1554',
          name: 'andrei & marcel srl',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'vtxonw1095',
          account: 'vtxonw1095',
          name: 'Seller2',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sell29sept537',
          account: 'sell29sept537',
          name: 'sell29sept',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'conttest205oct227',
          account: 'conttest205oct227',
          name: 'Cont Test 2 05oct',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'companienoua256',
          account: 'companienoua256',
          name: 'Companie Noua',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'test28sept359',
          account: 'test28sept359',
          name: 'test 28 sept',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'aug964',
          account: 'aug964',
          name: '22aug',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'catatestsellergardners258',
          account: 'catatestsellergardners258',
          name: 'Seller 3 RO',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'radutestordersagain564',
          account: 'radutestordersagain564',
          name: 'RaduTestOrdersAgain',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testsrl539',
          account: 'testsrl539',
          name: 'Gigel SRl',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'scurbanoutfilterssrl969',
          account: 'scurbanoutfilterssrl969',
          name: 'SC URBAN OUTFILTERS SRL',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testana303',
          account: 'testana303',
          name: 'Test Ana',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'conttest108nov405',
          account: 'conttest108nov405',
          name: 'Cont test 1 08.nov',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'shopifyCustomsoft',
          account: '',
          name: 'shopifyCustomsoft',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sell24sept451',
          account: 'sell24sept451',
          name: 'sell24sept',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'md1191',
          account: 'md1191',
          name: 'md1 md1',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'seller14septembrie930',
          account: 'seller14septembrie930',
          name: 'seller14septembrie',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'qatestingsa054',
          account: 'qatestingsa054',
          name: 'QA Testing SA',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'companietest1407',
          account: 'companietest1407',
          name: 'Companie test1',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sell30sept617',
          account: 'sell30sept617',
          name: 'sell30sept',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'rma2471',
          account: 'rma2471',
          name: 'rma2',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'companietest864',
          account: 'companietest864',
          name: 'Companie test',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'e2etestingsrl049',
          account: 'e2etestingsrl049',
          name: 'E2E Testing SRL',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'easysales429',
          account: 'easysales429',
          name: 'easySales429',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testingslr748',
          account: 'testingslr748',
          name: 'testingslr',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'easysales345',
          account: 'easysales345',
          name: 'EasySales',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'ro6102',
          account: 'ro6102',
          name: 'undefined undefined',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'qatesting160322208',
          account: 'qatesting160322208',
          name: 'QA Testing 160322',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sell21octrobert282',
          account: 'sell21octrobert282',
          name: 'Sell21oct_Robert',
          statistics: {
            ordersCount: 1,
            totalComission: 0,
            totalOrderValue: 16.99,
            outstandingBalance: 0,
          },
        },
        {
          id: 'zzzzzzzz856',
          account: 'zzzzzzzz856',
          name: 'zzzzzzzz',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'coretech',
          account: 'coretech',
          name: 'CORE Technologies SRL',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testcomp678',
          account: 'testcomp678',
          name: 'test comp',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'easysaleseasysales049',
          account: 'easysaleseasysales049',
          name: 'EasySales EasySales',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'ro1198',
          account: 'ro1198',
          name: 'ro1 ro1',
          statistics: {
            ordersCount: 1,
            totalComission: 0,
            totalOrderValue: 5.99,
            outstandingBalance: 0,
          },
        },
        {
          id: 'radutestorder598',
          account: 'radutestorder598',
          name: 'RaduTestOrder',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sellernou522',
          account: 'sellernou522',
          name: 'sellernou',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sellernou801',
          account: 'sellernou801',
          name: 'sellernou',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'drumenprodcom990',
          account: 'drumenprodcom990',
          name: 'Drumen ProdCom',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'testcompany818',
          account: 'testcompany818',
          name: 'Seller 1 MD',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'vtxfmj5956',
          account: 'vtxfmj5956',
          name: 'Seller Elefantqa TEST',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sellernouelefant14septembrie903',
          account: 'sellernouelefant14septembrie903',
          name: 'sellernouelefant14septembrie',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'seller11oct035',
          account: 'seller11oct035',
          name: 'seller11oct',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'test280',
          account: 'test280',
          name: 'test',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'seller22sept853',
          account: 'seller22sept853',
          name: 'seller22sept',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'newqa4testing149',
          account: 'newqa4testing149',
          name: 'NewQA4Testing',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'ionutsrl066',
          account: 'ionutsrl066',
          name: 'ionutsrl',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'scvtextestingqasrl983',
          account: 'scvtextestingqasrl983',
          name: 'SC VTEX Testing & QA SRL',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sell21octcata664',
          account: 'sell21octcata664',
          name: 'sell21oct_cata',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'seller19stroie233',
          account: 'seller19stroie233',
          name: 'Seller 19 stroie',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'vtxqrl9805',
          account: 'vtxqrl9805',
          name: 'Seller1',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'easysales685',
          account: 'easysales685',
          name: 'Easy Sales',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'ro2380',
          account: 'ro2380',
          name: 'ro2 ro2',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: '1',
          account: 'elefantqa',
          name: 'Elefant',
          statistics: {
            ordersCount: 0,
            totalComission: 0,
            totalOrderValue: 0,
            outstandingBalance: 0,
          },
        },
        {
          id: 'sell21octandrei113',
          account: 'sell21octandrei113',
          name: 'Sell21oct_Andrei',
          statistics: {
            ordersCount: 12,
            totalComission: 9.200000000000003,
            totalOrderValue: 70,
            outstandingBalance: 0,
          },
        },
      ],
      paging: {
        currentPage: 1,
        totalPages: 5,
      },
    }

    throwOnGraphQLErrors('Error getting items data from vtex.sellers-graphql')

    return dataBody
  }
}
