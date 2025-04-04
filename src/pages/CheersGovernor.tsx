import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {CheersGovernorScore, HistoryItem, PlayerType} from 'src/utils/types';
import {fetchGenericScore} from 'src/utils/connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';
import {setScoreFromWebSocket, useWebSocket} from 'src/utils/websocket';
import {players} from 'src/utils/constants';

export const CheersGovernor = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, CheersGovernorScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof CheersGovernorScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof CheersGovernorScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Cheers Governor';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'forgot'} title={'Forgot'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'addedNumber'} title={'Added Number'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
