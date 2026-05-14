import type { PokemonDetail } from '../interfaces/pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const pokeService = {
    getInitialList: async (limit = 20) => {
    const res = await fetch(`${API_URL}?limit=${limit}`);
    const data = await res.json();
    return data.results;
  },
  getDetail: async (nameOrId: string): Promise<PokemonDetail> => {
    const res = await fetch(`${API_URL}/${nameOrId}`);
    return await res.json();
  }
};