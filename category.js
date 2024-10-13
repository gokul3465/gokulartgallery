document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // Simulated database of images for different categories
    const categoryImages = {
        'abstract': [
            { url: 'pics/category/abstract/1.jpg', title: 'Colorful Abstraction', artist: 'Jane Doe' },
            { url: 'pics/category/abstract/2.jpg', title: 'Geometric Shapes', artist: 'John Smith' },
            { url: 'pics/category/abstract/3.jpg', title: 'Fluid Forms', artist: 'Alice Johnson' },
            { url: 'pics/category/abstract/4.jpg', title: 'Dynamic Chaos', artist: 'Bob Wilson' },
            { url: 'pics/category/abstract/5.jpg', title: 'Minimalist Composition', artist: 'Eva Green' },
            { url: 'pics/category/abstract/6.jpg', title: 'Textured Layers', artist: 'Mike Brown' }
        ],
        'landscape': [
            { url: 'pics/category/landscape/1.jpg', title: 'Mountain Vista', artist: 'Bob Ross' },
            { url: 'pics/category/landscape/2.jpg', title: 'Serene Lake', artist: 'Emily Wilson' },
            { url: 'pics/category/landscape/3.jpg', title: 'Autumn Forest', artist: 'Michael Brown' },
            { url: 'pics/category/landscape/4.jpg', title: 'Coastal Sunset', artist: 'Sarah Johnson' },
            { url: 'pics/category/landscape/5.jpg', title: 'Desert Dunes', artist: 'Alex Turner' },
            { url: 'pics/category/landscape/6.jpg', title: 'Snowy Peaks', artist: 'Christine Lee' }
        ],
        'portrait': [
            { url: 'pics/category/potrait/1.jpg', title: 'The Enigmatic Smile', artist: 'Leonardo da Vinci' },
            { url: 'pics/category/potrait/2.jpg', title: 'Modern Youth', artist: 'Frida Kahlo' },
            { url: 'pics/category/potrait/3.jpg', title: 'Elder Wisdom', artist: 'Rembrandt' },
            { url: 'pics/category/potrait/4.jpg', title: 'Cultural Heritage', artist: 'Yayoi Kusama' },
            { url: 'pics/category/potrait/5.jpg', title: 'Self-Reflection', artist: 'Vincent van Gogh' },
            { url: 'pics/category/potrait/6.jpg', title: 'The Thinker', artist: 'Auguste Rodin' }
        ],
        'still-life': [
            { url: 'pics/category/stilllife/1.jpg', title: 'Fruit Bowl', artist: 'Paul Cézanne' },
            { url: 'pics/category/stilllife/2.jpg', title: 'Floral Arrangement', artist: 'Georgia O-Keeffe' },
            { url: 'pics/category/stilllife/3.jpg', title: 'Vanitas', artist: 'Pieter Claesz' },
            { url: 'pics/category/stilllife/4.jpg', title: 'Modern Objects', artist: 'Andy Warhol' },
            { url: 'pics/category/stilllife/5.jpg', title: 'Kitchen Scene', artist: 'Wayne Thiebaud' },
            { url: 'pics/category/stilllife/6.jpg', title: 'Book and Candle', artist: 'Henri Matisse' }
        ],
        'modern': [
            { url: 'pics/category/modern/1.jpg', title: 'Composition VIII', artist: 'Wassily Kandinsky' },
            { url: 'pics/category/modern/2.jpg', title: 'The Persistence of Memory', artist: 'Salvador Dalí' },
            { url: 'pics/category/modern/3.jpg', title: 'Les Demoiselles d-Avignon', artist: 'Pablo Picasso' },
            { url: 'pics/category/modern/4.jpg', title: 'Campbells Soup Cans', artist: 'Andy Warhol' },
            { url: 'pics/category/modern/5.jpg', title: 'The Scream', artist: 'Edvard Munch' },
            { url: 'pics/category/modern/6.jpg', title: 'Broadway Boogie Woogie', artist: 'Piet Mondrian' }
        ],
        'digital-art': [
            { url: 'pics/category/digitalart/1.jpg', title: 'Cyberpunk City', artist: 'Neon Artist' },
            { url: 'pics/category/digitalart/2.jpg', title: 'Fractal Dimension', artist: 'Algorithmic Creator' },
            { url: 'pics/category/digitalart/3.jpg', title: 'AI Generated Landscape', artist: 'Deep Learning' },
            { url: 'pics/category/digitalart/4.jpg', title: 'Virtual Reality Portrait', artist: 'VR Painter' },
            { url: 'pics/category/digitalart/5.jpg', title: '3D Character Model', artist: 'Digital Sculptor' },
            { url: 'pics/category/digitalart/6.jpg', title: 'Glitch Art Composition', artist: 'Error Artist' }
        ]
    };

    if (category) {
        document.getElementById('categoryTitle').textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
        loadCategoryArtworks(category);
    }

    function loadCategoryArtworks(category) {
        const gallery = document.getElementById('categoryGallery');
        gallery.innerHTML = ''; // Clear existing content
        
        const images = categoryImages[category] || [];
        
        if (images.length === 0) {
            gallery.innerHTML = '<p>No images found for this category.</p>';
            return;
        }

        images.forEach((image, index) => {
            const artwork = document.createElement('div');
            artwork.className = 'artwork';
            artwork.innerHTML = `
                <img src="${image.url}" alt="${image.title}">
                <h3>${image.title}</h3>
                <p>${image.artist}</p>
            `;
            artwork.addEventListener('click', () => openModal(image, index));
            gallery.appendChild(artwork);
        });
    }

    function openModal(image, index) {
        const modalImg = document.getElementById('modalImage');
        const modalDetails = document.getElementById('artworkDetails');
        const modal = document.getElementById('artworkModal');

        modalImg.src = image.url;
        modalImg.alt = image.title;
        modalDetails.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.artist}</p>
            <p>Price: $1000</p>
        `;
        modal.style.display = 'block';
        document.querySelector('.modal-content').scrollTop = 0;

        // Add navigation buttons
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.onclick = () => navigateModal(-1);
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.onclick = () => navigateModal(1);
        modalDetails.appendChild(prevButton);
        modalDetails.appendChild(nextButton);
    }

    function navigateModal(direction) {
        const currentIndex = Array.from(document.querySelectorAll('.artwork')).findIndex(
            artwork => artwork.querySelector('img').src === document.getElementById('modalImage').src
        );
        const newIndex = (currentIndex + direction + categoryImages[category].length) % categoryImages[category].length;
        openModal(categoryImages[category][newIndex], newIndex);
    }

    // Add event listeners for closing the modal
    const closeBtn = document.getElementsByClassName('close')[0];
    const modal = document.getElementById('artworkModal');

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const buyButton = document.getElementById('buyButton');
    buyButton.onclick = function() {
        alert('Thank you for your purchase!');
        modal.style.display = "none";
    }
});