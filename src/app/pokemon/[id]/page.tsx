import Image from "next/image";
import Link from "next/link";
import { getPokemonDetails } from "../../../services/api";

export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const pokemon = await getPokemonDetails(resolvedParams.id);
  const imageUrl = pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default;

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-12 text-slate-200 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-slate-400 hover:text-red-400 transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la Pokédex
        </Link>
      </div>

      <article className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Left Side: Image & Basic Info */}
        <div className="md:w-1/2 p-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800/50 to-slate-900 relative">
          <div className="absolute top-6 left-6 text-3xl font-black text-slate-800">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
          
          <div className="relative w-64 h-64 mt-4">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl"></div>
            {imageUrl && (
              <Image 
                src={imageUrl} 
                alt={pokemon.name} 
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
              />
            )}
          </div>
          
          <h1 className="mt-8 text-4xl font-black capitalize tracking-tight text-white drop-shadow-sm">
            {pokemon.name}
          </h1>

          <div className="flex gap-3 mt-6">
            {pokemon.types.map((typeObj) => (
              <span 
                key={typeObj.type.name}
                className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-slate-800 text-slate-200 border border-slate-700 shadow-sm"
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Stats & Details */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-800/80 bg-slate-900/40">
          
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-800/80 text-center shadow-inner">
              <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Altura</span>
              <span className="text-2xl font-black text-white">{pokemon.height / 10} m</span>
            </div>
            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-800/80 text-center shadow-inner">
              <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Peso</span>
              <span className="text-2xl font-black text-white">{pokemon.weight / 10} kg</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-400 mb-6 uppercase tracking-widest">Estadísticas Base</h3>
            <div className="space-y-5">
              {pokemon.stats.map((statObj) => (
                <div key={statObj.stat.name}>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-slate-300">
                    <span>{statObj.stat.name.replace('-', ' ')}</span>
                    <span className="text-white">{statObj.base_stat}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${Math.min((statObj.base_stat / 255) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}
