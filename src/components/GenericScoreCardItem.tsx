import {PlayerType} from 'src/utils/Types';
import type {AllGenericScoresKeys} from 'src/utils/Connect';
import {ActionIcon, Text, Group} from '@mantine/core';
import {handleScore} from 'src/utils/commonFunctions';
import { IconPlus } from '@tabler/icons-react';

// TODO fix this type
export const GenericScoreCardItem = ({ player, action, title, scores, setHistory, setScores }: { player: PlayerType, action: AllGenericScoresKeys, title: string, scores: any, setHistory: any, setScores: any }) => {
  const playerScore = scores.get(player.id);
  if (!playerScore) {
    return null;
  }

  return (
    <Group justify="space-between">
      <Text>
        {title}: {playerScore[action] || 0}
      </Text>
      <ActionIcon onClick={() => { handleScore(player.id, action, setHistory, setScores); }}>
        <IconPlus />
      </ActionIcon>
    </Group>
  );
}
