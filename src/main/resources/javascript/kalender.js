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
    const recurringEvents = []; // En liste til gentagende begivenheder

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
            const isRecurring = document.getElementById("gentag-ugentligt").checked;

            // Gemmer engangsbegivenheder
            events[date] = eventItems.map(item => ({
                text: item.querySelector(".event-text").textContent,
                type: item.dataset.type,
                recurringId: item.dataset.recurringId || null
            }));

            // Tilføj til gentagende begivenheder, hvis checkbox er markeret
            if (isRecurring) {
                eventItems.forEach(item => {
                    const eventText = item.querySelector(".event-text").textContent;
                    const eventType = item.dataset.type;
                    const recurringId = item.dataset.recurringId || `${Date.now()}-${Math.random()}`; // Generer unikt ID

                    // Gem i recurringEvents, hvis det ikke allerede findes
                    if (!item.dataset.recurringId) {
                        recurringEvents.push({
                            startDate: date,
                            text: eventText,
                            type: eventType,
                            recurringId: recurringId
                        });
                        item.dataset.recurringId = recurringId; // Tilføj ID til listen
                    }
                });
            }

            closeModal();
            renderCalendar(currentDate); // Opdater kalenderen
        };
    }

        // Tilføj begivenhed til listen
    function addEventToList(text, type, list, isRecurring = false, recurringId = null) {
        const li = document.createElement("li");
        li.dataset.type = type;
        li.dataset.isRecurring = isRecurring;
        if (recurringId) li.dataset.recurringId = recurringId; // Tilføj gentagende ID, hvis det er gentagende
        li.classList.add(`event-type-${type}`);

        const span = document.createElement("span");
        span.textContent = text;
        span.classList.add("event-text");

        const removeOnceBtn = document.createElement("button");
        removeOnceBtn.textContent = "Fjern én gang";
        removeOnceBtn.onclick = function () {
            removeEvent(list, li, false); // Slet kun denne forekomst
        };

        const removeAllBtn = document.createElement("button");
        removeAllBtn.textContent = "Fjern alle";
        if (isRecurring) {
            removeAllBtn.onclick = function () {
                removeEvent(list, li, true); // Fjern alle gentagelser
            };
            li.appendChild(removeAllBtn); // Tilføj "Fjern alle"-knap kun for gentagende events
        }

        li.appendChild(span);
        li.appendChild(removeOnceBtn);
        list.appendChild(li);
    }


    function removeEvent(list, eventElement, removeAll) {
        const date = document.getElementById("selected-date").textContent.split(": ")[1];
        const eventText = eventElement.querySelector(".event-text").textContent;
        const eventType = eventElement.dataset.type;
        const isRecurring = eventElement.dataset.isRecurring === "true";
        const recurringId = eventElement.dataset.recurringId;

        if (removeAll && isRecurring) {
            // Fjern alle gentagelser
            // 1. Fjern fra recurringEvents
            const reccuringIndex = recurringEvents.findIndex(event => event.recurringId === recurringId);
            if (index !== -1) {
                recurringEvents.splice(reccuringIndex, 1); // Fjern fra gentagende events
            }

            // 2. Fjern alle forekomster af dette gentagende event fra `events`
            for (const key in events) {
                events[key] = events[key].filter(event => event.recurringId !== recurringId); // Filtrer events, der matcher recurringId
            }
        } else {
            // Fjern kun denne forekomst
            events[date] = events[date].filter(event => event.text !== eventText || event.type !== eventType); // Fjern den valgte event
        }

        // Fjern fra den visuelle liste
        eventElement.remove();

        // Opdater kalenderen for at fjerne markeringen
        renderCalendar(currentDate);
    }



    // Funktion til at lukke modal
    function closeModal() {
        document.getElementById("event-modal").style.display = "none";
    }

    // Tilføj eventlistener til luk-knappen
    document.getElementById("close-modal").addEventListener("click", closeModal);

    function renderCalendar(date) {
        applyRecurringEvents(); // Opdater gentagende begivenheder

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

    function applyRecurringEvents() {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        recurringEvents.forEach(event => {
            const { startDate, text, type } = event;
            const [startYear, startMonth, startDay] = startDate.split('-').map(Number);

            let date = new Date(startYear, startMonth - 1, startDay);

            // Gå gennem hver uge, indtil vi når slutningen af den viste måned
            while (date.getFullYear() <= currentYear || (date.getFullYear() === currentYear && date.getMonth() <= currentMonth)) {
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

                // opretter datoen hvis den ikke findes
                if (!events[formattedDate]) {
                    events[formattedDate] = [];
                }

                // tjekker om begivnheden allerede er tilføjet
                const isEventAlreadyAdded = events[formattedDate].some(e=> e.text === text && e.type === type);

                if (!isEventAlreadyAdded) {
                    events[formattedDate].push({text, type });
                }

                // Flyt til næste uge
                date.setDate(date.getDate() + 7);
            }
        });
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
