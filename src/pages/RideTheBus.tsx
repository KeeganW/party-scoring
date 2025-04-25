import { useEffect, useState } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { HistoryItem, PlayerType, RideTheBusScore } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';
import { useLocation } from 'react-router';
import {Title} from "@mantine/core";

export const RideTheBus = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, RideTheBusScore>>(new Map());
  const [history, setHistory] = useState<HistoryItem>(undefined);
  const location = useLocation();

  // Extract query parameters from the hash
  const params = new URLSearchParams(location.search.split('?')[1]);

  useEffect(() => {
    fetchGenericScore<keyof RideTheBusScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof RideTheBusScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Ride the Bus';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'busRider'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'emptyHand'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const beerCount = ({ player }: { player: PlayerType }) => {
    return (
      <div>
        <Title order={4}>{player.name}</Title>
        <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'beer'} scores={scores} setHistory={setHistory} setScores={setScores} />
      </div>
    )
  };

  const undoDisabled = !history;

  const { busRider, emptyHand } = DESCRIPTIONS;
  const descriptions = { busRider, emptyHand };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(history, setHistory, setScores, webSocket); }}  undoDisabled={undoDisabled} beerCount={beerCount} />
  );
};
