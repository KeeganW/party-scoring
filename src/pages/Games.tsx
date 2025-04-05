import { Container, Button, Group, Center, Stack, Title, ActionIcon } from '@mantine/core';
import { Link, useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';

const buttons = [
  { text: 'Beer Die', link: '/beer_die' },
  { text: 'Cheers Governor', link: '/cheers_governor' },
  { text: 'Hockey', link: '/hockey' },
  { text: 'Kings Cup', link: '/kings_cup' },
  { text: 'Magical Mixers', link: '/magical_mixers' },
  { text: 'Pass the Pigs', link: '/pass_the_pigs' },
  { text: 'Ride the Bus', link: '/ride_the_bus' },
  { text: 'Snappa', link: '/snappa' },
];

export const Games = () => {
  const navigate = useNavigate();
  return (
    <Center style={{ height: '100dvh' }}>
      <Container style={{ maxWidth: 300, textAlign: 'center' }}>
        <Stack gap="md">
          <Group gap="lg">
            <ActionIcon onClick={() => {
              navigate('/')
            }}>
              <IconArrowLeft />
            </ActionIcon>
            <Title order={6}>Please select what game you are playing right now.</Title>
          </Group>
          <Stack>
            {buttons.map((button, index) => (
              <Group key={index} grow>
                <Button component={Link} to={button.link}>
                  {button.text}
                </Button>
              </Group>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}
