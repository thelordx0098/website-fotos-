document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const button = document.getElementById("submit-btn");

    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite und die Formspree-Weiterleitung
        
        button.disabled = true;
        button.innerHTML = "WIRD GESENDET...";
        status.innerHTML = "";

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
                button.innerHTML = "NACHRICHT SENDEN";
                button.disabled = false;
            } else {
                status.innerHTML = "Hoppla! Da gab es ein Problem beim Absenden.";
                status.style.color = "#ff4a4a";
                button.innerHTML = "NACHRICHT SENDEN";
                button.disabled = false;
            }
        }).catch(error => {
            status.innerHTML = "Verbindungsfehler. Bitte versuche es später noch einmal.";
            status.style.color = "#ff4a4a";
            button.innerHTML = "NACHRICHT SENDEN";
            button.disabled = false;
        });
    });
});
