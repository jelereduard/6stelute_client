import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { getLogger } from '../core';
import { ProductProps } from './ProductProps';
import { createProduct, getProducts, newWebSocket, updateProduct } from './ProductApi';
import { AuthContext } from '../auth';
import {Network} from "@capacitor/core";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

const log = getLogger('ProductProvider');

type SaveProductFn = (product: ProductProps, networkConnection: boolean) => Promise<any>;

export interface ProductsState {
    products?: ProductProps[],
    fetching: boolean,
    fetchingError?: Error | null,
    saving: boolean,
    savingError?: Error | null,
    saveProduct?: SaveProductFn
}

interface ActionProps {
    type: string,
    payload?: any,
}

const initialState: ProductsState = {
    fetching: false,
    saving: false,
};

const FETCH_PRODUCTS_STARTED         = 'FETCH_PRODUCTS_STARTED';
const FETCH_PRODUCTS_SUCCEEDED       = 'FETCH_PRODUCTS_SUCCEEDED';
const FETCH_PRODUCTS_FAILED          = 'FETCH_PRODUCTS_FAILED';
const SAVE_PRODUCT_STARTED           = 'SAVE_PRODUCT_STARTED';
const SAVE_PRODUCT_SUCCEEDED         = 'SAVE_PRODUCT_SUCCEEDED';
const SAVE_PRODUCT_SUCCEEDED_OFFLINE = "SAVE_PRODUCT_SUCCEEDED_OFFLINE";
const SAVE_PRODUCT_FAILED            = 'SAVE_PRODUCT_FAILED';

const reducer: (state: ProductsState, action: ActionProps) => ProductsState =
    (state, { type, payload }) => {
        switch (type) {
            case FETCH_PRODUCTS_STARTED:
                return { ...state, fetching: true, fetchingError: null };
            case FETCH_PRODUCTS_SUCCEEDED:
                return { ...state, products: payload.products, fetching: false };
            case FETCH_PRODUCTS_FAILED:
                return { ...state, fetchingError: payload.error, fetching: false };
            case SAVE_PRODUCT_STARTED:
                return { ...state, savingError: null, saving: true };
            case SAVE_PRODUCT_SUCCEEDED:
                const saveProducts = state.products || [];
                const products = [...saveProducts];
                const product = payload.product;
                const index = products.findIndex(pr => pr._id === product._id);
                if (index === -1) {
                    products.splice(0, 0, product);
                } else {
                    products[index] = product;
                }
                return { ...state, products, saving: false };
            case SAVE_PRODUCT_SUCCEEDED_OFFLINE: {
                const products = [...(state.products || [])];
                const product = payload.product;
                const index = products.findIndex((it) => it._id === product._id);
                if (index === -1) {
                    products.splice(0, 0, product);
                } else {
                    products[index] = product;
                }
                return { ...state, products, saving: false };
            }
            case SAVE_PRODUCT_FAILED:
                return { ...state, savingError: payload.error, saving: false };
            default:
                return state;
        }
    };

export const ProductContext = React.createContext<ProductsState>(initialState);

interface ProductProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products, fetching, fetchingError, saving, savingError } = state;

    useEffect(getProductsEffect, [token]);
    useEffect(wsEffect, [token]);
    useEffect(networkEffect, [token]);

    const saveProduct = useCallback<SaveProductFn>(saveProductCallback, [token]);
    const value = { products, fetching, fetchingError, saving, savingError, saveProduct};


    log('returns');
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );

    function getProductsEffect() {
        let canceled = false;
        fetchProducts();
        return () => {
            canceled = true;
        }

        async function fetchProducts() {
            if (!token?.trim()) {
                return;
            }
            try {
                log('fetchProducts started');
                dispatch({ type: FETCH_PRODUCTS_STARTED });
                const products = await getProducts(token);
                log('fetchProducts succeeded');
                if (!canceled) {
                    dispatch({ type: FETCH_PRODUCTS_SUCCEEDED, payload: { products } });
                }
            } catch (error) {
                const myKeys = Storage.keys();
                let localProducts = await myKeys.then(function (myKeys) {
                   const arr = [];

                   for (let i = 0; i < myKeys.keys.length; i++)
                   {
                       if (myKeys.keys[i].valueOf().includes("products"))
                       {
                           const item  = Storage.get({key: myKeys.keys[i]});
                           arr.push(item);
                       }
                   }
                   log(arr);
                   return arr;
                });

                log('fetchProducts failed - localStorage succeded');
                dispatch({ type: FETCH_PRODUCTS_SUCCEEDED, payload: { localProducts } });
            }
        }
    }

    function random_id() {
        return "_" + Math.random().toString(36).substr(2, 9);
    }

    async function saveProductCallback(product: ProductProps, networkConnection : boolean) {
        try {
            if (!networkConnection) {
                throw new Error();
            }
            log('saveProduct started');
            dispatch({ type: SAVE_PRODUCT_STARTED });
            const savedProduct = await (product._id ? updateProduct(token, product) : createProduct(token, product));
            log('saveProduct succeeded');
            dispatch({ type: SAVE_PRODUCT_SUCCEEDED, payload: { product: savedProduct } });
        }
        catch (error)
        {
            if (product._id === undefined) {
                product._id = random_id();
            }

            await Storage.set({
                key: `new${product._id}`,
                value: JSON.stringify(product),
            });

            log('saveProduct failed - localStorage succeded');
            dispatch({ type: SAVE_PRODUCT_SUCCEEDED_OFFLINE, payload: { product: product } });
        }
    }

    function wsEffect() {
        let canceled = false;
        log('wsEffect - connecting');
        let closeWebSocket: () => void;
        if (token?.trim()) {
            closeWebSocket = newWebSocket(token, message => {
                if (canceled) {
                    return;
                }
                const { type, payload: product } = message;
                log(`ws message, product ${type}`);
                if (type === 'created' || type === 'updated') {
                    dispatch({ type: SAVE_PRODUCT_SUCCEEDED, payload: { product } });
                }
            });
        }
        return () => {
            log('wsEffect - disconnecting');
            canceled = true;
            closeWebSocket?.();
        }
    }

    function networkEffect() {
        let canceled = false;
        Network.addListener('networkStatusChange', async (status) => {
            if (canceled) {
                return;
            }
            const connected: boolean = status.connected;
            if (connected) {
                // const conflicts = await syncData(token);
                // setConflictGuitars(conflicts);
            }
            //setConnectionNetwork(connected);
            console.log("Network status changed", status);
        });
        return () => {
            canceled = true;
        };
    }
};