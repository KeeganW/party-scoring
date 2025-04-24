import { useEffect, useState } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { HistoryItem, PlayerType, SnappaScore, WavelengthScore } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';
import { useLocation } from 'react-router';

export const Wavelength = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, SnappaScore>>(new Map());
  const [history, setHistory] = useState<HistoryItem>(undefined);
  const location = useLocation();

  // Extract query parameters from the hash
  const params = new URLSearchParams(location.search.split('?')[1]);

  useEffect(() => {
    fetchGenericScore<keyof WavelengthScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof WavelengthScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Wavelength';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'primaryGuessTarget'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'secondaryGuessCorrect'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'secondaryGuessWrong'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = !history;

  const { primaryGuessTarget, secondaryGuessCorrect, secondaryGuessWrong } = DESCRIPTIONS;
  const descriptions = { primaryGuessTarget, secondaryGuessCorrect, secondaryGuessWrong };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(history, setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
