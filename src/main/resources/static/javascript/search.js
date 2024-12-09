document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".input");

    // Lyt til input-begivenheden i stedet for kun "keypress"
    searchInput.addEventListener("input", function (event) {
        performSearch(searchInput.value);
    });

    function performSearch(query) {
        if (!query) {
            clearResults();
            return;
        }

        fetch(`/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(results => {
                console.log("Search results:", results);
                displayResults(results);
            })
            .catch(error => console.error("Error during search:", error));
    }

    function displayResults(results) {
        const resultContainer = document.querySelector(".search-results");
        resultContainer.innerHTML = ""; // Tøm tidligere resultater

        // Hvis ingen resultater
        if (results.length === 0) {
            resultContainer.innerHTML = "<div>No results found</div>";
        }

        results.forEach(result => {
            const item = document.createElement("div");
            item.className = "search-result";
            item.textContent = `${result.type}: ${result.navn}`;
            resultContainer.appendChild(item);
        });
    }

    function clearResults() {
        const resultContainer = document.querySelector(".search-results");
        resultContainer.innerHTML = ""; // Tøm resultater
    }
});
