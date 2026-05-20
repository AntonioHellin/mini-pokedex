import Image from "next/image";
import Link from "next/link";
import { getPokemonList } from "../services/api";

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200 font-sans">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 sm:text-6xl drop-shadow-sm">
          Pokédex
        </h1>
        <p className="mt-4 text-lg text-slate-400 font-medium max-w-2xl mx-auto">
          Generación I. Explora la enciclopedia visual impulsada por Server Components.
        </p>
      </header>

      <section className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
          {pokemonList.results.map((pokemon) => {
            const segments = pokemon.url.split("/").filter(Boolean);
            const id = segments[segments.length - 1];
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return (
              <Link href={`/pokemon/${id}`} key={pokemon.name} className="block group cursor-pointer">
                <article
                  className="relative flex flex-col items-center justify-between h-full overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-b from-slate-800/40 to-slate-900/80 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20"
                >
                  <div className="absolute right-4 top-4 text-xs font-black text-slate-600 group-hover:text-red-400 transition-colors">
                    #{id.padStart(3, "0")}
                  </div>
                  
                  <div className="relative mt-4 mb-6 flex h-28 w-28 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-slate-700/30 blur-2xl group-hover:bg-red-500/30 transition-all duration-500"></div>
                    <Image 
                      src={imageUrl} 
                      alt={pokemon.name} 
                      width={112} 
                      height={112}
                      className="relative z-10 transition-transform duration-500 group-hover:scale-125 drop-shadow-lg"
                    />
                  </div>

                  <h2 className="text-lg font-extrabold capitalize tracking-wider text-slate-200 group-hover:text-white transition-colors">
                    {pokemon.name}
                  </h2>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
