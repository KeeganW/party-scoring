import { ScoreData } from 'src/utils/types';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAllGenericScore } from 'src/utils/connect';
import { players, DESCRIPTIONS } from 'src/utils/constants';
import { IconArrowLeft } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useNavigate } from 'react-router';

export const Timeline = () => {
  const [data, setData] = useState<ScoreData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('pointsDie');
  const [hoveredPlayerId, setHoveredPlayerId] = useState<number | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllGenericScore();
      setData(response);
    };
    fetchData();
  }, []);

  const filtered = data
    .filter(d => d.key === selectedMetric)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const grouped: Record<string, Record<number, number>> = {};
  filtered.forEach(({ timestamp, player, value }) => {
    const time = new Date(timestamp).toLocaleString();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    grouped[time] = grouped[time] || {};
    if (!grouped[time][player]) grouped[time][player] = 0;
    grouped[time][player] += value;
  });

  const timestamps = Object.keys(grouped).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const totals: Record<number, number> = {};
  const chartData = [
    {
      timestamp: 'Start',
      ...Object.fromEntries(players.map(p => [p.id, 0])),
    },
    ...timestamps.map(timestamp => {
      const entry: any = { timestamp };
      players.forEach(player => {
        totals[player.id] = (totals[player.id] || 0) + (grouped[timestamp][player.id] || 0);
        entry[player.id] = totals[player.id];
      });
      return entry;
    }),
  ];

  const customLegend = {
    onMouseEnter: (o: any) => { setHoveredPlayerId(parseInt(o.dataKey)); },
    onMouseLeave: () => { setHoveredPlayerId(null); },
    onClick: (o: any) => {
      const id = parseInt(o.dataKey);
      setSelectedPlayerId(prev => (prev === id ? null : id));
    },
  };

  const isActive = (id: number) =>
    hoveredPlayerId === null && selectedPlayerId === null ||
    hoveredPlayerId === id || selectedPlayerId === id;

  return (
    <div>
      <div style={{ margin: '20px', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ActionIcon onClick={() => {
          navigate('/')
        }}>
          <IconArrowLeft />
        </ActionIcon>
        <label htmlFor="metric-select">Select Metric:</label>
        <select id="metric-select" onChange={e => { setSelectedMetric(e.target.value); }}>
          {Object.entries(DESCRIPTIONS).map(([key, description]) => (
            <option key={key} value={key}>{description.game} - {description.title}</option>
          ))}
        </select>
      </div>

      <div style={{ width: '100%', height: 400, padding: '30px', paddingLeft: '0px' }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend {...customLegend} />
            {players.map(player => (
              <Line
                key={player.id}
                type="monotone"
                dataKey={player.id}
                name={player.name}
                stroke={player.color === 'yellow' ? '#edc400' : player.color}
                strokeWidth={isActive(player.id) ? 3 : 1}
                opacity={isActive(player.id) ? 1 : 0.3}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
