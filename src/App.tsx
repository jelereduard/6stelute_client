import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css'; 
import '@ionic/react/css/typography.css'; 

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { ProductProvider } from './leaderboard/leaderboardProvider';
import { AuthProvider, Login, PrivateRoute } from './auth';
import { Home } from './home';
import LeaderboardList from './leaderboard/LeaderboardList';
import { Quiz } from './quiz/Quiz';
import { getLogger } from './core';

const log = getLogger('Home');

const App: React.FC = () => (

  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <AuthProvider>
            <Route path="/login" component={Login} exact={true}/>
            <Route path="/quiz" component={Quiz} exact={true}/>
            <ProductProvider>
              <PrivateRoute path="/login" component={Login} exact={true}/>
              <PrivateRoute path="/home" component={Home} exact={true}/>
              <PrivateRoute path="/leaderboard" component={LeaderboardList} exact={true}/>
            </ProductProvider>
            <Route exact path="/" render={() => <Redirect to="/home"/>}/>
          </AuthProvider>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
