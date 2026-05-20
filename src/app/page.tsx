import Image from "next/image";
import Link from "next/link";
import { getPokemonList } from "../services/api";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  const pokemonList = await getPokemonList();
  
  // Soporte universal para `searchParams` asíncronas (Next.js 15) o síncronas (Next.js 14)
  const resolvedParams = await Promise.resolve(searchParams);
  const viewMode = resolvedParams?.view === 'list' ? 'list' : 'card';

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400 sm:text-6xl drop-shadow-sm">
          Pokédex
        </h1>
        <p className="mt-4 text-lg text-slate-400 font-medium max-w-2xl mx-auto">
          Generación I. Explora la enciclopedia visual impulsada por Server Components.
        </p>
      </header>

      {/* Toggle View Control - Pure Server Side Navigation */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-slate-900/80 rounded-xl p-1.5 border border-slate-800 backdrop-blur-sm shadow-inner">
          <Link 
            href="/?view=card" 
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              viewMode === 'card' 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Grid
          </Link>
          <Link 
            href="/?view=list" 
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              viewMode === 'list' 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Lista
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-7xl">
        {viewMode === 'card' ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
            {pokemonList.results.map((pokemon) => {
              const segments = pokemon.url.split("/").filter(Boolean);
              const id = segments[segments.length - 1];
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

              return (
                <Link href={`/pokemon/${id}`} key={pokemon.name} className="block group cursor-pointer">
                  <article className="relative flex flex-col items-center justify-between h-full overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-b from-slate-800/40 to-slate-900/80 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20">
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
        ) : (
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {pokemonList.results.map((pokemon) => {
              const segments = pokemon.url.split("/").filter(Boolean);
              const id = segments[segments.length - 1];
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

              return (
                <Link href={`/pokemon/${id}`} key={pokemon.name} className="block group cursor-pointer">
                  <article className="flex items-center justify-between overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 shadow-md backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10">
                    <div className="flex items-center gap-6">
                      <div className="relative flex h-16 w-16 items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-slate-700/30 blur-xl group-hover:bg-red-500/30 transition-all duration-500"></div>
                        <Image 
                          src={imageUrl} 
                          alt={pokemon.name} 
                          width={64} 
                          height={64}
                          className="relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
                        />
                      </div>
                      <h2 className="text-2xl font-black capitalize tracking-wider text-slate-200 group-hover:text-white transition-colors">
                        {pokemon.name}
                      </h2>
                    </div>
                    <div className="text-lg font-black text-slate-600 group-hover:text-red-400 transition-colors pr-6">
                      #{id.padStart(3, "0")}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
