'use strict'

async function trazerTodosPokemons() {
    const responseApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=99980&offset=0')
    const dados = await responseApi.json()
    const pokemonList = await dados.results
    return pokemonList
}
async function detalhesPokemons(pokemonUrl) {
    const respostaUrl = await fetch(pokemonUrl)
    const detalhes = await respostaUrl.json()
    return detalhes
}
async function todosDetalhes() {
    const todosPokemons = await trazerTodosPokemons()

    const promessa = todosPokemons.map(poke => detalhesPokemons(poke.url))
    const todosDetalhes = await Promise.all(promessa)

    

    return todosDetalhes
}

async function criarCardPokemon() {
    const pokemons = await todosDetalhes()
    console.log(pokemons)

    const container = document.getElementById('container')
    
    pokemons.forEach(poke =>{
        const card = document.createElement('div')
        card.className = 'card'

        const fundoBranco = document.createElement('div')
        fundoBranco.className = 'fundoBranco'

        const img = document.createElement('img')
        img.src = poke.sprites.front_default
        
        const nome = document.createElement('h2')
        nome.className = 'nome'
        nome.textContent = poke.name

        fundoBranco.appendChild(img)
        card.append(fundoBranco, nome)
        container.appendChild(card)

        
    })
   
} 
criarCardPokemon()

