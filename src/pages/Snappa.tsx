import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/types';
import {fetchGenericScore, players, type SnappaScore} from 'src/utils/connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';
import {setScoreFromWebSocket, useWebSocket} from "src/utils/websocket";

export const Snappa = () => {
  const webSocket = useWebSocket("generic-score");
  const [scores, setScores] = useImmer<Map<number, SnappaScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof SnappaScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof SnappaScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Snappa';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'points'} title={'Points'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'sinks'} title={'Sinks'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'sunk'} title={'Sunk'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
