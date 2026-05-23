import { useEffect, useState, useMemo } from 'react';
import { PokeService } from '../services/PokeService';
import { PokemonCard } from '../components/PokeCard';
import { FilterBar } from '../components/FilterBar';
import type { Species } from '../interfaces/Pokemon';

const POKEMON_MAX = 151;

export const PokeList = () => {
  // Estados basicos
  const [list, setList] = useState<Species[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtro
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [showFavorites, setshowFavorites] = useState<boolean>(false);

  // Estructura interna para mapear tipos
  const [pokemonTypesMap, setPokemonTypesMap] = useState<Record<string, string[]>>({});

  // Estado de favoritos local storage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('pokedex_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Efecto para guardar en local storage
  useEffect(() => {
    localStorage.setItem('pokedex_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Llamada asincrona (carga los pokemon)
  useEffect(() => {
    setLoading(true);

    PokeService.getList(POKEMON_MAX)
      .then(async (data) => {
        setList(data);

        // Objeto plano en donde guardamos los tipos
        // Usamos el nombre del pokemon como llave
        const typesDictionary: Record<string, string[]> = {};

        try {
          await Promise.all(
            data.map(async (pokemon) => {
              const detail = await PokeService.getDetail(pokemon.name);
              typesDictionary[pokemon.name] = detail.types.map(t => t.type.name);
            })
          );

          setPokemonTypesMap(typesDictionary);
        } catch (err) {
          console.error("Error cargando los tipos", err);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar la pokedex.');
        setLoading(false);
      });
  }, []);

  // Filtrado por nombre y tipo 
  const filteredPokemons = useMemo(() => {
    return list.filter((pokemon) => {
      // Coincidencia por letras
      const matchesSearch = pokemon.name.toLowerCase().includes(name.toLowerCase());

      // Coincidencia por favoritos (si no esta activo lo ignora y devuelve true)
      const matchesFavorite = showFavorites ? favorites.includes(pokemon.name) : true;

      // Coincidencia por tipo
      const typesOfThisPokemon = pokemonTypesMap[pokemon.name] || [];
      const matchesType = type ? typesOfThisPokemon.includes(type) : true;

      // Si cumple con estas tres condiciones el pokemon pasa
      return matchesSearch && matchesFavorite && matchesType;
    });
  }, [list, name, showFavorites, type, favorites, pokemonTypesMap]);

  // Pantalla de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <p className="text-lg font-semibold text-slate-500 animate-pulse">
          Cargando pokedex...
        </p>
      </div>
    );
  }

  // Pantalla de error
  if (error) {
    return (
      <div className="max-w-md mx-auto my-10 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl shadow-sm">
        <p className="font-bold">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  // Favoritos
  const handleToggleFavorite = (pokemonName: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(pokemonName)) {
        // Si ya es favorito, lo removemos del arreglo
        return prevFavorites.filter(name => name !== pokemonName);
      } else {
        // Si no es favorito, lo agregamos al arreglo
        return [...prevFavorites, pokemonName];
      }
    });
  };

  // Interfaz 
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* FilterBar conectada */}
      <FilterBar
        name={name}
        setName={setName}
        type={type}
        setType={setType}
        showFavorites={showFavorites}
        setShowFavorites={setshowFavorites}
      />

      {/* Grid Reactivo */}
      {filteredPokemons.length === 0 ? (
        <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
          <p className="font-medium">No se encontraron pokemones.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filteredPokemons.map((p) => (
            <PokemonCard
              key={p.name} 
              name={p.name} 
              url={p.url} 
              isFavorite={favorites.includes(p.name)}
              onToggleFavorite={() => handleToggleFavorite(p.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};