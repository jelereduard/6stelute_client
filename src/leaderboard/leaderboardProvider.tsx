import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { getLogger } from '../core';
import { LeaderboardProps as ProductProps } from './LeaderboardProps';
import { createLeaderboard as createProduct, getLeaderboard as getProducts, newWebSocket, syncDataWithServer, updateLeaderboard as updateProduct } from './leaderboardApi';
import { AuthContext } from '../auth';
import {Network} from "@capacitor/core";
import { Modul } from './LeaderboardList';

const log = getLogger('ProductProvider');

type SaveProductFn = (product: ProductProps) => Promise<any>;
type FetchLeaderboardFn = (idModul: Modul) => Promise<any>;

export interface ProductsState {
    products?: ProductProps[],
    fetching: boolean,
    fetchingError?: Error | null,
    saving: boolean,
    savingError?: Error | null,
    saveProduct?: SaveProductFn
    connectedNetworkStatus?: boolean,
    settingsSavedOffline?: boolean,
    setSettingsSavedOffline? : Function,
    conflictProducts?: ProductProps[];
    setConflictProducts?: Function
    setIdModul?: Function
    fetchLeaderboard?: Function
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
const SAVE_PRODUCT_FAILED            = 'SAVE_PRODUCT_FAILED';
const RESET_PRODUCTS                 = 'RESET_PRODUCTS';

const reducer: (state: ProductsState, action: ActionProps) => ProductsState =
    (state, { type, payload }) => {
        switch (type) {
            case FETCH_PRODUCTS_STARTED:
                return { ...state, fetching: true, fetchingError: null };
            case FETCH_PRODUCTS_SUCCEEDED:
                return { ...state, products: payload.fetchedLeaderboard, fetching: false };
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
            case SAVE_PRODUCT_FAILED:
                return { ...state, savingError: payload.error, saving: false };
            case RESET_PRODUCTS:
                return {...state, products: []};
            default:
                return state;
        }
    };

export const ProductContext = React.createContext<ProductsState>(initialState);

interface ProductProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const { token, isAuthenticated } = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const { products, fetching, fetchingError, saving, savingError } = state;
    const [connectedNetworkStatus, setConnectedNetworkStatus] = useState<boolean>(false)
    Network.getStatus().then(status => setConnectedNetworkStatus(status.connected))
    const [conflictProducts, setConflictProducts] = useState<ProductProps[]>([]);
    const [settingsSavedOffline, setSettingsSavedOffline] = useState<boolean>(false);
    const [idModul, setIdModul] = useState<string>();

    useEffect(getProductsEffect, [token,connectedNetworkStatus]);
    useEffect(wsEffect, [token,connectedNetworkStatus]);
    useEffect(networkEffect, [token,setConnectedNetworkStatus,setConflictProducts]);

    const saveProduct = useCallback<SaveProductFn>(saveProductCallback, [token,connectedNetworkStatus,setSettingsSavedOffline,setConflictProducts]);
    const fetchLeaderboard = useCallback<FetchLeaderboardFn>(fetchModuleCallback,
       [token, idModul]);
    const value = { products, fetching, fetchingError, saving, savingError, saveProduct, connectedNetworkStatus,settingsSavedOffline,
        setSettingsSavedOffline,conflictProducts, setIdModul, fetchLeaderboard};


    log('returns');
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );

    function getProductsEffect() {
        let canceled = false;
        fetchItems().then();
        return () => {
            canceled = true;
        }

        async function fetchItems() {
            if(!isAuthenticated){
                return;
            }
            try {
                log('fetchProducts started');
                dispatch({ type: FETCH_PRODUCTS_STARTED });
                console.log('fetch Products token:' + token);
                console.log("Network: ", connectedNetworkStatus)
                const products = await getProducts(token,idModul);
                log('fetchProducts succeeded');
                if (!canceled) {
                    dispatch({ type: FETCH_PRODUCTS_SUCCEEDED, payload: { products } });
                }
            } catch (error) {
                log('fetchProducts failed');
                dispatch({ type: FETCH_PRODUCTS_FAILED, payload: { error } });
            }
        }
    }

    function random_id() {
        return "_" + Math.random().toString(36).substr(2, 9);
    }

    async function fetchModuleCallback(idModul:Modul) {
      console.log(idModul)
        const fetchedLeaderboard = await getProducts(token,idModul.idModul);
        dispatch({type:FETCH_PRODUCTS_SUCCEEDED, payload: {fetchedLeaderboard}})
        
        
    }

    async function saveProductCallback(product: ProductProps) {
        try {
            log('saveProduct started');
            dispatch({ type: SAVE_PRODUCT_STARTED });
            //console.log(connectedNetworkStatus);
            const savedProduct = await (!product._id ? createProduct(token,product,connectedNetworkStatus)
                : updateProduct(token,product,connectedNetworkStatus));
            //console.log("Unlucky");
            if(savedProduct){
                console.log("AICI");
                dispatch({type: SAVE_PRODUCT_FAILED,payload: "412"});
                
                setConflictProducts([product,savedProduct]);
                return;
            }
            log('saveProduct succeeded');
            dispatch({ type: SAVE_PRODUCT_SUCCEEDED, payload: { product: savedProduct } });
            if (!connectedNetworkStatus) {
                alert("The product couldn't be sent to the server!");
                setSettingsSavedOffline(true);
            }
        } catch (error) {
            log('saveProduct failed');
            dispatch({ type: SAVE_PRODUCT_FAILED, payload: { error } });
        }
    }

    function wsEffect() {
        if(!connectedNetworkStatus || token === '') {
            return;
        }
        let canceled = false;
        log('wsEffect - connecting');
        let closeWebSocket: () => void;
        console.log("Token " + token);
        if (token?.trim()){
            closeWebSocket = newWebSocket(token,message => {
                if (canceled) {
                    return;
                }
                const { type, payload:product} = message;
                log(`ws message, item ${type}`);
                console.log("WsItem :" + product);
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
            const connected: boolean = status.connected
            if (connected) {
                console.log("NetworkEffect", connected);
                const conflicts = await syncDataWithServer(token);
                setConflictProducts(conflicts);
                console.log('conflicts', conflicts)
            }
            setConnectedNetworkStatus(connected);
            console.log("Network status changed", status);
        });
        return () => {
            canceled = true;
        };
    }
};