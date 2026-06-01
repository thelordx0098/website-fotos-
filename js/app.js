function loadBlogPosts() {
    const defaultPosts = [
        {
            title: "Mein perfekter Tag in der Serengeti",
            date: "01. Juni 2026",
            text: "Die Sonne geht langsam über der Akaziensteppe auf...",
            img: "1b39a865-a637-4bbe-95e3-717f1d26c465.jpeg" // Nutzt direkt den Flamingo als Vorschaubild
        }
    ];
    
    const savedPosts = JSON.parse(localStorage.getItem('blog_posts')) || defaultPosts;
    const container = document.getElementById('blog-container');
    
    if (container) {
        container.innerHTML = savedPosts.map(post => {
            return `
                <div class="blog-card">
                    <img src="${post.img}" alt="Vorschaubild">
                    <div class="blog-body">
                        <span class="blog-date">${post.date}</span>
                        <h3>${post.title}</h3>
                        <p>${post.text}</p>
                    </div>
                </div>
            `;
        }).join('');
    }
}
window.addEventListener('DOMContentLoaded', loadBlogPosts);
