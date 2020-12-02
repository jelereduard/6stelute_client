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

const log = getLogger('ProductEdit');

interface ProductEditProps extends RouteComponentProps<{
    id?: string;
}> {}

const ProductEdit: React.FC<ProductEditProps> = ({ history, match }) => {
    const { products, saving, savingError, saveProduct } = useContext(ProductContext);
    const [description, setDescription]   = useState('');
    const [price, setPrice]               = useState('');
    const [size, setSize]                 = useState('');
    const [availability, setAvailability] = useState('');
    const [date, setDate]                 = useState('');
    const [product, setProduct]           = useState<ProductProps>();
    const { networkStatus } = useNetwork();
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
        }
    }, [match.params.id, products]);

    const handleSave = () => {
        const editedProduct = product ? { ...product, description, price, size, availability, date } : { description, price, size, availability, date };
        saveProduct && saveProduct(editedProduct, networkStatus.connected).then(() => history.goBack());
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
            </IonContent>
        </IonPage>
    );
};

export default ProductEdit;
