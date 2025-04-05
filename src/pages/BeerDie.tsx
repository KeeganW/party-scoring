import {useEffect, useState} from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { BeerDieScore, HistoryItem, PlayerType } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';
import {useLocation } from 'react-router';

export const BeerDie = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, BeerDieScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);
  const location = useLocation();

  // Extract query parameters from the hash
  const params = new URLSearchParams(location.search.split('?')[1]);

  useEffect(() => {
    fetchGenericScore<keyof BeerDieScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof BeerDieScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Beer Die';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'pointsDie'} title={'Points'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'missDie'} title={'Miss Table'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'missCatchDie'} title={'Miss Catch'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'sinksDie'} title={'Sinks'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'sunkDie'} title={'Sunk'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  const { pointsDie, missDie, missCatchDie, sinksDie, sunkDie } = DESCRIPTIONS;
  const descriptions = { pointsDie, missDie, missCatchDie, sinksDie, sunkDie };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
