// ==========================================
// BLOG SYSTEM (Der Stack-Look)
// ==========================================
const BLOG_POSTS = [
    {
        title: "Mein perfekter Tag in der Serengeti",
        date: "01. Juni 2026",
        text: "Die Sonne geht langsam über der Akaziensteppe auf. Ein unglaublicher Moment, den wir direkt mit der Kamera festhalten konnten...",
        img: "flamingo.jpeg"
    }
];

function displayBlog() {
    const container = document.getElementById('blog-container');
    if (!container) return;

    if (BLOG_POSTS.length === 0) {
        container.innerHTML = "<p>Noch keine Blog-Beiträge vorhanden.</p>";
        return;
    }

    const [latestPost, ...olderPosts] = BLOG_POSTS;

    let html = `
        <div class="blog-featured">
            <div class="featured-img-wrapper">
                <img src="${latestPost.img}" alt="Featured Post">
            </div>
            <div class="featured-content">
                <span class="blog-date">${latestPost.date}</span>
                <h2>${latestPost.title}</h2>
                <p>${latestPost.text}</p>
            </div>
        </div>
    `;

    if (olderPosts.length > 0) {
        html += `<div class="blog-stack">`;
        html += olderPosts.map(post => `
            <div class="stack-card">
                <img src="${post.img}" alt="Minitaturbild">
                <div class="stack-body">
                    <span class="blog-date">${post.date}</span>
                    <h3>${post.title}</h3>
                    <p>${post.text.substring(0, 80)}...</p>
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

    form.addEventListener("submit", function(event) {
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
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "Hoppla! Da gab es ein Problem beim Absenden.";
                    }
                    status.style.color = "#ff4a4a";
                    button.disabled = false;
                });
            }
        }).catch(error => {
            status.innerHTML = "Verbindungsfehler. Bitte versuche es später noch einmal.";
            status.style.color = "#ff4a4a";
            button.disabled = false;
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    displayBlog();
    initContactForm();
});
