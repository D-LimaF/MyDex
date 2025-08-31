const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let isShiny = false;
let currentPokemonData = null;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderAnimatedSprite = (pokemonName, shiny = false) => {
  const formattedName = pokemonName.toLowerCase().replace(/[\s.]/g, '');
  const shinyPath = shiny ? 'xyani-shiny' : 'xyani';
  return `https://play.pokemonshowdown.com/sprites/${shinyPath}/${formattedName}.gif`;
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.style.display = 'block';

  const data = await fetchPokemon(pokemon);

  if (data) {
    currentPokemonData = data;
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = renderAnimatedSprite(data.name, isShiny);
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  isShiny = false;
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    isShiny = false;
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  isShiny = false;
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

buttonShiny.addEventListener('click', () => {
  isShiny = !isShiny;
  if (currentPokemonData) {
    renderPokemon(currentPokemonData.name);
  }
});

renderPokemon(searchPokemon);

// ... (restante do seu código)

// Adiciona o registro do Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('Service Worker registrado com sucesso:', registration.scope);
    }, function(err) {
      console.log('Falha ao registrar Service Worker:', err);
    });
  });
}