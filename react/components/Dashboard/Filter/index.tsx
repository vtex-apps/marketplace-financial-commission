import type { FC } from 'react'
import React, { useState } from 'react'
import { FormattedMessage  } from 'react-intl'
import {
  EXPERIMENTAL_Select as Select,
  DatePicker,
  ButtonWithIcon,
  IconFilter,
} from 'vtex.styleguide'

import { addDays } from 'date-fns'
import styles from '../../../styles.css'

const Filter: FC<FilterProps> = (props) => {

  const [dataFilter, setDataFilter] = useState([])

  const changesValuesTable = () => {

    const filterDataSellers = props.dataWithoutFilter?.filter((seller:any) => dataFilter?.some((item:any) => item.label === seller.name));

    if(filterDataSellers?.length){
      props.setDataWithoutFilter(filterDataSellers)
    }else{
      props.setDataWithoutFilter([])
    }
  }

  const getDate = (date: string) => {
    const dateConverter = new Date(date)
    const month = (dateConverter.getMonth() + 1 )
    const monthString = month <= 9 ? '0'+ month : month
    const day = (dateConverter.getDate() + 1)
    const dayString = day <= 9 ? '0'+ day : day

    return dateConverter.getFullYear() + '-' + monthString + '-' + dayString
  }

  const changeStartDate = (start:any) => {
    if(props.finalDatePicker)
      if(start.getTime() < props.finalDatePicker.getTime() ){
        const newDate = getDate(start)
        props.setStartDate(newDate)
      }
  }

  const changeFinalDate = (final: any) => {
    if(props.startDatePicker)
      if(final.getTime() > props.startDatePicker.getTime() ){
        const newDate = getDate(final)
        props.setFinalDate(newDate)
      }
  }

  return(
    <div className={`${styles.filter} flex`}>
      <div className={`${styles.filter_container} w-30 mr4`}>
        <Select
          multi
          label={<FormattedMessage id="admin/table.title-seller-label" />}
          options={props.optionsSelect}
          onChange={(values: any) => setDataFilter(values)}
        />
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        <Select
          multi
          label={<FormattedMessage id="admin/table.title-items-label" />}
          options={[]}
          onChange={(values: any) => {console.info('values ', values)}}
        />
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        <DatePicker
          label={<FormattedMessage id="admin/table.title-datepicker-start" />}
          value={props.startDatePicker}
          maxDate={addDays(new Date(), -1)}
          onChange={(start: any) => changeStartDate(start)}
          locale={props.locale}
        />
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        <DatePicker
          label={<FormattedMessage id="admin/table.title-datepicker-final" />}
          value={props.finalDatePicker}
          maxDate={addDays(new Date(), -1)}
          onChange={(final: any) => changeFinalDate(final)}
          locale={props.locale}
        />
      </div>
      <div className={`${styles.btn_filter} w-10 mt6`}>
        <ButtonWithIcon
          icon={<IconFilter color="#FFF" size={18} />}
          iconPosition="right"
          variation="primary"
          onClick={() => changesValuesTable()}
        >
          {<FormattedMessage id="admin/table.title-filter" />}
        </ButtonWithIcon>
      </div>
    </div>
  )
}

export default Filter

