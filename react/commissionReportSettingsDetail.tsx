/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import {
  Layout,
  PageHeader,
  Input,
  Button,
  EXPERIMENTAL_Select as Select,
  Toggle,
  Box,
  EXPERIMENTAL_Table as Table,
  Alert,
} from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { useMutation, useQuery } from 'react-apollo'

import {
  CREATE_TOKEN,
  EDIT_TOKEN,
  GET_TOKEN,
  CREATE_SETTINGS,
  GET_SETTINGS,
} from './graphql'

const DATE_CUT_OPTIONS = [
  /*
  {
    value: 7,
    label: 'Weekly',
  },
  {
    value: 15,
    label: 'Bi-weekly',
  }, */
  {
    value: 1,
    label: 'Daily',
  },
  {
    value: 30,
    label: 'Monthly',
  },
]

const CommissionReportSettingsDetail: FC = () => {
  const { navigate, route, query, params } = useRuntime()

  console.info('params ', params)

  const [sellerSettingsToken, setSellerSettingsToken] =
    useState<SellerSettingsToken>({})

  const [selectedValue, setSelectValue] = useState<any | null>()
  const [openAlert, setOpenAlert] = useState(false)
  const [infoSettings, setInfoSettings] = useState<any>([])

  const { data: getToken } = useQuery(GET_TOKEN, {
    ssr: false,
    pollInterval: 0,
    variables: {
      sellerId: route.params.sellerId,
    },
  })

  const [createSettings, { data: dataSettings }] = useMutation(CREATE_SETTINGS)

  const { data: settings } = useQuery(GET_SETTINGS, {
    ssr: false,
    pollInterval: 0,
    variables: {
      id: sellerSettingsToken.name,
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

  const handleSaveBilling = () => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (selectedValue) {
      const nowDate = new Date()
      let date = ''
      let lastDateString = ''

      const month =
        nowDate.getMonth() + 1 <= 9
          ? `0${nowDate.getMonth() + 1}`
          : nowDate.getMonth() + 1

      if (selectedValue.label === 'Monthly') {
        const day =
          nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()

        date = `${nowDate.getFullYear()}-${month}-${day}`

        const lastDate = new Date(
          nowDate.getFullYear(),
          nowDate.getMonth() + 1,
          0
        )

        const lastMonth =
          lastDate.getMonth() + 1
            ? `0${lastDate.getMonth() + 1}`
            : lastDate.getMonth() + 1

        const lastDay =
          lastDate.getDate() < 10
            ? `0${lastDate.getDate()}`
            : lastDate.getDate()

        lastDateString = `${lastDate.getFullYear()}-${lastMonth}-${lastDay}`
      } else {
        const day =
          nowDate.getDate() < 10 ? `0${nowDate.getDate()}` : nowDate.getDate()

        const finalDay =
          nowDate.getDate() + 1 < 10
            ? `0${nowDate.getDate() + 1}`
            : nowDate.getDate() + 1

        date = `${nowDate.getFullYear()}-${month}-${day}`
        lastDateString = `${nowDate.getFullYear()}-${month}-${finalDay}`
      }

      createSettings({
        variables: {
          settingsData: {
            sellerName: sellerSettingsToken.name,
            startDate: date,
            endDate: lastDateString,
            billingCycle: selectedValue.label,
          },
        },
      })
    }
  }

  useEffect(() => {
    if (dataSettings) {
      setInfoSettings([
        {
          idbilling: dataSettings.createSettings.billingCycle,
          start: dataSettings.createSettings.startDate,
          end: dataSettings.createSettings.endDate,
        },
      ])

      setOpenAlert(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSettings])

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

  useEffect(() => {
    if (settings) {
      setInfoSettings([
        {
          idbilling: settings.getSettings.billingCycle,
          start: settings.getSettings.startDate,
          end: settings.getSettings.endDate,
        },
      ])
      setSelectValue({
        value: 30,
        label: settings.getSettings.billingCycle,
      })
    }
  }, [settings])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (getToken) {
      const tokenData: SellerSettingsToken = {
        authenticationToken: getToken.getToken.autheticationToken,
        name: getToken.getToken.name,
        enabled: getToken.getToken.enabled,
      }

      setSellerSettingsToken(tokenData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken])

  useEffect(() => {
    // eslint-disable-next-line vtex/prefer-early-return
    if (createToken) {
      const newToken = createToken.createToken.autheticationToken

      setSellerSettingsToken({
        ...sellerSettingsToken,
        authenticationToken: newToken,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createToken, sellerSettingsToken])

  return (
    <Layout
      pageHeader={
        <PageHeader
          title={
            <FormattedMessage
              id="admin/navigation.setting"
              values={{ name: query.name }}
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
      {query.integration === 'true' && (
        <div className="mt4">
          <Box>
            <h2 className="mt0 mb6">Billing cycle</h2>
            <div className="mb5 flex w-100">
              <div className="w-90">
                <Select
                  menuPosition="fixed"
                  options={DATE_CUT_OPTIONS}
                  value={selectedValue}
                  multi={false}
                  onChange={(values: any) => {
                    setSelectValue(values)
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
            {openAlert ? (
              <div className="mt7">
                <Alert type="success" onClose={() => setOpenAlert(false)}>
                  Data was updated successfully
                </Alert>
              </div>
            ) : (
              <div />
            )}
            <div className="mt7">
              <Table
                stickyHeader
                measures={[]}
                items={infoSettings}
                columns={[
                  {
                    id: 'idbilling',
                    title: 'Billing Cycle',
                  },
                  {
                    id: 'start',
                    title: 'Start Date',
                  },
                  {
                    id: 'end',
                    title: 'End Date',
                  },
                ]}
              />
            </div>
          </Box>
        </div>
      )}
    </Layout>
  )
}

export default CommissionReportSettingsDetail
