import { useEffect, useState } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { CamelUpScore, HistoryItem, PlayerType } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';
import { useLocation } from 'react-router';
import {Title} from "@mantine/core";

export const CamelUp = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, CamelUpScore>>(new Map());
  const [history, setHistory] = useState<HistoryItem>(undefined);
  const location = useLocation();

  // Extract query parameters from the hash
  const params = new URLSearchParams(location.search.split('?')[1]);

  useEffect(() => {
    fetchGenericScore<keyof CamelUpScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof CamelUpScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Camel Up';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'firstPlace'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem enableMinus={!!params.get('minus')} webSocket={webSocket} player={player} action={'lastPlace'} scores={scores} setHistory={setHistory} setScores={setScores} />,
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

  const { firstPlace, lastPlace } = DESCRIPTIONS;
  const descriptions = { firstPlace, lastPlace };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(history, setHistory, setScores, webSocket); }}  undoDisabled={undoDisabled} beerCount={beerCount} />
  );
};
