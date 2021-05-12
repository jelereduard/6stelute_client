import axios from 'axios';
import { authConfig, baseUrl, getLogger } from '../core';
import { LeaderboardProps } from './LeaderboardProps';
import {LocalStorage} from "../core/storage";

const {v4: uuidv4} = require('uuid');

const leaderboardUrl = `http://${baseUrl}/api/item/leaderboard/2`;

export const getLeaderboard: (token: string, networkStatus:boolean) => Promise<LeaderboardProps[]> =
    async (token,networkStatus) => {
        if(networkStatus){
            const localLeaderboards = await getLeaderboardsLocal("leaderboards");
            setIfModifiedSinceHeader(localLeaderboards,authConfig(token));
            return axios.get(leaderboardUrl, authConfig(token))
                .then( response => {
                    const leaderboards = response.data;
                    console.log('200');
                    leaderboards.forEach( (leaderboard: LeaderboardProps) =>{
                        const index = localLeaderboards.findIndex(it => it._id === leaderboard._id);
                        if(index === -1){
                            localLeaderboards.push(leaderboard);
                        } else{
                            localLeaderboards[index] = leaderboard;
                        }
                        LocalStorage.set(`leaderboards/${leaderboard._id}`,leaderboard).then();
                    });
                    return localLeaderboards;
                })
                .catch(err => {
                    if(err.response?.status === 304){
                        console.log('304');
                        return localLeaderboards;
                    }
                    return getLeaderboardsLocal('leaderboards');
                });
        }
        return getLeaderboardsLocal('leaderboards');
}

export const createLeaderboard: (token: string, leaderboard: LeaderboardProps, networkStatus:boolean) => Promise<LeaderboardProps> = (token, leaderboard, networkStatus) => {
    return networkStatus
        ? axios.post(leaderboardUrl,leaderboard,authConfig(token))
            .then(response => {
                console.log(leaderboard);
                saveLeaderboardLocal(response.data,true).then();
                console.log(response.data);
                return response.data;
            })
        : saveLeaderboardLocal(leaderboard,false);
}

export const updateLeaderboard: (token: string, leaderboard: LeaderboardProps, networkStatus:boolean) => Promise<LeaderboardProps> = (token, leaderboard,networkStatus) => {
        if(networkStatus) {
            return axios.put(`${leaderboardUrl}/${leaderboard._id}`, leaderboard, authConfig(token))
                .then(response => {
                    saveLeaderboardLocal(response.data, true).then();
                    return response.data;
                })
                .catch(err => {
                        
                        return saveLeaderboardLocal(leaderboard, false).then()
                    }
                );
        }
        return saveLeaderboardLocal(leaderboard,false).then();
}

export const syncDataWithServer:(token:string) => Promise<LeaderboardProps[]> = async (token)=>{
    const leaderboards = await getLeaderboardsLocal("sync/leaderboards");
    const conflictLeaderboards = [];
    for(const prod in leaderboards){
        const leaderboard = leaderboards[prod];
        if(!leaderboard){
            await createLeaderboard(token,leaderboard,true);
        }
        else{
            const conflict = await updateLeaderboard(token,leaderboard,true);
            console.log("CONFLICT SYNC");
            console.log(leaderboard);
            
                conflictLeaderboards.push(leaderboard,conflict);
            
        }
        await LocalStorage.remove(`sync/leaderboards/${leaderboard._id}`);
    }
    return Promise.resolve(conflictLeaderboards);
}

function saveLeaderboardLocal(leaderboard:LeaderboardProps,isNetworkAvailable: boolean): Promise<LeaderboardProps>{
    if (!leaderboard?._id) {
        leaderboard._id = uuidv4();
    }
    LocalStorage.set(`leaderboards/${leaderboard._id}`,leaderboard).then();
    if (!isNetworkAvailable) {
        LocalStorage.set(`sync/leaderboards/${leaderboard._id}`, leaderboard).then();
    }
    return Promise.resolve(leaderboard);
}

async function getLeaderboardsLocal(keyFind:string): Promise<LeaderboardProps[]>{
    const keys: string[] = await LocalStorage.keys();
    const leaderboards = [];
    for(const i in keys){
        const key = keys[i];
        if(key.startsWith(keyFind)){
            const leaderboard: LeaderboardProps = await LocalStorage.get(key);
            leaderboards.push(leaderboard);
        }
    }
    return leaderboards;
}

function setIfModifiedSinceHeader(leaderboards:LeaderboardProps[],config:any):void{
    if(leaderboards.length  === 0) return;
    
}

interface MessageData {
    type: string;
    payload: LeaderboardProps;
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
        const {type, payload: leaderboard} = data;
        onMessage(data);
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}

