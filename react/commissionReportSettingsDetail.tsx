import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Input, Button, Checkbox } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useMutation, useQuery } from 'react-apollo'

import { CREATE_TOKEN, EDIT_TOKEN, GET_TOKEN } from './graphql'

const CommissionReportSettingsDetail: FC = () => {
  const { navigate, route } = useRuntime()
  const [sellerSettingsToken, setSellerSettingsToken] =
    useState<SellerSettingsToken>({})

  const { data: getToken } = useQuery(GET_TOKEN, {
    ssr: false,
    pollInterval: 0,
    variables: {
      sellerId: route.params.sellerId,
    },
  })

  const [
    authenticationToken,
    { data: createToken, loading: loadingCreateToken },
  ] = useMutation(CREATE_TOKEN)

  const [editTokenMutation] = useMutation(EDIT_TOKEN)

  const handleCreateToken = () => {
    authenticationToken({ variables: { sellerId: route.params.sellerId } })
  }

  const handleIsEnable = () => {
    setSellerSettingsToken({
      ...sellerSettingsToken,
      enabled: !sellerSettingsToken.enabled,
    })
    editTokenMutation({
      variables: {
        sellerId: route.params.sellerId,
        isEnable: !sellerSettingsToken.enabled,
      },
    })
  }

  useEffect(() => {
    if (getToken) {
      const tokenData: SellerSettingsToken = {
        authenticationToken: getToken.getToken.autheticationToken,
        name: getToken.getToken.name,
        enabled: getToken.getToken.enabled,
      }

      setSellerSettingsToken(tokenData)
    }
  }, [getToken])

  useEffect(() => {
    if (createToken) {
      const newToken = createToken.createToken.autheticationToken

      setSellerSettingsToken({
        ...sellerSettingsToken,
        authenticationToken: newToken,
      })
    }
  }, [createToken, sellerSettingsToken])

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader
          title={
            <FormattedMessage
              id="admin/navigation.setting"
              values={{ name: sellerSettingsToken.name }}
            />
          }
          linkLabel={<FormattedMessage id="admin/navigation.settings" />}
          onLinkClick={() => {
            navigate({
              to: `/admin/app/commission-report/settings/`,
            })
          }}
        />
      }
    >
      <div className="mt7">
        <div className="mb5">
          <Input
            placeholder="Token"
            readOnly
            label="Seller Token"
            value={sellerSettingsToken.authenticationToken}
          />
        </div>
        <div className="mb3">
          <Checkbox
            checked={sellerSettingsToken.enabled}
            id="option-0"
            label={<FormattedMessage id="admin/form-settings.is-enable" />}
            name="default-checkbox-group"
            onChange={() => handleIsEnable()}
            value="option-0"
          />
        </div>
        <div className="mb4">
          <span className="mb4">
            <Button
              variation="primary"
              loading={loadingCreateToken}
              onClick={handleCreateToken}
            >
              {<FormattedMessage id="admin/form-settings.button-new" />}
            </Button>
          </span>
        </div>
      </div>
    </Layout>
  )
}

export default CommissionReportSettingsDetail
