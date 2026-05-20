import { Button } from './Button';

interface Props {
  name: string;
  url: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const PokemonCard = ({ name, url, isFavorite, onToggleFavorite }: Props) => {

  // Extrae la Id de la URL
  const id = url.split('/').filter(Boolean).pop() || '';

  // Formateamos la id para que tenga formato #X
  const formattedId = `#${id.padStart(3, '0')}`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="relative bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center shadow-sm hover:shadow-md transition-all group">
      {/* Boton de favoritos */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Por seguridad si estuviera dentro de un enlace
          onToggleFavorite();
        }}
        className="absolute top-2 right-2 text-xl p-1 rounded-full hover:bg-slate-50 transition-colors z-10"
      >
        {isFavorite ? '⭐' : '☆'}
      </button>

      {/* Numero */}
      <span className="absolute top-2 left-3 text-[10px] font-mono font-bold text-slate-400">
        {formattedId}
      </span>
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 object-contain mb-2"
      />
      <h2 className="text-sm font-bold capitalize text-slate-700 mb-2 text-center leading-tight">
        {name}
      </h2>
      <Button text="Detalles" to={`/pokemon/${name}`} className="w-full text-xs py-1" />
    </div>
  );
};