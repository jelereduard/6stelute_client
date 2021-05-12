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
import Product from './Product';
import { getLogger } from '../core';
import { ProductContext } from './ProductProvider';
import {Redirect} from "react-router-dom";
import {AuthContext} from "../auth";
import {ProductProps} from "./ProductProps";

const log = getLogger('ProductsList');



const ProductsList: React.FC<RouteComponentProps> = ({ history }) => {
    const { logout } = useContext(AuthContext);
    const { products, fetching, fetchingError, connectedNetworkStatus} = useContext(ProductContext);
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
    const [displayed, setDisplayed] = useState<ProductProps[]>([]);
    const [position, setPosition] = useState(12);
    const [filter, setFilter] = useState<string | undefined>(undefined);

    let color, msg;
    if(connectedNetworkStatus)
    {
        color = 'primary';
        msg = 'online';
    }
    else
    {
        color = 'red';
        msg = 'offline';
    }

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
        if(products && filter)
        {
            if(filter !== "all products")
            {
                setDisplayed(products.filter(obj => obj.availability === filter));
            }
            else {
                setDisplayed(products?.slice(0, 12));
            }
        }
    }, [filter]);

    log('render');

    async function searchNext($event: CustomEvent<void>)
    {
        /// ar trebui sa folosesc lista curenta
        /// products/filter/search
        /// altfel o sa adauge in continuare din products

        if(products && position < products.length)
        {
            setDisplayed([...displayed, ...products.slice(position, position + 1)]);
            setPosition(position + 1);
        }
        else
        {
            setDisableInfiniteScroll(true);
        }
        await ($event.target as HTMLIonInfiniteScrollElement).complete();
    }

    const handleLogout = () => {
        log('handleLogout...');
        logout?.();
        return <Redirect to={{ pathname: '/login' }} />
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Shop App</IonTitle>
                </IonToolbar>
                <IonToolbar color={color}>
                    <IonTitle>Network connection: {msg}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching products"/>
                <IonSelect value={filter} placeholder="Select available products" onIonChange={e => {
                    setFilter(e.detail.value);
                }}>
                    <IonSelectOption value="true" >Available products</IonSelectOption>
                    <IonSelectOption value="false" >Sold products</IonSelectOption>
                    <IonSelectOption value="all products" >All products</IonSelectOption>
                </IonSelect>
                <IonList>
                    {displayed && displayed.map(({ _id, description, price, size, availability, date, version, hasConflicts, lastModified, longitudine, latitudine}) => {
                        return (
                            <Product key={_id} _id={_id} description={description} price={price}
                                     size={size} availability={availability} date={date}
                                     version={version} hasConflicts={hasConflicts} lastModified={lastModified}
                                     longitudine={longitudine} latitudine={latitudine}
                                     onEdit={id => history.push(`/product/${id}`)}/>
                            );
                    })}
                </IonList>
                <IonInfiniteScroll
                    threshold="5px"
                    disabled={disableInfiniteScroll}
                    onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                    <IonInfiniteScrollContent loadingText="Loading more products ..."/>
                </IonInfiniteScroll>
                {fetchingError && (<div>{fetchingError.message || 'Failed to fetch products'}</div>)}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/product')}>
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </IonFab>
                <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    <IonFabButton onClick={handleLogout}>
                        <IonIcon icon={logOut}/>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ProductsList;
