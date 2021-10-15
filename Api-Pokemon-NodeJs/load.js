var pokemon, pokeName, pokeTipo, pokemonT;


//Url dos pokemons
const url = 'https://pokeapi.co/api/v2/pokemon/';
const urlAll = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const urlType = 'https://pokeapi.co/api/v2/type/';

//Busca um pokemom
function loadPokemom(pokeName){
  fetch(url + pokeName)
    .then((response) =>{
      return response.json();
    })    
    .then((data) =>{
      pokemon = data; 
      cardPokemon(pokemon);        
    })
    .catch((erro) =>{
      console.log("Erro: " + erro);
    });
}

//Busca por tipo
function loadPokemomType(pokeTipo){
  fetch(urlType + pokeTipo)
    .then((response) =>{
      return response.json();
    })    
    .then((dataT) =>{
      pokemonT = dataT; 
      fetchPokemonData(pokemonT);        
    })
    .catch((erro) =>{
      console.log("Erro: " + erro);
    });
}

//busca todos pokemons
function loadPokemomAll(){
  fetch(urlAll)
    .then((response) =>{
      return response.json();
    })    
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
    .catch((erro) =>{
      console.log("Erro: " + erro);
    });
}

//----------------------------------

// Evento botão de pesquisar
document.getElementById("submit-search").onclick = function(e) {
  pokeName = document.getElementById("nome").value
    loadPokemom(pokeName);
    e.preventDefault();
}

document.getElementById("submit-search-pokemom").onclick = function(e) {    
    renderEverything();
    e.preventDefault();
}

document.getElementById("submit-tipo-pokemom").onclick = function(e) {
  pokeTipo = document.getElementById("nomeTipo").value
    loadPokemomType(pokeTipo);
    e.preventDefault();
}
//--------------------------------------------

function renderEverything(){
    let allPokemonContainer = document.querySelector('#poke-container')    
    loadPokemomAll();
}

function fetchPokemonData(pokemon){
    let url = pokemon.url // passa a url
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        cardPokemon(pokeData)
    })
}

//monta o card Pokemom
function cardPokemon(pokeData){
    let container = document.getElementById('poke-container');

    let pokeContainer = document.createElement('ul') 
    pokeContainer.classList.add('ui', 'card');

    createImage(pokeData.id, pokeContainer);

    let name = document.createElement('h1') 
    name.innerText = `${pokeData.name}`

    let number = document.createElement('p')
    number.innerText = `${pokeData.id}`
    
    let weight = document.createElement('h2')
    weight.innerText = `Weight: ${pokeData.weight/10}`
    
    let height = document.createElement('h2')
    height.innerText = `Height: ${pokeData.height/10}`

    var abili = document.createTextNode("_____ABILITIES:"); 
    let abilities = document.createElement('ul')
    createAbilities(pokeData.abilities, abilities) 

    var types = document.createTextNode("_____TYPE:");   
    let pokeTypes = document.createElement('ul')  
    createTypes(pokeData.types, pokeTypes) 

    pokeContainer.append(name, number,abili , abilities, types, pokeTypes, weight, height);   
    container.appendChild(pokeContainer); 
}
//-----------------------

//criar ul de tipo e habilidade
function createTypes(types, ul){    
    types.forEach(function(type){
        let typeLi = document.createElement('li');        
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

function createAbilities(types, ul){    
    types.forEach(function(type){
        let typeAbi = document.createElement('li');        
        typeAbi.innerText = type['ability']['name'];
        ul.append(typeAbi)
    })
}
//-------------------------

function createImage(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}
