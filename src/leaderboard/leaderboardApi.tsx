import axios from 'axios';
import { authConfig, baseUrl, getLogger, withLogs } from '../core';
import { LeaderBoardProps } from './leaderBoardProps';

const itemUrl = `http://${baseUrl}/api/item/leaderboard`;

export const getItems: (token: string) => Promise<LeaderBoardProps[]> = token => {
  return withLogs(axios.get(itemUrl, authConfig(token)), 'getItems');
}

export const createItem: (token: string, item: LeaderBoardProps) => Promise<LeaderBoardProps[]> = (token, item) => {
  return withLogs(axios.post(itemUrl, item, authConfig(token)), 'createItem');
}

export const updateItem: (token: string, item: LeaderBoardProps) => Promise<LeaderBoardProps[]> = (token, item) => {
  return withLogs(axios.put(`${itemUrl}/2`, item, authConfig(token)), 'updateItem');
}

interface MessageData {
  type: string;
  payload: LeaderBoardProps;
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
