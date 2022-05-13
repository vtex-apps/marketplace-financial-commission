import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  ButtonWithIcon,
  IconFilter,
  IconDelete,
  ButtonGroup,
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import styles from '../../../styles.css'
import SelectComponent from './select'
import DatePickerComponent from './datePicker'
const Filter: FC<FilterProps> = (props) => {
  const [dataFilter, setDataFilter] = useState<DataFilter[]>([])
  const [statusFilter, setStatusfilter] = useState<any[]>([])
  const [startDateFilter, setDateFilter] = useState<Date | string>('')
  const [finalDateFilter, setFinalDateFilter] = useState<Date | string>('')
  const { setQuery, query } = useRuntime()

  const getDate = (date: string) => {
    const dateConverter = new Date(date)
    const month = dateConverter.getMonth() + 1
    const monthString = month <= 9 ? `0${month}` : month
    const day = dateConverter.getDate()
    const dayString = day <= 9 ? `0${day}` : day

    return `${dateConverter.getFullYear()}-${monthString}-${dayString}`
  }

  const changesValuesTable = () => {
    // eslint-disable-next-line prefer-const
    let stringSellers = ''
    let stringSellersName = ''
    let countTotalItems = 0

    dataFilter.forEach((item: DataFilter) => {
      if (!item) return
      stringSellers += `${item.value.id},`
      stringSellersName += `${item.label},`
      countTotalItems += 1
    })

    if (props.setStatusOrders) {
      if (statusFilter.length > 0) {
        let stringStatus = ''

        statusFilter.forEach((status) => {
          stringStatus += `${status.label},`
        })
        props.setStatusOrders(stringStatus.slice(0, -1))
      } else {
        props.setStatusOrders('')
      }

      props.setSellerId(stringSellersName.slice(0, -1))
    } else {
      props.setSellerId(stringSellers.slice(0, -1))
    }

    if (!stringSellers && !stringSellersName) props.setSellerId('')

    stringSellers = stringSellers.substring(0, stringSellers.length - 1)
    stringSellersName = stringSellersName.slice(0, -1)
    stringSellersName = encodeURIComponent(stringSellersName)
    if (stringSellersName) setQuery({ sellerName: stringSellersName })

    if (startDateFilter !== '') {
      const newDateStart = getDate(startDateFilter.toString())

      props.setStartDate(newDateStart)
    }

    if (finalDateFilter !== '') {
      const newDateFinal = getDate(finalDateFilter.toString())

      props.setFinalDate(newDateFinal)
    }

    if (!props.setTotalItems) return
    props.setTotalItems(countTotalItems)
  }

  useEffect(() => {
    if (!query.sellerName) return

    // eslint-disable-next-line vtex/prefer-early-return
    if (props.optionsSelect.length > 0) {
      const queryData = query.sellerName.split(',')
      const filterQueryData: any = []

      queryData.forEach((sellerQuery: any) => {
        sellerQuery = decodeURIComponent(sellerQuery)
        const filterSeller = props.optionsSelect.find(
          (item) => item.label === sellerQuery
        )

        filterQueryData.push(filterSeller)
      })
      setDataFilter(filterQueryData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.optionsSelect])

  useEffect(() => {
    if (dataFilter.length && query.sellerName) changesValuesTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFilter])

  const changeStartDate = (start: Date) => {
    if (!finalDateFilter) setDateFilter(start)
    else if (start.getTime() <= new Date(finalDateFilter).getTime()) {
      setDateFilter(start)
    }
  }

  const changeFinalDate = (final: Date) => {
    if (
      startDateFilter &&
      final.getTime() >= new Date(startDateFilter).getTime()
    )
      setFinalDateFilter(final)
    else if (
      !startDateFilter &&
      props.startDatePicker &&
      final.getTime() >= props.startDatePicker.getTime()
    )
      setFinalDateFilter(final)
  }

  return (
    <div>
      {!props.disableSelect && (
        <div className={`${styles.filter_container} w-100`}>
          <SelectComponent
            options={props.optionsSelect}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            multi={props.multiValue}
            customLabel={
              <FormattedMessage id="admin/table.title-seller-label" />
            }
          />
        </div>
      )}
      <div className="flex mt5">
        {props.optionsStatus ? (
          <div className="w-30 pr6">
            <SelectComponent
              options={props.optionsStatus}
              dataFilter={statusFilter}
              setDataFilter={setStatusfilter}
              multi
              customLabel={
                <FormattedMessage id="admin/table.title-status-label" />
              }
            />
          </div>
        ) : (
          <div className="w-30 pt6" />
        )}
        <div className="w-50">
          <DatePickerComponent
            startDateFilter={startDateFilter}
            startDatePicker={props.startDatePicker}
            changeStartDate={changeStartDate}
            finalDateFilter={finalDateFilter}
            finalDatePicker={props.finalDatePicker}
            changeFinalDate={changeFinalDate}
          />
        </div>
        <div className="w-20 mt6">
          <div className={`fr ${styles.buttonGroup}`}>
            <ButtonGroup
              buttons={[
                // eslint-disable-next-line react/jsx-key
                <ButtonWithIcon
                  isActiveOfGroup
                  onClick={() => changesValuesTable()}
                  icon={<IconFilter />}
                >
                  {<FormattedMessage id="admin/table.title-filter" />}
                </ButtonWithIcon>,
                // eslint-disable-next-line react/jsx-key
                <ButtonWithIcon
                  isActiveOfGroup={false}
                  onClick={() => {
                    setDataFilter([])
                    setStatusfilter([])
                    props.setStartDate(
                      props.defaultStartDate ? props.defaultStartDate : ''
                    )
                    props.setFinalDate(
                      props.defaultFinalDate ? props.defaultFinalDate : ''
                    )
                    setDateFilter(
                      new Date(`${props.defaultStartDate}T00:00:00`)
                    )
                    setFinalDateFilter(
                      new Date(`${props.defaultFinalDate}T00:00:00`)
                    )
                    props.setSellerId('')
                    setQuery({ sellerName: null })
                    if (props.setTotalItems) props.setTotalItems(0)
                    if (props.setStatusOrders) props.setStatusOrders('')
                  }}
                  icon={<IconDelete />}
                />,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
