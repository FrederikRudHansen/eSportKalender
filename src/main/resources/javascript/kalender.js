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
    const events = {}; // Gemmer begivenheder for hver dato

    // Funktion til at åbne modal
    function openModal(date) {
        const modal = document.getElementById("event-modal");
        const selectedDate = document.getElementById("selected-date");
        const eventInput = document.getElementById("event-input");
        const eventTypeDropdown = document.getElementById("event-type");
        const eventList = document.getElementById("event-list");

        selectedDate.textContent = `Dato: ${date}`;
        eventInput.value = "";
        eventTypeDropdown.value = "træningskamp";
        eventList.innerHTML = ""; // Ryd listen for at starte frisk

        // Indlæs eksisterende begivenheder for datoen
        if (events[date]) {
            events[date].forEach(event => {
                addEventToList(event.text, event.type, eventList);
            });
        }

        modal.style.display = "flex";

        // Tilføj ny begivenhed til listen
        document.getElementById("add-event").onclick = function () {
            const eventText = eventInput.value.trim();
            const eventType = eventTypeDropdown.value;

            if (eventText) {
                addEventToList(eventText, eventType, eventList);
                eventInput.value = ""; // Ryd inputfeltet
            } else {
                alert("Indtast venligst en begivenhed!");
            }
        };

        // Gem alle begivenheder
        document.getElementById("save-event").onclick = function () {
            const eventItems = Array.from(eventList.children);
            events[date] = eventItems.map(item => ({
                text: item.querySelector(".event-text").textContent,
                type: item.dataset.type
            }));
            closeModal();
            renderCalendar(currentDate); // Opdater kalender for at vise ændringer
        };
    }

    // Tilføj begivenhed til listen
    function addEventToList(text, type, list) {
        const li = document.createElement("li");
        li.dataset.type = type;
        li.classList.add(`event-type-${type}`);

        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("event-text");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Fjern";
        removeBtn.onclick = function () {
            li.remove();
        };

        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    }

    // Funktion til at lukke modal
    function closeModal() {
        document.getElementById("event-modal").style.display = "none";
    }

    // Tilføj eventlistener til luk-knappen
    document.getElementById("close-modal").addEventListener("click", closeModal);

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Start på mandag
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

            if (events[fullDate] && events[fullDate].length > 0) {
                dayDiv.style.backgroundColor = "red"; // Markér dato med begivenhed
            } else {
                dayDiv.style.backgroundColor = "lightgreen"; // Markér frie datoer
            }

            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add("today");
            }

            daysContainer.appendChild(dayDiv);
        }

        // Next month's dates
        const nextMonthStartDay = 7 - (new Date(year, month + 1, 0).getDay() + 6) % 7 - 1;
        for (let i = 1; i <= nextMonthStartDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
