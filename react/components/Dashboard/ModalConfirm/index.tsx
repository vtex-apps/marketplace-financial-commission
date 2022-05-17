import type { FC } from 'react'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { Alert, ButtonWithIcon, IconPlus, Input, ModalDialog, Spinner } from 'vtex.styleguide'
import { CREATE_INVOICE } from '../../../graphql'


const ModalConfirm: FC<ModalConfirmData> = (props) => {
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [validEmail, setValidEmail] = useState(true)
  const [empty, setEmpty] = useState(true)

  const EMAIL_PATTERN = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  
  const checkEmail = (email: string) => {
    const valid = EMAIL_PATTERN.test(email)

    if (!email) {
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
      return "Specify an email address"
    }

    if (!validEmail) {
      return "Invalid email address"
    }

    return null
  }

  const handleCreateInvoice = (
    startDate: string,
    finalDate: string,
    sellerName: string,
    email: string
    // eslint-disable-next-line max-params
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    createInvoice({
      variables: {
        invoiceData: {
          name: sellerName,
          email,
          startDate,
          endDate: finalDate,
        },
      },
    })
  }

  if (loading) {
    return <div className="mb5 flex justify-center">
      <Spinner />
    </div>
  }

  if (data) {
    return <Alert type="success">Invoice Created</Alert>
  }

  if (error) {
    return <Alert type="error">Error: { error }</Alert>
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
