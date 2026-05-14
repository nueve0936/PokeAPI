import { Button } from './button';

interface Props {
  name: string;
  url: string; 
}

export const PokemonCard = ({ name, url }: Props) => {
  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
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