import { useEffect } from 'react';
import { Button, Text } from '@mantine/core';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/Types';
import {fetchGenericScore, players, type HockeyScore} from 'src/utils/Connect';
import {handleScore, handleUndo} from 'src/utils/commonFunctions';

export const Hockey = () => {
  const [scores, setScores] = useImmer<Map<number, HockeyScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof HockeyScore>(setScores);
  }, []);

  const title = 'Hockey';

  const actions = ({ player }: { player: PlayerType, playerIndex: number }) => {
    return [
      <Button onClick={() => { handleScore(player.id, 'scoredOn', setHistory, setScores); }}>Scored On</Button>,
      <Button onClick={() => { handleScore(player.id, 'finishedDrink', setHistory, setScores); }}>Finished Drink</Button>,
      <Button onClick={() => { handleScore(player.id, 'stoppedQuarter', setHistory, setScores); }}>Stopped Quarter</Button>
    ];
  };

  const display = ({ playerIndex }: { player: PlayerType, playerIndex: number }) => {
    const playerScore = scores.get(players[playerIndex].id);
    return playerScore ? [
      <Text ta="center">Scored On: {playerScore.scoredOn}</Text>,
      <Text ta="center">Finished Drinks: {playerScore.finishedDrink}</Text>,
      <Text ta="center">Stopped Quarters: {playerScore.stoppedQuarter}</Text>
    ] : null;
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} display={display} undoAction={() => { handleUndo(setHistory, setScores); }} undoDisabled={undoDisabled} />
  );
};
