import { PlayerType } from 'src/utils/types';
import type { AllGenericScoresKeys } from 'src/utils/types';
import { ActionIcon, Text, Group } from '@mantine/core';
import { handleReduce, handleScore, triggerEmojiRain } from 'src/utils/commonFunctions';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { WebSocketAction } from 'src/utils/websocket';

// TODO fix this type
export const GenericScoreCardItem = ({ player, action, title, scores, setHistory, setScores, webSocket, enableMinus = false }: { player: PlayerType, action: AllGenericScoresKeys, title: string, scores: any, setHistory: any, setScores: any, webSocket: WebSocketAction, enableMinus?: boolean }) => {
  const playerScore = scores.get(player.id);
  if (!playerScore) {
    return null;
  }

  return (
    <Group justify="space-between">
      <Text>
        {title}: {playerScore[action] ?? 0}
      </Text>
      <Group>
        {enableMinus && (
          <ActionIcon color={player.color} onClick={() => { handleReduce(player.id, action, setHistory, setScores, webSocket); }}>
            <IconMinus />
          </ActionIcon>
        )}
        <ActionIcon color={player.color} onClick={() => { handleScore(player.id, action, setHistory, setScores, webSocket); if (action.includes('sinks')) triggerEmojiRain(); }}>
          <IconPlus />
        </ActionIcon>
      </Group>
    </Group>
  );
}
