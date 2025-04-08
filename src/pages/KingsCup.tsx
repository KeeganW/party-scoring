import { useEffect, useState } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { HistoryItem, KingsCupScore, PlayerType } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';
import { useLocation } from 'react-router';

export const KingsCup = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, KingsCupScore>>(new Map());
  const [history, setHistory] = useState<HistoryItem>(undefined);
  const location = useLocation();

  // Extract query parameters from the hash
  const params = new URLSearchParams(location.search.split('?')[1]);

  useEffect(() => {
    fetchGenericScore<keyof KingsCupScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof KingsCupScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Kings Cup';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'poppedCan'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'messedUp'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'kingRule'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = !history;

  const { poppedCan, messedUp, kingRule } = DESCRIPTIONS;
  const descriptions = { poppedCan, messedUp, kingRule };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(history, setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
