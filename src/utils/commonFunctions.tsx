import { AllGenericScoresKeys, HistoryItem } from 'src/utils/types';
import { WebSocketAction } from 'src/utils/websocket';
import styles from 'src/utils/commonFunctionality.module.css';

// TODO fix this type
export const handleScore = (playerId: number, type: AllGenericScoresKeys, setHistory: any, setScores: any, webSocket: WebSocketAction) => {
  setHistory({ player: playerId, key: type });
  webSocket.sendMessage({ player: playerId, key: type, value: 1 });
};

// TODO fix this type
export const handleReduce = (playerId: number, type: AllGenericScoresKeys, setHistory: any, setScores: any, webSocket: WebSocketAction) => {
  webSocket.sendMessage({ player: playerId, key: type, value: -1 });
};

// TODO fix this type
export const handleUndo = (history: HistoryItem, setHistory: any, setScores: any, webSocket: WebSocketAction) => {
  if (history) {
    const playerId = history.player;
    const type = history.key;
    // TODO fix this type
    setScores((scoresDraft: any) => {
      const playerScore = scoresDraft.get(playerId);
      if (playerScore) {
        webSocket.sendMessage({ player: playerId, key: type, value: -1, bypassWait: true });
      }
    });
    setHistory(undefined);
  }
};

export const triggerEmojiRain = () => {
  for (let i = 0; i < 50; i++) { // Increase emoji count
    const emoji = document.createElement('div');
    emoji.className = styles.emoji;
    emoji.style.left = `${Math.random() * 100}vw`;
    emoji.style.top = `${-50 - Math.random() * 100}px`; // Start above the viewport
    emoji.style.animationDelay = `${Math.random() * 0.5}s`; // Randomize start delay
    emoji.textContent = '💦';
    document.body.appendChild(emoji);
    setTimeout(() => { emoji.remove(); }, 3000); // Remove after 3 seconds, matching fall duration
  }
};
