'use strict'

const container = document.getElementById('container')



// Busca todos os pokemons na API
async function trazerTodosPokemons() {
    const responseApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=99880&offset=0')
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

//busca um pokemon especifico
async function buscarPokemon(nome) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)

        if (!response.ok) {
            return null
        }
        const dados = await response.json()
        return dados
    } catch (error) {

    }


}

async function criarCardsPokemon() {
    const pokemons = await todosDetalhes()

    console.log(pokemons)
    pokemons.forEach(poke => {
        let card = document.createElement('div')
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

        if (card) {
        card.addEventListener('click', () => {
            localStorage.setItem('pokemonSelecionado', JSON.stringify(poke))
            window.location.href = '../page3/page3.html'
        })
    }

    })

    
}

async function criarUmCard(nome) {


    const pokemon = await buscarPokemon(nome)

    container.replaceChildren()

    let card = document.createElement('div')
    card.className = 'card'

    const fundoBranco = document.createElement('div')
    fundoBranco.className = 'fundoBranco'

    const img = document.createElement('img')
    img.src = pokemon.sprites.front_default

    const titulo = document.createElement('h2')
    titulo.className = 'nome'
    titulo.textContent = pokemon.name

    fundoBranco.appendChild(img)
    card.append(fundoBranco, titulo)
    container.appendChild(card)

    if (card) {
        card.addEventListener('click', () => {
            localStorage.setItem('pokemonSelecionado', JSON.stringify(pokemon))
            window.location.href = '../page3/page3.html'
        })

    }
}

const input = document.getElementById('input')


async function modoPesquida() {

    const nome = input.value.toLowerCase()
    container.replaceChildren()

    if (nome === undefined || nome === null || nome === '') {
        criarCardsPokemon()
        return
    }

    try {
        const pokemon = await buscarPokemon(nome)
        if (pokemon) {

            criarUmCard(nome)

        }
    } catch (error) {

    }


}
input.addEventListener('input', modoPesquida)

window.addEventListener('load', criarCardsPokemon)
