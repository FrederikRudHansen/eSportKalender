document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (email === "admin@admin" && password === "admin") {
        alert("Velkommen, Admin!");
        window.location.href = '/admin';
    } else {
        this.submit();
    }
});
