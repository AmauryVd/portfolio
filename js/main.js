document.getElementById('year').textContent = new Date().getFullYear();

const currentPage = location.pathname.split('/').pop();
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

if (document.getElementById('rss-feed-content')) {
    document.addEventListener('DOMContentLoaded', function() {
        fetch('rss.php')
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                let html = '';
                items.forEach(el => {
                    html += `
                        <div class="rss-item" data-load>
                            <h3>${el.querySelector("title").textContent}</h3>
                            <p class="date">${el.querySelector("pubDate").textContent}</p>
                            <p>${el.querySelector("description").textContent}</p>
                        </div>
                    `;
                });
                document.getElementById('rss-feed-content').innerHTML = html;
                animateElements();
            })
            .catch(error => {
                console.error('Error loading RSS feed:', error);
                document.getElementById('rss-feed-content').innerHTML =
                    '<p>Could not load updates. Please check back later.</p>';
            });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const captionText = document.getElementById('caption');
        const closeModal = document.querySelector('.close-modal');

        document.querySelectorAll('.view-certificate').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();

                modalImg.src = this.dataset.certificateUrl;
                modalImg.alt = this.dataset.certificateTitle;
                captionText.innerHTML = this.dataset.certificateTitle;

                modal.style.display = "block";
                document.body.classList.add('no-scroll');

                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);

                modalImg.onerror = function() {
                    captionText.innerHTML = "Certificate image not found: " + this.alt;
                    modalImg.style.display = "none";
                };
            });
        });

        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.classList.remove('no-scroll');
            }, 300);
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = "none";
                    document.body.classList.remove('no-scroll');
                }, 300);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

    document.querySelectorAll('a[href^="/"], a[href^="."]').forEach(link => {
        const href = link.getAttribute('href');

        if (href.startsWith('#') ||
            href.startsWith('http') ||
            link.classList.contains('no-transition') ||
            link.classList.contains('view-certificate')) {
            return;
        }

        link.addEventListener('click', function(e) {
            if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) return;

            e.preventDefault();

            transition.classList.add('active');
            document.body.classList.add('no-scroll');

            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });

    window.addEventListener('load', function() {
        transition.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

function animateElements() {
    const elements = document.querySelectorAll('[data-load]');
    elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 50}ms`;
        setTimeout(() => {
            el.classList.add('loaded');
        }, 100 + (index * 50));
    });
}

const cursorText = document.getElementById("cursorText");

// Fonction pour déplacer le texte avec le curseur
document.addEventListener("mousemove", (event) => {
    // Position du curseur
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Décalage du texte par rapport au curseur
    const offsetX = 20; // Décalage horizontal
    const offsetY = -90; // Décalage vertical

    // Appliquer la position absolue du texte en utilisant left et top
    cursorText.style.left = (mouseX + offsetX) + "px";
    cursorText.style.top = (mouseY + offsetY) + "px";
});