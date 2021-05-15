import { IonHeader, IonRow, IonCol, IonButton, IonIcon } from "@ionic/react"
import { home, logOut } from "ionicons/icons"
import React, { useContext, useState } from "react"
import { Redirect } from "react-router-dom"
import { AuthContext } from "../auth";
import '../home/style.css';

// TO DO: sa scrie in header Welcome back, {username} 

export const Header:React.FC = () => {
  const { logout } = useContext(AuthContext);
  const username = 'paul';

  const handleLogout = () => {
    logout?.();
    return <Redirect to={{ pathname: '/login' }} />
};

      return( <IonHeader className="header">
    <IonRow className="header-row">
      <IonCol>
        <h1 className="header-logo">QuizzLearn<i className="fab fa-react"></i></h1>
      </IonCol>
      <IonCol>
        <h1 className="header-logo">{username}</h1>
      </IonCol>

      <IonButton className="logout" href="/home">
        <IonIcon icon={home} />
        Home
      </IonButton>

      <IonButton className="logout" onClick={handleLogout}>
        <IonIcon icon={logOut} />
        Logout
      </IonButton>
    </IonRow>
  </IonHeader>
      )

}