document.addEventListener('DOMContentLoaded', function () {
    const monthYear = document.getElementById('month-year');
    const daysContainer = document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let currentDate = new Date();
    let today = new Date();
    const events = {}; // Gemmer begivenheder

    // Hent begivenheder for et hold fra backend
    async function hentBegivenheder(holdId) {
        const response = await fetch(`/api/begivenheder/hold/${holdId}`);
        const begivenheder = await response.json();
        console.log(begivenheder); // Debug - viser begivenhederne i konsollen

        // Map begivenheder til kalender-datoer
        begivenheder.forEach(event => {
            const dato = event.dato; // Formatet skal være 'yyyy-MM-dd'
            events[dato] = {
                titel: event.titel,
                beskrivelse: event.description,
                type: event.type,
            };
        });

        // Opdater kalenderen med begivenheder
        renderCalendar(currentDate);
    }

    // Send ny begivenhed til backend
    async function opretBegivenhed(begivenhed) {
        const response = await fetch('/api/begivenheder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(begivenhed),
        });
        const nyBegivenhed = await response.json();
        console.log(nyBegivenhed); // Debug - viser den nye begivenhed i konsollen
    }

    // Funktion til at åbne modal og vise/beskrive begivenhed
    function openModal(date) {
        const modal = document.getElementById("event-modal");
        const selectedDate = document.getElementById("selected-date");
        const eventInput = document.getElementById("event-input");

        selectedDate.textContent = `Dato: ${date}`;
        eventInput.value = events[date] || ""; // Hvis der er en begivenhed, vis den
        modal.style.display = "flex";

        // Gem begivenhed
        document.getElementById("save-event").onclick = async function () {
            const eventText = eventInput.value.trim();
            if (eventText) {
                const begivenhed = {
                    dato: date, // Datoen, der blev valgt
                    titel: "Event", // Du kan tilføje et felt for titel
                    description: eventText,
                    type: "Træning", // Eller "Turnering", afhængigt af kontekst
                };

                try {
                    await opretBegivenhed(begivenhed); // Send til backend
                    events[date] = eventText; // Opdater lokal state
                    alert(`Begivenhed gemt for ${date}: ${eventText}`);
                } catch (error) {
                    alert("Kunne ikke gemme begivenheden. Prøv igen.");
                    console.error(error);
                }
            } else {
                delete events[date]; // Fjern begivenhed, hvis input er tomt
                alert(`Begivenhed fjernet for ${date}`);
            }
            closeModal();
            renderCalendar(currentDate); // Opdater kalender for at markere datoer med begivenheder
        };
    }

    // Funktion til at lukke modal
    function closeModal() {
        document.getElementById("event-modal").style.display = "none";
    }

    // Tilføj eventlistener til luk-knappen
    document.getElementById("close-modal").addEventListener("click", closeModal);

    // Funktion til at render kalender
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = '';

        // Previous month's dates
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }

        // Current month's dates
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;

            const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
            dayDiv.addEventListener("click", () => openModal(fullDate)); // Tilføj klikfunktion

            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }

            if (events[fullDate]) {
                dayDiv.style.backgroundColor = "lightgreen"; // Markér dato med begivenhed
            }

            daysContainer.appendChild(dayDiv);
        }

        // Next month's dates
        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= nextMonthStartDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    // Hent begivenheder, når kalenderen indlæses
    const holdId = 1; // Brug det relevante hold-ID her
    hentBegivenheder(holdId);

    // Naviger til forrige måned
    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // Naviger til næste måned
    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate); // Start med at rendere kalenderen
});
