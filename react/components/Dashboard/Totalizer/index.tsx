import type { FC } from 'react'
import React from 'react'
import {
  Totalizer
} from 'vtex.styleguide'

type TotalizerProps = {
  item: StatsTotalizer[]
}

const TotalizerComponent: FC<TotalizerProps> = (props) => {
  return(
    <Totalizer
      items={props.item}
    />
  )
}
export default TotalizerComponent


