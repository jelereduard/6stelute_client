import React from 'react';
import { IonItem, IonLabel, IonRow, IonCol } from '@ionic/react';
import { LeaderboardProps } from './leaderboardProps';
import './style.css'

interface LeaderboardPropsPropsExt extends LeaderboardProps {
    onEdit: (_id?: string) => void;
}

const Leaderboard: React.FC<LeaderboardPropsPropsExt> = ({ _id, username, score, onEdit }) => {
    return (
        <IonRow onClick={() => onEdit(_id)}>
            <IonCol className="leaderboard-user-column">{username}</IonCol>
            <IonCol className="leaderboard-score-column">{score}</IonCol>
        </IonRow>
    );
};

export default Leaderboard;
