const profiles = localStorage.getItem('profiles') ? JSON.parse(localStorage.getItem('profiles')) : [];
const profileContainer = document.getElementById('profile-container');

function renderProfiles() {
    profileContainer.innerHTML = '';
    profiles.forEach(profile => {
        const profileBox = document.createElement('div');
        profileBox.classList.add('profile-box');

        profileBox.innerHTML = `
            <h3>${profile.name}</h3>
            <p><strong>Køn:</strong> ${profile.gender}</p>
            <p><strong>Fødselsdag:</strong> ${profile.birthday}</p>
            <p><strong>Nationalitet:</strong> ${profile.nationality}</p>
            <p><strong>Sprog:</strong> ${profile.language}</p>
            <p><strong>Steam:</strong> ${profile.steamAccount}</p>
            <p><strong>Faceit:</strong> ${profile.faceitAccount}</p>
            <p><strong>Rolle:</strong> ${profile.role}</p>
            <p><strong>Resume:</strong> ${profile.resume}</p>
        `;

        profileContainer.appendChild(profileBox);
    });
}

renderProfiles();
