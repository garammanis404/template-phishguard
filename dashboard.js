// Backend API URL
const API_URL = 'http://localhost:5000/api';

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference// API Configuration
const API_URL = 'http://localhost:5000/api';

// Theme Management
const html = document.documentElement;
const theme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', theme);
document.querySelector('.sun').style.display = theme === 'light' ? 'block' : 'none';
document.querySelector('.moon').style.display = theme === 'dark' ? 'block' : 'none';

document.getElementById('themeToggle').addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('.sun').style.display = newTheme === 'light' ? 'block' : 'none';
    document.querySelector('.moon').style.display = newTheme === 'dark' ? 'block' : 'none';
});

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.dataset.page;
        
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(page + 'Page').classList.add('active');
        
        const titles = {
            overview: 'Dashboard',
            templates: 'Cari Link Template',
            monitoring: 'Monitoring Realtime',
            education: 'Materi Edukasi',
            analytics: 'Analisis Aktivitas'
        };
        document.getElementById('pageTitle').textContent = titles[page];
        
        if (page === 'monitoring') {
            updateMonitoringPage();
        }
    });
});

// Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        const sections = document.querySelectorAll('.template-section');
        
        sections.forEach(section => {
            if (category === 'all' || section.dataset.category === category) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// Toggle Section
function toggleSection(header) {
    const grid = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    if (grid.style.display === 'none' || !grid.style.display) {
        grid.style.display = 'grid';
        icon.classList.add('open');
    } else {
        grid.style.display = 'none';
        icon.classList.remove('open');
    }
}

// Search Template
document.getElementById('searchTemplate')?.addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.template-card');
    
    cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        
        if (name.includes(search) || category.includes(search)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Activate Link
async function activateLink(btn) {
    const card = btn.closest('.template-card');
    const url = card.dataset.url;
    const name = card.dataset.name;
    const category = card.dataset.category;
    
    try {
        // Send to backend
        const response = await fetch(`${API_URL}/activate-link`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                name: name,
                category: category
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Copy to clipboard
            await navigator.clipboard.writeText(url);
            showToast('✅ Link diaktifkan & disalin!');
            updateMonitoringPage();
            updateStats();
        } else {
            showToast('⚠️ ' + data.message);
        }
    } catch (error) {
        console.error('Error activating link:', error);
        showToast('❌ Gagal mengaktifkan link');
    }
}

// Update Monitoring Page
async function updateMonitoringPage() {
    try {
        const response = await fetch(`${API_URL}/active-links`);
        const data = await response.json();
        
        const container = document.getElementById('monitoringLinks');
        
        if (data.links.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📭</div>
                    <h3>Belum Ada Link yang Diaktifkan</h3>
                    <p style="margin-top: 0.5rem;">Klik "Aktifkan & Salin Link" di halaman Template untuk memulai monitoring</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = data.links.map(link => `
            <div class="monitoring-card" data-link-id="${link.id}">
                <div class="monitoring-header">
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                            <h3 style="margin: 0;">${link.name}</h3>
                            <span class="status-badge ${link.status === 'active' ? 'status-active' : 'status-inactive'}">
                                ${link.status === 'active' ? '🟢 Aktif' : '🔴 Non-aktif'}
                            </span>
                            <span class="badge badge-${link.category}">
                                ${link.category.toUpperCase()}
                            </span>
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); word-break: break-all;">
                            ${link.url}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">
                            Diaktifkan: ${new Date(link.activated_at).toLocaleString('id-ID')}
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn-sm btn-view" onclick="viewLinkDetails(${link.id})">👁️ Detail</button>
                        <button class="btn-sm btn-delete" onclick="deleteLink(${link.id})">🗑️ Hapus</button>
                    </div>
                </div>
                
                <div class="monitoring-stats">
                    <div class="monitoring-stat-item">
                        <div class="monitoring-stat-value">${link.views}</div>
                        <div class="monitoring-stat-label">👁️ Dilihat</div>
                    </div>
                    <div class="monitoring-stat-item">
                        <div class="monitoring-stat-value">${link.clicks}</div>
                        <div class="monitoring-stat-label">👆 Diklik</div>
                    </div>
                    <div class="monitoring-stat-item">
                        <div class="monitoring-stat-value">${link.submits}</div>
                        <div class="monitoring-stat-label">⚠️ Data Disubmit</div>
                    </div>
                    <div class="monitoring-stat-item">
                        <div class="monitoring-stat-value">${link.clicks > 0 ? Math.round((link.submits / link.clicks) * 100) : 0}%</div>
                        <div class="monitoring-stat-label">📊 Conversion Rate</div>
                    </div>
                </div>

                <div style="margin-top: 1rem;">
                    <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem;">Aktivitas Terbaru:</h4>
                    <div class="activity-log">
                        ${getRecentActivities(link.id)}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error updating monitoring:', error);
    }
}

// Get Recent Activities
async function getRecentActivities(linkId) {
    try {
        const response = await fetch(`${API_URL}/activities/${linkId}`);
        const data = await response.json();
        
        if (data.activities.length === 0) {
            return '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">Belum ada aktivitas</p>';
        }
        
        return data.activities.slice(0, 5).map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.activity_type}">
                    ${activity.activity_type === 'view' ? '👁️' : activity.activity_type === 'click' ? '👆' : '⚠️'}
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600;">${getActivityText(activity.activity_type)}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        ${new Date(activity.timestamp).toLocaleString('id-ID')}
                        ${activity.data ? ` • ${activity.data}` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        return '<p style="text-align: center; color: var(--text-secondary); padding: 1rem;">Gagal memuat aktivitas</p>';
    }
}

function getActivityText(type) {
    const texts = {
        'view': 'Halaman dilihat',
        'click': 'Tombol/Link diklik',
        'submit': 'Data form disubmit'
    };
    return texts[type] || 'Aktivitas';
}

// View Link Details
async function viewLinkDetails(linkId) {
    try {
        const response = await fetch(`${API_URL}/link-details/${linkId}`);
        const data = await response.json();
        const link = data.link;
        
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Detail Monitoring: ${link.name}</h2>
                    <button class="btn-close" onclick="this.closest('.modal').remove()">✕</button>
                </div>
                
                <div class="card" style="margin-bottom: 1rem;">
                    <h3>Informasi Link</h3>
                    <table class="data-table">
                        <tr>
                            <th>URL</th>
                            <td>${link.url}</td>
                        </tr>
                        <tr>
                            <th>Kategori</th>
                            <td>${link.category.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td><span class="status-badge ${link.status === 'active' ? 'status-active' : 'status-inactive'}">${link.status === 'active' ? '🟢 Aktif' : '🔴 Non-aktif'}</span></td>
                        </tr>
                        <tr>
                            <th>Diaktifkan</th>
                            <td>${new Date(link.activated_at).toLocaleString('id-ID')}</td>
                        </tr>
                    </table>
                </div>

                <div class="card" style="margin-bottom: 1rem;">
                    <h3>Statistik</h3>
                    <div class="monitoring-stats">
                        <div class="monitoring-stat-item">
                            <div class="monitoring-stat-value">${link.views}</div>
                            <div class="monitoring-stat-label">👁️ Total Views</div>
                        </div>
                        <div class="monitoring-stat-item">
                            <div class="monitoring-stat-value">${link.clicks}</div>
                            <div class="monitoring-stat-label">👆 Total Clicks</div>
                        </div>
                        <div class="monitoring-stat-item">
                            <div class="monitoring-stat-value">${link.submits}</div>
                            <div class="monitoring-stat-label">⚠️ Data Submits</div>
                        </div>
                        <div class="monitoring-stat-item">
                            <div class="monitoring-stat-value">${link.clicks > 0 ? Math.round((link.submits / link.clicks) * 100) : 0}%</div>
                            <div class="monitoring-stat-label">📊 Conversion Rate</div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3>Riwayat Aktivitas Lengkap</h3>
                    <div class="activity-log" style="max-height: 400px;">
                        ${await getAllActivities(linkId)}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    } catch (error) {
        console.error('Error viewing details:', error);
        showToast('❌ Gagal memuat detail');
    }
}

async function getAllActivities(linkId) {
    try {
        const response = await fetch(`${API_URL}/activities/${linkId}`);
        const data = await response.json();
        
        if (data.activities.length === 0) {
            return '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Belum ada aktivitas</p>';
        }
        
        return data.activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.activity_type}">
                    ${activity.activity_type === 'view' ? '👁️' : activity.activity_type === 'click' ? '👆' : '⚠️'}
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 600;">${getActivityText(activity.activity_type)}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        ${new Date(activity.timestamp).toLocaleString('id-ID', { 
                            dateStyle: 'full', 
                            timeStyle: 'medium' 
                        })}
                    </div>
                    ${activity.data ? `<div style="margin-top: 0.5rem; padding: 0.5rem; background: var(--bg-secondary); border-radius: 6px; font-size: 0.85rem;"><strong>Data:</strong> ${activity.data}</div>` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        return '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">Gagal memuat aktivitas</p>';
    }
}

// Delete Link
async function deleteLink(linkId) {
    if (!confirm('Apakah Anda yakin ingin menghapus link monitoring ini? Data aktivitas akan hilang.')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/delete-link/${linkId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('✅ Link berhasil dihapus');
            updateMonitoringPage();
            updateStats();
        } else {
            showToast('❌ Gagal menghapus link');
        }
    } catch (error) {
        console.error('Error deleting link:', error);
        showToast('❌ Gagal menghapus link');
    }
}

// Update Stats
async function updateStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const data = await response.json();
        
        document.getElementById('totalLinks').textContent = data.total_links;
        document.getElementById('totalVisitors').textContent = data.total_views;
        document.getElementById('visitorsChange').textContent = `+${data.today_views} hari ini`;
        document.getElementById('totalVictims').textContent = data.total_submits;
        document.getElementById('victimsRate').textContent = data.total_views > 0 
            ? `${Math.round((data.total_submits / data.total_views) * 100)}% dari total` 
            : '0% dari total';
        document.getElementById('awarenessRate').textContent = data.total_views > 0 
            ? `${100 - Math.round((data.total_submits / data.total_views) * 100)}%` 
            : '100%';
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

// Update Activity Timeline
async function updateActivityTimeline() {
    try {
        const response = await fetch(`${API_URL}/recent-activities`);
        const data = await response.json();
        
        const timeline = document.getElementById('activityTimeline');
        
        if (data.activities.length === 0) {
            timeline.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);"><p>Menunggu aktivitas...</p></div>';
            return;
        }
        
        timeline.innerHTML = data.activities.slice(0, 10).map(a => {
            const time = getTimeAgo(new Date(a.timestamp).getTime());
            return `
                <div class="timeline-item">
                    <div class="timeline-dot blue"></div>
                    <div>
                        <div style="font-weight: 600;">${getActivityText(a.activity_type)}: ${a.link_name}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.3rem;">
                            <span>🔗 ${a.activity_type}</span>
                            <span style="margin-left: 1rem;">⏱️ ${time}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error updating timeline:', error);
    }
}

function getTimeAgo(timestamp) {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `${diff} detik lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return `${Math.floor(diff / 86400)} hari lalu`;
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Filter Monitoring
document.getElementById('filterStatus')?.addEventListener('change', async (e) => {
    const filter = e.target.value;
    await updateMonitoringPage();
    
    const cards = document.querySelectorAll('.monitoring-card');
    cards.forEach(card => {
        const linkId = parseInt(card.dataset.linkId);
        // Filter will be applied based on status from backend
    });
});

// Back Button
document.getElementById('backBtn').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin kembali?')) {
        window.location.href = 'index.html';
    }
});

// Initialize
updateActivityTimeline();
updateStats();
updateMonitoringPage();

// Auto-refresh every 10 seconds
setInterval(() => {
    updateActivityTimeline();
    updateStats();
    if (document.querySelector('#monitoringPage.active')) {
        updateMonitoringPage();
    }
}, 10000);
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
