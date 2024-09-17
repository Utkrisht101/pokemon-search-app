// JavaScript source code
document.getElementById("search-button").addEventListener("click", function () {
    const searchValue = document.getElementById("search-input").value.trim().toLowerCase();

    if (!searchValue) return; // Prevent searching with empty input

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            // Fill the UI with the Pokémon data
            document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
            document.getElementById("pokemon-id").textContent = data.id;
            document.getElementById("weight").textContent = data.weight;
            document.getElementById("height").textContent = data.height;
            document.getElementById("hp").textContent = data.stats[0].base_stat;
            document.getElementById("attack").textContent = data.stats[1].base_stat;
            document.getElementById("defense").textContent = data.stats[2].base_stat;
            document.getElementById("special-attack").textContent = data.stats[3].base_stat;
            document.getElementById("special-defense").textContent = data.stats[4].base_stat;
            document.getElementById("speed").textContent = data.stats[5].base_stat;

            // Add Pokémon sprite
            let sprite = document.getElementById("sprite");
            if (!sprite) {
                sprite = document.createElement("img");
                sprite.id = "sprite";
                document.getElementById("pokemon-info").appendChild(sprite);
            }
            sprite.src = data.sprites.front_default;

            // Handle Pokémon types
            const typesContainer = document.getElementById("types");
            typesContainer.innerHTML = ""; // Clear previous types
            data.types.forEach(typeInfo => {
                const typeElement = document.createElement("div");
                typeElement.textContent = typeInfo.type.name.toUpperCase();
                typesContainer.appendChild(typeElement);
            });
        })
        .catch(error => {
            alert("Pokémon not found");
        });
});
