import { Route, Routes } from 'react-router';
import Home from 'src/pages/Home';
import NotFound from 'src/pages/NotFound';
import {Snappa} from 'src/pages/Snappa';
import {Hockey} from 'src/pages/Hockey';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snappa" element={<Snappa />} />
      <Route path="/hockey" element={<Hockey />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
