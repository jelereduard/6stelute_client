import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { LeaderboardProps } from './LeaderboardProps';
import './style.css'

interface LeaderboardPropsPropsExt extends LeaderboardProps {
    onEdit: (_id?: string) => void;
}

const Leaderboard: React.FC<LeaderboardPropsPropsExt> = ({ _id, username, score, onEdit }) => {
    return (
        <IonItem onClick={() => onEdit(_id)}>
            <IonLabel className="leaderboard-row">{username} {score}</IonLabel>
        </IonItem>
    );
};

export default Leaderboard;
