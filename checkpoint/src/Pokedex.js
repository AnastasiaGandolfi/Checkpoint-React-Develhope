import { useRef, useState } from 'react'
import {ShowPokemon} from './ShowPokemon'

function usePokedex() {
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function getPokemon(poke) {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
            const json = await res.json()
            console.log(json)
            setPokemon(json)

        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }

    return {
        pokemon, loading, error, getPokemon
    }
}

export function Pokedex() {
    const { pokemon, error, loading, getPokemon } = usePokedex()
    const inputRef = useRef()

    function handleClick() {
        const poke = inputRef.current.value
        getPokemon(poke)
    }


    return (
        <div>
            <input ref={inputRef} />
            <button onClick={handleClick}>Search</button>
            {loading && <h3>Loading...</h3>}
            {error && <h3>Error</h3>}
            {pokemon && <ShowPokemon info={{
                name: pokemon.name,
                base_exp: pokemon.base_experience,
                abilities: pokemon.abilities,
                img: pokemon.sprites.front_default,
            }
            } />}
        </div>
    )
}

