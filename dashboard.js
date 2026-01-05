// API Configuration
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
