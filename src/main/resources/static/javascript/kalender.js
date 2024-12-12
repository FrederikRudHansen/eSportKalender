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
        document.getElementById('eventText').innerText = eventForDay.title;
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
            daySquare.dataset.date = dayString;

            const eventForDay = events.find(e => e.date === dayString || (e.repeat && isRepeatedEvent(e, dayString)));

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);

                // Add background color changes for booked days
                if (eventForDay.isTournament) {
                    daySquare.classList.add('green-day');
                }
                if (eventForDay.isTraining) {
                    daySquare.classList.add('blue-day');
                }

                // Indicate a fully booked day by changing background color
                daySquare.classList.add('booked-day');
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

        const newEvent = {
            date: clicked,
            title: eventTitleInput.value,
            repeat: repeatCheckbox.checked,
            isTournament: document.querySelector('.Turnering').checked, // Tjek om turnering er valgt
            isTraining: document.querySelector('#Træning').checked, // Tjek om træning er valgt
        };

        events.push(newEvent);

        // Repeat weekly events if checked
        if (repeatCheckbox.checked) {
            let startDate = new Date(clicked);
            const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            while (startDate <= endDate) {
                startDate.setDate(startDate.getDate() + 7);
                const repeatDate = startDate.toLocaleDateString('en-us');
                events.push({
                    ...newEvent,
                    date: repeatDate,
                });
            }
        }

        // Opdater kalenderen med eventet
        load();

        // Gem events i localStorage
        localStorage.setItem('events', JSON.stringify(events));

        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    const eventForDay = events.find(e => e.date === clicked || (e.repeat && isRepeatedEvent(e, clicked)));

    if (eventForDay) {
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
