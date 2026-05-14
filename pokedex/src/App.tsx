import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { pokeService } from './services/pokeService';
import { PokemonCard } from './components/pokemonCard';
import { Button } from './components/button';
import type { PokemonBase, PokemonDetail } from './interfaces/pokemon';

const Home = () => {
  const [list, setList] = useState<PokemonBase[]>([]);
  useEffect(() => { pokeService.getInitialList(20).then(setList); }, []);

  return (

    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-8">Pokédex</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {list.map(p => (
          <PokemonCard
            key={p.name}
            name={p.name}
            url={p.url}
          />
        ))}
      </div>
    </div>
  );
};

const Detail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    if (name) pokeService.getDetail(name).then(setPokemon);
  }, [name]);

  if (!pokemon) return <p className="p-10 text-center">Cargando datos del Pokémon...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">

      <Button to="/" text="← Volver al inicio" className="mb-6 bg-slate-500 hover:bg-slate-600" />

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <img
          className="w-56 h-56 mx-auto drop-shadow-2xl"
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
        <h1 className="text-4xl font-black capitalize text-center mt-4 text-slate-800">{pokemon.name}</h1>

        <div className="flex gap-2 justify-center my-6">
          {pokemon.types.map(t => (
            <span key={t.type.name} className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs uppercase font-bold tracking-widest">
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm bg-slate-50 p-6 rounded-2xl">
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold">Peso</span>
            <p className="text-lg font-bold">{pokemon.weight / 10} kg</p>
          </div>
          <div>
            <span className="text-slate-400 block uppercase text-[10px] font-bold">Altura</span>
            <p className="text-lg font-bold">{pokemon.height / 10} m</p>
          </div>
          <div className="col-span-2 border-t pt-4">
            <span className="text-slate-400 block uppercase text-[10px] font-bold mb-1">Habilidades</span>
            <p className="font-medium capitalize">{pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-4 border-b pb-2">Estadísticas Base</h3>
          <div className="space-y-3">
            {pokemon.stats.map(s => (
              <div key={s.stat.name} className="flex justify-between items-center text-sm">
                <span className="capitalize text-slate-500">{s.stat.name}</span>
                <span className="font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}