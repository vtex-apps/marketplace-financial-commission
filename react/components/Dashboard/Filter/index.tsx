import type { FC } from 'react'
import React from 'react'
import type { InjectedIntlProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

import {
  EXPERIMENTAL_Select as Select,
  DatePicker,
  ButtonWithIcon,
  IconFilter,
} from 'vtex.styleguide'

import { addDays } from 'date-fns'
import { message } from '../../../utils/definedMessages'
import styles from '../../../styles.css'

const Filter: FC<FilterProps & InjectedIntlProps> = (props) => {


  const changesValuesTable = () => {
    console.log('consumir servicio aqui otra vez')

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
    if(props.finalDate)
      if(start.getTime() < props.finalDate.getTime() ){
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
          label={formatIOMessage({id: message.selectSeller.id, intl: props.intl,}).toString()}
          options={props.optionsSelect}
          onChange={(values: any) => {console.info('values ', values)}}
        />
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        <Select
          multi
          label={formatIOMessage({id: message.selectItems.id, intl: props.intl,}).toString()}
          options={[]}
          onChange={(values: any) => {console.info('values ', values)}}
        />
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        <DatePicker
          label={formatIOMessage({id: message.startPicker.id, intl: props.intl,}).toString()}
          value={props.startDatePicker}
          maxDate={addDays(new Date(), -1)}
          onChange={(start: any) => changeStartDate(start)}
          locale={props.locale}
        />
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        <DatePicker
          label={formatIOMessage({id: message.endPicker.id, intl: props.intl,}).toString()}
          value={props.finalDate}
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
          {formatIOMessage({id: message.filter.id, intl: props.intl,}).toString()}
        </ButtonWithIcon>
      </div>
    </div>
  )
}

export default injectIntl(Filter)
