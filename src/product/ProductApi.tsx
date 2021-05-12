import axios from 'axios';
import { authConfig, baseUrl, getLogger } from '../core';
import { ProductProps } from './ProductProps';
import {LocalStorage} from "../core/storage";

const {v4: uuidv4} = require('uuid');

const productUrl = `http://${baseUrl}/api/item/leadeasdrboard/2`;

export const getProducts: (token: string, networkStatus:boolean) => Promise<ProductProps[]> =
    async (token,networkStatus) => {
        if(networkStatus){
            const localProducts = await getProductsLocal("products");
            setIfModifiedSinceHeader(localProducts,authConfig(token));
            return axios.get(productUrl, authConfig(token))
                .then( response => {
                    const products = response.data;
                    console.log('200');
                    products.forEach( (product: ProductProps) =>{
                        const index = localProducts.findIndex(it => it._id === product._id);
                        if(index === -1){
                            localProducts.push(product);
                        } else{
                            localProducts[index] = product;
                        }
                        LocalStorage.set(`products/${product._id}`,product).then();
                    });
                    return localProducts;
                })
                .catch(err => {
                    if(err.response?.status === 304){
                        console.log('304');
                        return localProducts;
                    }
                    return getProductsLocal('products');
                });
        }
        return getProductsLocal('products');
}

export const createProduct: (token: string, product: ProductProps, networkStatus:boolean) => Promise<ProductProps> = (token, product, networkStatus) => {
    return networkStatus
        ? axios.post(productUrl,product,authConfig(token))
            .then(response => {
                console.log(product);
                saveProductLocal(response.data,true).then();
                console.log(response.data);
                return response.data;
            })
        : saveProductLocal(product,false);
}

export const updateProduct: (token: string, product: ProductProps, networkStatus:boolean) => Promise<ProductProps> = (token, product,networkStatus) => {
        if(networkStatus) {
            return axios.put(`${productUrl}/${product._id}`, product, authConfig(token))
                .then(response => {
                    saveProductLocal(response.data, true).then();
                    return response.data;
                })
                .catch(err => {
                        if (err.response?.status === 412) {
                            const conflict: ProductProps = err.response.data;
                            conflict.hasConflicts = true;
                            console.log("CONFLITC!!");
                            console.log(conflict);
                            return Promise.resolve(conflict);
                        }
                        return saveProductLocal(product, false).then()
                    }
                );
        }
        return saveProductLocal(product,false).then();
}

export const syncDataWithServer:(token:string) => Promise<ProductProps[]> = async (token)=>{
    const products = await getProductsLocal("sync/products");
    const conflictProducts = [];
    for(const prod in products){
        const product = products[prod];
        if(product.version === 0){
            await createProduct(token,product,true);
        }
        else{
            const conflict = await updateProduct(token,product,true);
            console.log("CONFLICT SYNC");
            console.log(product);
            if(conflict.hasConflicts){
                product.version = conflict.version;
                conflictProducts.push(product,conflict);
            }
        }
        await LocalStorage.remove(`sync/products/${product._id}`);
    }
    return Promise.resolve(conflictProducts);
}

function saveProductLocal(product:ProductProps,isNetworkAvailable: boolean): Promise<ProductProps>{
    if (!product?._id) {
        product._id = uuidv4();
        product.version = 0;
    }
    LocalStorage.set(`products/${product._id}`,product).then();
    if (!isNetworkAvailable) {
        LocalStorage.set(`sync/products/${product._id}`, product).then();
    }
    return Promise.resolve(product);
}

async function getProductsLocal(keyFind:string): Promise<ProductProps[]>{
    const keys: string[] = await LocalStorage.keys();
    const products = [];
    for(const i in keys){
        const key = keys[i];
        if(key.startsWith(keyFind)){
            const product: ProductProps = await LocalStorage.get(key);
            products.push(product);
        }
    }
    return products;
}

function setIfModifiedSinceHeader(products:ProductProps[],config:any):void{
    if(products.length  === 0) return;
    let ifModifiedSince = new Date(products[0].lastModified)
    products.forEach(product => {
        const productModified = new Date(product.lastModified);
        if(productModified > ifModifiedSince){
            ifModifiedSince = productModified;
        }
    })
    const sec = ifModifiedSince.getSeconds();
    ifModifiedSince.setSeconds(sec + 1);
    config.headers['if-modified-since'] = ifModifiedSince.toUTCString();
}

interface MessageData {
    type: string;
    payload: ProductProps;
}

const log = getLogger('ws');

export const newWebSocket = (token:string,onMessage: (data: MessageData) => void) => {
    const ws = new WebSocket(`ws://${baseUrl}`)
    ws.onopen = () => {
        log('web socket onopen');
        ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
        log("Opened")
    };
    ws.onclose = () => {
        log('web socket onclose');
    };
    ws.onerror = error => {
        log('web socket onerror', error);
    };
    ws.onmessage = messageEvent => {
        log('web socket onmessage');
        const data: MessageData = JSON.parse(messageEvent.data);
        const {type, payload: product} = data;
        //console.log(product);
        //if (type === 'created' || type === 'updated') {
        //    saveProductLocal(product,true).then();
        //}
        onMessage(data);
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}

