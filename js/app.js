// ==========================================
// BLOG SYSTEM (Der Stack-Look)
// ==========================================
const BLOG_POSTS = [
    {
        title: "Das perfekte Licht in der Steppe",
        date: "01. Juni 2026",
        text: "Die afrikanische Sonne stellt Fotografen vor extreme Herausforderungen. Erfahre, warum die goldene Stunde am frühen Morgen über Erfolg oder Misserfolg deiner Wildlife-Aufnahmen entscheidet und wie du deine Kamera optimal einstellst.",
        img: "1b39a865-a637-4bbe-95e3-717f1d26c465.png"
    }
];

function displayBlog() {
    const container = document.getElementById('blog-container');
    if (!container) return;

    if (BLOG_POSTS.length === 0) {
        container.innerHTML = "<p style='color: #a59285; text-align: center;'>Noch keine Blog-Beiträge vorhanden.</p>";
        return;
    }

    const [latestPost, ...olderPosts] = BLOG_POSTS;

    // Großer Haupt-Post (Top)
    let html = `
        <div class="blog-featured" style="background: #1e1a17; border-radius: 12px; overflow: hidden; display: flex; flex-wrap: wrap; border: 1px solid #3a322d; margin-bottom: 30px;">
            <div style="flex: 1 1 400px; min-height: 300px;">
                <img src="${latestPost.img}" alt="Featured Post" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="flex: 1 1 400px; padding: 40px; display: flex; flex-direction: column; justify-content: center;">
                <span style="color: #f3a953; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">${latestPost.date}</span>
                <h3 style="font-family: 'Cinzel', serif; color: #fff; font-size: 1.8rem; margin-bottom: 15px;">${latestPost.title}</h3>
                <p style="color: #a59285; line-height: 1.6; font-size: 0.95rem;">${latestPost.text}</p>
            </div>
        </div>
    `;

    // Kleinerer Stack für ältere Beiträge (wird rechts angeordnet, falls vorhanden)
    if (olderPosts.length > 0) {
        html += `<div class="blog-stack" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">`;
        html += olderPosts.map(post => `
            <div class="stack-card" style="display: flex; background: #1e1a17; border-radius: 8px; overflow: hidden; border: 1px solid #2d2622;">
                <img src="${post.img}" alt="Miniaturbild" style="width: 120px; height: 120px; object-fit: cover;">
                <div style="padding: 15px;">
                    <span style="font-size: 0.75rem; color: #a59285;">${post.date}</span>
                    <h4 style="color: #fff; margin: 5px 0; font-size: 1.1rem;">${post.title}</h4>
                    <p style="color: #a59285; font-size: 0.85rem;">${post.text.substring(0, 70)}...</p>
                </div>
            </div>
        `).join('');
        html += `</div>`;
    }

    container.innerHTML = html;
}

// ==========================================
// KONTAKTFORMULAR (Formspree AJAX Versand)
// ==========================================
function initContactForm() {
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
}

// Skripte ausführen, sobald die Seite geladen ist
document.addEventListener("DOMContentLoaded", function () {
    displayBlog();
    initContactForm();
});
