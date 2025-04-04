import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, MagicalMixersScore, PlayerType} from 'src/utils/types';
import {fetchGenericScore} from 'src/utils/connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';
import {setScoreFromWebSocket, useWebSocket} from 'src/utils/websocket';
import {players} from 'src/utils/constants';

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
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'drinkWater'} title={'Drink Water'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
