import { getPokemonList } from "../services/api";

export default async function Home() {
  const pokemonList = await getPokemonList();

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-slate-200">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Next.js Pokédex
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Catálogo estático generado mediante Server Components
        </p>
      </header>

      <section className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemonList.results.map((pokemon) => {
            const segments = pokemon.url.split("/").filter(Boolean);
            const id = segments[segments.length - 1];

            return (
              <article
                key={pokemon.name}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition-all hover:border-slate-600 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold capitalize text-white group-hover:text-emerald-400 transition-colors">
                    {pokemon.name}
                  </h2>
                  <span className="text-sm font-medium text-slate-500">
                    #{id.padStart(3, "0")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
