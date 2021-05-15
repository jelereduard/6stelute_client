import '../home/style.css'

import { IonButton, IonCol, IonHeader, IonIcon, IonRow } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { home, logOut } from 'ionicons/icons'

import { AuthContext } from '../auth'
import { Plugins } from '@capacitor/core'
import { Redirect } from 'react-router-dom'

const { Storage } = Plugins
// TO DO: sa scrie in header Welcome back, {username}

export const Header: React.FC = () => {
  const { logout, username, isAuthenticated } = useContext(AuthContext)
  const [user, setUser] = useState('')

  useEffect(() => {
    ;(async () => {
      await Storage.get({ key: 'username' }).then(e => {
        if (e.value) {
          console.log('*************************************************')
          console.log(JSON.parse(e.value).username)
          setUser(JSON.parse(e.value).username)
        }
      })
    })()
  }, [])

  const handleLogout = () => {
    logout?.()
    return <Redirect to={{ pathname: '/login' }} />
  }

  return (
    <IonHeader className='header'>
      <IonRow className='header-row'>
        <IonCol>
          <h1 className='header-logo'>
            QuizzLearn<i className='fab fa-react'></i>
          </h1>
        </IonCol>
        <IonCol>
          <h1 className='header-logo'>
            {isAuthenticated && <span>Welcome back, {user}!</span>}
          </h1>
        </IonCol>

        <IonButton className='logout' href='/home'>
          <IonIcon icon={home} />
          Home
        </IonButton>

        <IonButton className='logout' onClick={handleLogout}>
          <IonIcon icon={logOut} />
          Logout
        </IonButton>
      </IonRow>
    </IonHeader>
  )
}
