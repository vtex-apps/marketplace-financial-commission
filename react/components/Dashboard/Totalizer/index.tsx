import type { FC } from 'react'
import React from 'react'
import { Totalizer, Spinner } from 'vtex.styleguide'

type TotalizerProps = {
  item: StatsTotalizer[]
  loading: boolean
}

const TotalizerComponent: FC<TotalizerProps> = (props) => {
  if (props.loading) {
    return (
      <div className="tc">
        <Spinner />
      </div>
    )
  }

  return <Totalizer items={props.item} />
}

export default TotalizerComponent
