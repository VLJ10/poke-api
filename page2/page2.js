'use strict'

async function trazerTodosPokemons() {
    const responseApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=99980&offset=0')
    const dados = await responseApi.json()
    const pokemonList = await dados.results
    return pokemonList
}
async function detalhesPokemons(pokemonUrl) {
    const respostaUrl = await fetch(pokemonUrl)
    const detalhes = respostaUrl.json()
    return detalhes
}
async function todosDetalhes() {
    const todosPokemons = await trazerTodosPokemons()

    const promessa = todosPokemons.map(poke => detalhesPokemons(poke.url))
    const todosDetalhes = await Promise.all(promessa)

    console.log(todosDetalhes)
    return todosDetalhes
}
todosDetalhes()