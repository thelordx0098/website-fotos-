if (typeof IMAGES !== 'undefined') {
    document.getElementById('nav-logo').src = IMAGES.logo || '';
    document.getElementById('img-katrin').src = IMAGES.katrin || '';
    document.getElementById('img-tour1').src = IMAGES.antelope || '';
    document.getElementById('img-tour2').src = IMAGES.tiger || '';

    const festeGalerieBilder = [
        { img: IMAGES.cheetahs, title: 'Geparden' },
        { img: IMAGES.zebras_elephants_bw, title: 'Elefanten und Zebras' },
        { img: IMAGES.flamingo_bw, title: 'Flamingo' },
        { img: IMAGES.lion_mother_cub, title: 'Löwen' }
    ];

    const galerieHTML = festeGalerieBilder.map(item => `
        <div class="gallery-item">
            <img src="${item.img || ''}" alt="${item.title}">
        </div>
    `).join('');
    document.getElementById('feste-galerie').innerHTML = galerieHTML;
}

function loadBlogPosts() {
    const defaultPosts = [
        {
            title: "Mein perfekter Tag in der Serengeti",
            date: "01. Juni 2026",
            text: "Die Sonne geht langsam über der Akaziensteppe auf...",
            img: "flamingos"
        }
    ];
    
    const savedPosts = JSON.parse(localStorage.getItem('blog_posts')) || defaultPosts;
    const container = document.getElementById('blog-container');
    
    if (container) {
        container.innerHTML = savedPosts.map(post => {
            let imgSrc = '';
            if (typeof IMAGES !== 'undefined') {
                imgSrc = post.img.startsWith('data:') ? post.img : IMAGES[post.img] || IMAGES.flamingos;
            }
            return `
                <div class="blog-card">
                    <img src="${imgSrc}" alt="Vorschaubild">
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
