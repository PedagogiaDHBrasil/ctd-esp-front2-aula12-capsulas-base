import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css';

interface IPokemonBase {
    name: string;
    url: string;
}

interface IPokemonDetalhado {
    id: number;
    nome: string;
    imagem: string;
}

// Este aplicativo obtém as informações dos pokemons da API pokeapi.co
// e os exibe em uma galeria de cards.
// Como você pode ver, a lógica para obter os dados do pokemon está dentro do mesmo componente.
// A proposta é refatorar o código para que siga o princípio da responsabilidade única.

function App() {
    const [pokemons, setPokemons] = useState<IPokemonDetalhado[]>([]);

    useEffect(() => {
        const abortController = new AbortController();

        const carregarPokemons = async () => {
            const offset = Math.floor(Math.random() * 100);
            const data = await fetch(
                `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=8`,
                {
                    signal: abortController.signal,
                },
            );
            const pokemons = await data.json();

            const pokemonsComDetalhe = Promise.all(
                pokemons.results.map(async (pokemon: IPokemonBase) => {
                    const dataPokemon = await fetch(pokemon.url);
                    const pokemonData = await dataPokemon.json();

                    return {
                        id: pokemonData.id,
                        nombre: pokemonData.name,
                        imagen: pokemonData.sprites.front_default,
                    };
                }),
            );

            setPokemons(await pokemonsComDetalhe);
        };

        carregarPokemons();

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <div className="App">
            <header>
                <h1>Galeria de Pokemons</h1>
            </header>
            <div className="container-card">
                {pokemons.map((pokemon) => (
                    <Card
                        titulo={pokemon.nome}
                        imagem={pokemon.imagem}
                        key={pokemon.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
