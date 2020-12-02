import axios from 'axios';
import { authConfig, baseUrl, getLogger, withLogs } from '../core';
import { ProductProps } from './ProductProps';
import {Plugins} from "@capacitor/core";
import {LocalStorage} from "../core/storage";

const {Storage} = Plugins;
const {Network} = Plugins;

const productUrl = `http://${baseUrl}/api/product`;

export const getProducts: (token: string) => Promise<ProductProps[]> = (token) => {
    return Network.getStatus()
        .then(status => {
            if (status.connected) {
                var res = axios.get(productUrl, authConfig(token));
                log("CONNECTION4: " + status.connected);
                res.then(function (res) {
                    (async () => {
                        await Storage.set({
                            key: 'products',
                            value: JSON.stringify(res.data)
                        });
                    })()
                })
                return withLogs(res, 'getProducts');
            }
            log("getProducts from local Storage");
            return Storage.get({key: 'products'});
        })
}

export const createProduct: (token: string, product: ProductProps) => Promise<ProductProps[]> = (token, product) => {
    return Network.getStatus()
        .then(status => {
            if (status.connected) {
                var res = axios.post(productUrl, product, authConfig(token));
                res.then(async function (res) {
                    await Storage.set({
                        key: `new${product._id}`,
                        value: JSON.stringify({
                            id: product._id,
                            description: product.description,
                            price: product.price,
                            size: product.size,
                            availability: product.availability,
                            date: product.date
                        }),
                    });
                });
                return withLogs(res, 'createProduct');
            }
            return Storage.set({
                key: 'new',
                value: JSON.stringify({
                    id: product._id,
                    description: product.description,
                    price: product.price,
                    size: product.size,
                    availability: product.availability,
                    date: product.date
                }),
            });
        })
}

export const updateProduct: (token: string, product: ProductProps) => Promise<ProductProps[]> = (token, product) => {
    return Network.getStatus()
        .then(status => {
            if (status.connected) {
                var res = axios.put(`${productUrl}/${product._id}`, product, authConfig(token));
                res.then(async function (res) {
                    if (product._id)
                        await Storage.set({
                            key: product._id,
                            value: JSON.stringify({
                                id: product._id,
                                description: product.description,
                                price: product.price,
                                size: product.size,
                                availability: product.availability,
                                date: product.date
                            }),
                        });
                });
                return withLogs(res, 'updateProduct');
            }
            return Storage.set({
                key: 'user',
                value: JSON.stringify({
                    id: product._id,
                    description: product.description,
                    price: product.price,
                    size: product.size,
                    availability: product.availability,
                    date: product.date
                }),
            });
        });
}

interface MessageData {
    type: string;
    payload: ProductProps;
}

const log = getLogger('ws');

export const newWebSocket = (token: string, onMessage: (data: MessageData) => void) => {
    const ws = new WebSocket(`ws://${baseUrl}`);
    ws.onopen = () => {
        log('web socket onopen');
        ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
    };
    ws.onclose = () => {
        log('web socket onclose');
    };
    ws.onerror = error => {
        log('web socket onerror', error);
    };
    ws.onmessage = messageEvent => {
        log('web socket onmessage');
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}
