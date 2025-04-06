import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { AllGenericScoresKeys } from 'src/utils/types';

export type Update = {
  player: number;
  key: AllGenericScoresKeys;
  value: number;
} | {
  error: string;
};

export interface WebSocketAction {
  updates: Update[],
  sendMessage: any,
}

export const useWebSocket = (urlPath: string): WebSocketAction => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    const connect = () => {
      const baseUrl = window.location.hostname.includes('github.io')
        ? 'wss://api.boardgameleague.io/ws/'
        : 'ws://localhost:8000/ws/';
      const url = `${baseUrl}${urlPath}/`;
      const ws = new WebSocket(url);

      ws.onmessage = (event: MessageEvent<string>) => { setUpdates((prev) => [...prev, JSON.parse(event.data) as Update]); };
      ws.onclose = () => setTimeout(connect, 3000); // Reconnect after 3s
      setSocket(ws);
    };

    connect();
    return () => socket?.close();
  }, []);

  const sendMessage = (message: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  return { updates, sendMessage };
};

export const setScoreFromWebSocket = <T extends AllGenericScoresKeys>(webSocket: WebSocketAction, setScores: any): void => {
  // Check if there are any updates before processing
  if (webSocket.updates.length === 0) return;

  // Get the latest update
  const latestUpdate = webSocket.updates.slice(-1)[0];
  if ('error' in latestUpdate) {
    // Create a mantine notification warning about the error
    console.warn(latestUpdate.error);
    notifications.clean()
    notifications.show({
      color: 'red',
      message: latestUpdate.error,
    })
  } else {
    // An update exists, so process it
    setScores((draft: any) => {
      const playerScores = draft.get(latestUpdate.player);
      if (playerScores) {
        const key = latestUpdate.key as keyof T;

        // We have the player, so set the player's score to the new value
        playerScores[key] = latestUpdate.value;
        draft.set(latestUpdate.player, playerScores);
      }
    });
  }

}
