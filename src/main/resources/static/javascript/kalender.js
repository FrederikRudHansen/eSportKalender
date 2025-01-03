let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const repeatCheckbox = document.getElementById('repeatCheckbox'); // Checkbox for gentagelser
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked || (e.repeat && isRepeatedEvent(e, clicked)));

    if (eventForDay) {
        // Vis event-titel og tid
        document.getElementById('eventText').innerHTML = `
            <strong>Event:</strong> ${eventForDay.title} ${
            eventForDay.time ? `kl. ${eventForDay.time}` : ''
        }<br>
            ${eventForDay.træning ? "(Træning)" : ""}
            ${eventForDay.turnering ? "(Turnering)" : ""}
            ${eventForDay.kamp ? "(Kamp)" : ""}
        `;

        // Vis modstander hvis den findes
        if (eventForDay.modstander) {
            document.getElementById('eventText').innerHTML += `
                <br><strong>Modstander:</strong> ${eventForDay.modstander}
            `;
        }

        // Forudfyld data, hvis event skal redigeres
        document.getElementById('Træning').checked = eventForDay.træning || false;
        document.querySelector('.Turnering').checked = eventForDay.turnering || false;
        document.getElementById('Kamp').checked = eventForDay.kamp || false;
        document.getElementById('eventTimeInput').value = eventForDay.time || '';
        document.getElementById('modstanderBox').value = eventForDay.modstander || '';

        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}




function isRepeatedEvent(event, date) {
    const eventDate = new Date(event.date);
    const checkDate = new Date(date);
    const diffDays = Math.floor((checkDate - eventDate) / (1000 * 60 * 60 * 24));
    // Kontroller, om datoen ligger præcis et multiplum af 7 dage fra startdatoen
    return event.repeat && diffDays % 7 === 0 && diffDays >= 0;
}
function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find(e => e.date === dayString || (e.repeat && isRepeatedEvent(e, dayString)));

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');

                // Visning af Event-Information
                eventDiv.innerText = `${eventForDay.title} ${eventForDay.time ? `kl. ${eventForDay.time}` : ''}`;

                if (eventForDay.træning) eventDiv.innerText += " (Træning)";
                if (eventForDay.turnering) eventDiv.innerText += " (Turnering)";
                if (eventForDay.kamp) eventDiv.innerText += " (Kamp)";

                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}



function closeModal() {
    eventTitleInput.classList.remove('error');
    repeatCheckbox.checked = false;
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        // Hent værdier fra inputfelter
        const isTræning = document.getElementById('Træning').checked;
        const isTurnering = document.querySelector('.Turnering').checked;
        const isKamp = document.getElementById('Kamp').checked;
        const eventTime = document.getElementById('eventTimeInput').value;
        const modstander = document.getElementById('modstanderBox').value; // Ny værdi for modstander

        // Opret event-objekt med tid og modstander
        const newEvent = {
            date: clicked,
            title: eventTitleInput.value,
            træning: isTræning,
            turnering: isTurnering,
            kamp: isKamp,
            time: eventTime,
            modstander: modstander, // Tilføj modstander
            repeat: repeatCheckbox.checked,
        };

        // Gem eventet i listen
        events.push(newEvent);

        // Hvis gentagelse, tilføj events hver 7. dag
        if (repeatCheckbox.checked) {
            let startDate = new Date(clicked);
            const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Slut på måneden
            while (startDate <= endDate) {
                startDate.setDate(startDate.getDate() + 7);
                const repeatDate = startDate.toLocaleDateString('en-us');
                events.push({
                    ...newEvent,
                    date: repeatDate,
                });
            }
        }

        // Gem events i localStorage
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}




function deleteEvent() {
    // Find eventet for den aktuelle dato
    const eventForDay = events.find(e => e.date === clicked || (e.repeat && isRepeatedEvent(e, clicked)));

    if (eventForDay) {
        // Filtrer events baseret på titel og slet alle med samme titel
        const eventTitleToDelete = eventForDay.title;
        events = events.filter(e => e.title !== eventTitleToDelete);
        localStorage.setItem('events', JSON.stringify(events));
    }

    closeModal();
}


function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
