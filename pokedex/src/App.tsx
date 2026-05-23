import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokeList } from './pages/PokeList';
import { PokeDetail } from './pages/PokeDetail';
import { PokeCompare } from './pages/PokeCompare';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokeList />} />
        <Route path="/pokemon/:name" element={<PokeDetail />} />
        <Route path="/compare" element={<PokeCompare />} />
      </Routes>
    </BrowserRouter>
  );
}