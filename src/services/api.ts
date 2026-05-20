import { NamedAPIResourceList, Pokemon } from "../types/pokeapi";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit: number = 151, offset: number = 0): Promise<NamedAPIResourceList> {
  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  
  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Error fetching Pokemon list: ${response.status}`);
  }

  return response.json();
}

export async function getPokemonDetails(id: string): Promise<Pokemon> {
  const url = `${BASE_URL}/pokemon/${id}`;
  
  const response = await fetch(url, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Error fetching Pokemon details for id ${id}: ${response.status}`);
  }

  return response.json();
}
