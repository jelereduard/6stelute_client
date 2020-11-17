import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { ProductProps } from './ProductProps';

interface ProductPropsExt extends ProductProps {
    onEdit: (_id?: string) => void;
}

const Product: React.FC<ProductPropsExt> = ({ _id, description, price, size, availability, date, onEdit }) => {
    return (
        <IonItem onClick={() => onEdit(_id)}>
            <IonLabel>{description} {price} {size} {availability} {date}</IonLabel>
        </IonItem>
    );
};

export default Product;
