import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import React, {useContext, useEffect, useState} from 'react';
import {ProductContext} from "../product/ProductProvider";
import {ProductProps} from "../product/ProductProps";
import {RouteComponentProps} from "react-router";
import Product from "../product/Product";
import {arrowBack} from "ionicons/icons";
import {MyMap} from "../components/MyMap";
import {log} from "util";


const ProductsSearch: React.FC<RouteComponentProps> = ({history}) => {
    const {products, fetchingError}                 = useContext(ProductContext);
    const [displayed, setDisplayed]                 = useState<ProductProps[]>([]);
    const [searchSize, setSearchSize]               = useState<string>('');
    const [searchDescription, setSearchDescription] = useState<string>('');
    const [longitudine, setLongitudine]             = useState(23.613781929016113);
    const [latitudine, setLatitudine]               = useState(46.77860956692572);

    useEffect(() => {
        if (products?.length) {
            setDisplayed(products.filter(obj => obj.description == searchDescription));
            const product = displayed[0];
            if(product) {
                console.log(product.description);
                setLatitudine(product.latitudine);
                setLongitudine(product.longitudine);
            }
        }
    }, [searchDescription]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>QuizzLearn</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSearchbar
                    value={searchSize}
                    debounce={300}
                    onIonChange={e => setSearchDescription(e.detail.value!)
                    }>
                </IonSearchbar>
                <IonList>
                    {displayed && displayed.map(({ _id, description, price, size, availability, date, version, hasConflicts, lastModified, longitudine, latitudine }) => {
                        return (
                            <Product key={_id} _id={_id} description={description} price={price}
                                     size={size} availability={availability} date={date}
                                     version={version} hasConflicts={hasConflicts} lastModified={lastModified}
                                     longitudine={longitudine} latitudine={latitudine}
                                     onEdit={id => history.push(`/product/${id}`)}/>
                        );
                    })}
                </IonList>

                <MyMap
                    lng={longitudine}
                    lat={latitudine}
                    onMapClick={(location: any) => {
                        console.log("COORDONATE: " + location.latLng.lng() + " SI " + location.latLng.lat());
                        setLongitudine(parseFloat(location.latLng.lng()));
                        setLatitudine(parseFloat(location.latLng.lat()));
                    }}
                    onMarkerClick={log('onMarker')}
                />


                {fetchingError && (<div>{fetchingError.message || 'Failed to fetch products'}</div>)}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/products')}>
                        <IonIcon icon={arrowBack}/>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
}

export default ProductsSearch;
