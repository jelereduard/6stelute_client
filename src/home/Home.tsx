import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getLogger } from '../core';
import './style.css';
import Leaderboard from '../leaderboard/Leaderboard';
import { logOut } from 'ionicons/icons';
import { AuthContext } from '../auth/AuthProvider';

const log = getLogger('Home');

interface Utils{
  showing?:boolean;
  idModul?:string;
  numeModul?:string;
}

export const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { logout } = useContext(AuthContext);
  let [state, setState] = useState<Utils>({});
  const { showing, idModul, numeModul } = state;


  const handleLogout = () => {
    log('handleLogout...');
    logout?.();
    return <Redirect to={{ pathname: '/login' }} />
};

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title"><h1 className="header-logo">QuizzLearn<i className="fab fa-react"></i></h1></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-content">
        <IonGrid className="ion-grid">
          <IonRow className="ion-row">
            <IonCol className="ion-col">
              <IonRow className="ion-row">
              <IonButton className="ion-button" size="large" color="primary" id="1" onClick={() => setState({
                 showing: true, numeModul: 'Modul 1',idModul: '1' 
                 })}>
                MODULUL 1 - Individual work role creativity and innovation
              </IonButton>
              </IonRow>
              <IonRow className="ion-row">
              <IonButton className="ion-button" size="large" color="primary"onClick={() => setState({
                 showing: true, numeModul: 'Modul 2',idModul: '2' 
                 })}>
                MODULUL 2 - Factori individuali
              </IonButton>
              </IonRow>
              <IonRow className="ion-row">
              <IonButton className="ion-button"  size="large" color="primary"onClick={() => setState({
                 showing: true, numeModul: 'Modul 3',idModul: '3' 
                 })}>
                MODULUL 3 - Contextul social/ Task context
              </IonButton>
              </IonRow>
            </IonCol>
            <IonCol className="ion-col">
              
                
              <div id="leaderboard" style={{ display: (showing ? 'block' : 'none') }}>
                <h1>Tabela scor {state.numeModul}</h1>
                <Leaderboard/>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton onClick={handleLogout}>
                        <IonIcon icon={logOut}/>
                    </IonFabButton>
                </IonFab>
      </IonContent>
    </IonPage>
  );
}