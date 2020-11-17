import React, { useContext, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import {
    IonContent,
    IonCard,
    IonFab,
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
    useIonViewWillEnter
} from '@ionic/react';
import {add, logOut} from 'ionicons/icons';
import Product from './Product';
import { getLogger } from '../core';
import { ProductContext } from './ProductProvider';
import {Redirect} from "react-router-dom";
import {AuthContext} from "../auth";
import {Simulate} from "react-dom/test-utils";
import {ProductProps} from "./ProductProps";

const log = getLogger('ProductsList');

const ProductsList: React.FC<RouteComponentProps> = ({ history }) => {
    const { logout } = useContext(AuthContext);
    const { products, fetching, fetchingError} = useContext(ProductContext);
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
    const [displayed, setDisplayed] = useState<ProductProps[]>([]);
    const [position, setPosition] = useState(25);

    console.log(products?.length);

    useEffect(() => {
        if(products?.length) {
            setDisplayed(products?.slice(0, 25));
        }
        else
        {
            setDisplayed([]);
        }
    }, [products]);

    log('render');

    async function searchNext($event: CustomEvent<void>) {
        if(products && position < products.length) {
            setDisplayed([...displayed, ...products.slice(position, position + 1)]);
            setPosition(position + 1);
        } else {
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
                    <IonTitle>Product List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching products"/>
                <IonList>
                    {displayed && displayed.map(({ _id, description, price, size, availability, date }) => {
                        return (
                            <Product key={_id} _id={_id} description={description} price={price}
                                     size={size} availability={availability} date={date}
                                     onEdit={id => history.push(`/product/${id}`)}/>
                            );
                    })}
                </IonList>
                <IonInfiniteScroll
                    threshold="5px"
                    disabled={disableInfiniteScroll}
                    onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                    <IonInfiniteScrollContent loadingText="Loading more products items..."/>
                </IonInfiniteScroll>
                {fetchingError && (<div>{fetchingError.message || 'Failed to fetch products'}</div>)}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/product')}>
                        <IonIcon icon={add}/>
                    </IonFabButton>
                </IonFab>
                <IonFab vertical="bottom" horizontal="start" slot="fixed">
                    {/*<IonFabButton onClick={() => history.push('/logout')}>-->*/}
                    <IonFabButton onClick={handleLogout}>
                        <IonIcon icon={logOut}/>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ProductsList;
