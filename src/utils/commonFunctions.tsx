import {AllGenericScoresKeys, setGenericScore} from 'src/utils/connect';
import {WebSocketAction} from "src/utils/websocket";

// TODO fix this type
export const handleScore = (playerId: number, type: AllGenericScoresKeys, setHistory: any, setScores: any, webSocket: WebSocketAction) => {
  // TODO fix this type
  setHistory((draft: any) => {
    draft.push({ player: playerId, key: type });
  });

  // TODO fix this type
  setScores((draft: any) => {
    const playerScore = draft.get(playerId);
    if (playerScore) {
      webSocket.sendMessage({ player: playerId, key: type, value: playerScore[type] + 1 });
      playerScore[type] += 1;
    }
  });

};

// TODO fix this type
export const handleReduce = (playerId: number, type: AllGenericScoresKeys, setHistory: any, setScores: any, webSocket: WebSocketAction) => {
  // TODO fix this type
  setScores((draft: any) => {
    const playerScore = draft.get(playerId);
    if (playerScore) {
      webSocket.sendMessage({ player: playerId, key: type, value: playerScore[type] - 1 });
      playerScore[type] -= 1;
    }
  });

};

// TODO fix this type
export const handleUndo = (setHistory: any, setScores: any, webSocket: WebSocketAction) => {
  if (history.length > 0) {
    // TODO fix this type
    setHistory((draft: any) => {
      const lastState = draft.pop();
      if (lastState) {
        const playerId = lastState.player;
        const type = lastState.key;
        // TODO fix this type
        setScores((scoresDraft: any) => {
          const playerScore = scoresDraft.get(playerId);
          if (playerScore) {
            webSocket.sendMessage({ player: playerId, key: type, value: playerScore[type] - 1 });
            playerScore[type] -= 1;
          }
        });
      }
    });
  }
};
