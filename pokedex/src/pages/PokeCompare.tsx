import { useEffect, useState } from "react";
import { PokeService } from "../services/PokeService";
import { Button } from "../components/Button";
import type { Pokemon, Species } from "../interfaces/Pokemon";

export const PokeCompare = () => {
    // Lista completa de los selectores
    const [pokemonList, setPokemonList] = useState<Species[]>([]);

    // Nombres de los pokemones dentro de las entradas
    const [name1, setName1] = useState<string>('bulbasaur');
    const [name2, setName2] = useState<string>('mewtwo');

    // Objetos con los datos de cada pokemon extraidos de la API
    const [poke1, setPoke1] = useState<Pokemon | null>(null);
    const [poke2, setPoke2] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Cargamos la lista inicial de nombres para los selectores
    useEffect(() => {
        // Ponemos 20 pokemones por defecto 
        // Se puede cambiar desde PokeList
        PokeService.getList(20).then((data) => {
            setPokemonList(data);
        });
    }, []);

    // Cargar los detalles de los Pokemon cada que se seleccionen otros
    useEffect(() => {
        setLoading(true);

        // Ejecutamos ambas peticiones al mismo tiempo con una promesa
        Promise.all([
            PokeService.getDetail(name1),
            PokeService.getDetail(name2)
        ])
            .then(([data1, data2]) => {
                setPoke1(data1);
                setPoke2(data2);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al comparar", err);
                setLoading(false);
            });
    }, [name1, name2])

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Button to="/" text="← Volver al inicio" className="mb-6 bg-slate-500 hover:bg-slate-600" />

            <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center"> Comparacion Pokemon </h1>

            {/* Menu de seleccion */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Selecciond el pokemon 1 */}
                <select
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    className="p-2 border border-slate-300 rounded-lg bg-whote capitalize text-sm text-slate-800 focus:outline-none">
                    {pokemonList.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>

                {/* Selecciond el pokemon 2 */}
                <select
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    className="p-2 border border-slate-300 rounded-lg bg-whote capitalize text-sm text-slate-800 focus:outline-none">
                    {pokemonList.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
            </div>

            {/* Renderizado de las cartas */}
            {loading ? (
                <p className="text-center text-slate-400 animate-pulse font-medium py-12">Cargando cartas...</p>
            ) : (
                poke1 && poke2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Carta del Pokemon 1 */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center shadow-sm">
                            <img
                                src={poke1.sprites.other?.["official-artwork"].front_default || ''}
                                className="w-32 h-32 object-contain mb-3" />
                            <h2 className="text-xl font-bold capitalize text-slate-800 mb-1">{poke1.name}</h2>
                            <p className="text-xs text-slate-400 font-mono mb-4">#{poke1.id.toString().padStart(3, '0')}</p>

                            {/* Estadisticas del pokemon 1 */}
                            <div className="w-full border-t border-slate-100 pt-3 space-y-1.5 text-sm text-slate-600">
                                {poke1.stats.map(s =>
                                    <div key={s.stat.name} className="flex justify-between font-mono">
                                        <span className="capitalize text-slate-400">{s.stat.name.replace('special-', 'sp. ')}:</span>
                                        <span className="font-bold text-slate-700">{s.base_stat}</span>
                                    </div>
                                )}
                            </div>
                        </div> 

                        {/* Carta del Pokemon 2 */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center shadow-sm">
                            <img
                                src={poke2.sprites.other?.["official-artwork"].front_default || ''}
                                className="w-32 h-32 object-contain mb-3" />
                            <h2 className="text-xl font-bold capitalize text-slate-800 mb-1">{poke2.name}</h2>
                            <p className="text-xs text-slate-400 font-mono mb-4">#{poke2.id.toString().padStart(3, '0')}</p>

                            {/* Estadisticas del pokemon 2 */}
                            <div className="w-full border-t border-slate-100 pt-3 space-y-1.5 text-sm text-slate-600">
                                {poke2.stats.map(s =>
                                    <div key={s.stat.name} className="flex justify-between font-mono">
                                        <span className="capitalize text-slate-400">{s.stat.name.replace('special-', 'sp. ')}:</span>
                                        <span className="font-bold text-slate-700">{s.base_stat}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )
            )}
        </div>
    );
};