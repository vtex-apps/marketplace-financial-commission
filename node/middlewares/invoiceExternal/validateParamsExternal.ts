/* eslint-disable no-useless-escape */
import type { ErrorLike } from '@vtex/api'
import { UserInputError } from '@vtex/api'
import { json } from 'co-body'

import { validationMessage } from '../../constants'
// import type { InvoiceExternal } from '../../typings/externalInvoice'

export async function validateParamsExternal(
  ctx: Context,
  next: () => Promise<any>
) {
  const { req, method } = ctx
  const requestData = await json(req) // as InvoiceExternal

  switch (method) {
    case 'PATCH':
      break

    case 'POST': {
      if (!requestData || JSON.stringify(requestData) === '{}') {
        const error: ErrorLike = {
          message: 'Body is requerid',
          name: '',
          stack: '',
        }

        throw new UserInputError(error)
      }

      const { createdDate, status, seller, jsonData } = requestData

      console.info(
        '🚀 ~ file: validateParamsExternal.ts ~ line 31 ~ createdDate',
        createdDate
      )

      if (!createdDate) {
        isRequerid(createdDate, 'createdDate')
      }

      if (!status) {
        isRequerid(status, 'status')
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
      }

      break
    }

    case 'DELETE':
      break

    default:
    case 'GET':
      break
  }

  ctx.state.body = { requestData }

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
