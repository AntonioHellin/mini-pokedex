import { NamedAPIResourceList } from "../types/pokeapi";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<NamedAPIResourceList> {
  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  
  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Error fetching Pokemon list: ${response.status}`);
  }

  return response.json();
}
