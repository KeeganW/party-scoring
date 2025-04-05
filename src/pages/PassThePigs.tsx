import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { HistoryItem, PassThePigsScore, PlayerType } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { DESCRIPTIONS, players } from 'src/utils/constants';

export const PassThePigs = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, PassThePigsScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof PassThePigsScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof PassThePigsScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Pass the Pigs';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'above'} title={'Scored above 40'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem webSocket={webSocket} player={player} action={'piggedOut'} title={'Pigged out'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  const { above, piggedOut } = DESCRIPTIONS;
  const descriptions = { above, piggedOut };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
