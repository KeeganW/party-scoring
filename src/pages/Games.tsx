import { Container, Button, Group, ScrollArea, Center, Stack, ActionIcon, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router';
import { IconArrowLeft, IconBeer, IconCrown, IconIceSkating, IconGlassFullFilled, IconWand, IconPig, IconBus, IconDice5, IconRipple } from '@tabler/icons-react';

const buttons = [
  { text: 'Beer Die', link: '/beer_die', icon: <IconBeer /> },
  { text: 'Cheers Governor', link: '/cheers_governor', icon: <IconGlassFullFilled /> },
  { text: 'Hockey', link: '/hockey', icon: <IconIceSkating /> },
  { text: 'Kings Cup', link: '/kings_cup', icon: <IconCrown /> },
  { text: 'Magical Mixers', link: '/magical_mixers', icon: <IconWand /> },
  { text: 'Pass the Pigs', link: '/pass_the_pigs', icon: <IconPig /> },
  { text: 'Ride the Bus', link: '/ride_the_bus', icon: <IconBus /> },
  { text: 'Snappa', link: '/snappa', icon: <IconDice5 /> },
  { text: 'Wavelength', link: '/wavelength', icon: <IconRipple /> },
];

export const Games = () => {
  const navigate = useNavigate();
  return (
    <Center style={{ height: '100dvh' }}>
      <Container style={{ maxWidth: 300, textAlign: 'center' }}>
        <ScrollArea style={{ height: '100%', marginTop: '3rem', marginBottom: '1rem' }}>
          <Stack gap="md">
            <Group gap="lg" justify="space-between" preventGrowOverflow>
              <ActionIcon onClick={() => {
                navigate('/')
              }}>
                <IconArrowLeft />
              </ActionIcon>
              <Text style={{ maxWidth: 200 }}>Please select what game you are playing right now.</Text>
            </Group>
            <Stack>
              {buttons.map((button, index) => (
                <Group key={index} grow>
                  <Button component={Link} to={button.link}>
                    <div style={{ marginRight: '1rem' }}>
                      {button.icon}
                    </div>
                    {button.text}
                    <div style={{ marginLeft: '1rem' }}>
                      {button.icon}
                    </div>
                  </Button>
                </Group>
              ))}
            </Stack>
          </Stack>
        </ScrollArea>
      </Container>
    </Center>
  );
}
