"use strict"
const botaoVoltar = document.getElementById('btnVoltar')
botaoVoltar.addEventListener('click', () => {
    window.location.href = '../page3/page3.html'
})
const nome = JSON.parse(localStorage.getItem('pokemonSelecionado'))


async function buscarPokemon(pokemon) {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    const dados = await response.json()
    return dados

}
async function buscarEpecies(nomePoke) {
    const pokemon = await buscarPokemon(nomePoke)
    const response = await fetch(pokemon.species.url)
    const dados = await response.json()

    return dados
}

async function evolucoesPokemon(poke) {
    const pokemons = await buscarEpecies(poke)
    const response = await fetch(pokemons.evolution_chain.url)
    const dados = await response.json()

    const arrayEvolucoes = []

    async function desmenbraEvolucao(chain) {

        const pokemonData  = await  buscarPokemon(chain.species.name)

        arrayEvolucoes.push({
            name: chain.species.name,
            img:  pokemonData.sprites.front_default
        })
        for (const evo of chain.evolves_to) {
            await desmenbraEvolucao(evo);
        }
    }
    await desmenbraEvolucao(dados.chain)
    console.log(arrayEvolucoes)
    return arrayEvolucoes
}
async function criarCardsPokemon(pokemonNome) {
    const pokemons = await evolucoesPokemon(pokemonNome)

    const container = document.getElementById('container')

    console.log(pokemons)
    pokemons.forEach(poke => {
       
        let card = document.createElement('div')
        card.className = 'card'

        const img = document.createElement('img')
        img.src = poke.img

        const nome = document.createElement('h2')
        nome.className = 'nome'
        nome.textContent = poke.name

        card.append(img, nome)
        container.appendChild(card)


       

    })

    
}


criarCardsPokemon(nome)
