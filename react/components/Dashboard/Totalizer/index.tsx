import type { FC } from 'react'
import React from 'react'
import {
  Totalizer
} from 'vtex.styleguide'

const TotalizerComponent: FC<TotalizerProps> = (props) => {
  return(
    <Totalizer
      items={props.item}
    />
  )
}
export default TotalizerComponent


