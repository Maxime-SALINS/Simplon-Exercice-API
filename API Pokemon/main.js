
function infoPokemon (url) {
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        pokeCharactere(json.results , json.next)
    });
}

function pokeCharactere(perso , next){
    let elHTML = document.getElementById('info_pokemon');
    let btn = document.createElement('btn')
    btn.classList.add('btn')
    btn.innerHTML=`Next`
    perso.forEach(element => {
        let container = document.createElement('div')
        let divCard = document.createElement('div')
        container.classList.add('col-lg-3')
        divCard.classList.add('card')
        divCard.classList.add('my-1')
        divCard.classList.add('mx-1')
        let p = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement ('p')
        let img = document.createElement('img')
        fetch(element.url)
            .then(res => res.json())
            .then(data => {
                    img.src = data.sprites.front_default
                    p.innerHTML=`type principal: ` + data.types[0].type.name
                    p3.innerHTML = `Poids : ` + data.weight + ` kg`
                    p2.innerHTML=`type secondaire: `+ data.types[1].type.name
            });
        let h2 = document.createElement('h2');
        h2.innerHTML = element.name
        divCard.appendChild(h2)
        divCard.appendChild(p)
        divCard.appendChild(p2)
        divCard.appendChild(p3)
        divCard.appendChild(img)
        container.appendChild(divCard)
        elHTML.appendChild(container)
    });
    btn.addEventListener('click', event => {
        infoPokemon (next)
    });
    elHTML.appendChild(btn)
}

infoPokemon('https://pokeapi.co/api/v2/pokemon/')