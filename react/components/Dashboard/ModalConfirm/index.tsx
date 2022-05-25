import type { FC } from 'react'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import {
  Alert,
  ButtonWithIcon,
  IconPlus,
  Input,
  ModalDialog,
  Spinner,
} from 'vtex.styleguide'

import { CREATE_INVOICE } from '../../../graphql'

const ModalConfirm: FC<ModalConfirmData> = (props) => {
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [validEmail, setValidEmail] = useState(true)
  const [empty, setEmpty] = useState(true)

  const EMAIL_PATTERN = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  const checkEmail = (emailAddress: string) => {
    const valid = EMAIL_PATTERN.test(emailAddress)

    if (!emailAddress) {
      setEmpty(true)

      return
    }

    setEmpty(false)
    if (!valid) {
      setValidEmail(false)
    } else {
      setValidEmail(true)
    }
  }

  const [createInvoice, { data, loading, error }] = useMutation(CREATE_INVOICE)

  const getErrorMessage = () => {
    if (empty) {
      return <FormattedMessage id="admin/modal-settings.email-empty" />
    }

    if (!validEmail) {
      return <FormattedMessage id="admin/modal-settings.email-invalid" />
    }

    return null
  }

  const handleCreateInvoice = (
    startDate: string,
    finalDate: string,
    name: string,
    id: string,
    emailAddress: string
    // eslint-disable-next-line max-params
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    createInvoice({
      variables: {
        invoiceData: {
          name,
          id,
          email: emailAddress,
          startDate,
          endDate: finalDate,
        },
      },
    })
  }

  if (loading) {
    return (
      <div className="mb5 flex justify-center">
        <Spinner />
      </div>
    )
  }

  if (data) {
    return (
      <Alert type="success">
        {<FormattedMessage id="admin/invoice-success" />}
      </Alert>
    )
  }

  if (error) {
    return (
      <Alert type="error">
        {<FormattedMessage id="admin/invoice-error" />}
      </Alert>
    )
  }

  return (
    <>
      <ModalDialog
        centered
        confirmation={{
          disabled: true,
          onClick: () => {
            if (empty || !validEmail) {
              return
            }

            handleCreateInvoice(
              props.sellerData.startDate,
              props.sellerData.finalDate,
              props.sellerData.sellerName,
              props.sellerData.id,
              email
            )
            setIsModalOpen(!isModalOpen)
          },
          label: 'Confirm',
        }}
        cancelation={{
          onClick: () => setIsModalOpen(!isModalOpen),
          label: 'Cancel',
        }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <div>
          <p>{props.messages.warning}</p>
          <p>{props.messages.confirmation}</p>
          <div>
            <Input
              placeholder="e-mail"
              size="large"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value)
                checkEmail(e.target.value)
              }}
              errorMessage={getErrorMessage()}
            />
          </div>
        </div>
      </ModalDialog>
      <div className="mb5 flex justify-end">
        <ButtonWithIcon
          icon={<IconPlus />}
          onClick={() => {
            setIsModalOpen(!isModalOpen)
          }}
        >
          {props.buttonMessage}
        </ButtonWithIcon>
      </div>
    </>
  )
}

export default ModalConfirm
