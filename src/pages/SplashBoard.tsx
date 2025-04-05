import { useEffect, useRef, useState } from 'react';
import { Card, Title, Center, Container, Stack, Text, Group, ActionIcon } from '@mantine/core';
import { useImmer } from 'use-immer';
import { AllGenericScores, SnappaScore } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import styles from 'src/pages/SplashBoard.module.css';

export const SplashBoard = () => {
  const navigate = useNavigate();
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, any>>(new Map());
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [prevTotal, setPrevTotal] = useState(total);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGenericScore<keyof AllGenericScores>(setScores).then(() => { setLoading(false); });
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof SnappaScore>(webSocket, setScores);
  }, [webSocket.updates]);

  useEffect(() => {
    if (scores.size > 0) {
      const totalScore: number = Array.from(scores.values()).reduce((acc: number, score: any): number => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return score.sinksDie + score.sinks + acc;
      }, 0);
      setTotal(totalScore);
    }
  }, [scores]);

  const triggerEmojiRain = () => {
    for (let i = 0; i < 50; i++) { // Increase emoji count
      const emoji = document.createElement('div');
      emoji.className = styles.emoji;
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.top = `${-50 - Math.random() * 100}px`; // Start above the viewport
      emoji.style.animationDelay = `${Math.random() * 0.5}s`; // Randomize start delay
      emoji.textContent = '💦';
      document.body.appendChild(emoji);
      setTimeout(() => { emoji.remove(); }, 3000); // Remove after 3 seconds, matching fall duration
    }
  };

  useEffect(() => {
    if (prevTotal === 0) {
      setPrevTotal(total);
      return;
    }

    if (cardRef.current && total !== prevTotal) {
      const el = cardRef.current;
      el.classList.remove(styles.splashAnimate);
      void el.offsetWidth;
      el.classList.add(styles.splashAnimate);
      if (total > prevTotal) triggerEmojiRain();
      setPrevTotal(total);
    }
  }, [total]);

  return (
    <Center style={{ height: '100vh', background: '#f4f4f4' }}>
      <Container style={{ maxWidth: 350, textAlign: 'center', padding: 20, borderRadius: 10, background: 'white', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Stack gap="md">
          <Group gap="lg">
            <ActionIcon onClick={() => {
              navigate('/')
            }}>
              <IconArrowLeft />
            </ActionIcon>
            <Title order={2} style={{ color: '#007acc' }}>Splash Board</Title>
          </Group>
          {loading ? (
            <Text>Loading scores...</Text>
          ) : (
            <Card
              ref={cardRef}
              shadow="xl"
              padding="lg"
              radius="lg"
              withBorder
              className={styles.card}
            >
              <Title order={1} style={{ fontSize: '3rem' }}>{total}</Title>
            </Card>
          )}
        </Stack>
      </Container>
    </Center>
  );
}

