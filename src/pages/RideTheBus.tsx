import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType, RideTheBusScore} from 'src/utils/types';
import {fetchGenericScore} from 'src/utils/connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';
import {setScoreFromWebSocket, useWebSocket} from 'src/utils/websocket';
import {players} from 'src/utils/constants';

export const RideTheBus = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, RideTheBusScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof RideTheBusScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof RideTheBusScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Ride the Bus';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'busRider'} title={'Bus Rider'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'emptyHand'} title={'Empty Hand'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
