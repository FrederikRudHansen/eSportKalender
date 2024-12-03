const API_URL = '/api/calendar'; // Base URL til din back-end API

let nav = 0; // Holder styr på månedsskift (0 = denne måned)
let clicked = null; // Holder styr på den valgte dag
let events = []; // Gemmer hentede events

const calendar = document.getElementById('calendar');
const monthDisplay = document.getElementById('monthDisplay');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const repeatCheckbox = document.getElementById('repeatCheckbox');

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Hent events fra back-end
async function fetchEvents(teamId, month, year) {
    try {
        const response = await fetch(`${API_URL}/${teamId}?month=${month + 1}&year=${year}`);
        events = await response.json();
        loadCalendar();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Luk modal
function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    repeatCheckbox.checked = false;
    clicked = null;
    loadCalendar();
}

// Åben modal til ny event
function openModal(date) {
    clicked = date;
    newEventModal.style.display = 'block';
    backDrop.style.display = 'block';
}

// Åben modal til sletning af event
function openDeleteModal(event) {
    document.getElementById('eventText').innerText = event.title;
    deleteEventModal.style.display = 'block';
    backDrop.style.display = 'block';

    document.getElementById('deleteButton').onclick = async function () {
        await fetch(`${API_URL}/${event.id}`, { method: 'DELETE' });
        events = events.filter(e => e.id !== event.id);
        closeModal();
    };
}

// Render kalenderen
function loadCalendar() {
    const dt = new Date();
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    monthDisplay.innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${year}-${month + 1}-${i - paddingDays}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const dayEvents = events.filter(e => e.date === dayString);
            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (dayEvents.length > 0) {
                dayEvents.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.innerText = event.title;
                    eventDiv.onclick = () => openDeleteModal(event);
                    daySquare.appendChild(eventDiv);
                });
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

// Gem nyt event
document.getElementById('saveButton').addEventListener('click', async () => {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        const newEvent = {
            title: eventTitleInput.value,
            date: clicked,
            repeatWeekly: repeatCheckbox.checked,
        };

        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent),
        });

        events.push(newEvent);
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
});

// Luk modal ved annullering
document.getElementById('cancelButton').addEventListener('click', closeModal);
document.getElementById('closeButton').addEventListener('click', closeModal);
backDrop.addEventListener('click', closeModal);

// Håndter månedsskift
document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    fetchEvents(1, new Date().getMonth() + nav, new Date().getFullYear());
});
document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    fetchEvents(1, new Date().getMonth() + nav, new Date().getFullYear());
});

// Indlæs kalender ved start
fetchEvents(1, new Date().getMonth(), new Date().getFullYear());
