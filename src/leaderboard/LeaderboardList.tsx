import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import {
    IonContent,
    IonFab,
    IonSelect,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonList,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSelectOption} from '@ionic/react';
import {add, logOut} from 'ionicons/icons';
import Product from './Leaderboard';
import { getLogger } from '../core';
import { ProductContext } from './leaderboardProvider';
import {Redirect} from "react-router-dom";
import {AuthContext} from "../auth";
import {LeaderboardProps as ProductProps} from "./LeaderboardProps";

const log = getLogger('LeaderboardList');



const LeaderboardList: React.FC = ({  }) => {
    const { logout } = useContext(AuthContext);
    const { products, fetching, fetchingError, connectedNetworkStatus} = useContext(ProductContext);
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
    const [displayed, setDisplayed] = useState<ProductProps[]>([]);
    const [position, setPosition] = useState(12);
    const [filter, setFilter] = useState<string | undefined>(undefined);



    useEffect(() => {
        if(products?.length)
        {
            setDisplayed(products?.slice(0, 12));
        }
        else
        {
            setDisplayed([]);
        }
    }, [products, connectedNetworkStatus]);

    useEffect(() => {
      setFilter("all products")
        if(products && filter)
        {
            if(filter !== "all products")
            {
                setDisplayed(products);
            }
            else {
                setDisplayed(products?.slice(0, 12));
            }
        }
    }, [filter]);

    log('render');



    return (
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching products"/>
                <IonList>
                    {displayed && displayed.map(({ _id, username, score}) => {
                        return (
                            <Product key={_id} _id={_id} username={username} score={score}
                                     onEdit={() => {}}/>
                            );
                    })}
                </IonList>
                {fetchingError && (<div>{fetchingError.message || 'Failed to fetch products'}</div>)}
            </IonContent>
    );
};

export default LeaderboardList;
