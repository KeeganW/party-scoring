import { Route, Routes } from 'react-router';
import { Games } from 'src/pages/Games';
import { Landing } from 'src/pages/Landing';
import { NotFound } from 'src/pages/NotFound';
import { Snappa } from 'src/pages/Snappa';
import { Hockey } from 'src/pages/Hockey';
import { MagicalMixers } from 'src/pages/MagicalMixers';
import { RideTheBus } from 'src/pages/RideTheBus';
import { CheersGovernor } from 'src/pages/CheersGovernor';
import { PassThePigs } from 'src/pages/PassThePigs';
import { KingsCup } from 'src/pages/KingsCup';
import { BeerDie } from 'src/pages/BeerDie';
import { SplashBoard } from 'src/pages/SplashBoard';
import { Leaderboard } from 'src/pages/Leaderboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/games" element={<Games />} />
      <Route path="/beer_die" element={<BeerDie />} />
      <Route path="/cheers_governor" element={<CheersGovernor />} />
      <Route path="/hockey" element={<Hockey />} />
      <Route path="/kings_cup" element={<KingsCup />} />
      <Route path="/magical_mixers" element={<MagicalMixers />} />
      <Route path="/pass_the_pigs" element={<PassThePigs />} />
      <Route path="/ride_the_bus" element={<RideTheBus />} />
      <Route path="/snappa" element={<Snappa />} />
      <Route path="/splash_board" element={<SplashBoard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
