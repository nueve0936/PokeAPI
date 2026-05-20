import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokeList } from './pages/PokeList';
import { PokeDetail } from './pages/PokeDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokeList />} />
        <Route path="/pokemon/:name" element={<PokeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}