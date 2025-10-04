'use strict'

//função que traz somente um pokemon
async function pesquisarPokemon(pokemon) {
    const responseApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const dados = await responseApi.json()
    console.log(dados)
    return dados
    
}
