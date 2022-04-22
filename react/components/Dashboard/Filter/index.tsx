import type { FC } from 'react'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  ButtonWithIcon,
  IconFilter,
  IconDelete,
  ButtonGroup,
} from 'vtex.styleguide'

import styles from '../../../styles.css'
import SelectComponent from './select'
import DatePickerComponent from './datePicker'

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
    // eslint-disable-next-line prefer-const
    let stringSellers = ''
    let countTotalItems = 0

    dataFilter.forEach((item: any) => {
      stringSellers += `${item.value.id},`
      countTotalItems += 1
    })

    stringSellers = stringSellers.substring(0, stringSellers.length - 1)
    props.setSellerId(stringSellers)
    props.setTotalItems(countTotalItems)

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
        <SelectComponent
          options={props.optionsSelect}
          dataFilter={dataFilter}
          setDataFilter={setDataFilter}
        />
      </div>
      <DatePickerComponent
        startDateFilter={startDateFilter}
        startDatePicker={props.startDatePicker}
        changeStartDate={changeStartDate}
        finalDateFilter={finalDateFilter}
        finalDatePicker={props.finalDatePicker}
        changeFinalDate={changeFinalDate}
      />
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
                props.setStartDate(props.defaultStartDate)
                props.setFinalDate(props.defaultFinalDate)
                setDateFilter(new Date(`${props.defaultStartDate}T00:00:00`))
                setFinalDateFilter(
                  new Date(`${props.defaultFinalDate}T00:00:00`)
                )
                props.setSellerId('')
                props.setTotalItems(0)
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
