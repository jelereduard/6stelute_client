import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getLogger } from '../core';
import './style.css';
import './funcs';

interface Utils{
  showing?:boolean;
  idModul?:string;
  numeModul?:string;
}

export const Home: React.FC<RouteComponentProps> = ({ history }) => {

  let [state, setState] = useState<Utils>({});
  const { showing } = state;
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonRow>
              <IonButton size="large" color="primary" onClick={() => setState({ showing: true })}>
                MODULUL 1 - Individual work role creativity and innovation
              </IonButton>
              </IonRow>
              <IonRow>
              <IonButton size="large" color="primary">
                MODULUL 2 - Factori individuali
              </IonButton>
              </IonRow>
              <IonRow>
              <IonButton  size="large" color="primary">
                MODULUL 3 - Contextul social/ Task context
              </IonButton>
              </IonRow>
            </IonCol>
            <IonCol>
              <div id="leaderboard" style={{ display: (showing ? 'block' : 'none') }}>
                <h1>Tabela scor modul ales</h1>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <h1>User</h1>
                    </IonCol>
                    <IonCol>
                      <h1>Scor</h1>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}