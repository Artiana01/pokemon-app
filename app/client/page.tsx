"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";

interface Pokemon {
  name: string;
  url: string;
}

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const [offset, setOffset] = useState(0);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => setPokemonList(data.results));
  }, [offset]);

  return (
 <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-24 bg-gradient-to-r from-blue-400 to-purple-500">
    <h1 className="text-4xl font-bold mb-10 text-center text-white">List of Pokemon</h1>
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon.name}
          className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <Image
            src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
            alt={pokemon.name}
            width={96}
            height={96}
            className="rounded-full animate-spin-slow" 
          />
          <h2 className="text-center mb-4 text-2xl font-bold text-blue-500">{pokemon.name}</h2>
          <button
            onClick={() =>
              router.push(
                `/${pathname?.split("/")[1]}/${pokemon.name}`
              )
            }
            className="mt-4 px-6 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Détails
          </button>
        </div>
      ))}
    </div>
    <button
      onClick={() => setOffset(offset + 50)}
      className="mt-10 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
    >
      Suivant
    </button>
 </div>
);

   
};

export default Pokedex;