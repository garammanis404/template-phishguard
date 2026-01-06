// Data Materi Edukasi - Total 16 Materi (12 asli + 4 baru)
const educationMaterials = [
    {
        id: 1,
        title: "Email Phishing",
        icon: "📧",
        category: "email",
        description: "Teknik phishing melalui email yang menyerupai organisasi resmi",
        tags: ["Email", "Umum", "Bisnis"],
        level: "Pemula",
        content: {
            pengertian: "Email phishing adalah teknik penipuan dimana penyerang mengirim email yang tampak sah dari organisasi terpercaya untuk mencuri informasi sensitif seperti kata sandi, nomor kartu kredit, atau data pribadi lainnya.",
            caraKerja: "1. Penyerang membuat email yang menyerupai organisasi terpercaya<br>2. Email berisi link atau lampiran berbahaya<br>3. Korban diminta mengklik link atau membuka lampiran<br>4. Korban diarahkan ke website palsu untuk memasukkan data sensitif",
            contoh: "• Email dari 'bank' yang meminta verifikasi akun<br>• Notifikasi 'paket tertahan' dari layanan kurir<br>• Email 'hadiah undian' yang mengharuskan mengisi data",
            antisipasi: "• Periksa alamat pengirim dengan teliti<br>• Jangan klik link dalam email yang mencurigakan<br>• Verifikasi melalui saluran resmi perusahaan<br>• Gunakan autentikasi dua faktor"
        }
    },
    {
        id: 2,
        title: "Spear Phishing",
        icon: "🎯",
        category: "spear",
        description: "Phishing yang ditargetkan ke individu atau organisasi tertentu",
        tags: ["Targeted", "Advanced", "Bisnis"],
        level: "Menengah",
        content: {
            pengertian: "Spear phishing adalah serangan phishing yang sangat ditargetkan terhadap individu, organisasi, atau bisnis tertentu. Penyerang melakukan riset mendalam tentang target sebelum melakukan serangan.",
            caraKerja: "1. Penyerang mengumpulkan informasi tentang target<br>2. Membuat email yang sangat personal dan relevan<br>3. Menggunakan nama dan informasi yang akrab<br>4. Meminta tindakan segera dengan ancaman atau iming-iming",
            contoh: "• Email ke karyawan HR dengan lampiran 'CV pelamar'<br>• Pesan ke manajer keuangan tentang 'invoice mendesak'<br>• Email ke IT tentang 'perbaikan sistem segera'",
            antisipasi: "• Pelatihan kesadaran keamanan karyawan<br>• Verifikasi permintaan tak biasa melalui telepon<br>• Implementasi email filtering tingkat lanjut<br>• Monitor aktivitas email mencurigakan"
        }
    },
    {
        id: 3,
        title: "Whale Phishing",
        icon: "🐋",
        category: "whale",
        description: "Serangan phishing yang menargetkan eksekutif tingkat tinggi",
        tags: ["Eksekutif", "High-Value", "Korporat"],
        level: "Lanjutan",
        content: {
            pengertian: "Whale phishing (whaling) adalah serangan phishing yang secara khusus menargetkan eksekutif tingkat tinggi, CEO, atau individu dengan akses ke informasi sensitif dan sistem penting.",
            caraKerja: "1. Identifikasi target bernilai tinggi<br>2. Riset mendalam tentang target dan organisasi<br>3. Pembuatan komunikasi yang sangat persuasif<br>4. Permintaan transfer dana atau akses sistem",
            contoh: "• Email dari 'CEO' ke keuangan minta transfer mendesak<br>• Panggilan 'auditor internal' minta akses data<br>• Notifikasi 'pengambilalihan bisnis' palsu",
            antisipasi: "• Prosedur verifikasi untuk transfer besar<br>• Pelatihan khusus untuk eksekutif<br>• Monitoring komunikasi eksternal<br>• Sistem approval multi-level"
        }
    },
    {
        id: 4,
        title: "Smishing",
        icon: "📱",
        category: "smishing",
        description: "Phishing melalui SMS atau pesan instan",
        tags: ["SMS", "Mobile", "WhatsApp"],
        level: "Pemula",
        content: {
            pengertian: "Smishing (SMS phishing) adalah teknik phishing yang menggunakan pesan teks SMS atau aplikasi pesan instan untuk menipu korban memberikan informasi sensitif atau mengklik link berbahaya.",
            caraKerja: "1. Pengiriman SMS dengan link atau nomor telepon<br>2. Pesan berisi urgensi atau iming-iming hadiah<br>3. Korban diminta mengklik link atau menelepon<br>4. Data dicuri melalui website atau percakapan telepon",
            contoh: "• SMS 'paket Anda tertahan, klik link untuk lacak'<br>• Pesan 'akun bank terblokir, hubungi nomor ini'<br>• Notifikasi 'menang undian, isi data untuk klaim'",
            antisipasi: "• Jangan balas SMS dari nomor tak dikenal<br>• Verifikasi melalui aplikasi resmi perusahaan<br>• Aktifkan filter spam di ponsel<br>• Laporkan SMS mencurigakan ke operator"
        }
    },
    {
        id: 5,
        title: "Vishing",
        icon: "📞",
        category: "vishing",
        description: "Phishing melalui panggilan telepon atau voice message",
        tags: ["Telepon", "Voice", "Call Center"],
        level: "Menengah",
        content: {
            pengertian: "Vishing (voice phishing) adalah teknik phishing yang menggunakan panggilan telepon atau pesan suara untuk menipu korban memberikan informasi sensitif atau melakukan tindakan tertentu.",
            caraKerja: "1. Penyerang menelepon korban berpura-pura sebagai pihak resmi<br>2. Menggunakan teknik sosial engineering<br>3. Membuat urgensi atau ancaman<br>4. Meminta informasi atau tindakan segera",
            contoh: "• Panggilan dari 'bank' tentang transaksi mencurigakan<br>• Panggilan 'dukungan teknis' Microsoft palsu<br>• Pesan suara tentang 'hutang kartu kredit'",
            antisipasi: "• Jangan berikan informasi via telepon<br>• Tanyakan detail dan verifikasi kembali<br>• Catat nomor dan laporkan ke pihak berwenang<br>• Gunakan layanan call screening"
        }
    },
    {
        id: 6,
        title: "Clone Phishing",
        icon: "🧬",
        category: "clone",
        description: "Duplikasi email atau website sah yang dimodifikasi",
        tags: ["Duplikasi", "Advanced", "Website"],
        level: "Lanjutan",
        content: {
            pengertian: "Clone phishing adalah teknik dimana penyerang membuat replika sempurna dari email atau website sah, kemudian memodifikasinya dengan konten berbahaya dan mengirimkannya ke korban.",
            caraKerja: "1. Penyerang mendapatkan email atau website sah<br>2. Menduplikasi seluruh konten<br>3. Memodifikasi dengan link atau lampiran berbahaya<br>4. Mengirim ke korban seolah dari sumber asli",
            contoh: "• Duplikasi email newsletter dengan link palsu<br>• Website login bank yang identik dengan asli<br>• Replika portal pembayaran online",
            antisipasi: "• Periksa URL dengan teliti (HTTPS, domain)<br>• Verifikasi melalui saluran lain<br>• Gunakan bookmark untuk website penting<br>• Perbarui browser secara rutin"
        }
    },
    {
        id: 7,
        title: "Watering Hole Attack",
        icon: "💧",
        category: "watering",
        description: "Menginfeksi website yang sering dikunjungi target",
        tags: ["Website", "Advanced", "Targeted"],
        level: "Lanjutan",
        content: {
            pengertian: "Watering hole attack adalah teknik dimana penyerang mengidentifikasi website yang sering dikunjungi oleh target, kemudian menginfeksi website tersebut dengan malware.",
            caraKerja: "1. Identifikasi website favorit target<br>2. Eksploitasi kerentanan website<br>3. Menyisipkan kode berbahaya<br>4. Menunggu target mengunjungi website",
            contoh: "• Forum komunitas profesional yang terinfeksi<br>• Website asosiasi industri<br>• Portal berita khusus sektor",
            antisipasi: "• Gunakan browser dengan proteksi realtime<br>• Perbarui software dan plugin<br>• Gunakan ad-blocker dan script blocker<br>• Monitor aktivitas jaringan"
        }
    },
    {
        id: 8,
        title: "Search Engine Phishing",
        icon: "🔍",
        category: "search",
        description: "Membuat website palsu yang muncul di hasil pencarian",
        tags: ["SEO", "Google", "Website"],
        level: "Menengah",
        content: {
            pengertian: "Search engine phishing adalah teknik dimana penyerang membuat website palsu yang dioptimasi untuk muncul di hasil pencarian ketika korban mencari layanan tertentu.",
            caraKerja: "1. Membuat website palsu mirip asli<br>2. Melakukan SEO untuk peringkat tinggi<br>3. Menunggu korban mencari dan mengklik<br>4. Mencuri data saat korban berinteraksi",
            contoh: "• Website 'customer service' bank palsu<br>• Situs 'pembelian tiket' gadungan<br>• Halaman 'download software' berisi malware",
            antisipasi: "• Periksa URL di address bar<br>• Cari website resmi melalui bookmark<br>• Waspada website dengan iklan berlebihan<br>• Gunakan mesin pencari terpercaya"
        }
    },
    {
        id: 9,
        title: "Angler Phishing",
        icon: "🎣",
        category: "angler",
        description: "Memanfaatkan media sosial untuk phishing",
        tags: ["Social Media", "Twitter", "Facebook"],
        level: "Menengah",
        content: {
            pengertian: "Angler phishing adalah teknik phishing yang memanfaatkan media sosial, dimana penyerang membuat akun palsu yang menyerupai perusahaan atau layanan resmi.",
            caraKerja: "1. Membuat akun media sosial palsu<br>2. Menanggapi keluhan atau pertanyaan pengguna<br>3. Menawarkan bantuan dengan link berbahaya<br>4. Mencuri data melalui form atau chat",
            contoh: "• Akun Twitter 'dukungan pelanggan' palsu<br>• Halaman Facebook 'promo resmi' gadungan<br>• Komentar di postingan dengan link berbahaya",
            antisipasi: "• Verifikasi akun melalui website resmi<br>• Periksa badge verifikasi<br>• Jangan klik link dari akun mencurigakan<br>• Laporkan akun palsu ke platform"
        }
    },
    {
        id: 10,
        title: "CEO Fraud",
        icon: "👔",
        category: "ceo",
        description: "Penipuan dengan menyamar sebagai pimpinan perusahaan",
        tags: ["BEC", "Business", "Executive"],
        level: "Lanjutan",
        content: {
            pengertian: "CEO fraud atau Business Email Compromise (BEC) adalah penipuan dimana penyerang menyamar sebagai CEO atau eksekutif untuk meminta transfer dana atau data sensitif.",
            caraKerja: "1. Spoofing email CEO atau eksekutif<br>2. Mengirim email ke departemen keuangan<br>3. Meminta transfer dana mendesak<br>4. Menggunakan alasan sensitif (akuisisi, masalah hukum)",
            contoh: "• Email dari 'CEO' minta transfer ke vendor baru<br>• Instruksi 'CFO' untuk pembayaran darurat<br>• Permintaan 'direktur' untuk data karyawan",
            antisipasi: "• Prosedur verifikasi multi-level untuk transfer<br>• Pelatihan spesifik untuk staff keuangan<br>• Implementasi DMARC, SPF, DKIM<br>• Monitoring transaksi tak biasa"
        }
    },
    {
        id: 11,
        title: "Ransomware Phishing",
        icon: "🔐",
        category: "ransomware",
        description: "Phishing yang menginstal ransomware pada sistem",
        tags: ["Ransomware", "Malware", "Kripto"],
        level: "Lanjutan",
        content: {
            pengertian: "Ransomware phishing adalah teknik dimana korban dikirim email berisi lampiran atau link yang menginstal ransomware, yang mengenkripsi data dan meminta tebusan.",
            caraKerja: "1. Email dengan lampiran berbahaya<br>2. Korban membuka lampiran<br>3. Ransomware terinstal dan mengenkripsi data<br>4. Penyerang meminta tebusan untuk dekripsi",
            contoh: "• Email dengan invoice yang terinfeksi<br>• Pesan dengan 'foto' berisi ransomware<br>• Link ke 'dokumen penting' yang berbahaya",
            antisipasi: "• Backup data secara rutin<br>• Jangan buka lampiran tak dikenal<br>• Gunakan antivirus updated<br>• Patch sistem secara berkala"
        }
    },
    {
        id: 12,
        title: "Pencegahan & Proteksi",
        icon: "🛡️",
        category: "prevention",
        description: "Strategi lengkap untuk mencegah serangan phishing",
        tags: ["Prevention", "Security", "Best Practices"],
        level: "Semua Level",
        content: {
            pengertian: "Pencegahan phishing memerlukan pendekatan multi-layered yang mencakup teknologi, proses, dan pelatihan manusia untuk melindungi organisasi dan individu.",
            caraKerja: "1. Implementasi teknologi keamanan<br>2. Pelatihan kesadaran keamanan<br>3. Prosedur verifikasi dan approval<br>4. Monitoring dan response cepat",
            contoh: "• Email filtering dengan AI<br>• Simulasi phishing untuk karyawan<br>• Prosedur verifikasi transfer<br>• Incident response plan",
            antisipasi: "• Gunakan autentikasi multi-faktor<br>• Implementasi email security gateway<br>• Backup data secara rutin<br>• Update software dan sistem<br>• Pelatihan berkelanjutan"
        }
    },
    // 4 Materi Baru
    {
        id: 13,
        title: "QR Code Phishing",
        icon: "📲",
        category: "qrcode",
        description: "Penipuan menggunakan QR code berbahaya",
        tags: ["QR Code", "Mobile", "Modern"],
        level: "Pemula",
        content: {
            pengertian: "QR Code phishing (Quishing) adalah teknik phishing yang menggunakan QR code berbahaya untuk mengarahkan korban ke website palsu atau mengunduh malware ke perangkat mereka.",
            caraKerja: "1. Penyerang membuat QR code yang mengarah ke link berbahaya<br>2. QR code disebarkan melalui email, poster, atau media sosial<br>3. Korban memindai QR code dengan smartphone<br>4. Korban diarahkan ke website phishing atau mengunduh malware",
            contoh: "• QR code di email untuk 'verifikasi pembayaran'<br>• Stiker QR code palsu di tempat parkir<br>• QR code di media sosial untuk 'promo menarik'<br>• QR code di menu restoran menuju situs berbahaya",
            antisipasi: "• Periksa URL preview sebelum membuka<br>• Gunakan aplikasi QR scanner dengan keamanan built-in<br>• Waspada QR code di tempat umum atau email tak dikenal<br>• Verifikasi keaslian sumber QR code"
        }
    },
    {
        id: 14,
        title: "Deepfake Phishing",
        icon: "🎭",
        category: "deepfake",
        description: "Penipuan menggunakan teknologi deepfake AI",
        tags: ["AI", "Video", "Advanced"],
        level: "Lanjutan",
        content: {
            pengertian: "Deepfake phishing adalah teknik canggih yang menggunakan kecerdasan buatan (AI) untuk membuat video atau audio palsu yang sangat realistis dari orang yang dipercaya, seperti CEO atau rekan kerja.",
            caraKerja: "1. Penyerang mengumpulkan video/audio target dari media sosial<br>2. Menggunakan AI deepfake untuk membuat konten palsu<br>3. Mengirim video/audio palsu melalui email atau panggilan video<br>4. Meminta transfer dana atau informasi sensitif",
            contoh: "• Video call palsu dari CEO meminta transfer mendesak<br>• Pesan suara palsu dari manajer dengan instruksi urgent<br>• Video palsu direktur mengumumkan kebijakan baru<br>• Audio call deepfake dari bank meminta verifikasi",
            antisipasi: "• Verifikasi melalui saluran komunikasi alternatif<br>• Waspadai permintaan mendesak yang tidak biasa<br>• Implementasi prosedur verifikasi multi-step<br>• Edukasi tim tentang teknologi deepfake<br>• Gunakan kata sandi atau kode rahasia untuk verifikasi"
        }
    },
    {
        id: 15,
        title: "Pharming Attack",
        icon: "🌐",
        category: "pharming",
        description: "Manipulasi DNS untuk mengarahkan ke website palsu",
        tags: ["DNS", "Network", "Technical"],
        level: "Lanjutan",
        content: {
            pengertian: "Pharming adalah teknik phishing yang lebih canggih dimana penyerang memanipulasi DNS (Domain Name System) atau file hosts komputer untuk mengarahkan korban ke website palsu, meskipun mereka mengetik URL yang benar.",
            caraKerja: "1. Penyerang menginfeksi komputer atau memanipulasi DNS server<br>2. Mengubah resolusi domain ke alamat IP palsu<br>3. Korban mengetik URL yang benar tapi diarahkan ke website palsu<br>4. Data login dan informasi sensitif dicuri tanpa disadari korban",
            contoh: "• Mengetik bank.com tapi masuk ke website palsu<br>• DNS poisoning pada router rumah<br>• Malware mengubah file hosts lokal<br>• Serangan man-in-the-middle pada jaringan WiFi publik",
            antisipasi: "• Gunakan DNS resolver terpercaya (Google DNS, Cloudflare)<br>• Periksa sertifikat SSL website (ikon gembok)<br>• Gunakan VPN saat di jaringan publik<br>• Update antivirus dan firewall<br>• Monitor file hosts secara berkala<br>• Gunakan DNSSEC jika tersedia"
        }
    },
    {
        id: 16,
        title: "Pop-up Phishing",
        icon: "⚠️",
        category: "popup",
        description: "Phishing melalui pop-up dan notifikasi palsu",
        tags: ["Browser", "Pop-up", "Warning"],
        level: "Pemula",
        content: {
            pengertian: "Pop-up phishing adalah teknik yang menggunakan jendela pop-up atau notifikasi browser palsu yang meniru peringatan sistem, antivirus, atau update untuk menipu pengguna memberikan informasi atau mengunduh malware.",
            caraKerja: "1. Korban mengunjungi website yang terinfeksi atau berbahaya<br>2. Pop-up muncul meniru peringatan sistem atau keamanan<br>3. Pesan mendesak korban untuk bertindak cepat<br>4. Korban diminta memasukkan data atau mengunduh 'update'",
            contoh: "• Pop-up 'Virus terdeteksi! Klik di sini untuk membersihkan'<br>• Notifikasi palsu 'Windows perlu update segera'<br>• Peringatan 'Akun Anda akan ditutup dalam 24 jam'<br>• Pop-up 'Anda memenangkan hadiah, klaim sekarang!'<br>• Alert palsu 'Adobe Flash perlu diperbarui'",
            antisipasi: "• Tutup pop-up dengan shortcut (Alt+F4 atau Cmd+W)<br>• Jangan klik apapun di dalam pop-up mencurigakan<br>• Gunakan ad-blocker dan pop-up blocker<br>• Update sistem dari sumber resmi saja<br>• Scan sistem dengan antivirus jika ragu<br>• Matikan notifikasi website yang tidak dipercaya"
        }
    }
];

// Data Aktivitas
let userActivities = JSON.parse(localStorage.getItem('phishguard_activities')) || [];
let learnedMaterials = JSON.parse(localStorage.getItem('phishguard_learned')) || [];

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
            education: 'Materi Edukasi',
            analytics: 'Aktivitas Saya'
        };
        document.getElementById('pageTitle').textContent = titles[page];
        
        if (page === 'education') {
            renderEducationMaterials();
        } else if (page === 'analytics') {
            renderAnalytics();
        }
    });
});

// Category Filter (Templates)
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

// Activate Link (Copy Link)
async function activateLink(btn) {
    const card = btn.closest('.template-card');
    const url = card.dataset.url;
    const name = card.dataset.name;
    const category = card.dataset.category;
    
    try {
        // Copy to clipboard
        await navigator.clipboard.writeText(url);
        
        // Record activity
        recordActivity({
            type: 'copy_link',
            template: name,
            category: category,
            url: url,
            timestamp: new Date().toISOString()
        });
        
        showToast('✅ Link disalin ke clipboard!');
        updateActivityTimeline();
        updateDashboardStats();
    } catch (error) {
        console.error('Error copying link:', error);
        showToast('❌ Gagal menyalin link');
    }
}

// Record Activity
function recordActivity(activity) {
    userActivities.unshift(activity);
    
    // Keep only last 50 activities
    if (userActivities.length > 50) {
        userActivities = userActivities.slice(0, 50);
    }
    
    localStorage.setItem('phishguard_activities', JSON.stringify(userActivities));
    
    // Update analytics if page is active
    if (document.querySelector('#analyticsPage.active')) {
        renderAnalytics();
    }
}

// Render Education Materials
function renderEducationMaterials() {
    const grid = document.getElementById('educationGrid');
    if (!grid) return;
    
    grid.innerHTML = educationMaterials.map(material => {
        const isLearned = learnedMaterials.includes(material.id);
        
        return `
            <div class="education-card ${isLearned ? 'learned' : ''}" onclick="openEducationModal(${material.id})">
                ${isLearned ? '<div class="learned-badge">✅ Dipelajari</div>' : ''}
                <div class="education-icon ${material.category}">
                    ${material.icon}
                </div>
                <h3>${material.title}</h3>
                <p style="color: var(--text-secondary); margin: 0.5rem 0; font-size: 0.9rem;">
                    ${material.description}
                </p>
                <div class="education-tags">
                    <span class="education-tag">${material.level}</span>
                    ${material.tags.map(tag => `<span class="education-tag">${tag}</span>`).join('')}
                </div>
                <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">
                        Klik untuk detail
                    </span>
                    <span style="font-size: 1.2rem;">→</span>
                </div>
            </div>
        `;
    }).join('');
}

// Open Education Modal
function openEducationModal(materialId) {
    const material = educationMaterials.find(m => m.id === materialId);
    if (!material) return;
    
    document.getElementById('modalTitle').textContent = material.title;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
            <div class="education-icon ${material.category}" style="width: 50px; height: 50px; font-size: 1.5rem;">
                ${material.icon}
            </div>
            <div>
                <h3 style="margin: 0;">${material.title}</h3>
                <p style="color: var(--text-secondary); margin: 0.3rem 0 0 0;">${material.description}</p>
            </div>
        </div>
        
        <div class="modal-section">
            <h4>📖 <span>Pengertian</span></h4>
            <p>${material.content.pengertian}</p>
        </div>
        
        <div class="modal-section">
            <h4>⚙️ <span>Cara Kerja</span></h4>
            <p>${material.content.caraKerja}</p>
        </div>
        
        <div class="modal-section">
            <h4>⚠️ <span>Contoh Kasus</span></h4>
            <p>${material.content.contoh}</p>
        </div>
        
        <div class="modal-section">
            <h4>🛡️ <span>Cara Antisipasi</span></h4>
            <p>${material.content.antisipasi}</p>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-secondary); border-radius: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>Tingkat Kesulitan:</strong> ${material.level}
                </div>
                <div>
                    <strong>Status:</strong> ${learnedMaterials.includes(material.id) ? '✅ Sudah dipelajari' : '📚 Belum dipelajari'}
                </div>
            </div>
        </div>
    `;
    
    // Store current material ID
    document.getElementById('educationModal').dataset.materialId = materialId;
    document.getElementById('educationModal').classList.add('active');
}

// Close Education Modal
function closeEducationModal() {
    document.getElementById('educationModal').classList.remove('active');
}

// Mark as Learned
function markAsLearned() {
    const materialId = parseInt(document.getElementById('educationModal').dataset.materialId);
    const material = educationMaterials.find(m => m.id === materialId);
    
    if (material && !learnedMaterials.includes(material.id)) {
        learnedMaterials.push(material.id);
        localStorage.setItem('phishguard_learned', JSON.stringify(learnedMaterials));
        
        showToast('✅ Materi ditandai sebagai sudah dipelajari!');
        renderEducationMaterials();
        updateDashboardStats();
        closeEducationModal();
    } else if (material && learnedMaterials.includes(material.id)) {
        showToast('ℹ️ Materi ini sudah ditandai dipelajari sebelumnya');
    }
}

// Render Analytics
function renderAnalytics() {
    // Calculate statistics
    const copyActivities = userActivities.filter(a => a.type === 'copy_link');
    const deleteActivities = userActivities.filter(a => a.type === 'delete_link');
    
    // Find most copied template
    const templateCopies = {};
    copyActivities.forEach(activity => {
        if (activity.template) {
            templateCopies[activity.template] = (templateCopies[activity.template] || 0) + 1;
        }
    });
    
    let favoriteTemplate = '-';
    let maxCopies = 0;
    Object.entries(templateCopies).forEach(([template, copies]) => {
        if (copies > maxCopies) {
            maxCopies = copies;
            favoriteTemplate = template;
        }
    });
    
    // Update stats
    document.getElementById('analyticsCopied').textContent = copyActivities.length;
    document.getElementById('analyticsDeleted').textContent = deleteActivities.length;
    document.getElementById('analyticsFavorite').textContent = favoriteTemplate.substring(0, 15) + (favoriteTemplate.length > 15 ? '...' : '');
    
    // Render activity list
    const activityList = document.getElementById('activityList');
    if (!activityList) return;
    
    if (userActivities.length === 0) {
        activityList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p>Belum ada aktivitas</p>
            </div>
        `;
        return;
    }
    
    activityList.innerHTML = userActivities.map((activity, index) => {
        const time = new Date(activity.timestamp).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        if (activity.type === 'copy_link') {
            return `
                <div class="activity-item">
                    <div class="activity-info">
                        <h4>📎 ${activity.template}</h4>
                        <div class="activity-meta">
                            <span>⏱️ ${time}</span>
                            <span>📂 ${activity.category}</span>
                            <span class="activity-badge badge-copied">Link Disalin</span>
                        </div>
                        <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary); word-break: break-all;">
                            ${activity.url}
                        </div>
                    </div>
                    <div class="activity-actions">
                        <button class="btn-sm btn-copy-again" onclick="copyAgain('${activity.url}')">
                            📋 Salin Lagi
                        </button>
                        <button class="btn-sm btn-remove" onclick="removeActivity(${index})">
                            🗑️ Hapus
                        </button>
                    </div>
                </div>
            `;
        } else if (activity.type === 'delete_link') {
            return `
                <div class="activity-item">
                    <div class="activity-info">
                        <h4>🗑️ ${activity.template}</h4>
                        <div class="activity-meta">
                            <span>⏱️ ${time}</span>
                            <span>📂 ${activity.category}</span>
                            <span class="activity-badge badge-deleted">Link Dihapus</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }).join('');
}

// Copy Again
async function copyAgain(url) {
    try {
        await navigator.clipboard.writeText(url);
        showToast('✅ Link disalin kembali ke clipboard!');
    } catch (error) {
        console.error('Error copying link:', error);
        showToast('❌ Gagal menyalin link');
    }
}

// Remove Single Activity
function removeActivity(index) {
    if (confirm('Hapus aktivitas ini dari riwayat?')) {
        const activity = userActivities[index];
        
        // Record delete action
        recordActivity({
            type: 'delete_link',
            template: activity.template,
            category: activity.category,
            timestamp: new Date().toISOString()
        });
        
        // Remove the copy activity
        userActivities.splice(index, 1);
        localStorage.setItem('phishguard_activities', JSON.stringify(userActivities));
        
        showToast('🗑️ Aktivitas berhasil dihapus');
        renderAnalytics();
        updateActivityTimeline();
        updateDashboardStats();
    }
}

// Clear All Activities
function clearAllActivities() {
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat aktivitas? Tindakan ini tidak dapat dibatalkan.')) {
        userActivities = [];
        localStorage.removeItem('phishguard_activities');
        
        showToast('🗑️ Semua riwayat aktivitas berhasil dihapus!');
        renderAnalytics();
        updateActivityTimeline();
        updateDashboardStats();
    }
}

// Update Activity Timeline
function updateActivityTimeline() {
    const timeline = document.getElementById('activityTimeline');
    if (!timeline) return;
    
    const recentActivities = userActivities.slice(0, 5);
    
    if (recentActivities.length === 0) {
        timeline.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <p>Belum ada aktivitas...</p>
            </div>
        `;
        return;
    }
    
    timeline.innerHTML = recentActivities.map(activity => {
        const time = getTimeAgo(new Date(activity.timestamp).getTime());
        let icon = '📋';
        let text = '';
        let dotClass = 'blue';
        
        switch (activity.type) {
            case 'copy_link':
                icon = '📎';
                text = `Menyalin link: ${activity.template}`;
                dotClass = 'blue';
                break;
            case 'delete_link':
                icon = '🗑️';
                text = `Menghapus link: ${activity.template}`;
                dotClass = 'red';
                break;
            default:
                text = activity.type;
        }
        
        return `
            <div class="timeline-item">
                <div class="timeline-dot ${dotClass}"></div>
                <div>
                    <div style="font-weight: 600;">${icon} ${text}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.3rem;">
                        <span>⏱️ ${time}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update Dashboard Stats
function updateDashboardStats() {
    document.getElementById('totalMaterials').textContent = educationMaterials.length;
    document.getElementById('totalTemplates').textContent = document.querySelectorAll('.template-card').length;
    document.getElementById('totalCopied').textContent = userActivities.filter(a => a.type === 'copy_link').length;
    document.getElementById('materialsLearned').textContent = learnedMaterials.length;
    
    // Update activity timeline
    updateActivityTimeline();
}

// Helper Functions
function getTimeAgo(timestamp) {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `${diff} detik lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
    return `${Math.floor(diff / 604800)} minggu lalu`;
}

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

// Back Button
document.getElementById('backBtn').addEventListener('click', () => {
    if (confirm('Apakah Anda yakin ingin kembali?')) {
        window.location.href = 'index.html';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderEducationMaterials();
    updateDashboardStats();
    updateActivityTimeline();
    
    // Check if analytics page is loaded
    if (document.querySelector('#analyticsPage.active')) {
        renderAnalytics();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeEducationModal();
    }
});

// Close modal when clicking outside
document.getElementById('educationModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('educationModal')) {
        closeEducationModal();
    }
});
