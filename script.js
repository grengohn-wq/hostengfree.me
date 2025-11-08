// ========================
// خدماتي المتكاملة - JavaScript
// نظام إدارة شامل مع الإعلانات
// ========================

class IntegratedServicesWebsite {
    constructor() {
        this.isAdminMode = false;
        this.adsEnabled = true;
        this.currentUser = null;
        this.settings = {
            adsenseClientId: 'ca-pub-XXXXXXXXXX',
            adsenseSlots: {
                header: 'XXXXXXXXXX',
                sidebar: 'XXXXXXXXXX',
                betweenSections: 'XXXXXXXXXX',
                footer: 'XXXXXXXXXX'
            },
            socialMedia: {
                facebook: {
                    enabled: true,
                    url: 'https://facebook.com/myservices',
                    label: 'فيسبوك'
                },
                twitter: {
                    enabled: true,
                    url: 'https://twitter.com/myservices',
                    label: 'تويتر'
                },
                instagram: {
                    enabled: true,
                    url: 'https://instagram.com/myservices',
                    label: 'إنستجرام'
                },
                linkedin: {
                    enabled: true,
                    url: 'https://linkedin.com/company/myservices',
                    label: 'لينكد إن'
                },
                whatsapp: {
                    enabled: true,
                    url: 'https://wa.me/966501234567',
                    label: 'واتساب'
                },
                telegram: {
                    enabled: false,
                    url: 'https://t.me/myservices',
                    label: 'تيليجرام'
                },
                youtube: {
                    enabled: false,
                    url: 'https://youtube.com/@myservices',
                    label: 'يوتيوب'
                },
                snapchat: {
                    enabled: false,
                    url: 'https://snapchat.com/add/myservices',
                    label: 'سناب شات'
                },
                tiktok: {
                    enabled: false,
                    url: 'https://tiktok.com/@myservices',
                    label: 'تيك توك'
                }
            },
            contactInfo: {
                email: 'info@myservices.com',
                phone: '+966 50 123 4567',
                address: 'المملكة العربية السعودية'
            }
        };
        this.init();
    }

    // تهيئة الموقع
    init() {
        this.setupEventListeners();
        this.initializeAds();
        this.loadSettings();
        this.checkAdminAccess();
        this.initializeMobileMenu();
        this.initializeSocialMedia();
        console.log('✅ تم تحميل موقع خدماتي المتكاملة بنجاح');
    }

    // تهيئة وسائل التواصل الاجتماعي
    initializeSocialMedia() {
        // تحديث عرض وسائل التواصل في جميع الصفحات
        setTimeout(() => {
            this.updateSocialMediaDisplay();
            this.updateContactDisplay();
        }, 100);
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // التنقل المتجاوب
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
                navMenu?.classList.remove('active');
            }
        });

        // التمرير السلس للروابط الداخلية
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // كشف التمرير للتأثيرات البصرية
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    // التعامل مع التمرير
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // تأثير ظهور العناصر عند التمرير
        this.animateOnScroll();
    }

    // تحريك العناصر عند التمرير
    animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .feature-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // ========================
    // نظام إدارة الإعلانات
    // ========================

    // تهيئة الإعلانات
    initializeAds() {
        if (!this.adsEnabled) {
            this.hideAllAds();
            return;
        }

        // تحديث معرفات أدسنس
        this.updateAdSenseIds();
        
        // تحميل إعلانات أدسنس
        this.loadAdSenseAds();
        
        // مراقبة حالة الإعلانات
        this.monitorAds();
    }

    // تحديث معرفات أدسنس
    updateAdSenseIds() {
        const adElements = document.querySelectorAll('.adsbygoogle');
        adElements.forEach(ad => {
            const adFormat = ad.getAttribute('data-ad-format');
            const slotKey = this.getSlotKeyFromFormat(adFormat);
            
            if (this.settings.adsenseSlots[slotKey]) {
                ad.setAttribute('data-ad-client', this.settings.adsenseClientId);
                ad.setAttribute('data-ad-slot', this.settings.adsenseSlots[slotKey]);
            }
        });
    }

    // الحصول على مفتاح الفتحة من التنسيق
    getSlotKeyFromFormat(format) {
        const formatMap = {
            'horizontal': Math.random() > 0.5 ? 'header' : 'betweenSections',
            'vertical': 'sidebar'
        };
        return formatMap[format] || 'header';
    }

    // تحميل إعلانات أدسنس
    loadAdSenseAds() {
        try {
            // التأكد من تحميل أدسنس
            if (typeof adsbygoogle !== 'undefined') {
                const ads = document.querySelectorAll('.adsbygoogle');
                ads.forEach(ad => {
                    if (!ad.classList.contains('adsbygoogle-noablate')) {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    }
                });
            } else {
                console.warn('⚠️ لم يتم تحميل Google AdSense');
            }
        } catch (error) {
            console.error('❌ خطأ في تحميل الإعلانات:', error);
        }
    }

    // مراقبة الإعلانات
    monitorAds() {
        const adContainers = document.querySelectorAll('.ad-container');
        adContainers.forEach(container => {
            // إضافة نص بديل للإعلانات غير المحملة
            if (!container.querySelector('.adsbygoogle')) {
                container.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #666; border: 2px dashed #ddd;">
                        <i class="fas fa-ad" style="font-size: 2rem; margin-bottom: 10px;"></i>
                        <p>مساحة إعلانية</p>
                        <small>سيتم عرض الإعلان هنا</small>
                    </div>
                `;
            }
        });
    }

    // إخفاء جميع الإعلانات
    hideAllAds() {
        const adContainers = document.querySelectorAll('.ad-container');
        adContainers.forEach(container => {
            container.classList.add('hidden');
        });
    }

    // إظهار الإعلانات
    showAllAds() {
        const adContainers = document.querySelectorAll('.ad-container');
        adContainers.forEach(container => {
            container.classList.remove('hidden');
        });
    }

    // تفعيل/تعطيل الإعلانات
    toggleAds(enabled) {
        this.adsEnabled = enabled;
        if (enabled) {
            this.showAllAds();
            this.loadAdSenseAds();
        } else {
            this.hideAllAds();
        }
        
        // حفظ الإعداد
        localStorage.setItem('adsEnabled', enabled);
        console.log(`${enabled ? '✅ تم تفعيل' : '❌ تم تعطيل'} الإعلانات`);
    }

    // ========================
    // نظام إدارة المحتوى
    // ========================

    // تحميل الإعدادات
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('websiteSettings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                this.settings = { ...this.settings, ...parsed };
            }

            // تحميل حالة الإعلانات
            const adsEnabled = localStorage.getItem('adsEnabled');
            if (adsEnabled !== null) {
                this.adsEnabled = JSON.parse(adsEnabled);
            }
        } catch (error) {
            console.error('خطأ في تحميل الإعدادات:', error);
        }
    }

    // حفظ الإعدادات
    saveSettings() {
        try {
            localStorage.setItem('websiteSettings', JSON.stringify(this.settings));
            console.log('✅ تم حفظ الإعدادات');
        } catch (error) {
            console.error('❌ خطأ في حفظ الإعدادات:', error);
        }
    }

    // تحديث إعدادات أدسنس
    updateAdSenseSettings(clientId, slots) {
        this.settings.adsenseClientId = clientId;
        this.settings.adsenseSlots = { ...this.settings.adsenseSlots, ...slots };
        this.saveSettings();
        this.updateAdSenseIds();
        this.loadAdSenseAds();
    }

    // ========================
    // نظام إدارة وسائل التواصل الاجتماعي
    // ========================

    // تحديث إعدادات وسائل التواصل
    updateSocialMediaSettings(platform, enabled, url) {
        if (this.settings.socialMedia[platform]) {
            this.settings.socialMedia[platform].enabled = enabled;
            if (url) {
                this.settings.socialMedia[platform].url = url;
            }
            this.saveSettings();
            this.updateSocialMediaDisplay();
            console.log(`✅ تم تحديث ${this.settings.socialMedia[platform].label}`);
        }
    }

    // تحديث عرض وسائل التواصل في جميع الصفحات
    updateSocialMediaDisplay() {
        const socialContainers = document.querySelectorAll('.social-links');
        socialContainers.forEach(container => {
            this.renderSocialLinks(container);
        });
    }

    // عرض روابط وسائل التواصل
    renderSocialLinks(container) {
        if (!container) return;

        container.innerHTML = '';
        
        Object.entries(this.settings.socialMedia).forEach(([platform, config]) => {
            if (config.enabled && config.url) {
                const link = document.createElement('a');
                link.href = config.url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.title = config.label;
                
                // إضافة الأيقونة المناسبة
                const icon = document.createElement('i');
                const iconClasses = {
                    facebook: 'fab fa-facebook',
                    twitter: 'fab fa-twitter',
                    instagram: 'fab fa-instagram',
                    linkedin: 'fab fa-linkedin',
                    whatsapp: 'fab fa-whatsapp',
                    telegram: 'fab fa-telegram',
                    youtube: 'fab fa-youtube',
                    snapchat: 'fab fa-snapchat',
                    tiktok: 'fab fa-tiktok'
                };
                
                icon.className = iconClasses[platform] || 'fas fa-link';
                link.appendChild(icon);
                container.appendChild(link);
            }
        });
    }

    // تحديث معلومات التواصل
    updateContactInfo(email, phone, address) {
        this.settings.contactInfo.email = email;
        this.settings.contactInfo.phone = phone;
        this.settings.contactInfo.address = address;
        this.saveSettings();
        this.updateContactDisplay();
        console.log('✅ تم تحديث معلومات التواصل');
    }

    // تحديث عرض معلومات التواصل
    updateContactDisplay() {
        // تحديث عرض البريد الإلكتروني
        const emailElements = document.querySelectorAll('[data-contact="email"]');
        emailElements.forEach(element => {
            element.textContent = this.settings.contactInfo.email;
            if (element.tagName === 'A') {
                element.href = `mailto:${this.settings.contactInfo.email}`;
            }
        });

        // تحديث عرض رقم الهاتف
        const phoneElements = document.querySelectorAll('[data-contact="phone"]');
        phoneElements.forEach(element => {
            element.textContent = this.settings.contactInfo.phone;
            if (element.tagName === 'A') {
                element.href = `tel:${this.settings.contactInfo.phone}`;
            }
        });

        // تحديث عرض العنوان
        const addressElements = document.querySelectorAll('[data-contact="address"]');
        addressElements.forEach(element => {
            element.textContent = this.settings.contactInfo.address;
        });
    }

    // الحصول على إعدادات وسيلة تواصل معينة
    getSocialMediaConfig(platform) {
        return this.settings.socialMedia[platform] || null;
    }

    // الحصول على جميع وسائل التواصل المفعلة
    getEnabledSocialMedia() {
        return Object.entries(this.settings.socialMedia)
            .filter(([platform, config]) => config.enabled)
            .map(([platform, config]) => ({ platform, ...config }));
    }

    // ========================
    // نظام الإدارة والأمان
    // ========================

    // فحص الوصول للإدارة
    checkAdminAccess() {
        // فحص URL للوصول المباشر للإدارة
        if (window.location.pathname.includes('/admin') || window.location.hash === '#admin') {
            this.showAdminLogin();
        }

        // إنشاء رابط مخفي للإدارة
        this.createHiddenAdminLink();
    }

    // إنشاء رابط إدارة مخفي
    createHiddenAdminLink() {
        // رابط مخفي يمكن الوصول إليه بالكتابة في العنوان
        window.addEventListener('keydown', (e) => {
            // Ctrl + Alt + A للوصول السريع للإدارة
            if (e.ctrlKey && e.altKey && e.key === 'a') {
                e.preventDefault();
                this.showAdminLogin();
            }
        });

        // إضافة رابط مخفي في الفوتر (غير مرئي)
        const hiddenLink = document.createElement('a');
        hiddenLink.href = '#admin';
        hiddenLink.style.display = 'none';
        hiddenLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showAdminLogin();
        });
        document.body.appendChild(hiddenLink);
    }

    // عرض نموذج تسجيل دخول الإدارة
    showAdminLogin() {
        const loginModal = this.createLoginModal();
        document.body.appendChild(loginModal);
    }

    // إنشاء نموذج تسجيل الدخول
    createLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'admin-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-shield-alt"></i> دخول الإدارة</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <form class="login-form" id="adminLoginForm">
                        <div class="form-group">
                            <label for="username">اسم المستخدم:</label>
                            <input type="text" id="username" name="username" required>
                        </div>
                        <div class="form-group">
                            <label for="password">كلمة المرور:</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">دخول</button>
                        <div class="login-error" style="display: none;"></div>
                    </form>
                </div>
            </div>
        `;

        // إضافة الأنماط
        this.addModalStyles();

        // إعداد الأحداث
        this.setupModalEvents(modal);

        return modal;
    }

    // إضافة أنماط النموذج
    addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .admin-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
            }
            .modal-overlay {
                background: rgba(0, 0, 0, 0.8);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-content {
                background: white;
                border-radius: 10px;
                padding: 2rem;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                color: #2563eb;
            }
            .close-modal {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }
            .form-group {
                margin-bottom: 1rem;
            }
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: bold;
            }
            .form-group input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 1rem;
            }
            .login-error {
                color: #dc2626;
                margin-top: 1rem;
                padding: 0.5rem;
                background: #fef2f2;
                border-radius: 5px;
                border: 1px solid #fecaca;
            }
        `;
        document.head.appendChild(styles);
    }

    // إعداد أحداث النموذج
    setupModalEvents(modal) {
        const form = modal.querySelector('#adminLoginForm');
        const closeBtn = modal.querySelector('.close-modal');
        const overlay = modal.querySelector('.modal-overlay');

        // إغلاق النموذج
        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        // معالجة تسجيل الدخول
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin(form, modal);
        });
    }

    // معالجة تسجيل دخول الإدارة
    handleAdminLogin(form, modal) {
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');
        const errorDiv = form.querySelector('.login-error');

        // تشفير وفحص بيانات الاعتماد
        const hashedCredentials = this.hashCredentials(username, password);
        const expectedHash = this.hashCredentials('mosap', 'mosap@123123');

        if (hashedCredentials === expectedHash) {
            // تسجيل دخول ناجح
            this.currentUser = username;
            this.isAdminMode = true;
            
            // حفظ حالة تسجيل الدخول (مؤقت - جلسة واحدة فقط)
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('adminUser', username);
            
            modal.remove();
            this.showAdminPanel();
            
            console.log('✅ تم تسجيل دخول الإدارة بنجاح');
        } else {
            // خطأ في تسجيل الدخول
            errorDiv.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
            errorDiv.style.display = 'block';
            
            // هز النموذج للإشارة للخطأ
            form.style.animation = 'shake 0.5s';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
        }
    }

    // تشفير بيانات الاعتماد (هاشنغ بسيط)
    hashCredentials(username, password) {
        // تشفير بسيط - في البيئة الحقيقية استخدم تشفير أقوى
        const combined = username + ':' + password + ':salt_key_2025';
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    // عرض لوحة الإدارة
    showAdminPanel() {
        const adminPanel = this.createAdminPanel();
        document.body.appendChild(adminPanel);
    }

    // إنشاء لوحة الإدارة
    createAdminPanel() {
        const panel = document.createElement('div');
        panel.className = 'admin-panel';
        panel.innerHTML = `
            <div class="admin-overlay">
                <div class="admin-dashboard">
                    <div class="admin-header">
                        <h2><i class="fas fa-cogs"></i> لوحة تحكم الإدارة</h2>
                        <div class="admin-user">
                            <span>مرحباً، ${this.currentUser}</span>
                            <button class="btn-logout"><i class="fas fa-sign-out-alt"></i></button>
                        </div>
                    </div>
                    
                    <div class="admin-content">
                        <div class="admin-tabs">
                            <button class="tab-btn active" data-tab="ads">إدارة الإعلانات</button>
                            <button class="tab-btn" data-tab="content">إدارة المحتوى</button>
                            <button class="tab-btn" data-tab="stats">الإحصائيات</button>
                            <button class="tab-btn" data-tab="settings">الإعدادات</button>
                        </div>
                        
                        <div class="tab-content">
                            <div class="tab-panel active" id="ads-panel">
                                ${this.createAdsPanel()}
                            </div>
                            <div class="tab-panel" id="content-panel">
                                ${this.createContentPanel()}
                            </div>
                            <div class="tab-panel" id="stats-panel">
                                ${this.createStatsPanel()}
                            </div>
                            <div class="tab-panel" id="settings-panel">
                                ${this.createSettingsPanel()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.addAdminStyles();
        this.setupAdminEvents(panel);
        return panel;
    }

    // إنشاء لوحة إدارة الإعلانات
    createAdsPanel() {
        return `
            <div class="panel-section">
                <h3>إعدادات Google AdSense</h3>
                <div class="form-group">
                    <label>معرف العميل (Client ID):</label>
                    <input type="text" id="adsense-client-id" value="${this.settings.adsenseClientId}" placeholder="ca-pub-XXXXXXXXXX">
                </div>
                
                <h4>فتحات الإعلانات:</h4>
                <div class="ads-slots">
                    <div class="form-group">
                        <label>إعلان الهيدر:</label>
                        <input type="text" id="header-slot" value="${this.settings.adsenseSlots.header}" placeholder="XXXXXXXXXX">
                    </div>
                    <div class="form-group">
                        <label>إعلان الشريط الجانبي:</label>
                        <input type="text" id="sidebar-slot" value="${this.settings.adsenseSlots.sidebar}" placeholder="XXXXXXXXXX">
                    </div>
                    <div class="form-group">
                        <label>إعلان بين الأقسام:</label>
                        <input type="text" id="between-slot" value="${this.settings.adsenseSlots.betweenSections}" placeholder="XXXXXXXXXX">
                    </div>
                    <div class="form-group">
                        <label>إعلان الفوتر:</label>
                        <input type="text" id="footer-slot" value="${this.settings.adsenseSlots.footer}" placeholder="XXXXXXXXXX">
                    </div>
                </div>
                
                <div class="ads-controls">
                    <label class="switch">
                        <input type="checkbox" id="ads-toggle" ${this.adsEnabled ? 'checked' : ''}>
                        <span class="slider">تفعيل الإعلانات</span>
                    </label>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="website.saveAdSenseSettings()">حفظ الإعدادات</button>
                    <button class="btn btn-secondary" onclick="website.refreshAds()">تحديث الإعلانات</button>
                </div>
            </div>
        `;
    }

    // إنشاء لوحة إدارة المحتوى
    createContentPanel() {
        return `
            <div class="panel-section">
                <h3>إدارة محتوى الموقع</h3>
                <p>يمكنك تعديل المحتوى والخدمات من هنا</p>
                <div class="content-actions">
                    <button class="btn btn-primary">تحديث الخدمات</button>
                    <button class="btn btn-secondary">إدارة الشهادات</button>
                    <button class="btn btn-outline">تعديل معلومات التواصل</button>
                </div>
            </div>
        `;
    }

    // إنشاء لوحة الإحصائيات
    createStatsPanel() {
        return `
            <div class="panel-section">
                <h3>إحصائيات الموقع</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <h4>الزوار اليوم</h4>
                        <p class="stat-number">234</p>
                    </div>
                    <div class="stat-card">
                        <h4>إجمالي الزوار</h4>
                        <p class="stat-number">12,456</p>
                    </div>
                    <div class="stat-card">
                        <h4>طلبات الخدمات</h4>
                        <p class="stat-number">89</p>
                    </div>
                    <div class="stat-card">
                        <h4>أرباح الإعلانات</h4>
                        <p class="stat-number">$125.50</p>
                    </div>
                </div>
            </div>
        `;
    }

    // إنشاء لوحة الإعدادات
    createSettingsPanel() {
        return `
            <div class="panel-section">
                <h3>إعدادات عامة</h3>
                <div class="settings-grid">
                    <div class="form-group">
                        <label>اسم الموقع:</label>
                        <input type="text" value="خدماتي المتكاملة">
                    </div>
                    <div class="form-group">
                        <label>البريد الإلكتروني:</label>
                        <input type="email" value="info@myservices.com">
                    </div>
                    <div class="form-group">
                        <label>رقم الهاتف:</label>
                        <input type="tel" value="+966 50 123 4567">
                    </div>
                </div>
                <button class="btn btn-primary">حفظ الإعدادات العامة</button>
            </div>
        `;
    }

    // إضافة أنماط لوحة الإدارة
    addAdminStyles() {
        if (document.getElementById('admin-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'admin-styles';
        styles.textContent = `
            .admin-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 20000;
            }
            .admin-overlay {
                background: rgba(0, 0, 0, 0.9);
                width: 100%;
                height: 100%;
                overflow-y: auto;
            }
            .admin-dashboard {
                max-width: 1200px;
                margin: 2rem auto;
                background: white;
                border-radius: 10px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .admin-header {
                background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 10px 10px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .admin-user {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .btn-logout {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                padding: 0.5rem;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                transition: background 0.3s;
            }
            .btn-logout:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            .admin-content {
                padding: 2rem;
            }
            .admin-tabs {
                display: flex;
                border-bottom: 2px solid #e5e7eb;
                margin-bottom: 2rem;
            }
            .tab-btn {
                padding: 1rem 2rem;
                border: none;
                background: none;
                cursor: pointer;
                border-bottom: 3px solid transparent;
                transition: all 0.3s;
            }
            .tab-btn.active {
                border-bottom-color: #2563eb;
                color: #2563eb;
                font-weight: bold;
            }
            .tab-panel {
                display: none;
            }
            .tab-panel.active {
                display: block;
            }
            .panel-section {
                margin-bottom: 2rem;
            }
            .panel-section h3 {
                color: #2563eb;
                margin-bottom: 1rem;
            }
            .ads-slots {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            }
            .ads-controls {
                margin: 1.5rem 0;
            }
            .switch {
                position: relative;
                display: inline-flex;
                align-items: center;
                cursor: pointer;
            }
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .slider {
                margin-right: 10px;
                width: 60px;
                height: 34px;
                background-color: #ccc;
                border-radius: 34px;
                position: relative;
                transition: .4s;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                right: 4px;
                bottom: 4px;
                background-color: white;
                border-radius: 50%;
                transition: .4s;
            }
            input:checked + .slider {
                background-color: #2563eb;
            }
            input:checked + .slider:before {
                transform: translateX(-26px);
            }
            .action-buttons, .content-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin: 1rem 0;
            }
            .stat-card {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 8px;
                text-align: center;
            }
            .stat-number {
                font-size: 2rem;
                font-weight: bold;
                color: #2563eb;
                margin: 0;
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(styles);
    }

    // إعداد أحداث لوحة الإدارة
    setupAdminEvents(panel) {
        // تبديل التبويبات
        const tabButtons = panel.querySelectorAll('.tab-btn');
        const tabPanels = panel.querySelectorAll('.tab-panel');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // إزالة النشط من جميع التبويبات
                tabButtons.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                
                // تفعيل التبويب المحدد
                btn.classList.add('active');
                panel.querySelector(`#${targetTab}-panel`).classList.add('active');
            });
        });

        // تسجيل الخروج
        panel.querySelector('.btn-logout').addEventListener('click', () => {
            this.adminLogout();
            panel.remove();
        });

        // تبديل الإعلانات
        panel.querySelector('#ads-toggle').addEventListener('change', (e) => {
            this.toggleAds(e.target.checked);
        });
    }

    // حفظ إعدادات أدسنس
    saveAdSenseSettings() {
        const clientId = document.getElementById('adsense-client-id').value;
        const slots = {
            header: document.getElementById('header-slot').value,
            sidebar: document.getElementById('sidebar-slot').value,
            betweenSections: document.getElementById('between-slot').value,
            footer: document.getElementById('footer-slot').value
        };

        this.updateAdSenseSettings(clientId, slots);
        alert('✅ تم حفظ إعدادات الإعلانات بنجاح!');
    }

    // تحديث الإعلانات
    refreshAds() {
        this.initializeAds();
        alert('✅ تم تحديث الإعلانات!');
    }

    // تسجيل خروج الإدارة
    adminLogout() {
        this.isAdminMode = false;
        this.currentUser = null;
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUser');
        console.log('✅ تم تسجيل الخروج من الإدارة');
    }

    // ========================
    // القائمة المتجاوبة
    // ========================

    initializeMobileMenu() {
        // إضافة تأثيرات للقائمة المتجاوبة
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // إغلاق القائمة المحمولة عند النقر على رابط
                const navMenu = document.getElementById('nav-menu');
                navMenu?.classList.remove('active');
            });
        });
    }

    // ========================
    // نماذج الاتصال
    // ========================

    setupContactForms() {
        const contactForms = document.querySelectorAll('form[id*="contact"], form[class*="contact"]');
        contactForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(form);
            });
        });
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // محاكاة إرسال النموذج
        console.log('📧 تم إرسال نموذج الاتصال:', data);
        
        // عرض رسالة نجاح
        this.showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        
        // إعادة تعيين النموذج
        form.reset();
    }

    // عرض رسالة نجاح
    showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'success-alert';
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
                <button class="close-alert">&times;</button>
            </div>
        `;

        // إضافة الأنماط
        if (!document.getElementById('alert-styles')) {
            const alertStyles = document.createElement('style');
            alertStyles.id = 'alert-styles';
            alertStyles.textContent = `
                .success-alert {
                    position: fixed;
                    top: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 9999;
                    background: #10b981;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    animation: slideDown 0.3s ease;
                }
                .alert-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .close-alert {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-right: 1rem;
                }
                @keyframes slideDown {
                    from { transform: translate(-50%, -100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
            `;
            document.head.appendChild(alertStyles);
        }

        document.body.appendChild(alert);

        // إغلاق التلقائي والنقر
        alert.querySelector('.close-alert').addEventListener('click', () => {
            alert.remove();
        });

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// ===========================================
// وظائف إضافية للصفحات المختلفة
// ===========================================

// FAQ Toggle Function for all pages
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question i').className = 'fas fa-plus';
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        element.querySelector('i').className = 'fas fa-minus';
    }
}

// Initialize FAQ functionality for all pages
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                toggleFaq(question);
            });
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active navigation highlighting
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Responsive tables for mobile
function initResponsiveTables() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (!table.parentElement.classList.contains('table-responsive')) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-responsive');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
}

// تهيئة الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.website = new IntegratedServicesWebsite();
    
    // Initialize additional page functionalities
    initFAQ();
    initSmoothScrolling();
    initActiveNavigation();
    initResponsiveTables();
    
    // إعداد CSS للتحريك
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .service-card, .testimonial-card, .feature-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .service-card.animate, .testimonial-card.animate, .feature-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(animationStyles);
    
    console.log('🚀 موقع خدماتي المتكاملة جاهز للعمل!');
    console.log('💡 للوصول للإدارة: اكتب في العنوان #admin أو اضغط Ctrl+Alt+A');
});

// تصدير للاستخدام العام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntegratedServicesWebsite;
}