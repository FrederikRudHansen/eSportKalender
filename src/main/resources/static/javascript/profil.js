let profiles = localStorage.getItem('profiles') ? JSON.parse(localStorage.getItem('profiles')) : [];

document.getElementById('save-profile').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const birthday = document.getElementById('birthday').value;
    const nationality = document.getElementById('nationality').value;
    const language = document.getElementById('language').value;
    const steamAccount = document.getElementById('steam-account').value;
    const faceitAccount = document.getElementById('faceit-account').value;
    const role = document.getElementById('role').value;
    const resume = document.getElementById('resume').value;

    if (!name) {
        alert("Navn er påkrævet!");
        return;
    }

    const profile = {
        id: Date.now(),
        name,
        gender,
        birthday,
        nationality,
        language,
        steamAccount,
        faceitAccount,
        role,
        resume
    };

    profiles.push(profile);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    alert("Profil gemt!");
});
