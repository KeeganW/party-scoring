import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllGenericScore } from 'src/utils/connect';
import { players, DESCRIPTIONS } from 'src/utils/constants';

interface ScoreData {
  id: number;
  key: string;
  player: number;
  timestamp: string;
  value: number;
}

export const Graph = () => {
  const [data, setData] = useState<ScoreData[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllGenericScore();
      setData(response);
    };
    fetchData();
  }, []);

  const aggregatedData = data.reduce((acc, { key, player, timestamp, value }) => {
    const date = new Date(timestamp).toLocaleString();
    if (!acc[key]) acc[key] = {};
    if (!acc[key][date]) {
      const newestDate = Object.keys(acc[key] || {}).reduce((newest: string | undefined, current) => {
        if (!newest) return current;
        return new Date(current) > new Date(newest) ? current : newest;
      }, undefined);

      if (newestDate) {
        acc[key][date] = Object.assign({}, acc[key][newestDate]);
      } else {
        acc[key][date] = {};
      }
    }
    if (!acc[key][date][player]) acc[key][date][player] = 0;
    acc[key][date][player] += value;
    return acc;
  }, {} as Record<string, Record<string, Record<number, number>>>);

  const filteredData = Object.entries(aggregatedData[selectedMetric || ''] || {}).flatMap(([date, playersData]) => {
    return Object.entries(playersData).map(([player, value]) => ({
      date,
      player,
      value,
    }));
  }).filter(d => {
    return selectedPlayer === null || d.player === selectedPlayer.toString();
  });

  const selectedMetricDescription = Object.entries(DESCRIPTIONS).filter(([key, description]) => key === selectedMetric)
  const hrnMetric = selectedMetricDescription.length > 0 ? selectedMetricDescription[0][1].title : "";

  return (
    <div>
      <div>
        <label htmlFor="player-select">Select Player:</label>
        <select id="player-select" onChange={e => setSelectedPlayer(Number(e.target.value))}>
          <option value="">No Players</option>
          {players.map(player => (
            <option key={player.id} value={player.id}>{player.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="metric-select">Select Metric:</label>
        <select id="metric-select" onChange={e => setSelectedMetric(e.target.value)}>
          <option value="">No Metrics</option>
          {Object.entries(DESCRIPTIONS).map(([key, description]) => (
            <option key={key} value={key}>{description.title}</option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" name={hrnMetric || ""} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
