document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const button = document.getElementById("submit-btn");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        button.disabled = true;
        status.innerHTML = "Wird gesendet...";
        status.style.color = "#a59285";

        const data = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "✓ Danke! Deine Nachricht wurde erfolgreich gesendet.";
                status.style.color = "#f3a953";
                form.reset();
                button.disabled = false;
            } else {
                status.innerHTML = "Hoppla! Da gab es ein Problem beim Absenden.";
                status.style.color = "#ff4a4a";
                button.disabled = false;
            }
        }).catch(error => {
            status.innerHTML = "Verbindungsfehler. Bitte versuche es später noch einmal.";
            status.style.color = "#ff4a4a";
            button.disabled = false;
        });
    });
});
