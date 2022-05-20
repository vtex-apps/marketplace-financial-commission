import Handlebars from 'handlebars'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'
import { Button, Layout, Spinner } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import { GET_INVOICE } from './graphql'
import { getTemplate, sendEmail } from './services'

const InvoiceDetail: FC = () => {
  const { route } = useRuntime()
  const { params } = route
  const { id } = params

  const [template, setTemplate] = useState('')
  const [invoice, setInvoice] = useState<any>({})

  const { data } = useQuery(GET_INVOICE, {
    ssr: false,
    pollInterval: 0,
    variables: {
      id,
    },
  })

  useEffect(() => {
    setInvoice(data?.getInvoice)
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTemplate()

      if (!response) {
        return
      }

      setTemplate(response.template.Templates.email.Message)
    }

    fetchData()
  }, [template])

  if (!template) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <Spinner />
      </div>
    )
  }

  const hbTemplate = Handlebars.compile(template)
  const htmlString = hbTemplate({ id, ...invoice })

  return (
    <Layout>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          paddingTop: '100%',
        }}
      >
        <iframe
          srcDoc={htmlString}
          title="invoice detail"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
      <div className="mt5 flex justify-center">
        <Button
          onClick={async () => {
            const response = await sendEmail({
              email: invoice.seller.contact.email,
              jsonData: { ...invoice },
            })

            console.info('Response from send email********************')
            console.info(response)
          }}
        >
          <FormattedMessage id="admin/form-settings.button-email" />
        </Button>
      </div>
    </Layout>
  )
}

export default InvoiceDetail
