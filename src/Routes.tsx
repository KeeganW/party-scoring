import { Route, Routes } from 'react-router';
import Home from 'src/pages/Home';
import NotFound from 'src/pages/NotFound';
import {Snappa} from 'src/pages/Snappa';
import {Hockey} from 'src/pages/Hockey';
import {MagicalMixers} from 'src/pages/MagicalMixers';
import {RideTheBus} from "./pages/RideTheBus";
import {CheersGovernor} from "./pages/CheersGovernor";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cheers_governor" element={<CheersGovernor />} />
      <Route path="/hockey" element={<Hockey />} />
      <Route path="/magical_mixers" element={<MagicalMixers />} />
      <Route path="/ride_the_bus" element={<RideTheBus />} />
      <Route path="/snappa" element={<Snappa />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
