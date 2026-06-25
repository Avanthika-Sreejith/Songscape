document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    // Inputs
    const inputName = document.getElementById('form-name');
    const inputEmail = document.getElementById('form-email');
    const inputPhone = document.getElementById('form-phone');
    const inputMessage = document.getElementById('form-message');
    
    // Groups (for error classes)
    const groupName = document.getElementById('group-name');
    const groupEmail = document.getElementById('group-email');
    const groupPhone = document.getElementById('group-phone');
    const groupMessage = document.getElementById('group-message');

    // Error messages text divs
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorPhone = document.getElementById('error-phone');
    const errorMessage = document.getElementById('error-message');

    // Word counter display
    const counterDisplay = document.getElementById('word-counter-display');

    // 1. Phone Input Numeric-Only Filter
    // Enforce only digits during input
    inputPhone.addEventListener('input', (e) => {
        // Remove non-digit characters
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // 2. Real-Time Word Counter
    inputMessage.addEventListener('input', () => {
        const text = inputMessage.value;
        const wordCount = countWords(text);
        
        counterDisplay.textContent = `${wordCount} / 200 words`;
        
        // Visual warnings near or exceeding limit
        if (wordCount > 200) {
            counterDisplay.className = 'word-counter limit-exceeded';
            errorMessage.textContent = 'Message exceeds the 200-word limit.';
            groupMessage.classList.add('error');
        } else if (wordCount > 180) {
            counterDisplay.className = 'word-counter limit-near';
            groupMessage.classList.remove('error');
        } else {
            counterDisplay.className = 'word-counter';
            groupMessage.classList.remove('error');
        }
    });

    // Word Counting Helper
    function countWords(str) {
        if (!str.trim()) return 0;
        return str.trim().split(/\s+/).filter(Boolean).length;
    }

    // 3. Validation Logic
    function validateForm() {
        let isValid = true;

        // --- Validate Name ---
        const nameVal = inputName.value.trim();
        if (!nameVal) {
            groupName.classList.add('error');
            errorName.textContent = 'Name is required.';
            isValid = false;
        } else {
            groupName.classList.remove('error');
        }

        // --- Validate Email ---
        const emailVal = inputEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailVal) {
            groupEmail.classList.add('error');
            errorEmail.textContent = 'Email address is required.';
            isValid = false;
        } else if (!emailRegex.test(emailVal)) {
            groupEmail.classList.add('error');
            errorEmail.textContent = 'Please enter a valid email address (e.g. name@domain.com).';
            isValid = false;
        } else {
            groupEmail.classList.remove('error');
        }

        // --- Validate Phone Number ---
        const phoneVal = inputPhone.value.trim();
        const phoneRegex = /^\d{10}$/; // exactly 10 digits
        
        if (!phoneVal) {
            groupPhone.classList.add('error');
            errorPhone.textContent = 'Phone number is required.';
            isValid = false;
        } else if (phoneVal.length !== 10) {
            groupPhone.classList.add('error');
            errorPhone.textContent = 'Phone number must be exactly 10 digits.';
            isValid = false;
        } else if (!phoneRegex.test(phoneVal)) {
            groupPhone.classList.add('error');
            errorPhone.textContent = 'Phone number must contain numeric values only.';
            isValid = false;
        } else {
            groupPhone.classList.remove('error');
        }

        // --- Validate Message ---
        const messageVal = inputMessage.value.trim();
        const wordCount = countWords(messageVal);

        if (!messageVal) {
            groupMessage.classList.add('error');
            errorMessage.textContent = 'Message is required.';
            errorMessage.style.display = 'block';
            isValid = false;
        } else if (wordCount > 200) {
            groupMessage.classList.add('error');
            errorMessage.textContent = 'Message cannot exceed 200 words.';
            errorMessage.style.display = 'block';
            isValid = false;
        } else {
            groupMessage.classList.remove('error');
            errorMessage.style.display = 'none';
        }

        return isValid;
    }

    // 4. Form Submit handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default browser reload
            
            // Perform Validations
            const formValid = validateForm();

            if (formValid) {
                // Success actions
                window.showToast("Message sent successfully! Thank you for reaching out.", "success");
                
                // Print data in console (for mockup/testing validation accuracy)
                console.log("Songscape Contact Form Submission Success:", {
                    name: inputName.value.trim(),
                    email: inputEmail.value.trim(),
                    phone: inputPhone.value.trim(),
                    message: inputMessage.value.trim()
                });
                
                // Clear the form fields
                contactForm.reset();
                
                // Reset word counter display
                counterDisplay.textContent = '0 / 200 words';
                counterDisplay.className = 'word-counter';
            } else {
                // Failure action
                window.showToast("Form validation failed. Please check the highlighted inputs.", "error");
            }
        });
    }
});
