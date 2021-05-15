import './style.css'

import { IonCol, IonItem, IonLabel, IonRow } from '@ionic/react'

import { LeaderboardProps } from './leaderBoardProps'
import React from 'react'

interface LeaderboardPropsPropsExt extends LeaderboardProps {
  onEdit: (_id?: string) => void
}

const Leaderboard: React.FC<LeaderboardPropsPropsExt> = ({
  _id,
  username,
  score,
  onEdit,
}) => {
  return (
    <IonRow onClick={() => onEdit(_id)}>
      <IonCol className='leaderboard-user-column'>{username}</IonCol>
      <IonCol className='leaderboard-score-column'>{score}</IonCol>
    </IonRow>
  )
}

export default Leaderboard
