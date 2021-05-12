import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import {LeaderBoardProps as LBP} from './leaderBoardProps'

const LeaderBoardUser: React.FC<LBP> = ({ _id, user, score }) => {
  return (
    <IonItem>
      <IonLabel>{user}</IonLabel>
      <IonLabel>{score}</IonLabel>
    </IonItem>
  );
};

export default LeaderBoardUser;
