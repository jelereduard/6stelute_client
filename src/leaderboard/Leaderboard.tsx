import React, { useContext } from 'react';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonList,
  IonLoading,
  IonRow} from '@ionic/react';
import { getLogger } from '../core';
import { ItemContext } from './leaderboardProvider';
import LeaderBoardUser  from './leaderBoardUser';


const log = getLogger('Leaderboard');

const Leaderboard = () => {
  const { items, fetching, fetchingError } = useContext(ItemContext);
  log('render');
  return (
        <IonGrid>
          <IonLoading isOpen={fetching} message="Fetching items"/>
          {items && (
          <IonList>
            {items.map(({ _id, user, score }) => 
                <LeaderBoardUser key={_id} _id={_id} user={user} score={score}/>)
            }
          </IonList>
        )}
        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
          <IonRow className="ion-row">
            <IonCol className="ion-col">
              {items}
              
            </IonCol>
            <IonCol className="ion-col">
              <h1>Scor</h1>
            </IonCol>
          </IonRow>
          
          </IonGrid>
  );
};

export default Leaderboard;
