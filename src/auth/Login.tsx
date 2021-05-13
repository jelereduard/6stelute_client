import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AuthContext } from './AuthProvider';
import { getLogger } from '../core';
import './style.css';


const log = getLogger('Login');

interface LoginState {
  username?: string;
  password?: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { isAuthenticated, isAuthenticating, login, authenticationError, token } = useContext(AuthContext);
  const [state, setState] = useState<LoginState>({});
  const { username, password } = state;
  const handleLogin = () => {
    log('handleLogin...');
    login?.(username, password);
  };
  log('render');
  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/home' }} />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title"><h1 className="header-logo">QuizzLearn<i className="fab fa-react"></i></h1></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-content">
        <IonCard className="ion-card">
        <IonInput className="textbox-login"     
          placeholder="Username"
          value={username}
          onIonChange={e => setState({
            ...state,
            username: e.detail.value || ''
          })}/>
        <IonInput className="textbox-login"
          placeholder="Password"
          value={password}
          onIonChange={e => setState({
            ...state,
            password: e.detail.value || ''
          })}/>
        <IonLoading isOpen={isAuthenticating}/>
        {authenticationError && (
          <div>{authenticationError.message || 'Failed to authenticate'}</div>
        )}
        <IonButton className="login-button" onClick={handleLogin}>Login</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};