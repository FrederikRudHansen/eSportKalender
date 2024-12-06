// profil.js

document.getElementById('save-profile').addEventListener('click', function () {
    // Hent værdier fra formularfelterne
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const birthday = document.getElementById('birthday').value;
    const nationality = document.getElementById('nationality').value;
    const language = document.getElementById('language').value;
    const steamAccount = document.getElementById('steam-account').value;
    const faceitAccount = document.getElementById('faceit-account').value;
    const role = document.getElementById('role').value;
    const resume = document.getElementById('resume').value;

    // Valider, at mindst navn og køn er udfyldt
    if (!name || !gender) {
        alert('Navn og Køn skal udfyldes!');
        return;
    }

    // Opret en profil som et objekt
    const profile = {
        name,
        gender,
        birthday,
        nationality,
        language,
        steamAccount,
        faceitAccount,
        role,
        resume,
    };

    // Hent eksisterende profiler fra localStorage
    const profiles = localStorage.getItem('profiles') ? JSON.parse(localStorage.getItem('profiles')) : [];

    // Tilføj den nye profil til listen
    profiles.push(profile);

    // Gem listen tilbage i localStorage
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Bekræftelse til brugeren
    alert('Profil gemt!');
    window.location.href = '/minProfil';


    // Ryd formularen
    document.getElementById('profile-form').reset();
});
