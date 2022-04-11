import type { FC } from 'react'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  EXPERIMENTAL_Select as Select,
  DatePicker,
  ButtonWithIcon,
  IconFilter,
  IconDelete,
  ButtonGroup,
} from 'vtex.styleguide'
import { addDays } from 'date-fns'

import styles from '../../../styles.css'

const Filter: FC<FilterProps> = (props) => {
  const [dataFilter, setDataFilter] = useState<DataFilter[] | []>([])
  const [startDateFilter, setDateFilter] = useState<Date | string>('')
  const [finalDateFilter, setFinalDateFilter] = useState<Date | string>('')

  const getDate = (date: string) => {
    const dateConverter = new Date(date)
    const month = dateConverter.getMonth() + 1
    const monthString = month <= 9 ? `0${month}` : month
    const day = dateConverter.getDate()
    const dayString = day <= 9 ? `0${day}` : day

    return `${dateConverter.getFullYear()}-${monthString}-${dayString}`
  }

  const changesValuesTable = () => {
    const filterData = props.dataWithoutFilter?.filter((seller: DataSeller) =>
      dataFilter?.some((item: DataFilter) => {
        return item.label === seller.name
      })
    )

    if (filterData?.length) {
      props.setDataWithoutFilter(filterData)
    } else {
      props.setDataWithoutFilter([])
    }

    if (startDateFilter !== '') {
      const newDateStart = getDate(startDateFilter.toString())

      props.setStartDate(newDateStart)
    }

    if (finalDateFilter !== '') {
      const newDateFinal = getDate(finalDateFilter.toString())

      props.setFinalDate(newDateFinal)
    }
  }

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
    <div className={`${styles.filter} flex`}>
      <div className={`${styles.filter_container} w-50 mr4`}>
        <div>
          <Select
            value={dataFilter}
            multi
            label={<FormattedMessage id="admin/table.title-seller-label" />}
            options={props.optionsSelect}
            onChange={(values: DataFilter[]) => setDataFilter(values)}
<<<<<<< HEAD
            valuesMaxHeight={35}
=======
>>>>>>> f7052fe (Add a filter with validations to date and sellers. Buttons to clear and filter are working successfully)
          />
        </div>
      </div>
      <div className={`${styles.filter_container} w-15`} id="datepicker-left">
        <DatePicker
          label={<FormattedMessage id="admin/table.title-datepicker-start" />}
          value={
            startDateFilter !== '' ? startDateFilter : props.startDatePicker
          }
          maxDate={addDays(new Date(), -1)}
          onChange={(start: Date) => changeStartDate(start)}
          locale={props.locale}
        />
      </div>
      <div
        className={`${styles.filter_container} w-15 mr4`}
        id="datepicker-right"
      >
        <DatePicker
          label={<FormattedMessage id="admin/table.title-datepicker-final" />}
          value={
            finalDateFilter !== '' ? finalDateFilter : props.finalDatePicker
          }
          maxDate={addDays(new Date(), -1)}
          onChange={(final: Date) => changeFinalDate(final)}
          locale={props.locale}
        />
      </div>
      <div className="w-20 mt6">
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
                props.setDataWithoutFilter([])
                props.setStartDate(props.defaultStartDate)
                props.setFinalDate(props.defaultFinalDate)
                setDateFilter(new Date(`${props.defaultStartDate}T00:00:00`))
                setFinalDateFilter(
                  new Date(`${props.defaultFinalDate}T00:00:00`)
                )
              }}
              icon={<IconDelete />}
            />,
          ]}
        />
      </div>
    </div>
  )
}

export default Filter
