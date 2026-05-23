import type { Pokemon, Species } from '../interfaces/Pokemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

// Definimos la estructura de lo que devuelve la lista de la API
interface PokeAPIList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Species[];
}

export const PokeService = {
  // Tipamos la lista inicial para saber que devuelve un arreglo de Species
  // Desplegara 20 por defecto si no se manda ningun limite
  getList: async (limit = 20): Promise<Species[]> => {
    try {
      const res = await fetch(`${API_URL}?limit=${limit}`);
      const data: PokeAPIList = await res.json();
      return data?.results || [];
    } catch (error) {
      console.error("Error en el PokeService:", error);
      return [];
    }
  },

  // Tipamos el detalle usando la interfaz pokemon 
  getDetail: async (nameOrId: string): Promise<Pokemon> => {
    const res = await fetch(`${API_URL}/${nameOrId}`);
    if (!res.ok) {
      throw new Error(`No se encontro al Pokemon: ${nameOrId}`);
    }
    const data: Pokemon = await res.json();
    return data;
  }
};