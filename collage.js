document.addEventListener('DOMContentLoaded', function() {
    const collageGrid = document.getElementById('collageGrid');
    const imageGallery = document.getElementById('imageGallery');
    const collageCodeField = document.getElementById('collageCode'); // Hidden input field to store the collage code
    
    let collageCode = '';  // This will store the final collage code

    // Array of image objects representing the tiles
    const images = [
        { id: 'img1', src: 'assets/tiles/tile1.png' },
        { id: 'img2', src: 'assets/tiles/tile2.png' },
        { id: 'img3', src: 'assets/tiles/tile3.png' },
        { id: 'img4', src: 'assets/tiles/tile4.png' },
        { id: 'img5', src: 'assets/tiles/tile5.png' },
        { id: 'img6', src: 'assets/tiles/tile6.png' },
        // Add more image objects as needed
    ];

    // Function to load the image gallery
    function loadGallery() {
        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.id = image.id;
            imgElement.classList.add('gallery-image');
            imgElement.setAttribute('draggable', true);
            imgElement.addEventListener('dragstart', dragStart);
            imageGallery.appendChild(imgElement);
        });
    }

    // Drag and Drop Handlers
    function allowDrop(event) {
        event.preventDefault();
    }

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    function drop(event) {
        event.preventDefault();
        const imageId = event.dataTransfer.getData('text/plain');
        const imgSrc = images.find(img => img.id === imageId).src;
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.classList.add('collage-image');
        event.target.innerHTML = '';  // Clear any previous image
        event.target.appendChild(imgElement);

        // Update the collage code
        const slotPosition = event.target.getAttribute('data-position');
        updateCollageCode(slotPosition, imageId);
    }

    // Function to update the collage code
    function updateCollageCode(position, imageId) {
        const existingCode = collageCode.split('|').filter(code => !code.startsWith(`${position}:`));
        collageCode = [...existingCode, `${position}:${imageId}`].join('|');
        collageCodeField.value = collageCode;  // Update the hidden field with the code
    }

    // Load the gallery when the page loads
    loadGallery();

    // Event listeners for placing images in the collage slots
    collageGrid.querySelectorAll('.collage-slot').forEach(slot => {
        slot.addEventListener('drop', drop);
        slot.addEventListener('dragover', allowDrop);
    });
});
