import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllGenericScore } from 'src/utils/connect';

interface ScoreData {
  id: number;
  key: string;
  player: number;
  timestamp: string;
  value: number;
}

export const Graph = () => {
  const [data, setData] = useState<ScoreData[]>([]);

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
  console.log(aggregatedData);

  return (
    <div>
    </div>
  );
};
