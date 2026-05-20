import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PokeService } from '../services/PokeService';
import { Button } from '../components/Button';
import { PokeDetailCard } from '../components/PokeDetailCard'; 
import type { Pokemon } from '../interfaces/Pokemon';

export const PokeDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      setLoading(true);
      setError(null);
      
      PokeService.getDetail(name)
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(`No se pudo cargar la información de ${name}.`);
          setLoading(false);
        });
    }
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <p className="text-lg font-semibold text-slate-500 animate-pulse">
          Cargando Pokemones
        </p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="max-w-md mx-auto my-10 p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-2xl shadow-sm">
        <p className="font-bold">Error</p>
        <p className="text-sm mb-4">{error || 'No se encontraron datos.'}</p>
        <Button to="/" text="← Volver al inicio" className="bg-slate-500 hover:bg-slate-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Boton para volver */}
      <Button to="/" text="← Volver al inicio" className="mb-6 bg-slate-500 hover:bg-slate-600" />

      {/* Inyectamos la tarjeta y le pasamos el objeto pokemon que descargamos */}
      <PokeDetailCard pokemon={pokemon} />
    </div>
  );
};