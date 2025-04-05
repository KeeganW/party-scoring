import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { HistoryItem, HockeyScore, PlayerType } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';
import {useLocation} from "react-router";

export const Hockey = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, HockeyScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);
  const location = useLocation();

  // Extract query parameters from the hash
  const params = new URLSearchParams(location.search.split('?')[1]);

  useEffect(() => {
    fetchGenericScore<keyof HockeyScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof HockeyScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Hockey';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'goal'} title={'Scored a Goal'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'scoredOn'} title={'Hit by quarter'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'finishedDrink'} title={'Finished drink'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'stoppedQuarter'} title={'Stopped quarter'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('enableMinus')} webSocket={webSocket} player={player} action={'failStoppedQuarter'} title={'Failed to stop quarter'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  const { goal, scoredOn, finishedDrink, stoppedQuarter, failStoppedQuarter } = DESCRIPTIONS;
  const descriptions = { goal, scoredOn, finishedDrink, stoppedQuarter, failStoppedQuarter };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
