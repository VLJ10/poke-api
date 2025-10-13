'use strict'



const botaoVoltar = document.getElementById('btnVoltar')
botaoVoltar.addEventListener('click', () => {
    window.location.href = '../page2/page2.html'
})

const nome = JSON.parse(localStorage.getItem('pokemonSelecionado'))

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
async function informacoesPokemon() {
    const pokemon = await buscarPokemon(nome)

    console.log(pokemon)
    const container = document.getElementById('container')


    const img = document.createElement('img')
    img.src =  pokemon.sprites.other['official-artwork'].front_default

    const nomePokemon = document.createElement('h1')
    nomePokemon.className = 'nome'
    nomePokemon.textContent = pokemon.name

    //Tipo pokemon
    const tipo = document.createElement('h3')
    tipo.className = 'tipo'
    tipo.textContent = 'Tipo: '

    const pTipo = document.createElement('p')
    pTipo.className = 'pTipo'
    pTipo.textContent = pokemon.types.map(typeInfo => typeInfo.type.name)

    //Habilidades pokemon
    const habilidades = document.createElement('h3')
    habilidades.className = 'habilidades'
    habilidades.textContent = 'Habilidades: ' 

    const pHabilite = document.createElement('p')
    pHabilite.className = 'pHabilite'
    pHabilite.textContent = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name)

    //Peso pokemon
    const peso = document.createElement('h3')
    peso.className = 'peso'
    peso.textContent = 'Peso: '

    const pPeso = document.createElement('p')
    pPeso.className = 'pPeso'
    pPeso.textContent = (pokemon.weight / 10) + ' kg'

    //Altura pokemon
    const altura = document.createElement('h3')
    altura.className = 'altura'
    altura.textContent = 'Altura: ' 
    
    const pAltura = document.createElement('p')
    pAltura.className = 'pAltura'
    pAltura.textContent = (pokemon.height / 10) + ' m'

    //EXP pokemon
    const exp = document.createElement('h3')
    exp.className = 'exp'
    exp.textContent = 'Exp: '
    
    const pExp = document.createElement('p')
    pExp.className = 'pExp'
    pExp.textContent = pokemon.base_experience


    const containerTexto = document.createElement('div')
    containerTexto.className = 'container-texto'


    

    tipo.appendChild(pTipo)
    habilidades.appendChild(pHabilite)
    peso.appendChild(pPeso)
    altura.appendChild(pAltura)
    exp.appendChild(pExp)
    containerTexto.append(nomePokemon, tipo, habilidades, peso, altura, exp)

    container.append(img, containerTexto)
}

informacoesPokemon()