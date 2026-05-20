import type { Pokemon } from '../interfaces/Pokemon';

interface Props {
  pokemon: Pokemon;
}

export const PokeDetailCard = ({ pokemon }: Props) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      {/* Imagen */}
      <img
        className="w-56 h-56 mx-auto drop-shadow-2xl object-contain"
        src={pokemon.sprites.other?.['official-artwork'].front_default || ''}
        alt={pokemon.name}
      />
      
      {/* Nombre */}
      <h1 className="text-4xl font-black capitalize text-center mt-4 text-slate-800">
        {pokemon.name}
      </h1>

      {/* Tipos */}
      <div className="flex gap-2 justify-center my-6">
        {pokemon.types.map(t => (
          <span 
            key={t.type.name} 
            className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs uppercase font-bold tracking-widest"
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Info (Peso, Altura, Habilidades) */}
      <div className="grid grid-cols-2 gap-6 text-sm bg-slate-50 p-6 rounded-2xl">
        <div>
          <span className="text-slate-400 block uppercase text-[10px] font-bold">Peso</span>
          <p className="text-lg font-bold">{pokemon.weight / 10} kg</p>
        </div>
        <div>
          <span className="text-slate-400 block uppercase text-[10px] font-bold">Altura</span>
          <p className="text-lg font-bold">{pokemon.height / 10} m</p>
        </div>
        <div className="col-span-2 border-t pt-4 border-slate-200">
          <span className="text-slate-400 block uppercase text-[10px] font-bold mb-1">Habilidades</span>
          <p className="font-medium capitalize">
            {pokemon.abilities
              .filter(a => a.ability !== null)
              .map(a => a.ability!.name)
              .join(', ')}
          </p>
        </div>
      </div>

      {/* Estadisticas Base */}
      <div className="mt-8">
        <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-4 border-b pb-2">
          Estadisticas Base
        </h3>
        <div className="space-y-3">
          {pokemon.stats.map(s => (
            <div key={s.stat.name} className="flex justify-between items-center text-sm">
              <span className="capitalize text-slate-500">{s.stat.name}</span>
              <span className="font-mono font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">
                {s.base_stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};