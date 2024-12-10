document.getElementById('save-profile').addEventListener('click', function () {
    // Hent værdier fra formularfelterne
    const name = document.getElementById('name').value.trim();
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
    const newProfile = {
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
    let profiles = localStorage.getItem('profiles') ? JSON.parse(localStorage.getItem('profiles')) : [];

    // Tjek om profilen allerede eksisterer
    const existingProfileIndex = profiles.findIndex(profile => profile.name.toLowerCase() === name.toLowerCase());

    if (existingProfileIndex !== -1) {
        // Profil findes allerede
        const overwrite = confirm(`En profil med navnet "${name}" findes allerede. Vil du overskrive den?`);
        if (overwrite) {
            // Overskriv eksisterende profil
            profiles[existingProfileIndex] = newProfile;
            alert('Profil overskrevet!');
        } else {
            // Annullér handlingen
            alert('Profil ikke gemt. Vælg et andet navn.');
            return;
        }
    } else {
        // Tilføj ny profil
        profiles.push(newProfile);
        alert('Profil gemt!');
    }

    // Gem listen tilbage i localStorage
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Ryd formularen
    document.getElementById('profile-form').reset();

    // Omdiriger til profilsiden
    window.location.href = '/minProfil';
});
