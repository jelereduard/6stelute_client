import './style.css'

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { home, key, logOut } from 'ionicons/icons'

import { AuthContext } from '../auth/AuthProvider'
import { Header } from '../core/Header'
import LeaderboardList from '../leaderboard/LeaderboardList'
import { LocalStorage } from '../core/storage'
import { Plugins } from '@capacitor/core'
import { ProductContext } from '../leaderboard/leaderboardProvider'
import { Redirect } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { getLogger } from '../core'

const { Storage } = Plugins

interface Utils {
  showing?: boolean
  idModul?: string
  numeModul?: string
}

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const {
    products,
    fetching,
    fetchingError,
    connectedNetworkStatus,
    setIdModul,
    fetchLeaderboard,
  } = useContext(ProductContext)
  let [state, setState] = useState<Utils>({})
  const { showing, idModul, numeModul } = state

  return (
    <IonPage>
      <Header />
      <IonContent className='ion-content'>
        <IonGrid className='ion-grid'>
          <IonRow className='ion-row'>
            <IonCol className='ion-col2'>
              <IonRow className='ion-row'>
                <IonButton
                  className='ion-button'
                  size='large'
                  color='primary'
                  id='1'
                  onClick={() => {
                    setState({
                      showing: true,
                      numeModul: 'Modul 1',
                      idModul: '1',
                    })
                    if (setIdModul && fetchLeaderboard) {
                      setIdModul(() => 1)
                      fetchLeaderboard({ idModul: 1 })
                    }
                    Storage.set({
                      key: 'id_modul',
                      value: JSON.stringify({ idModul: 1 }),
                    })
                  }}>
                  MODULUL 1 - Individual work role creativity and innovation
                </IonButton>
              </IonRow>
              <IonRow className='ion-row'>
                <IonButton
                  className='ion-button'
                  size='large'
                  color='primary'
                  onClick={() => {
                    setState({
                      showing: true,
                      numeModul: 'Modul 2',
                      idModul: '2',
                    })

                    if (setIdModul && fetchLeaderboard) {
                      setIdModul(2)
                      fetchLeaderboard({ idModul: 2 })
                    }
                    Storage.set({
                      key: 'id_modul',
                      value: JSON.stringify({ idModul: 2 }),
                    })
                  }}>
                  MODULUL 2 - Factori individuali
                </IonButton>
              </IonRow>
              <IonRow className='ion-row'>
                <IonButton
                  className='ion-button'
                  size='large'
                  color='primary'
                  onClick={() => {
                    setState({
                      showing: true,
                      numeModul: 'Modul 3',
                      idModul: '3',
                    })
                    if (setIdModul && fetchLeaderboard) {
                      setIdModul(3)
                      fetchLeaderboard({ idModul: 3 })
                    }
                    Storage.set({
                      key: 'id_modul',
                      value: JSON.stringify({ idModul: 3 }),
                    })
                  }}>
                  MODULUL 3 - Contextul social/ Task context
                </IonButton>
              </IonRow>
            </IonCol>
            <IonCol className='ion-col'>
              <IonRow style={{ display: showing ? 'block' : 'none' }}>
                <IonButton
                  color='success'
                  shape='round'
                  href='/quiz'
                  className='ion-button-start-quiz'>
                  Start Modul
                </IonButton>
              </IonRow>
              <div
                id='leaderboard'
                style={{ display: showing ? 'block' : 'none' }}>
                <h2>Tabel scor {state.numeModul}</h2>
                <IonRow className='header-row'>
                  <IonCol>
                    <h2>User</h2>
                  </IonCol>
                  <IonCol>
                    <h2>Scor</h2>
                  </IonCol>
                </IonRow>
                <LeaderboardList idModul={idModul} />
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
