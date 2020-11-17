import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
//import { ItemEdit, ItemList } from './todo';
import { ProductEdit, ProductsList } from './product';

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
import { ItemProvider } from './todo/ItemProvider';
import { ProductProvider } from './product/ProductProvider';
import { AuthProvider, Login, PrivateRoute, Logout } from './auth';
import Tab1 from './pages/Tab1';
import {home, shirt} from "ionicons/icons";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <AuthProvider>
            <Route path="/login" component={Login} exact={true}/>
            <ProductProvider>
              {/*
              <PrivateRoute path="/items" component={ItemList} exact={true}/>
              <PrivateRoute path="/item" component={ItemEdit} exact={true}/>
              <PrivateRoute path="/item/:id" component={ItemEdit} exact={true}/>
              <PrivateRoute path="/logout" component={Logout} exact={true}/>
              */}
              <PrivateRoute path="/tab1" component={Tab1} exact={true}/>
              <PrivateRoute path="/login" component={Login} exact={true}/>
              <PrivateRoute path="/products" component={ProductsList} exact={true}/>
              <PrivateRoute path="/product" component={ProductEdit} exact={true}/>
              <PrivateRoute path="/product/:id" component={ProductEdit} exact={true}/>

            </ProductProvider>
            {/*
            <Route exact path="/" render={() => <Redirect to="/items"/>}/>
            */}
            <Route exact path="/" render={() => <Redirect to="/products"/>}/>
          </AuthProvider>
        </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={shirt} />
              <IonLabel>Pics</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/products">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
