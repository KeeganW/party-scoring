import { useEffect, useState } from 'react';
import { Title, Center, Container, Stack, Table, ActionIcon, Group } from '@mantine/core';
import { useImmer } from 'use-immer';
import { AllGenericScores } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { getPlayerById, NEGATIVE_ACTIONS, POSITIVE_ACTIONS } from 'src/utils/constants';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useImmer<Map<number, any>>(new Map());
  const [leaderboard, setLeaderboard] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenericScore<keyof AllGenericScores>(setScores).then(() => { setLoading(false); });
  }, [setScores]);

  useEffect(() => {
    const calculatedScores = new Map<string, number>();

    scores.forEach((score, player) => {
      let total = 0;
      POSITIVE_ACTIONS.forEach(action => { if (score[action]) total += score[action]; });
      NEGATIVE_ACTIONS.forEach(action => { if (score[action]) total -= score[action]; });
      calculatedScores.set(getPlayerById(player).name, total);
    });

    setLeaderboard(new Map([...calculatedScores.entries()].sort((a, b) => b[1] - a[1])));
  }, [scores]);

  return (
    <Center style={{ height: '100dvh', background: '#f4f4f4' }}>
      <Container style={{ maxWidth: 400, textAlign: 'center', padding: 20, borderRadius: 10, background: 'white', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Stack gap="md">
          <Group gap="lg">
            <ActionIcon onClick={() => {
              navigate('/')
            }}>
              <IconArrowLeft />
            </ActionIcon>
            <Title order={2} style={{ color: '#007acc' }}>Leaderboard</Title>
          </Group>
          {loading ? (
            <Title order={4}>Loading scores...</Title>
          ) : (
            <Table>
              <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
              </tr>
              </thead>
              <tbody>
              {[...leaderboard.entries()].map(([player, score]) => (
                <tr key={player}>
                  <td>{player}</td>
                  <td>{score}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          )}
        </Stack>
      </Container>
    </Center>
  );
}
