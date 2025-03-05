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
let incorrectAttempts = 0;
let selectedPokemon = ''; // Variable para almacenar el Pokémon seleccionado

function getRandomPokemon() {
    return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

function loadPokemonImage(pokemon) {
    const imageUrl = `https://img.pokemondb.net/artwork/${pokemon.toLowerCase()}.jpg`;
    document.getElementById('pokemon-image').src = imageUrl;
}

// Función para mostrar los resultados de búsqueda
function showSearchResults(filter = '') {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Limpiar resultados anteriores

    const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.toLowerCase().includes(filter.toLowerCase())
    );

    filteredPokemon.forEach(pokemon => {
        const resultItem = document.createElement('div');
        resultItem.textContent = pokemon;
        resultItem.addEventListener('click', () => {
            selectedPokemon = pokemon; // Almacenar el Pokémon seleccionado
            document.getElementById('search-input').value = pokemon; // Mostrar el nombre en el campo de búsqueda
            document.getElementById('guess-button').disabled = false; // Habilitar el botón "Adivinar"
            searchResults.innerHTML = ''; // Limpiar resultados después de seleccionar
        });
        searchResults.appendChild(resultItem);
    });
}

function updateBlur() {
    const image = document.getElementById('pokemon-image');
    image.style.filter = `blur(${blurLevel}px)`;
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = "¡Adivinaste! 🎉"; // Mensaje de éxito
    successMessage.style.display = 'block'; // Mostrar el mensaje

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        successMessage.style.display = 'none';
        resetGame(); // Reiniciar el juego después de ocultar el mensaje
    }, 3000); // 3 segundos
}

function checkGuess() {
    if (selectedPokemon === currentPokemon) {
        document.getElementById('message').textContent = "¡Correcto✅! Has adivinado el Pokémon.";
        blurLevel = 0;
        incorrectAttempts = 0;
        showSuccessMessage(); // Mostrar el mensaje de éxito
    } else {
        document.getElementById('message').textContent = "¡Incorrecto❌! Intenta nuevamente.";
        incorrectAttempts++;
        blurLevel = Math.max(20 - incorrectAttempts * 5, 0);
    }
    updateBlur();
}

function resetGame() {
    currentPokemon = getRandomPokemon();
    loadPokemonImage(currentPokemon);
    document.getElementById('message').textContent = '';
    document.getElementById('guess-button').disabled = true; // Deshabilitar el botón "Adivinar"
    document.getElementById('search-input').value = ''; // Limpiar el campo de búsqueda
    blurLevel = 20;
    incorrectAttempts = 0;
    selectedPokemon = ''; // Reiniciar la selección
    updateBlur();
}

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    currentPokemon = getRandomPokemon();
    loadPokemonImage(currentPokemon);
    updateBlur();

    document.getElementById('guess-button').addEventListener('click', checkGuess);
    document.getElementById('reset-button').addEventListener('click', resetGame);

    // Evento de búsqueda dinámica
    document.getElementById('search-input').addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        showSearchResults(searchTerm); // Mostrar resultados filtrados
    });

    // Deshabilitar el botón "Adivinar" inicialmente
    document.getElementById('guess-button').disabled = true;
});
