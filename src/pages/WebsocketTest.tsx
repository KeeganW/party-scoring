import {useWebSocket} from "src/utils/websocket";

export const WebSocketComponent = () => {
  const { updates } = useWebSocket("generic-score");

  return (
    <div>
      <h2>Live Table Updates</h2>
      <ul>{updates.map((u: any, i: any) => <li key={i}>{JSON.stringify(u)}</li>)}</ul>
    </div>
  );
};
