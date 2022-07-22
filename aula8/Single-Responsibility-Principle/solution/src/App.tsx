import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import './App.css';
import { API_URL_BASE, API_URL_POKEMON } from './constantes';

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

const obterNumeroAleatorio = (min: number = 0, max: number = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const obterListaPokemons = async (
    offset: number,
    limit: number,
    signal: AbortSignal,
) => {
    const response = await fetch(
        `${API_URL_BASE}${API_URL_POKEMON}?offset=${offset}&limit=${limit}`,
        {
            signal,
        },
    );
    const data = await response.json();
    return data.results;
};

const obterDetalhePokemons = async (pokemons: IPokemonBase[]) => {
    const pokemonsComDetalhe = await Promise.all(
        pokemons.map(async (pokemon) => {
            const dataPokemon = await fetch(pokemon.url);
            const pokemonData = await dataPokemon.json();

            return {
                id: pokemonData.id,
                nome: pokemonData.name,
                imagem: pokemonData.sprites.front_default,
            };
        }),
    );

    return pokemonsComDetalhe;
};

const obterPokemons = async (signal: AbortSignal) => {
    const offset = obterNumeroAleatorio();

    const pokemons = await obterListaPokemons(offset, 8, signal);

    const pokemonsComDetalhe = await obterDetalhePokemons(pokemons);

    return pokemonsComDetalhe;
};

function App() {
    const [pokemons, setPokemons] = useState<IPokemonDetalhado[]>([]);

    useEffect(() => {
        const abortController = new AbortController();

        const carregarPokemons = async () => {
            const pokemons = await obterPokemons(abortController.signal);

            setPokemons(pokemons);
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
