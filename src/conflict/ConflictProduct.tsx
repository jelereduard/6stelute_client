import React, {useContext, useEffect, useState} from 'react'
import {RouteComponentProps} from 'react-router';
import {ProductProps} from "../product/ProductProps";
import {ProductContext} from "../product/ProductProvider";
import ProductsList from "../product/ProductsList";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonLoading,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';


const ConflictProduct: React.FC<RouteComponentProps> = ({history}) =>{
    const {conflictProducts} = useContext(ProductContext)
    const {saving, savingError, saveProduct} = useContext(ProductContext);
    const [firstProduct,setFirstProduct] = useState<ProductProps>()
    const [secondProduct,setSecondProduct] = useState<ProductProps>()
    useEffect(setProductVs, []);

    function setProductVs(){
        if(!conflictProducts || conflictProducts?.length === 0){
            history.goBack();
            return;
        }
        setFirstProduct(conflictProducts[0])
        setSecondProduct(conflictProducts[1])
    }

    const handleSave = (product: ProductProps) => {
        product.hasConflicts=true;
        saveProduct && saveProduct(product).then(() => {
            conflictProducts?.shift();
            conflictProducts?.shift();
            setProductVs();
        });
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Version conflicts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {firstProduct && (<ProductConflictView product={firstProduct} onAction={handleSave}/>)}
                <div className={'product-header'}>VS</div>
                {secondProduct && (<ProductConflictView product={secondProduct} onAction={handleSave}/>)}
                <IonLoading isOpen={saving}/>
                {savingError && (
                    <div>{savingError.message || 'Failed to save product'}</div>
                )}
            </IonContent>
        </IonPage>
    );
}

const ProductConflictView: React.FC<{ product: ProductProps, onAction:(product: ProductProps) => void}> = ({product,onAction}) =>{
        return(
            <IonCard>
                <IonCardHeader className = {'product-header'}>
                    <IonCardTitle>{product.description}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>Price</IonCol>
                            <IonCol>{product.price}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Size</IonCol>
                            <IonCol>${product.size}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Availability</IonCol>
                            <IonCol>{product.availability}</IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>Date</IonCol>
                            <IonCol>{product.date}</IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonButton onClick={() => onAction(product)} class={'action-button'}>Accept this version</IonButton>
                </IonCardContent>
            </IonCard>
        );
}

export default ConflictProduct;