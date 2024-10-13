document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const artworks = Array.from(gallery.querySelectorAll('.artwork'));
    const modal = document.getElementById('artworkModal');
    const modalImg = document.getElementById('modalImage');
    const modalDetails = document.getElementById('artworkDetails');
    const buyButton = document.getElementById('buyButton');
    const closeBtn = document.getElementsByClassName('close')[0];

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function appendArtworks() {
        const clonedArtworks = artworks.map(artwork => artwork.cloneNode(true));
        clonedArtworks.forEach(artwork => {
            artwork.addEventListener('click', openModal);
            gallery.appendChild(artwork);
        });
    }

    function handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                appendArtworks();
                observer.unobserve(entry.target);
                observer.observe(gallery.lastElementChild);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(gallery.lastElementChild);
    appendArtworks();

    function openModal(e) {
        const artwork = e.currentTarget;
        const img = artwork.querySelector('img');
        const title = artwork.querySelector('h3').textContent;
        const artist = artwork.querySelector('p').textContent;

        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalDetails.innerHTML = `
            <h3>${title}</h3>
            <p>${artist}</p>
            <p>Price: $1000</p>
        `;
        modal.style.display = 'block';
        document.querySelector('.modal-content').scrollTop = 0;
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    artworks.forEach(artwork => {
        artwork.addEventListener('click', openModal);
    });

    closeBtn.onclick = closeModal;

    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    buyButton.onclick = function () {
        alert('Thank you for your purchase!');
        closeModal();
    }

    // New code for handling navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Show home section by default
    document.getElementById('home').style.display = 'block';

    // Handle file upload (placeholder functionality)
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Artwork uploaded successfully! (This is a placeholder message)');
            this.reset();
        });
    }
});