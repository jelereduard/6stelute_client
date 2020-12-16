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


const ProductsSearch: React.FC<RouteComponentProps> = ({history}) => {
    const {products, fetchingError} = useContext(ProductContext);
    const [displayed, setDisplayed] = useState<ProductProps[]>([]);
    const [searchSize, setSearchSize] = useState<string>('');

    useEffect(() => {
        if (products?.length) {
            setDisplayed(products.filter(obj => obj.size.indexOf(searchSize) == 0));
        }
    }, [searchSize]);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Shop App</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonSearchbar
                    value={searchSize}
                    debounce={300}
                    onIonChange={e => setSearchSize(e.detail.value!)
                    }>
                </IonSearchbar>
                <IonList>
                    {displayed && displayed.map(({ _id, description, price, size, availability, date, version, hasConflicts, lastModified }) => {
                        return (
                            <Product key={_id} _id={_id} description={description} price={price}
                                     size={size} availability={availability} date={date}
                                     version={version} hasConflicts={hasConflicts} lastModified={lastModified}
                                     onEdit={id => history.push(`/product/${id}`)}/>
                        );
                    })}
                </IonList>

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
