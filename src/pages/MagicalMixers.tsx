import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { HistoryItem, MagicalMixersScore, PlayerType } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';

export const MagicalMixers = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, MagicalMixersScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof MagicalMixersScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof MagicalMixersScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Magical Mixers';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'targetted'} title={'Targetted'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'spellcaster'} title={'Spellcaster'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'drinkWater'} title={'Drink Water'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  const { targetted, spellcaster, drinkWater } = DESCRIPTIONS;
  const descriptions = { targetted, spellcaster, drinkWater };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
