document.addEventListener('DOMContentLoaded', function() {
    // Highlight the active navigation link based on the current page
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Restore RSID (Roseta Code) in the collage creation page if available
    const rsidCode = localStorage.getItem('rsidCode');
    const collageCodeInput = document.getElementById('collageCode');
    if (rsidCode && collageCodeInput) {
        collageCodeInput.value = rsidCode;
    }

    // This function can be used to initialize the gallery or any dynamic content
    function initializeGallery() {
        // Placeholder function for any gallery initialization logic
        console.log('Gallery initialized');
    }

    // Initialize the gallery when the page loads
    initializeGallery();

    // Handling form submission for EmailJS and PayPal integration
    const checkoutForm = document.getElementById('checkoutForm');
    const serviceID = 'service_z8blkjs';  // Replace with your EmailJS service ID
    const templateID = 'template_muokur4';  // Replace with your EmailJS template ID

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Prepare the email parameters
            const emailParams = {
                user_name: document.getElementById('name').value,
                user_address: document.getElementById('address').value,
                user_city: document.getElementById('city').value,
                user_state: document.getElementById('state').value,
                user_zip: document.getElementById('zip').value,
                user_email: document.getElementById('email').value,
                collage_code: rsidCode,  // Use the RSID code stored in localStorage
            };

            const btn = document.querySelector("input[type='submit']");
            btn.value = 'Sending...';

            // Send email via EmailJS
            emailjs.send(serviceID, templateID, emailParams)
                .then(() => {
                    btn.value = 'Send Email';
                    console.log('Email sent successfully.');
                    alert('Order placed! You will receive an email shortly.');
                    checkoutForm.submit();  // Proceed with form submission after email is sent
                }, (err) => {
                    btn.value = 'Send Email';
                    console.error('Failed to send email:', err);
                    alert('Failed to place order. Please try again.');
                });
        });
    }

    // PayPal and Test Order Button Handlers
    const paypalButton = document.getElementById('paypalButton');
    const testButton = document.getElementById('testButton');

    if (paypalButton) {
        paypalButton.addEventListener('click', function() {
            console.log('PayPal button clicked.');
            checkoutForm.submit();  // Simulate form submission to send the email
            window.location.href = 'https://www.paypal.com/ncp/payment/F2AG3LYLVNGYL';  // Replace with your actual PayPal link
        });
    }

    if (testButton) {
        testButton.addEventListener('click', function() {
            console.log('Test button clicked.');
            checkoutForm.submit();  // Simulate form submission to send the email
            alert('Test order processed. No payment was made.');
        });
    }

    // Handle custom photo uploads
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSdM8t-2nnSDtBTVBPyjqp74fivXbbgjxYy_aUO6C5BwB9EzXw/viewform', '_blank');
            document.getElementById('uploadMessage').textContent = 'Thank you for submitting your photos! We will add them shortly.';
        });
    }

    // Clear RSID code from local storage if the user wants to reset their collage
    const clearRSIDButton = document.getElementById('clearRSID');
    if (clearRSIDButton) {
        clearRSIDButton.addEventListener('click', function() {
            localStorage.removeItem('rsidCode');
            if (collageCodeInput) {
                collageCodeInput.value = '';
            }
            alert('RSID cleared. Your collage has been reset.');
        });
    }
});
