import './style.css'

import { IonContent, IonList, IonLoading } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'

import Product from './Leaderboard'
import { ProductContext } from './leaderboardProvider'
import { LeaderboardProps as ProductProps } from './leaderBoardProps'
import { getLogger } from '../core'

const log = getLogger('LeaderboardList')

export interface Modul {
  idModul: any
}

const LeaderboardList: React.FC<Modul> = ({ idModul }: Modul) => {
  const { products, fetching, fetchingError, connectedNetworkStatus } =
    useContext(ProductContext)
  const [displayed, setDisplayed] = useState<ProductProps[]>([])
  const [filter, setFilter] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (products?.length) {
      console.log(products)
      setDisplayed(products?.slice(0, 10))
    } else {
      setDisplayed([])
    }
  }, [products, connectedNetworkStatus])

  useEffect(() => {
    setFilter('all products')
    if (products && filter) {
      if (filter !== 'all products') {
        setDisplayed(products)
      } else {
        setDisplayed(products?.slice(0, 12))
      }
    }
  }, [filter])

  log('render')

  return (
    <IonContent>
      <IonLoading isOpen={fetching} message='Fetching products' />
      <IonList>
        {displayed &&
          displayed.map(({ _id, username, score }, index) => {
            return (
              <Product
                key={index}
                _id={_id}
                username={username}
                score={score}
                onEdit={() => {}}
              />
            )
          })}
      </IonList>
      {fetchingError && (
        <div>{fetchingError.message || 'Failed to fetch products'}</div>
      )}
    </IonContent>
  )
}

export default LeaderboardList
