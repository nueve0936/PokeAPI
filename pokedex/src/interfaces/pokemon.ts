export interface PokemonBase {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    other: { 'official-artwork': { front_default: string } };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}