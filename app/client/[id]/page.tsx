"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Image from "next/image";

interface PokemonDetails {
    sprites: {
        front_default: string;
    };
    name: string;
    height: number;
    weight: number;
    types: Array<{
        type: {
            name: string;
        };
    }>;
    order: number;
}

const PokemonDetailsPage = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((response) => response.json())
                .then((data) => setPokemon(data));
        }
    }, [id]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
           <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] transition-all duration-300 ease-in-out transform hover:scale-105">
             <div className="flex justify-center">
               <Image
                 src={pokemon.sprites.front_default}
                 alt={pokemon.name}
                 width={150}
                 height={150}
                 className="rounded-full" 
               />
             </div>
       
             <h2 className="text-center mb-4 text-3xl font-bold text-blue-900">{pokemon.name}</h2>
             <p className="text-lg mb-2">Taille: <span className="font-semibold">{pokemon.height}</span></p>
             <p className="text-lg mb-2">Poids: <span className="font-semibold">{pokemon.weight}</span></p>
             <p className="text-lg mb-2">
                Types:{" "}
                {pokemon.types.map((type, index) => (
             <span key={index} className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 mb-2">
                 {type.type.name}
             </span>
  ))}
</p>
<p className="text-lg">Numéro: <span className="font-semibold">{pokemon.order}</span></p>

           </div>
        </div>
       );
}

export default PokemonDetailsPage;
