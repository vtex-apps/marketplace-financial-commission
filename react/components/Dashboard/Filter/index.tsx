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

import { message } from '../../../utils/definedMessages'


import styles from '../../../styles.css'

const Filter: FC<FilterProps & InjectedIntlProps> = (props) => {

  return(
    <div className={`${styles.filter} flex`}>
      <div className={`${styles.filter_container} w-30 mr4`}>
        {props.sellersDashboard ?? <Select
          multi
          label={formatIOMessage({id: message.selectSeller.id, intl: props.intl,}).toString()}
          options={props.listSellers}
          onChange={() => {}}
        /> }
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        { props.optionsSelect ?? <Select
          multi
          label={formatIOMessage({id: message.selectItems.id, intl: props.intl,}).toString()}
          options={props.optionsSelect}
          onChange={() => {}}
        /> }
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        { props.startDatePicker ?? <DatePicker
          label={formatIOMessage({id: message.startPicker.id, intl: props.intl,}).toString()}
          value={props.startDatePicker}
          onChange={() => { }}
          locale={props.locale}
        /> }
      </div>
      <div className={`${styles.filter_container} w-20 mr4`}>
        { props.finalDate ?? <DatePicker
          label={formatIOMessage({id: message.endPicker.id, intl: props.intl,}).toString()}
          value={props.finalDate}
          onChange={() => {}}
          locale={props.locale}
        /> }
      </div>
      <div className={`${styles.btn_filter} w-10 mt6`}>
        <ButtonWithIcon
          icon={<IconFilter color="#FFF" size={18} />}
          iconPosition="right"
          variation="primary"
          onClick={() => {}}
        >
          {formatIOMessage({id: message.filter.id, intl: props.intl,}).toString()}
        </ButtonWithIcon>
      </div>
    </div>
  )
}

export default injectIntl(Filter)

