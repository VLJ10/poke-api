'use strict'


//função que traz somente um pokemon
async function pesquisarPokemon(pokemon) {
    const responseApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const dados = await responseApi.json()
    return dados

}


const container = document.getElementById('container')



const botaoListar = document.getElementById('btnLista')
if (botaoListar) {
    botaoListar.addEventListener('click', () => {
        window.location.href = './page2/page2.html'
    })
}
const botaoInterrogacao = document.getElementById('interrogacao')
if (botaoInterrogacao) {
    botaoInterrogacao.addEventListener('click', async () => {
        await popUp()

    })
}




async function popUp() {
    let poke = await pesquisarPokemon('pikachu')

    container.replaceChildren()


    const fundoBranco = document.createElement('div')
    fundoBranco.className = 'fundoBranco'

    let img = document.createElement('img')
    img.src = poke.sprites.other['showdown'].front_default

    fundoBranco.appendChild(img)
    container.appendChild(fundoBranco)

    document.addEventListener('click', function fecharPopup(e) {
        
        if (!fundoBranco.contains(e.target) && e.target !== botaoInterrogacao) {
            fundoBranco.remove()               
            document.removeEventListener('click', fecharPopup) 
        }
    })


}


