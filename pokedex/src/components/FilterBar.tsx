import { Link } from 'react-router-dom';

// Aqui definimos lo que ocupa el componente para funcionar
interface Props {
  name: string;
  setName: (value: string) => void;
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
  type: string;
  setType: (value: string) => void;
}

export const FilterBar = ({
  name,
  setName,
  showFavorites,
  setShowFavorites,
  type,
  setType
}: Props) => {

  // Los tipos de Pokemon
  const pokemonTypes = [
    'normal', 'fire', 'water', 'grass', 'electric', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'steel', 'fairy'
  ];

  return (
    <header className="mb-8 border-b pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-3xl font-black italic text-slate-800">POKEDEX</h1>

      <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 flex-1 sm:flex-none sm:w-48 bg-white text-slate-800"
        />

        {/* Filtro por Tipo */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-800 capitalize"
        >
          <option value="">Todos los tipos</option>
          {pokemonTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* Boton Favoritos */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto ${showFavorites
            ? 'bg-amber-500 text-white hover:bg-amber-600'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
        >
          {showFavorites ? '⭐ Ver Todos' : '⭐ Favoritos'}
        </button>
        <Link
          to="/compare"
          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-1.5 shadow-sm"
        >
          Comparar
        </Link>
      </div>

    </header>
  );
};