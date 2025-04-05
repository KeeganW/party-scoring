import { AllGenericScoresKeys } from 'src/utils/types';
import { WebSocketAction } from 'src/utils/websocket';
import styles from 'src/utils/commonFunctionality.module.css';

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
