\document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const billingToggle = document.getElementById('billingToggle');
    const priceElements = document.querySelectorAll('.price-text');
    const labelMonthly = document.getElementById('labelMonthly');
    const labelYearly = document.getElementById('labelYearly');

    billingToggle.addEventListener('change', function() {
        if (this.checked) {
            labelMonthly.classList.replace('text-info', 'text-light-gray');
            labelMonthly.classList.remove('fw-bold');
            labelYearly.classList.replace('text-light-gray', 'text-info');
            labelYearly.classList.add('fw-bold');

            priceElements.forEach(el => {
                const yearlyPrice = el.getAttribute('data-yearly');
                el.innerHTML = `${yearlyPrice} <span class="fs-6 ${el.classList.contains('text-white') && !el.closest('.diamond-card') ? 'text-light-gray' : 'text-white-50'} fw-normal period">/mo*</span>`;
            });
        } else {
            labelYearly.classList.replace('text-info', 'text-light-gray');
            labelYearly.classList.remove('fw-bold');
            labelMonthly.classList.replace('text-light-gray', 'text-info');
            labelMonthly.classList.add('fw-bold');

            priceElements.forEach(el => {
                const monthlyPrice = el.getAttribute('data-monthly');
                el.innerHTML = `${monthlyPrice} <span class="fs-6 ${el.classList.contains('text-white') && !el.closest('.diamond-card') ? 'text-light-gray' : 'text-white-50'} fw-normal period">/mo</span>`;
            });
        }
    });

    const contactForm = document.getElementById('contactForm');
    const formAlerts = document.getElementById('formAlerts');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        formAlerts.innerHTML = '';

        if (name === '' || email === '' || message === '') {
            showFormAlert('All fields are required. Please fill out the entire form.', 'danger');
            return;
        }

        if (!email.includes('@')) {
            showFormAlert('Invalid email format. Please include an "@" in the email address.', 'warning');
            return;
        }

        showFormAlert('Message sent successfully! We will get back to you soon.', 'success');
        contactForm.reset();
    });

    function showFormAlert(message, type) {
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${type === 'success' ? 'Success!' : 'Error!'}</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        formAlerts.innerHTML = alertHTML;
    }
});