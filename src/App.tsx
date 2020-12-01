import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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
import { ProductProvider } from './product/ProductProvider';
import { AuthProvider, Login, PrivateRoute, Logout } from './auth';
import {search, home, filter} from "ionicons/icons";
import ProductsSearch from "./pages/ProductsSearch";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <AuthProvider>
            <Route path="/login" component={Login} exact={true}/>
            <ProductProvider>
              <PrivateRoute path="/login" component={Login} exact={true}/>
              <PrivateRoute path="/products" component={ProductsList} exact={true}/>
              <PrivateRoute path="/product" component={ProductEdit} exact={true}/>
              <PrivateRoute path="/product/:id" component={ProductEdit} exact={true}/>
              <PrivateRoute path="/search/products" component={ProductsSearch} exact={true}/>
            </ProductProvider>
            <Route exact path="/" render={() => <Redirect to="/products"/>}/>
          </AuthProvider>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/products">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/search/products">
            <IonIcon icon={search} />
            <IonLabel>Search products</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
