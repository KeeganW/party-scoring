import { useEffect, useState } from "react";
import {AllGenericScoresKeys, type BeerDieScore} from "src/utils/connect";

export type Update = {
  player: number;
  key: AllGenericScoresKeys;
  value: number;
};

export type WebSocketAction = {
  updates: Update[],
  sendMessage: any,
}

export const useWebSocket = (urlPath: string): WebSocketAction => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    const connect = () => {
      const baseUrl = window.location.hostname.includes('github.io')
        ? 'ws://api.boardgameleague.io/ws/'
        : 'ws://localhost:8000/ws/';
      const url = `${baseUrl}${urlPath}/`;
      const ws = new WebSocket(url);

      ws.onmessage = (event: MessageEvent<string>) => setUpdates((prev) => [...prev, JSON.parse(event.data) as Update]);
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
  if (latestUpdate) {
    // An update exists, so process it
    setScores((draft: any) => {
      const playerScores = draft.get(latestUpdate.player);
      if (playerScores) {
        // We have the player, so set the player's score to the new value
        const key = latestUpdate.key as keyof T;
        playerScores[key] = latestUpdate.value;
        draft.set(latestUpdate.player, playerScores);
      }
    });
  }
}
