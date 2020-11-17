import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem, IonLabel,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {AuthContext, AuthState} from './AuthProvider';
import { getLogger } from '../core';

const log = getLogger('Logout');

interface LoginState {
    username?: string;
    password?: string;
}

export const Logout: React.FC<RouteComponentProps> = ({ history }) => {
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        log('handleLogout...');
        logout?.();
        return <Redirect to={{ pathname: '/' }} />
    };
    log('render');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Logout</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton onClick={handleLogout}>Logout</IonButton>
            </IonContent>
        </IonPage>
    );
};