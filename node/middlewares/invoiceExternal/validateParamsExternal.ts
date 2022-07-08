/* eslint-disable no-useless-escape */
import type { ErrorLike } from '@vtex/api'
import { AuthenticationError, UserInputError } from '@vtex/api'
import { json } from 'co-body'

import { INVOICE_STATUS, validationMessage } from '../../constants'
import { typeIntegration } from '../../utils/typeIntegration'
// import type { InvoiceExternal } from '../../typings/externalInvoice'

export async function validateParamsExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    req,
    method,
    vtex: {
      route: { params },
    },
  } = ctx

  const requestData = await json(req) // as InvoiceExternal

  switch (method) {
    case 'PATCH': {
      const integration = await typeIntegration(ctx)

      if (TypeIntegration.external !== integration) {
        throw new AuthenticationError('Invalid type integration')
      }

      if (!requestData || JSON.stringify(requestData) === '{}') {
        const error: ErrorLike = {
          message: 'Body is requerid',
          name: '',
          stack: '',
        }

        throw new UserInputError(error)
      }

      const { invoiceCreatedDate, status, seller, jsonData } = requestData

      if (!invoiceCreatedDate) {
        isRequerid(invoiceCreatedDate, 'invoiceCreatedDate')
      }

      if (!status) {
        isRequerid(status, 'status')
      } else {
        validateStatus(status)
      }

      if (!seller) {
        isRequerid(seller, 'seller')
      }

      const { id, name, contact } = seller

      if (!id) {
        isRequerid(id, 'seller.id')
      }

      if (!name) {
        isRequerid(name, 'seller.name')
      }

      if (!contact) {
        isRequerid(contact, 'seller.contact')
      }

      const { email } = contact

      if (!email) {
        isRequerid(email, 'seller.contact.email')
      } else {
        validateEmail(email)
      }

      if (!jsonData) {
        isRequerid(jsonData, 'jsonData')
      } else {
        isJsonString(jsonData)
      }

      ctx.state.body = { requestData }

      break
    }

    case 'POST': {
      const integration = await typeIntegration(ctx)

      if (TypeIntegration.external !== integration) {
        throw new AuthenticationError('Invalid type integration')
      }

      if (!params.id || params.id === '' || params.id === null) {
        const error: ErrorLike = {
          message: `The param id is requerid`,
          name: 'id',
          stack: '',
        }

        throw new UserInputError(error)
      }

      if (!requestData || JSON.stringify(requestData) === '{}') {
        const error: ErrorLike = {
          message: 'Body is requerid',
          name: '',
          stack: '',
        }

        throw new UserInputError(error)
      }

      const { invoiceCreatedDate, status, seller, jsonData } = requestData

      if (!invoiceCreatedDate) {
        isRequerid(invoiceCreatedDate, 'invoiceCreatedDate')
      }

      if (!status) {
        isRequerid(status, 'status')
      } else {
        validateStatus(status)
      }

      if (!seller) {
        isRequerid(seller, 'seller')
      }

      const { id, name, contact } = seller

      if (!id) {
        isRequerid(id, 'seller.id')
      }

      if (!name) {
        isRequerid(name, 'seller.name')
      }

      if (!contact) {
        isRequerid(contact, 'seller.contact')
      }

      const { email } = contact

      if (!email) {
        isRequerid(email, 'seller.contact.email')
      } else {
        validateEmail(email)
      }

      if (!jsonData) {
        isRequerid(jsonData, 'jsonData')
      } else {
        isJsonString(jsonData)
      }

      ctx.state.body = { requestData }
      ctx.vtex.route.params.id = params.id

      break
    }

    case 'DELETE':
      if (!params.id || params.id === '' || params.id === null) {
        const error: ErrorLike = {
          message: `The param id is requerid`,
          name: 'id',
          stack: '',
        }

        throw new UserInputError(error)
      }

      ctx.vtex.route.params.id = params.id

      break

    case 'GET':
      break

    default:
      break
  }

  await next()
}

function isRequerid(value: string | number, name: string) {
  if (!value || value === '' || value === null) {
    const error: ErrorLike = {
      message: `The field ${name} is requerid`,
      name,
      stack: '',
    }

    throw new UserInputError(error)
  }
}

function validateEmail(email: string) {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  const emailTest = regexp.test(String(email).toLowerCase())

  if (emailTest !== true) {
    const error: ErrorLike = {
      message: validationMessage.ERROR_EMAIL,
      name: email,
    }

    throw new UserInputError(error)
  }
}

function validateStatus(value: string) {
  try {
    if (
      !Object.values(INVOICE_STATUS).includes(
        value as 'unpaid' | 'partial' | 'paid'
      )
    ) {
      throw new UserInputError(
        `Invalid status '${value}'. The valid values are 'unpaid' | 'partial' | 'paid'`
      )
    }
  } catch (error) {
    throw new UserInputError(
      `Invalid status '${value}'. The valid values are 'unpaid' | 'partial' | 'paid'`
    )
  }
}

function isJsonString(str: string) {
  if (typeof str !== 'string') {
    const errorString: ErrorLike = {
      message: validationMessage.ERROR_JSONDATA,
      name: 'jsonData',
    }

    throw new UserInputError(errorString)
  }

  try {
    const jsonData = JSON.parse(str)

    return typeof jsonData === 'object'
  } catch (err) {
    const errorJson: ErrorLike = {
      message: validationMessage.ERROR_JSONDATA,
      name: 'jsonData',
    }

    throw new UserInputError(errorJson)
  }
}
