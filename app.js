document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    let collageCode = '';
    const orderButton = document.getElementById('orderButton');
    const imageGallery = document.getElementById('imageGallery');

    // Function to update the collage code
    function updateCollageCode(imageId, position, orientation) {
        collageCode += `${imageId}-${position}-${orientation}_`;
        document.getElementById('collageCode').textContent = collageCode;

        // Enable the "Proceed to Checkout" button if the collage code is valid
        if (collageCode.length > 0) {
            orderButton.disabled = false;
        }
    }

    // Fetch and load tiles from the JSON file
    fetch('tiles.json')
        .then(response => response.json())
        .then(tiles => {
            tiles.forEach(tile => {
                const tileElement = document.createElement('div');
                tileElement.className = 'tile';
                tileElement.style.backgroundImage = `url(${tile.src})`;
                tileElement.dataset.id = tile.id;
                tileElement.addEventListener('click', function() {
                    const position = 1; // Replace with logic to select slot position
                    const orientation = 'R90'; // Replace with user input for orientation
                    updateCollageCode(tile.id, position, orientation);
                });
                imageGallery.appendChild(tileElement);
            });
        })
        .catch(error => console.error('Error loading tiles:', error));

    document.querySelectorAll('.template-slot').forEach((slot, index) => {
        slot.addEventListener('click', function() {
            console.log('Slot clicked, implement selection logic here.');
        });
    });

    const checkoutForm = document.getElementById('checkoutForm');
    const serviceID = 'service_z8blkjs';
    const templateID = 'template_muokur4';

    // Event listener for form submission to handle EmailJS and PayPal
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const codeField = document.createElement('input');
        codeField.type = 'hidden';
        codeField.name = 'collage_code';
        codeField.value = collageCode;
        this.appendChild(codeField);

        // Prepare email parameters
        const emailParams = {
            user_name: document.getElementById('name').value,
            user_address: document.getElementById('address').value,
            user_city: document.getElementById('city').value,
            user_state: document.getElementById('state').value,
            user_zip: document.getElementById('zip').value,
            user_email: document.getElementById('email').value,
            collage_code: collageCode,
        };

        const btn = document.querySelector("input[type='submit']");
        btn.value = 'Sending...';

        emailjs.send(serviceID, templateID, emailParams)
            .then(() => {
                btn.value = 'Send Email';
                console.log('Email sent successfully.');
                alert('Order placed! You will receive an email shortly.');
                // Proceed with form submission after email is sent
                checkoutForm.submit();
            }, (err) => {
                btn.value = 'Send Email';
                console.error('Failed to send email:', err);
                alert('Failed to place order. Please try again. ' + JSON.stringify(err));
            });
    });

    const paypalButton = document.getElementById('paypalButton');
    const testButton = document.getElementById('testButton');

    // Handle PayPal button click
    if (paypalButton) {
        paypalButton.addEventListener('click', function() {
            console.log('PayPal button clicked.');
            checkoutForm.submit(); // Simulate form submission to send the email
            window.location.href = 'https://www.paypal.com/ncp/payment/F2AG3LYLVNGYL'; // Replace with your actual PayPal link
        });
    }

    // Handle Test Order button click
    if (testButton) {
        testButton.addEventListener('click', function() {
            console.log('Test button clicked.');
            checkoutForm.submit(); // Simulate form submission to send the email
            alert('Test order processed. No payment was made.');
        });
    }
});
