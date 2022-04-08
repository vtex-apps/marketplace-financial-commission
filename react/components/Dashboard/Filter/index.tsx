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
  const [dataFilter, setDataFilter] = useState([])
  const [startDateFilter, setDateFilter] = useState('')
  const [finalDateFilter, setFinalDateFilter] = useState('')

  const getDate = (date: string) => {
    const dateConverter = new Date(date)
    const month = dateConverter.getMonth() + 1
    const monthString = month <= 9 ? `0${month}` : month
    const day = dateConverter.getDate() + 1
    const dayString = day <= 9 ? `0${day}` : day

    return `${dateConverter.getFullYear()}-${monthString}-${dayString}`
  }

  const changesValuesTable = () => {
    const filterData = props.dataWithoutFilter?.filter((seller: any) =>
      dataFilter?.some((item: any) => item.label === seller.name)
    )

    if (filterData?.length) {
      props.setDataWithoutFilter(filterData)
    } else {
      props.setDataWithoutFilter([])
    }

    if (startDateFilter !== '') {
      const newDateStart = getDate(startDateFilter)

      console.info('newDateStart ', newDateStart)
      props.setStartDate(newDateStart)
    } else if (finalDateFilter !== '') {
      const newDateFinal = getDate(finalDateFilter)

      props.setFinalDate(newDateFinal)
    }
  }

  const changeStartDate = (start: any) => {
    setDateFilter(start)
    /* if (props.finalDatePicker)
      if (start.getTime() < props.finalDatePicker.getTime()) {
        const newDate = getDate(start)

        props.setStartDate(newDate)
      } */
  }

  const changeFinalDate = (final: any) => {
    if (startDateFilter !== '') setFinalDateFilter(final)
    /* if (props.startDatePicker)
      if (final.getTime() > props.startDatePicker.getTime()) {
        const newDate = getDate(final)

        props.setFinalDate(newDate)
      } */
  }

  return (
    <div className={`${styles.filter} flex`}>
      <div className={`${styles.filter_container} w-50 mr4`}>
        <div>
          <Select
            multi
            label={<FormattedMessage id="admin/table.title-seller-label" />}
            options={props.optionsSelect}
            onChange={(values: any) => setDataFilter(values)}
          />
        </div>
      </div>
      <div className={`${styles.filter_container} w-15`} id="datepicker-left">
        <DatePicker
          label="Start"
          value={
            startDateFilter !== '' ? startDateFilter : props.startDatePicker
          }
          maxDate={addDays(new Date(), -1)}
          onChange={(start: any) => changeStartDate(start)}
          locale={props.locale}
        />
      </div>
      <div
        className={`${styles.filter_container} w-15 mr4`}
        id="datepicker-right"
      >
        <DatePicker
          label="End"
          value={
            finalDateFilter !== '' ? finalDateFilter : props.finalDatePicker
          }
          maxDate={addDays(new Date(), -1)}
          onChange={(final: any) => changeFinalDate(final)}
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
              onClick={() => {}}
              icon={<IconDelete />}
            />,
          ]}
        />
      </div>
    </div>
  )
}

export default Filter
