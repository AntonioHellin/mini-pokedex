import { NamedAPIResourceList, Pokemon } from "../types/pokeapi";

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Fetches a paginated list of Pokémon profiles from PokéAPI.
 *
 * @param limit - Number of records to return.
 * @param offset - Offset index.
 * @returns Promise resolving to the resource list.
 */
export async function getPokemonList(limit: number = 151, offset: number = 0): Promise<NamedAPIResourceList> {
  const safeLimit = Math.max(1, Math.min(1000, Number(limit) || 151));
  const safeOffset = Math.max(0, Number(offset) || 0);
  const url = `${BASE_URL}/pokemon?limit=${safeLimit}&offset=${safeOffset}`;
  
  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Error fetching Pokemon list: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetches detailed statistics and sprite URLs for a specific Pokémon.
 *
 * @param id - Pokémon name or national pokedex numeric ID.
 * @returns Promise resolving to detailed Pokémon data.
 */
export async function getPokemonDetails(id: string): Promise<Pokemon> {
  const safeId = encodeURIComponent(String(id).trim());
  const url = `${BASE_URL}/pokemon/${safeId}`;
  
  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Error fetching Pokemon details for id ${safeId}: ${response.status}`);
  }

  return response.json();
}
