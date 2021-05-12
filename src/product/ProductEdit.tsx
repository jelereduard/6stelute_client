import React, { useContext, useEffect, useState } from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel
} from '@ionic/react';
import { getLogger } from '../core';
import { ProductContext } from './ProductProvider';
import { RouteComponentProps } from 'react-router';
import { ProductProps } from './ProductProps';
import {useNetwork} from "../core/UseNetState";
import {MyMap} from "../components/MyMap";

const log = getLogger('ProductEdit');

interface ProductEditProps extends RouteComponentProps<{
    id?: string;
}> {}

const ProductEdit: React.FC<ProductEditProps> = ({ history, match }) => {
    const { products, saving, savingError, saveProduct, connectedNetworkStatus } = useContext(ProductContext);
    const [description, setDescription]   = useState('');
    const [price, setPrice]               = useState('');
    const [size, setSize]                 = useState('');
    const [availability, setAvailability] = useState('');
    const [date, setDate]                 = useState('');
    const [version,setVersion]            = useState(0);
    const [hasConflicts,setConflicts]     = useState(false);
    const [lastModified,setLastModified]  = useState(new Date());
    const [longitudine, setLongitudine]   = useState(23.613781929016113);
    const [latitudine, setLatitudine]     = useState(46.77860956692572);
    const [product, setProduct]           = useState<ProductProps>();

    useEffect(() => {
        log('useEffect');
        const routeId = match.params.id || '';
        const product = products?.find(pr => pr._id === routeId);
        setProduct(product);
        if (product) {
            setDescription(product.description);
            setPrice(product.price);
            setSize(product.size);
            setAvailability(product.availability);
            setDate(product.date);
            setVersion(product.version + 1);
            setConflicts(false);
            setLastModified(product.lastModified);
            setLongitudine(product.longitudine);
            setLatitudine(product.latitudine);
        }
    }, [match.params.id, products]);

    const handleSave = () => {
        const editedProduct = product ? { ...product, description, price, size, availability, date, version, hasConflicts, lastModified, longitudine, latitudine } : { description, price, size, availability, date, version, hasConflicts, lastModified, longitudine, latitudine };
        saveProduct && saveProduct(editedProduct).then(() => history.goBack());
    };

    log('render');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleSave}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Description :</IonLabel>
                    <IonInput value={description} onIonChange={e => setDescription(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Price :</IonLabel>
                    <IonInput value={price} onIonChange={e => setPrice(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Size :</IonLabel>
                    <IonInput value={size} onIonChange={e => setSize(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Availability :</IonLabel>
                    <IonInput value={availability} onIonChange={e => setAvailability(e.detail.value || '')} />
                </IonItem>
                <IonItem className="ion-text-wrap">
                    <IonLabel className="labels">Data :</IonLabel>
                    <IonInput value={date} onIonChange={e => setDate(e.detail.value || '')} />
                </IonItem>
                <IonLoading isOpen={saving} />
                {savingError && (
                    <div>{savingError.message || 'Failed to save product'}</div>
                )}
                <MyMap
                    lng={longitudine}
                    lat={latitudine}
                    onMapClick={(location: any) => {
                        if(connectedNetworkStatus) {
                            console.log("COORDONATE: " + location.latLng.lng() + " SI " + location.latLng.lat());
                            setLongitudine(parseFloat(location.latLng.lng()));
                            setLatitudine(parseFloat(location.latLng.lat()));
                        }
                    }}
                    onMarkerClick={log('onMarker')}
                />

            </IonContent>
        </IonPage>
    );
};

export default ProductEdit;
