// Backend API URL
const API_URL = 'http://localhost:5000/api';

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Tab Switching
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// Password Toggle
const toggleButtons = document.querySelectorAll('.toggle-password-btn');

toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('.icon-eye');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.textContent = '🙈';
        } else {
            input.type = 'password';
            icon.textContent = '👁️';
        }
    });
});

// Form Validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password.length >= 8;
};

const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    input.style.borderColor = 'var(--error-color)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'var(--error-color)';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
};

const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    input.style.borderColor = 'var(--border-color)';
};

// Login Form Submit with Backend Integration
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    let isValid = true;
    
    // Clear previous errors
    clearError(email);
    clearError(password);
    
    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Email tidak valid');
        isValid = false;
    }
    
    // Validate password
    if (password.value.trim() === '') {
        showError(password, 'Password tidak boleh kosong');
        isValid = false;
    }
    
    if (isValid) {
        showLoading();
        
        try {
            // Call Backend API
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            });
            
            const data = await response.json();
            
            hideLoading();
            
            if (response.ok) {
                // Login berhasil
                showSuccessModal('Login berhasil! Mengalihkan ke dashboard...');
                
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                localStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                // Login gagal
                showError(password, data.message || 'Login gagal!');
            }
        } catch (error) {
            hideLoading();
            console.error('Login error:', error);
            showError(password, 'Tidak dapat terhubung ke server. Pastikan backend berjalan!');
        }
    }
});

// Register Form Submit with Backend Integration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    let isValid = true;
    
    // Clear previous errors
    [name, email, password, confirmPassword].forEach(clearError);
    
    // Validate name
    if (name.value.trim().length < 3) {
        showError(name, 'Nama minimal 3 karakter');
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email.value)) {
        showError(email, 'Email tidak valid');
        isValid = false;
    }
    
    // Validate password
    if (!validatePassword(password.value)) {
        showError(password, 'Password minimal 8 karakter');
        isValid = false;
    }
    
    // Validate confirm password
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Password tidak cocok');
        isValid = false;
    }
    
    // Validate terms
    if (!agreeTerms.checked) {
        alert('Anda harus menyetujui Syarat & Ketentuan');
        isValid = false;
    }
    
    if (isValid) {
        showLoading();
        
        try {
            // Call Backend API
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value
                })
            });
            
            const data = await response.json();
            
            hideLoading();
            
            if (response.ok) {
                // Register berhasil
                showSuccessModal('Pendaftaran berhasil! Mengalihkan ke dashboard...');
                
                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                localStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                // Register gagal
                if (data.message.includes('email')) {
                    showError(email, data.message);
                } else {
                    showError(password, data.message || 'Pendaftaran gagal!');
                }
            }
        } catch (error) {
            hideLoading();
            console.error('Register error:', error);
            showError(password, 'Tidak dapat terhubung ke server. Pastikan backend berjalan!');
        }
    }
});

// Loading Functions
const showLoading = () => {
    document.getElementById('loadingOverlay').classList.remove('hidden');
};

const hideLoading = () => {
    document.getElementById('loadingOverlay').classList.add('hidden');
};

// Success Modal Functions
const showSuccessModal = (message) => {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('modalMessage');
    
    messageElement.textContent = message;
    modal.classList.remove('hidden');
};

// Forgot Password Modal Functions
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeForgotModal = document.getElementById('closeForgotModal');
const btnOkForgot = document.getElementById('btnOkForgot');

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordModal.classList.remove('hidden');
});

closeForgotModal.addEventListener('click', () => {
    forgotPasswordModal.classList.add('hidden');
});

btnOkForgot.addEventListener('click', () => {
    forgotPasswordModal.classList.add('hidden');
});

// Close modal when clicking outside
forgotPasswordModal.addEventListener('click', (e) => {
    if (e.target === forgotPasswordModal) {
        forgotPasswordModal.classList.add('hidden');
    }
});

// Input Focus Effects
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.style.transform = 'scale(1.02)';
            formGroup.style.transition = 'transform 0.2s ease';
        }
    });
    
    input.addEventListener('blur', () => {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.style.transform = 'scale(1)';
        }
    });
});

// Ripple Effect for Buttons
const buttons = document.querySelectorAll('button, .btn-submit');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Check if already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    const goToDashboard = confirm('Anda sudah login. Ingin ke dashboard?');
    if (goToDashboard) {
        window.location.href = 'dashboard.html';
    }
}

console.log('🔐 PhishGuard Login - Ready!');
console.log('🔗 Backend API:', API_URL);
