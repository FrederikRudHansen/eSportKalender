document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".input");

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch(searchInput.value);
        }
    });

    function performSearch(query) {
        if (!query) return;

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

        results.forEach(result => {
            const item = document.createElement("div");
            item.className = "search-result";
            item.textContent = `${result.type}: ${result.navn}`;
            resultContainer.appendChild(item);
        });
    }
});
