import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'vtex.styleguide'

import { getTemplate } from './services'

const InvoiceDetail: FC = () => {
  const [template, setTemplate] = useState('')

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
    return <Spinner />
  }

  return <>{template}</>
}

export default InvoiceDetail
