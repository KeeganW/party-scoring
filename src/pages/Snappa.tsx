import { useEffect } from 'react';
import { Button, Text } from '@mantine/core';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/Types';
import {fetchGenericScore, players, type SnappaScore} from 'src/utils/Connect';
import {handleScore, handleUndo} from 'src/utils/commonFunctions';

export const Snappa = () => {
  const [scores, setScores] = useImmer<Map<number, SnappaScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof SnappaScore>(setScores);
  }, []);

  const title = 'Snappa';

  const actions = ({ player }: { player: PlayerType, playerIndex: number }) => {
    return [
      <Button onClick={() => { handleScore(player.id, 'points', setHistory, setScores); }}>Scored On</Button>,
      <Button onClick={() => { handleScore(player.id, 'sinks', setHistory, setScores); }}>Finished Drink</Button>,
      <Button onClick={() => { handleScore(player.id, 'sunk', setHistory, setScores); }}>Stopped Quarter</Button>
    ];
  };

  const display = ({ playerIndex }: { player: PlayerType, playerIndex: number }) => {
    const playerScore = scores.get(players[playerIndex].id);
    return playerScore ? [
      <Text ta="center">Points: {playerScore.points}</Text>,
      <Text ta="center">Sinks: {playerScore.sinks}</Text>,
      <Text ta="center">Sunk: {playerScore.sunk}</Text>
    ] : null;
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} display={display} undoAction={() => { handleUndo(setHistory, setScores); }} undoDisabled={undoDisabled} />
  );
};
