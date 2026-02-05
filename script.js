// EmailJS Configuration
// Note: You need to update these credentials with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS Public Key

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Get form elements
const form = document.getElementById('banquetForm');
const successMessage = document.getElementById('successMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// Form submission event
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous messages
    hideErrorMessage();
    hideSuccessMessage();

    // Validate form
    if (!validateForm()) {
        return;
    }

    // Show loading spinner
    showLoadingSpinner();

    // Collect form data
    const formData = collectFormData();

    try {
        // Send email via EmailJS
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData
        );

        // Hide loading spinner
        hideLoadingSpinner();

        // Show success message
        showSuccessMessage();

        // Clear form
        form.reset();

        // Scroll to success message
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

    } catch (error) {
        console.error('Error sending email:', error);
        hideLoadingSpinner();
        showErrorMessage('Failed to send inquiry. Please try again later.');
    }
});

/**
 * Validate form fields
 */
function validateForm() {
    const form = document.getElementById('banquetForm');
    const formElements = form.elements;
    let isValid = true;

    // Reset error states
    document.querySelectorAll('.form-group, .radio-group, .checkbox-group').forEach(group => {
        group.classList.remove('error');
        const errorSpan = group.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    });

    // Validate client name
    const clientName = document.getElementById('clientName').value.trim();
    if (!clientName) {
        showFieldError('clientName', 'Please enter your full name');
        isValid = false;
    }

    // Validate email
    const clientEmail = document.getElementById('clientEmail').value.trim();
    if (!clientEmail) {
        showFieldError('clientEmail', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(clientEmail)) {
        showFieldError('clientEmail', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    const clientPhone = document.getElementById('clientPhone').value.trim();
    if (!clientPhone) {
        showFieldError('clientPhone', 'Please enter your phone number');
        isValid = false;
    } else if (!isValidPhone(clientPhone)) {
        showFieldError('clientPhone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate event type
    const eventType = document.getElementById('eventType').value;
    if (!eventType) {
        showFieldError('eventType', 'Please select an event type');
        isValid = false;
    }

    // Validate event date
    const eventDate = document.getElementById('eventDate').value;
    if (!eventDate) {
        showFieldError('eventDate', 'Please select an event date');
        isValid = false;
    } else if (!isValidDate(eventDate)) {
        showFieldError('eventDate', 'Event date must be in the future');
        isValid = false;
    }

    // Validate guest count
    const guestCount = document.getElementById('guestCount').value;
    if (!guestCount) {
        showFieldError('guestCount', 'Please enter the number of guests');
        isValid = false;
    } else if (guestCount < 1) {
        showFieldError('guestCount', 'Guest count must be at least 1');
        isValid = false;
    }

    // Validate venue type
    const venueType = document.querySelector('input[name="venueType"]:checked');
    if (!venueType) {
        const radioGroup = document.querySelector('.radio-group');
        if (radioGroup) {
            radioGroup.parentElement.classList.add('error');
            const errorSpan = radioGroup.parentElement.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = 'Please select a venue type';
            }
        }
        isValid = false;
    }

    // Validate services (at least one should be selected)
    const services = document.querySelectorAll('input[name="services"]:checked');
    if (services.length === 0) {
        const checkboxGroup = document.querySelector('.checkbox-group');
        if (checkboxGroup) {
            checkboxGroup.parentElement.classList.add('error');
            const errorSpan = checkboxGroup.parentElement.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = 'Please select at least one service';
            }
        }
        isValid = false;
    }

    // Validate budget
    const budget = document.getElementById('budget').value;
    if (!budget) {
        showFieldError('budget', 'Please select a budget range');
        isValid = false;
    }

    return isValid;
}

/**
 * Show error message for a specific field
 */
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        const formGroup = field.closest('.form-group, .radio-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorSpan = formGroup.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = message;
            }
        } else {
            const parentFieldset = field.closest('fieldset');
            if (parentFieldset) {
                parentFieldset.classList.add('error');
                const errorSpan = parentFieldset.querySelector('.error-message');
                if (errorSpan) {
                    errorSpan.textContent = message;
                }
            }
        }
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s+\-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate event date (must be in future)
 */
function isValidDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

/**
 * Collect form data for email
 */
function collectFormData() {
    // Collect selected services
    const services = Array.from(document.querySelectorAll('input[name="services"]:checked'))
        .map(checkbox => checkbox.value)
        .join(', ');

    return {
        to_email: 'shubhamyedage101@gmail.com',
        client_name: document.getElementById('clientName').value.trim(),
        client_email: document.getElementById('clientEmail').value.trim(),
        client_phone: document.getElementById('clientPhone').value.trim(),
        event_type: document.getElementById('eventType').value,
        event_date: document.getElementById('eventDate').value,
        guest_count: document.getElementById('guestCount').value,
        venue_type: document.querySelector('input[name="venueType"]:checked').value,
        services: services,
        budget: document.getElementById('budget').value,
        special_requests: document.getElementById('specialRequests').value.trim()
    };
}

/**
 * Show loading spinner
 */
function showLoadingSpinner() {
    loadingSpinner.style.display = 'flex';
}

/**
 * Hide loading spinner
 */
function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
}

/**
 * Show success message
 */
function showSuccessMessage() {
    successMessage.style.display = 'flex';
}

/**
 * Hide success message
 */
function hideSuccessMessage() {
    successMessage.style.display = 'none';
}

/**
 * Close success message
 */
function closeSuccessMessage() {
    hideSuccessMessage();
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Hide error message
 */
function closeErrorMessage() {
    errorMessage.style.display = 'none';
}

/**
 * Real-time validation for input fields
 */
document.getElementById('clientName').addEventListener('blur', function() {
    if (!this.value.trim()) {
        showFieldError('clientName', 'Please enter your full name');
    } else {
        clearFieldError('clientName');
    }
});

document.getElementById('clientEmail').addEventListener('blur', function() {
    if (!this.value.trim()) {
        showFieldError('clientEmail', 'Please enter your email address');
    } else if (!isValidEmail(this.value.trim())) {
        showFieldError('clientEmail', 'Please enter a valid email address');
    } else {
        clearFieldError('clientEmail');
    }
});

document.getElementById('clientPhone').addEventListener('blur', function() {
    if (!this.value.trim()) {
        showFieldError('clientPhone', 'Please enter your phone number');
    } else if (!isValidPhone(this.value.trim())) {
        showFieldError('clientPhone', 'Please enter a valid phone number');
    } else {
        clearFieldError('clientPhone');
    }
});

document.getElementById('eventDate').addEventListener('blur', function() {
    if (!this.value) {
        showFieldError('eventDate', 'Please select an event date');
    } else if (!isValidDate(this.value)) {
        showFieldError('eventDate', 'Event date must be in the future');
    } else {
        clearFieldError('eventDate');
    }
});

document.getElementById('guestCount').addEventListener('blur', function() {
    if (!this.value) {
        showFieldError('guestCount', 'Please enter the number of guests');
    } else if (this.value < 1) {
        showFieldError('guestCount', 'Guest count must be at least 1');
    } else {
        clearFieldError('guestCount');
    }
});

/**
 * Clear error for a field
 */
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        const formGroup = field.closest('.form-group, .radio-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const errorSpan = formGroup.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = '';
            }
        }
    }
}
