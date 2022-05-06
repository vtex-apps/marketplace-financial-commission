import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  PageHeader,
  Input,
  Button,
  Checkbox,
  EXPERIMENTAL_Select as Select,
  Toggle,
  Box,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useMutation, useQuery } from 'react-apollo'

import { CREATE_TOKEN, EDIT_TOKEN, GET_TOKEN } from './graphql'

const DATE_CUT_OPTIONS = [
  {
    value: 1,
    label: 'Daily',
  },
  {
    value: 7,
    label: 'Weekly',
  },
  {
    value: 15,
    label: 'Bi-weekly',
  },
  {
    value: 30,
    label: 'Monthly',
  },
]

const CommissionReportSettingsDetail: FC = () => {
  const { navigate, route } = useRuntime()
  const [sellerSettingsToken, setSellerSettingsToken] =
    useState<SellerSettingsToken>({})

  const [selectedValue, setSelectValue] = useState({})

  const { data: getToken } = useQuery(GET_TOKEN, {
    ssr: false,
    pollInterval: 0,
    variables: {
      sellerId: route.params.sellerId,
    },
  })

  /* const [billingCycle, { data: createBilling, loading: loadingBilling }] =
    useMutation(CREATE_TOKEN) */

  const [
    authenticationToken,
    { data: createToken, loading: loadingCreateToken },
  ] = useMutation(CREATE_TOKEN)

  const [billingCycle] = useMutation(CREATE_TOKEN)

  const [editTokenMutation] = useMutation(EDIT_TOKEN)

  const handleCreateToken = () => {
    authenticationToken({ variables: { sellerId: route.params.sellerId } })
  }

  const handleSaveBilling = () => {
    billingCycle({})
  }

  const handleIsEnable = () => {
    setSellerSettingsToken({
      ...sellerSettingsToken,
      enabled: !sellerSettingsToken.enabled,
      authenticationToken: !sellerSettingsToken.enabled
        ? sellerSettingsToken.authenticationToken
        : '',
    })
    editTokenMutation({
      variables: {
        sellerId: route.params.sellerId,
        isEnable: !sellerSettingsToken.enabled,
      },
    })
  }

  /* useEffect(() => {
    if (selectedValue) {
      billingCycle({ variables: { sellerName: sellerSettingsToken.name } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]) */

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
        <Box>
          <h2 className="mt0 mb6">Autentication Token</h2>
          <div className="mt2 mb8">
            <Toggle
              label={sellerSettingsToken.enabled ? 'Activated' : 'Deactivated'}
              checked={sellerSettingsToken.enabled}
              semantic
              onChange={() => handleIsEnable()}
            />
          </div>
          <div className="mb5">
            <Input
              placeholder="Token"
              readOnly
              label="Seller Token"
              value={sellerSettingsToken.authenticationToken}
            />
          </div>
          <div className="mb4">
            <span className="mb4">
              <Button
                variation="primary"
                loading={loadingCreateToken}
                onClick={handleCreateToken}
                disabled={!sellerSettingsToken.enabled}
              >
                {<FormattedMessage id="admin/form-settings.button-new" />}
              </Button>
            </span>
          </div>
        </Box>
      </div>
      <div className="mt4">
        <Box>
          <h2 className="mt0 mb6">Billing cycle</h2>
          <div className="mb5 flex w-100">
            <div className="w-90">
              <Select
                menuPosition="fixed"
                options={DATE_CUT_OPTIONS}
                multi={false}
                onChange={(values: any) => {
                  setSelectValue(JSON.stringify(values, null, 2))
                }}
              />
            </div>
            <div className="w-10 pl2">
              <Button
                variation="primary"
                loading={loadingCreateToken}
                onClick={handleSaveBilling}
              >
                SAVE
              </Button>
            </div>
          </div>
          <div className="w-100">
            <p className="t-small w-100 c-muted-1">
              <FormattedMessage id="admin/modal-settings.billingCycle-helpText" />
            </p>
          </div>
        </Box>
      </div>
    </Layout>
  )
}

export default CommissionReportSettingsDetail
