const pokemonList = [
    "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard",
    "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
    "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata",
    "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu",
    "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂",
    "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales",
    "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume",
    "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth",
    "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine",
    "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
    "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
    "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke",
    "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel",
    "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar",
    "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
    "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing",
    "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea",
    "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther",
    "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados",
    "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon",
    "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
    "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
];

let currentPokemon = '';
let blurLevel = 20;
let incorrectAttempts = 0; // Variable para contar los intentos incorrectos

function getRandomPokemon() {
    return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

function loadPokemonImage(pokemon) {
    const imageUrl = `https://img.pokemondb.net/artwork/${pokemon.toLowerCase()}.jpg`;
    document.getElementById('pokemon-image').src = imageUrl;
}

// Cargar lista de Pokémon en el selector
function loadPokemonSelect() {
    const pokemonSelect = document.getElementById('pokemon-list');
    pokemonList.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon;
        option.textContent = pokemon;
        pokemonSelect.appendChild(option);
    });
}

function updateBlur() {
    const image = document.getElementById('pokemon-image');
    image.style.filter = `blur(${blurLevel}px)`;
}

function checkGuess() {
    const selectedPokemon = document.getElementById('pokemon-list').value;
    if (selectedPokemon === currentPokemon) {
        document.getElementById('message').textContent = "¡Correcto✅! Has adivinado el Pokémon.";
        blurLevel = 0;  // Si acierta, no hay desenfoque
        incorrectAttempts = 0; // Resetear intentos incorrectos
    } else {
        document.getElementById('message').textContent = "¡Incorrecto❌! Intenta nuevamente.";
        incorrectAttempts++;
        blurLevel = Math.max(20 - incorrectAttempts * 5, 0); // Disminuir el desenfoque con cada intento incorrecto, pero no menos de 0
    }
    updateBlur();
}

function resetGame() {
    currentPokemon = getRandomPokemon();
    loadPokemonImage(currentPokemon);
    document.getElementById('pokemon-list').value = ''; // Restablecer la selección
    document.getElementById('message').textContent = ''; // Limpiar mensaje
    blurLevel = 20; // Restaurar desenfoque
    incorrectAttempts = 0; // Restablecer intentos incorrectos
    updateBlur();
}

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    loadPokemonSelect();
    currentPokemon = getRandomPokemon();
    loadPokemonImage(currentPokemon);
    updateBlur();
    
    document.getElementById('guess-button').addEventListener('click', checkGuess);
    document.getElementById('reset-button').addEventListener('click', resetGame);
});
