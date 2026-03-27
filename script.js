const WA = '772984213';

// Loader
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('gone'), 1800));

// Menu mobile
let mOpen = false;
function toggleMenu() { mOpen = !mOpen; document.getElementById('ham').classList.toggle('open', mOpen); const m = document.getElementById('mobMenu'); m.style.display = mOpen ? 'flex' : 'none'; setTimeout(() => m.classList.toggle('open', mOpen), 10) }
function closeMenu() { mOpen = false; document.getElementById('ham').classList.remove('open'); const m = document.getElementById('mobMenu'); m.classList.remove('open'); setTimeout(() => m.style.display = 'none', 300) }
document.getElementById('mobMenu').style.display = 'none';

// Nav scroll
window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', scrollY > 50));

// Scroll reveal
const ro = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('v') }), { threshold: .1 });
document.querySelectorAll('.sr,.srl,.srr').forEach(el => ro.observe(el));

// Compteurs
function countUp(el, t) { let n = 0; const s = t / 55, i = setInterval(() => { n = Math.min(n + s, t); el.textContent = Math.floor(n) + (el.dataset.to == '98' ? '%' : '+'); if (n >= t) clearInterval(i) }, 18) }
const so = new IntersectionObserver(e => { e.forEach(x => { if (x.isIntersecting) x.target.querySelectorAll('.hstat-n').forEach(el => { if (!el.done) { el.done = 1; countUp(el, +el.dataset.to) } }) }) }, { threshold: .5 });
const hs = document.querySelector('.hero-stats'); if (hs) so.observe(hs);

// Filtre voitures
function filter(cat, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('on')); btn.classList.add('on');
    document.querySelectorAll('.cc').forEach(c => {
        const cats = c.dataset.cat || '';
        const show = cat === 'all' || cats.includes(cat);
        c.style.display = show ? 'block' : 'none';
        if (show) { c.style.opacity = '0'; c.style.transform = 'scale(.96)'; setTimeout(() => { c.style.cssText += 'opacity:1!important;transform:scale(1)!important;transition:opacity .4s,transform .4s' }, 60) }
    });
}

// Apparition cartes
const co = new IntersectionObserver(e => e.forEach((x, i) => { if (x.isIntersecting) setTimeout(() => x.target.classList.add('vis'), i * 80) }), { threshold: .08 });
document.querySelectorAll('.cc').forEach(c => co.observe(c));

// ══════════════════════════════
//  MODAL DÉTAIL VÉHICULE
// ══════════════════════════════
let currentCar = null;

function openModal(card) {
    currentCar = card.dataset;
    document.getElementById('m-img').src = card.dataset.img;
    document.getElementById('m-img').alt = card.dataset.name;
    document.getElementById('m-maker').textContent = card.dataset.maker;
    document.getElementById('m-name').textContent = card.dataset.name;

    // Prix
    const isPricePerDay = card.dataset.ptype === 'par jour';
    document.getElementById('m-price').innerHTML = card.dataset.price + (isPricePerDay ? '&nbsp;<small>/jour</small>' : '');
    document.getElementById('m-plabel').textContent = card.dataset.ptype;

    // Badge
    const b = document.getElementById('m-badge');
    b.textContent = card.dataset.badge;
    b.className = 'modal-badge-pos ctag ' + card.dataset.bc;

    // Specs (4)
    const sp = document.getElementById('m-specs'); sp.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        sp.innerHTML += `<div class="spec-item"><div class="spec-icon">${card.dataset['s' + i + 'i']}</div><span class="spec-val">${card.dataset['s' + i]}</span><span class="spec-lbl">${card.dataset['s' + i + 'l']}</span></div>`;
    }

    // Description
    document.getElementById('m-desc').textContent = card.dataset.desc;

    // Options
    const op = document.getElementById('m-opts'); op.innerHTML = '';
    card.dataset.opts.split(',').forEach(o => {
        op.innerHTML += `<div class="opt"><div class="opt-dot"></div>${o.trim()}</div>`;
    });

    document.getElementById('carModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('carModal').classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => currentCar = null, 400);
}

function closeModalOutside(e) { if (e.target.id === 'carModal') closeModal(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() });

// Réserver depuis la modale
function reserverWA() {
    if (!currentCar) return;
    const msg = `Bonjour Karim Automobile ! 👋\n\nJe suis intéressé(e) par ce véhicule :\n\n🚗 *${currentCar.maker} ${currentCar.name}*\n💰 ${currentCar.price} (${currentCar.ptype})\n\nPouvez-vous me confirmer la disponibilité et les modalités ?\n\nMerci !`;
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
}

// Réserver depuis la carte (bouton rapide)
function reserver(nom, prix) {
    const msg = `Bonjour Karim Automobile ! 👋\n\nJe souhaite réserver / obtenir des informations sur :\n\n🚗 *${nom}*\n💰 ${prix}\n\nMerci de me contacter.`;
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank');
}

// Formulaire contact → WhatsApp
function envoyerWA() {
    const nom = document.getElementById('cf-nom').value.trim();
    const tel = document.getElementById('cf-tel').value.trim();
    const type = document.getElementById('cf-type').value;
    const vehicule = document.getElementById('cf-vehicule').value;
    const msg = document.getElementById('cf-msg').value.trim();
    if (!nom) { alert('Veuillez entrer votre nom.'); return; }
    if (!type) { alert('Veuillez choisir le type de demande.'); return; }
    let txt = `Bonjour Karim Automobile ! 👋\n\n👤 *Nom :* ${nom}\n`;
    if (tel) txt += `📞 *Tél :* ${tel}\n`;
    txt += `📋 *Demande :* ${type}\n`;
    if (vehicule) txt += `🚗 *Véhicule :* ${vehicule}\n`;
    if (msg) txt += `\n💬 *Message :*\n${msg}\n`;
    txt += `\nMerci !`;
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(txt), '_blank');
}

// Formulaire AXA → WhatsApp
function envoyerAXA() {
    const nom = document.getElementById('axa-nom').value.trim();
    const tel = document.getElementById('axa-tel').value.trim();
    const formule = document.getElementById('axa-formule').value;
    if (!nom) { alert('Veuillez entrer votre nom.'); return; }
    let txt = `Bonjour Karim Automobile ! 🛡️\n\nJe souhaite renouveler mon assurance AXA.\n\n👤 *Nom :* ${nom}\n`;
    if (tel) txt += `📞 *Tél :* ${tel}\n`;
    if (formule) txt += `📋 *Formule :* ${formule}\n`;
    txt += `\nJe vous enverrai ma carte grise en photo.\nMerci !`;
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(txt), '_blank');
}

// Upload carte grise
function fileChosen(input) {
    const f = input.files[0]; if (!f) return;
    const d = document.getElementById('fileInfo');
    d.style.display = 'block';
    d.innerHTML = `✅ <strong>${f.name}</strong> (${(f.size / 1024).toFixed(0)} Ko) — Complétez le formulaire et cliquez Envoyer.`;
}

// Goto
function goto(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth' }) }

// ══════════════════════════════
//  CAROUSEL HERO ACCUEIL
// ══════════════════════════════
const carNames = ['Mercedes-AMG GLE 53', 'Range Rover Evoque', 'Toyota 4Runner', 'Toyota RAV4'];
let slideIdx = 0;
let slideTimer;

function goSlide(n) {
    const slides = document.querySelectorAll('.hc-slide');
    const bgSlides = document.querySelectorAll('.hbg-slide');
    const dots = document.querySelectorAll('.hc-dot');
    const label = document.getElementById('hc-label');
    const bignum = document.getElementById('h-bignum');
    if (!slides.length) return;

    // Remove active from current
    slides[slideIdx].classList.remove('active');
    slides[slideIdx].style.position = 'absolute';
    if (bgSlides[slideIdx]) bgSlides[slideIdx].classList.remove('active');
    dots[slideIdx].classList.remove('active');

    slideIdx = (n + slides.length) % slides.length;

    // Activate new
    slides[slideIdx].style.position = 'relative';
    slides[slideIdx].classList.add('active');
    if (bgSlides[slideIdx]) bgSlides[slideIdx].classList.add('active');
    dots[slideIdx].classList.add('active');
    if (label) {
        label.style.opacity = '0';
        setTimeout(() => { label.textContent = carNames[slideIdx]; label.style.opacity = '1'; }, 300);
    }
    if (bignum) {
        bignum.style.opacity = '0';
        setTimeout(() => { bignum.textContent = String(slideIdx + 1).padStart(2, '0'); bignum.style.opacity = '1'; }, 300);
    }
}

function nextSlide() { goSlide(slideIdx + 1); }

// Auto-play every 4s
function startCarousel() {
    slideTimer = setInterval(nextSlide, 4000);
}
function stopCarousel() { clearInterval(slideTimer); }

// Init carousel on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.h-frame') || document.querySelector('.hero-carousel');
    if (wrap) {
        startCarousel();
        wrap.addEventListener('mouseenter', stopCarousel);
        wrap.addEventListener('mouseleave', startCarousel);
    }
});
// ══════════════════════════════════════════════
//  ✨ ANIMATIONS MAGNIFIQUES
// ══════════════════════════════════════════════

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
}, { passive: true });

// ── CURSEUR PERSONNALISÉ ──
const dot  = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;

if (dot && window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
    });
}

// ── CANVAS PARTICULES HERO ──
(function() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        const hero = canvas.closest('.hero');
        W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
        H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); });

    for (let i = 0; i < 55; i++) {
        particles.push({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.8 + 0.3,
            vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.15,
            isOrange: Math.random() > 0.6
        });
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        // Lignes de connexion
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(242,101,34,${(1 - dist/110) * 0.15})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.isOrange ? `rgba(242,101,34,${p.alpha})` : `rgba(255,255,255,${p.alpha * 0.5})`;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

// ── TILT 3D SUR LES CARTES VÉHICULES ──
function addTilt(el) {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        el.style.transform = `translateY(-12px) scale(1.02) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
        el.style.transition = 'transform .1s';
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1)';
    });
}
document.querySelectorAll('.cc').forEach(addTilt);

// ── COMPTEURS AVEC EASING ──
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function countUpSmooth(el, target) {
    if (el.animDone) return; el.animDone = true;
    const start = performance.now();
    const suffix = el.dataset.to == '98' ? '%' : '+';
    function frame(now) {
        const p = Math.min((now - start) / 1800, 1);
        el.textContent = Math.floor(easeOutCubic(p) * target) + suffix;
        if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}
const statsObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.hstat-n').forEach(el => countUpSmooth(el, +el.dataset.to));
    });
}, { threshold: 0.5 });
const hsEl = document.querySelector('.hero-stats');
if (hsEl) statsObs.observe(hsEl);

// ── TYPEWRITER SUR H-T3 ──
(function() {
    const el = document.querySelector('.h-t3');
    if (!el) return;
    const text = el.textContent.trim();
    el.textContent = '';
    el.style.opacity = '0.4';
    let i = 0;
    setTimeout(() => {
        const iv = setInterval(() => {
            if (i < text.length) { el.textContent += text[i++]; } else clearInterval(iv);
        }, 55);
    }, 1400);
})();

// ── RIPPLE SUR BOUTONS ──
const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes ripple-anim { to { transform:scale(30);opacity:0 } }';
document.head.appendChild(rippleStyle);

document.querySelectorAll('.h-btn-primary,.btn-red,.btn-wa-cta,.h-btn-wa,.btn-green,.modal-wa-btn').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function(e) {
        const rect = btn.getBoundingClientRect();
        const r = document.createElement('span');
        r.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.3);width:10px;height:10px;left:${e.clientX-rect.left-5}px;top:${e.clientY-rect.top-5}px;transform:scale(0);animation:ripple-anim .6s ease-out forwards;pointer-events:none;z-index:10;`;
        btn.appendChild(r);
        setTimeout(() => r.remove(), 650);
    });
});

// ── PARALLAXE HERO BG AU SCROLL ──
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.hbg-slide').forEach(s => {
        s.style.transform = `scale(1.07) translateY(${scrollY * 0.22}px)`;
    });
}, { passive: true });

// ── ACTIVE NAV LINK AU SCROLL ──
const navSections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
    let cur = '';
    navSections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) cur = s.id; });
    navAs.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
    });
}, { passive: true });

// ── UNDERLINE ANIMÉ SUR LES TITRES ──
const titleObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.stitle .r').forEach(el => el.classList.add('underline-anim'));
    });
}, { threshold: 0.3 });
document.querySelectorAll('.sr,.srl,.srr').forEach(el => titleObs.observe(el));
// ══════════════════════════════
//  GALERIE PHOTOS MULTI-IMAGES
// ══════════════════════════════
let galImages = [];
let galIdx = 0;

function openGallery(imgs) {
    galImages = imgs;
    galIdx = 0;
    renderGal();
    document.getElementById('galleryModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openGalleryFromModal() {
    if (!currentCar || !currentCar.gallery) return;
    const imgs = currentCar.gallery.split(',').map(s => s.trim());
    closeModal();
    setTimeout(() => openGallery(imgs), 200);
}

function renderGal() {
    document.getElementById('gal-main-img').src = galImages[galIdx];
    document.getElementById('gal-counter').textContent = (galIdx + 1) + ' / ' + galImages.length;
    const tb = document.getElementById('gallery-thumbs');
    tb.innerHTML = '';
    galImages.forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'gal-thumb' + (i === galIdx ? ' active' : '');
        img.onclick = () => { galIdx = i; renderGal(); };
        tb.appendChild(img);
    });
}

function galNav(dir) {
    galIdx = (galIdx + dir + galImages.length) % galImages.length;
    renderGal();
}

function closeGallery() {
    document.getElementById('galleryModal').classList.remove('open');
    document.body.style.overflow = '';
}

function closeGalleryOutside(e) { if (e.target.id === 'galleryModal') closeGallery(); }
document.addEventListener('keydown', e => {
    if (document.getElementById('galleryModal').classList.contains('open')) {
        if (e.key === 'ArrowLeft') galNav(-1);
        if (e.key === 'ArrowRight') galNav(1);
        if (e.key === 'Escape') closeGallery();
    }
});

// Résoudre une référence galerie (supporte __ref: et URLs normales)
function resolveGallery(card) {
    const raw = card.dataset.gallery || '';
    if (!raw) return [];
    if (raw.startsWith('__ref:')) {
        const id = raw.replace('__ref:','');
        return (window._carGalleries && window._carGalleries[id]) || [];
    }
    return raw.split(',').map(s=>s.trim()).filter(Boolean);
}
// Résoudre image principale
function resolveImg(card) {
    const raw = card.dataset.img || '';
    if (raw.startsWith('__ref:')) {
        const id = raw.split(':')[1];
        const gal = (window._carGalleries && window._carGalleries[id]) || [];
        return gal[0] || 'images/image1.jpg';
    }
    return raw || 'images/image1.jpg';
}

// Patch openModal pour gérer la galerie et afficher le bouton si multi-photos
const _origOpenModal = openModal;
openModal = function(card) {
    // Résoudre l'image principale avant d'appeler l'original
    const origImg = card.dataset.img;
    card.dataset.img = resolveImg(card);
    _origOpenModal(card);
    card.dataset.img = origImg; // restaurer
    const galleryWrap = document.getElementById('m-gallery-btn-wrap');
    const galImgs = resolveGallery(card);
    if (galImgs.length > 0) {
        galleryWrap.style.display = 'block';
        galleryWrap.querySelector('button').textContent = '📷 Voir les ' + galImgs.length + ' photos';
    } else {
        galleryWrap.style.display = 'none';
    }
};

// Patch openGalleryFromModal pour utiliser resolveGallery
const _origOpenGalleryFromModal = openGalleryFromModal;
openGalleryFromModal = function() {
    if (!currentCar) return;
    // Trouver la carte courante
    const cardEl = document.querySelector('.cc[data-maker="'+currentCar.maker+'"][data-name="'+currentCar.name+'"]');
    let imgs = [];
    if (cardEl) imgs = resolveGallery(cardEl);
    if (!imgs.length && currentCar.gallery) {
        imgs = currentCar.gallery.startsWith('__ref:')
            ? (window._carGalleries[currentCar.gallery.replace('__ref:','')] || [])
            : currentCar.gallery.split(',').map(s=>s.trim()).filter(Boolean);
    }
    if (!imgs.length) return;
    closeModal();
    setTimeout(() => openGallery(imgs), 200);
};

// ══════════════════════════════════════════════
//  ADMIN COMPLET — Gestion, Ajout, Modification
//  Activer : Ctrl+Shift+A
// ══════════════════════════════════════════════

// ── Ouvrir / Fermer ──
let _adminTyped = '';
function openAdminPanel() {
    document.getElementById('admin-overlay').style.display = 'block';
    const p = document.getElementById('admin-panel');
    p.style.display = 'flex';
    adminTab('list');
}
function closeAdminPanel() {
    document.getElementById('admin-overlay').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'none';
    // Cacher le bouton Admin dès qu'on ferme le panneau
    document.getElementById('admin-toggle-btn').style.display = 'none';
}
function toggleAdmin() { openAdminPanel(); }

// Écouter la frappe du mot de passe "karim24" n'importe où sur la page
document.addEventListener('keydown', e => {
    // Ne pas capturer si on est dans un input/textarea
    if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
    _adminTyped += e.key;
    if (_adminTyped.length > 8) _adminTyped = _adminTyped.slice(-8);
    if (_adminTyped === 'karim24') {
        _adminTyped = '';
        document.getElementById('admin-toggle-btn').style.display = 'block';
        openAdminPanel();
    }
});

// ── Onglets ──
function adminTab(tab) {
    ['list','add','edit'].forEach(t => {
        document.getElementById('tab-'+t).style.display = t === tab ? 'block' : 'none';
        const btn = document.getElementById('atab-'+t);
        if (btn) { btn.style.background = t === tab ? '#f26522' : '#1a1a2e'; btn.style.color = t === tab ? '#fff' : '#666'; }
    });
    if (tab === 'list') buildAdminList();
    if (tab === 'add') buildAddForm();
    if (tab === 'edit') buildEditSelect();
}

// ── Stockage base64 des images par formulaire ──
const _imgStore = {}; // { 'add-img': 'data:...', 'add-gallery': ['data:...', ...] }

// ── Champs du formulaire voiture ──
function carFormFields(prefix, data) {
    const d = data || {};
    const fg = (label, id, type, val, ph, opts) => {
        const inputId = prefix + '-' + id;
        const baseStyle = 'width:100%;padding:10px 13px;background:#111;border:1px solid #2a2a4a;border-radius:10px;color:#fff;font-size:13px;outline:none;';
        if (type === 'select') {
            const options = opts.map(o => `<option value="${o.v}" ${o.v === val ? 'selected' : ''}>${o.l}</option>`).join('');
            return `<div class="afg"><label class="afl">${label}</label><select id="${inputId}" style="${baseStyle}">${options}</select></div>`;
        }
        if (type === 'textarea') {
            return `<div class="afg afg-full"><label class="afl">${label}</label><textarea id="${inputId}" rows="2" placeholder="${ph||''}" style="${baseStyle}resize:vertical">${val||''}</textarea></div>`;
        }
        return `<div class="afg"><label class="afl">${label}</label><input type="${type||'text'}" id="${inputId}" value="${val||''}" placeholder="${ph||''}" style="${baseStyle}"></div>`;
    };

    const badgeOpts = [
        {v:'Vente',l:'Vente'},{v:'Prestige',l:'Prestige'},{v:'Promo',l:'Promo'},
        {v:'Neuf',l:'Neuf'},{v:'Location',l:'Location'},{v:'Dédouané',l:'Dédouané'},
        {v:'Bon Plan',l:'Bon Plan'}
    ];
    const badgeColorOpts = [
        {v:'t-s',l:'Bleu — Vente'},{v:'t-p',l:'Or — Prestige'},{v:'t-promo',l:'Rouge — Promo'},
        {v:'t-e',l:'Vert — Neuf/Déd.'},{v:'t-l',l:'Bleu foncé — Location'}
    ];
    const catOpts = [
        {v:'vente',l:'Vente'},{v:'location',l:'Location'},{v:'vente suv',l:'Vente + SUV'},
        {v:'location suv',l:'Location + SUV'},{v:'vente citadine',l:'Vente + Citadine'},
        {v:'location citadine',l:'Location + Citadine'}
    ];
    const ptypeOpts = [
        {v:'Prix de vente',l:'Prix de vente'},{v:'par jour',l:'par jour (location)'}
    ];

    // Image principale existante (pour édition)
    const existingImg = d.img && d.img.startsWith('data:') ? d.img : (d.img || '');
    const existingGallery = d.gallery ? d.gallery.split(',').map(s=>s.trim()).filter(Boolean) : [];

    return `
    <style>
    .afg{display:flex;flex-direction:column;gap:5px}
    .afg-full{grid-column:1/-1}
    .afl{font-size:11px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.4px}
    .aform{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .asec{font-size:11px;color:#f26522;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:10px 0 4px;border-top:1px solid #1e1e3a;grid-column:1/-1;margin-top:4px}
    .img-pick-btn{width:100%;padding:12px;background:#0f0f22;border:2px dashed #2a2a5a;border-radius:12px;color:#aaa;cursor:pointer;font-size:13px;text-align:center;transition:.2s;display:flex;align-items:center;justify-content:center;gap:8px}
    .img-pick-btn:hover{border-color:#f26522;color:#f26522;background:#140a00}
    .img-preview-main{width:100%;height:110px;object-fit:cover;border-radius:10px;margin-top:6px;border:2px solid #2a2a4a;display:none}
    .gal-pick-zone{grid-column:1/-1;display:flex;flex-direction:column;gap:8px}
    .gal-pick-btn{width:100%;padding:16px;background:#0f0f22;border:2px dashed #2a2a5a;border-radius:12px;color:#aaa;cursor:pointer;font-size:13px;text-align:center;transition:.2s;display:flex;align-items:center;justify-content:center;gap:8px}
    .gal-pick-btn:hover{border-color:#f26522;color:#f26522;background:#140a00}
    .gal-thumbs-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
    .gal-thumb-item{position:relative;width:72px;height:56px;border-radius:8px;overflow:hidden;border:2px solid #2a2a4a;flex-shrink:0}
    .gal-thumb-item img{width:100%;height:100%;object-fit:cover}
    .gal-thumb-item .gal-del{position:absolute;top:2px;right:2px;background:rgba(239,68,68,.9);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
    .gal-thumb-item .gal-main-star{position:absolute;bottom:2px;left:2px;background:rgba(242,101,34,.9);color:#fff;border:none;border-radius:4px;padding:1px 4px;font-size:9px;cursor:pointer;font-weight:700}
    </style>
    <div class="aform">
      <div class="asec">🚗 Informations principales</div>
      ${fg('Marque','maker','text',d.maker,'ex: Toyota')}
      ${fg('Modèle','name','text',d.name,'ex: Hilux 4×4 2020')}
      ${fg('Prix','price','text',d.price,'ex: 17 000 000 FCFA')}
      ${fg('Type de prix','ptype','select',d.ptype,'',ptypeOpts)}
      ${fg('Catégorie(s)','cat','select',d.cat,'',catOpts)}
      ${fg('Badge','badge','select',d.badge,'',badgeOpts)}
      ${fg('Couleur badge','bc','select',d.bc,'',badgeColorOpts)}

      <div class="afg afg-full">
        <label class="afl">📸 Image principale</label>
        <input type="file" id="${prefix}-img-file" accept="image/*" style="display:none" onchange="handleMainImg(this,'${prefix}')">
        <div class="img-pick-btn" onclick="document.getElementById('${prefix}-img-file').click()">
          <span style="font-size:20px">🖼️</span>
          <span>Choisir l'image principale depuis la galerie</span>
        </div>
        <img id="${prefix}-img-preview" class="img-preview-main" src="${existingImg}" style="${existingImg?'display:block':'display:none'}">
        <input type="hidden" id="${prefix}-img" value="${existingImg}">
      </div>

      <div class="asec">📊 Caractéristiques (4 specs)</div>
      ${fg('Spec 1 — Icône','s1i','text',d.s1i,'ex: ⚡')}
      ${fg('Spec 1 — Valeur','s1','text',d.s1,'ex: 2020')}
      ${fg('Spec 1 — Label','s1l','text',d.s1l,'ex: Année')}
      ${fg('Spec 2 — Icône','s2i','text',d.s2i,'ex: ⚙️')}
      ${fg('Spec 2 — Valeur','s2','text',d.s2,'ex: Gasoil Auto')}
      ${fg('Spec 2 — Label','s2l','text',d.s2l,'ex: Moteur')}
      ${fg('Spec 3 — Icône','s3i','text',d.s3i,'ex: 🔄')}
      ${fg('Spec 3 — Valeur','s3','text',d.s3,'ex: 4×4')}
      ${fg('Spec 3 — Label','s3l','text',d.s3l,'ex: Transmission')}
      ${fg('Spec 4 — Icône','s4i','text',d.s4i,'ex: ❄️')}
      ${fg('Spec 4 — Valeur','s4','text',d.s4,'ex: Climatisée')}
      ${fg('Spec 4 — Label','s4l','text',d.s4l,'ex: Confort')}

      <div class="asec">📝 Description & Options</div>
      ${fg('Description','desc','textarea',d.desc,'Description complète du véhicule...')}
      ${fg('Options (séparées par virgule)','opts','textarea',d.opts,'Climatisation, 4×4, GPS, ...')}

      <div class="gal-pick-zone">
        <label class="afl">🖼️ Galerie de photos (plusieurs images)</label>
        <input type="file" id="${prefix}-gallery-file" accept="image/*" multiple style="display:none" onchange="handleGalleryImgs(this,'${prefix}')">
        <div class="gal-pick-btn" onclick="document.getElementById('${prefix}-gallery-file').click()">
          <span style="font-size:22px">📂</span>
          <span>Appuyer ici pour choisir les photos depuis la galerie</span>
        </div>
        <div class="gal-thumbs-wrap" id="${prefix}-gal-thumbs">
          ${existingGallery.map((src,i) => `
            <div class="gal-thumb-item" id="${prefix}-gthumb-${i}">
              <img src="${src}">
              <button class="gal-del" onclick="removeGalImg('${prefix}',${i})">✕</button>
              ${i===0 ? '' : `<button class="gal-main-star" onclick="setMainFromGal('${prefix}',${i})">★ main</button>`}
            </div>`).join('')}
        </div>
        <input type="hidden" id="${prefix}-gallery" value="${d.gallery||''}">
        <div id="${prefix}-gal-count" style="font-size:11px;color:#555;margin-top:2px">${existingGallery.length>0?existingGallery.length+' photo(s) dans la galerie':''}</div>
      </div>
    </div>`;
}

// ── Gérer l'image principale ──
function handleMainImg(input, prefix) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const src = e.target.result;
        const preview = document.getElementById(prefix+'-img-preview');
        const hidden = document.getElementById(prefix+'-img');
        preview.src = src;
        preview.style.display = 'block';
        hidden.value = src;
    };
    reader.readAsDataURL(file);
}

// ── Gérer la galerie (plusieurs images) ──
function handleGalleryImgs(input, prefix) {
    const files = Array.from(input.files);
    if (!files.length) return;
    const thumbsWrap = document.getElementById(prefix+'-gal-thumbs');
    const hiddenGal = document.getElementById(prefix+'-gallery');
    const count = document.getElementById(prefix+'-gal-count');
    // Lire toutes les images existantes déjà chargées
    let existing = hiddenGal.value ? hiddenGal.value.split(',').map(s=>s.trim()).filter(Boolean) : [];
    let loaded = 0;
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            existing.push(e.target.result);
            loaded++;
            if (loaded === files.length) {
                // Mettre à jour le hidden input
                hiddenGal.value = existing.join(',');
                // Rebâtir les miniatures
                rebuildGalThumbs(prefix, existing);
                count.textContent = existing.length + ' photo(s) dans la galerie';
            }
        };
        reader.readAsDataURL(file);
    });
}

function rebuildGalThumbs(prefix, imgs) {
    const wrap = document.getElementById(prefix+'-gal-thumbs');
    wrap.innerHTML = imgs.map((src, i) => `
        <div class="gal-thumb-item" id="${prefix}-gthumb-${i}">
          <img src="${src}">
          <button class="gal-del" onclick="removeGalImg('${prefix}',${i})">✕</button>
          ${i===0 ? '' : `<button class="gal-main-star" onclick="setMainFromGal('${prefix}',${i})">★ main</button>`}
        </div>`).join('');
}

function removeGalImg(prefix, idx) {
    const hiddenGal = document.getElementById(prefix+'-gallery');
    let imgs = hiddenGal.value.split(',').map(s=>s.trim()).filter(Boolean);
    imgs.splice(idx, 1);
    hiddenGal.value = imgs.join(',');
    rebuildGalThumbs(prefix, imgs);
    const count = document.getElementById(prefix+'-gal-count');
    count.textContent = imgs.length > 0 ? imgs.length + ' photo(s) dans la galerie' : '';
}

function setMainFromGal(prefix, idx) {
    const hiddenGal = document.getElementById(prefix+'-gallery');
    let imgs = hiddenGal.value.split(',').map(s=>s.trim()).filter(Boolean);
    if (idx >= imgs.length) return;
    const chosen = imgs.splice(idx, 1)[0];
    imgs.unshift(chosen);
    hiddenGal.value = imgs.join(',');
    // Also set as main image
    const preview = document.getElementById(prefix+'-img-preview');
    const hidden = document.getElementById(prefix+'-img');
    if (preview && hidden) { preview.src = chosen; preview.style.display = 'block'; hidden.value = chosen; }
    rebuildGalThumbs(prefix, imgs);
}

// ── Lire les valeurs du formulaire ──
function readForm(prefix) {
    const v = id => (document.getElementById(prefix+'-'+id)||{}).value || '';
    return {
        maker:v('maker'), name:v('name'), price:v('price'), ptype:v('ptype'),
        cat:v('cat'), badge:v('badge'), bc:v('bc'), img:v('img'),
        s1:v('s1'), s1l:v('s1l'), s1i:v('s1i'),
        s2:v('s2'), s2l:v('s2l'), s2i:v('s2i'),
        s3:v('s3'), s3l:v('s3l'), s3i:v('s3i'),
        s4:v('s4'), s4l:v('s4l'), s4i:v('s4i'),
        desc:v('desc'), opts:v('opts'), gallery:v('gallery')
    };
}

// Stockage global galeries (images base64 trop grandes pour data-attributes)
if (!window._carGalleries) window._carGalleries = {};

// ── Construire la carte HTML d'une voiture ──
function buildCarCard(d, id) {
    const isLoc = d.ptype === 'par jour';
    const priceHtml = isLoc ? `${d.price} <small>/jour</small>` : d.price;
    // Galerie : stocker dans l'objet global, ne mettre que le flag dans le data-attribute
    const galImgs = d.gallery ? d.gallery.split(',').map(s=>s.trim()).filter(Boolean) : [];
    if (galImgs.length > 0) window._carGalleries[id] = galImgs;
    const galleryAttr = galImgs.length > 0 ? ` data-gallery="__ref:${id}"` : '';
    const galleryBadge = galImgs.length > 0 ? `<span class="gallery-count">📷 ${galImgs.length} photos</span>` : '';
    const safeDesc = (d.desc||'').replace(/"/g,'&quot;').replace(/\n/g,' ');
    const safeOpts = (d.opts||'').replace(/"/g,'&quot;');
    // Image principale : si base64, on la met directement dans le src de l'img, pas dans data-img
    const imgSrc = d.img || 'images/image1.jpg';
    return `
    <div class="cc" data-cat="${d.cat}" id="${id}"
      data-img="${imgSrc.startsWith('data:') ? '__ref:'+id+':img' : imgSrc}"
      data-maker="${d.maker}" data-name="${d.name}"
      data-price="${d.price}" data-ptype="${d.ptype}"
      data-badge="${d.badge}" data-bc="${d.bc}"
      data-s1="${d.s1}" data-s1l="${d.s1l}" data-s1i="${d.s1i}"
      data-s2="${d.s2}" data-s2l="${d.s2l}" data-s2i="${d.s2i}"
      data-s3="${d.s3}" data-s3l="${d.s3l}" data-s3i="${d.s3i}"
      data-s4="${d.s4}" data-s4l="${d.s4l}" data-s4i="${d.s4i}"
      data-desc="${safeDesc}"
      data-opts="${safeOpts}"${galleryAttr}>
      <div class="cc-img" style="position:relative">
        <img src="${imgSrc}" alt="${d.maker} ${d.name}" onerror="this.src='images/image1.jpg'">
        <span class="ctag ${d.bc}">${d.badge}</span>
        ${galleryBadge}
      </div>
      <div class="cc-body">
        <div class="cc-mk">${d.maker}</div>
        <div class="cc-mo">${d.name}</div>
        <div class="pills">
          <span class="pill">${d.s1}</span>
          <span class="pill">${d.s2}</span>
          <span class="pill">${d.s3}</span>
        </div>
        <div class="cc-ft">
          <div class="cc-price">${priceHtml}</div>
          <div class="cc-actions">
            <button class="cc-btn-detail" onclick="openModal(this.closest('.cc'))">🔍 Détails</button>
            <button class="cc-btn-res" onclick="reserver('${d.maker} ${d.name}','${d.price}')">💬 Réserver</button>
          </div>
        </div>
      </div>
    </div>`;
}

// ── Formulaire AJOUTER ──
function buildAddForm() {
    document.getElementById('admin-form-add').innerHTML = carFormFields('add', {});
    document.getElementById('add-feedback').style.display = 'none';
}

function submitAddCar() {
    const d = readForm('add');
    if (!d.maker || !d.name || !d.price) { alert('Marque, Modèle et Prix sont obligatoires.'); return; }
    if (!d.img) { alert('Veuillez choisir une image principale.'); return; }
    const id = 'car-' + Date.now();
    // Stocker les images dans le store global
    if (!window._carGalleries) window._carGalleries = {};
    const galImgs = d.gallery ? d.gallery.split(',').map(s=>s.trim()).filter(Boolean) : [];
    if (d.img) window._carGalleries[id] = [d.img, ...galImgs.filter(g=>g!==d.img)];
    else if (galImgs.length) window._carGalleries[id] = galImgs;
    // Sauvegarder galeries dans localStorage (séparé pour ne pas dépasser la limite)
    try {
        const savedGals = JSON.parse(localStorage.getItem('carGalleries') || '{}');
        savedGals[id] = window._carGalleries[id] || [];
        localStorage.setItem('carGalleries', JSON.stringify(savedGals));
    } catch(e) { console.warn('localStorage plein, galeries non sauvegardées:', e); }
    // Construire et insérer la carte
    const html = buildCarCard(d, id);
    document.getElementById('carGrid').insertAdjacentHTML('beforeend', html);
    const newCard = document.getElementById(id);
    addTilt(newCard);
    co.observe(newCard);
    // Sauvegarder les données (sans les base64 pour économiser l'espace)
    const dToSave = { ...d, id };
    if (dToSave.img && dToSave.img.startsWith('data:')) dToSave.img = '__ref:'+id+':img';
    if (dToSave.gallery && dToSave.gallery.includes('data:')) dToSave.gallery = '__ref:'+id;
    try {
        let addedCars = JSON.parse(localStorage.getItem('addedCars') || '[]');
        addedCars.push(dToSave);
        localStorage.setItem('addedCars', JSON.stringify(addedCars));
    } catch(e) { console.warn('localStorage plein:', e); }
    // Feedback
    const fb = document.getElementById('add-feedback');
    fb.textContent = '✅ ' + d.maker + ' ' + d.name + ' ajouté avec succès !';
    fb.style.display = 'block';
    setTimeout(() => fb.style.display = 'none', 3000);
    buildAddForm();
    setTimeout(() => adminTab('list'), 1500);
}

// ── Formulaire MODIFIER ──
function buildEditSelect() {
    const sel = document.getElementById('edit-car-select');
    sel.innerHTML = '<option value="">— Sélectionner une voiture —</option>';
    document.querySelectorAll('.cc').forEach(card => {
        if (card.classList.contains('admin-hidden')) return;
        const name = (card.dataset.maker||'') + ' ' + (card.dataset.name||'');
        const opt = document.createElement('option');
        opt.value = card.id;
        opt.textContent = name;
        sel.appendChild(opt);
    });
    document.getElementById('admin-form-edit').innerHTML = '';
    document.getElementById('edit-actions').style.display = 'none';
}

function loadCarForEdit() {
    const cardId = document.getElementById('edit-car-select').value;
    if (!cardId) { document.getElementById('admin-form-edit').innerHTML = ''; document.getElementById('edit-actions').style.display = 'none'; return; }
    const card = document.getElementById(cardId);
    if (!card) return;
    document.getElementById('admin-form-edit').innerHTML = carFormFields('edit', card.dataset);
    document.getElementById('edit-actions').style.display = 'flex';
}

function submitEditCar() {
    const cardId = document.getElementById('edit-car-select').value;
    if (!cardId) return;
    const card = document.getElementById(cardId);
    if (!card) return;
    const d = readForm('edit');
    if (!d.maker || !d.name || !d.price) { alert('Marque, Modèle et Prix sont obligatoires.'); return; }
    // Update all data attributes
    Object.keys(d).forEach(k => card.dataset[k] = d[k]);
    // Rebuild card HTML (keep id and classes)
    const classes = card.className;
    const newHtml = buildCarCard(d, cardId);
    card.outerHTML = newHtml;
    // Restore classes (sold, etc.)
    const updatedCard = document.getElementById(cardId);
    if (updatedCard) { updatedCard.className = classes; addTilt(updatedCard); co.observe(updatedCard); }
    // Save edit to localStorage
    let editedCars = JSON.parse(localStorage.getItem('editedCars') || '{}');
    editedCars[cardId] = d;
    localStorage.setItem('editedCars', JSON.stringify(editedCars));
    // Feedback
    const fb = document.getElementById('edit-feedback');
    fb.textContent = '✅ Modifications enregistrées !';
    fb.style.display = 'block';
    setTimeout(() => fb.style.display = 'none', 3000);
    buildEditSelect();
}

// ── Liste Stock ──
function buildAdminList() {
    const list = document.getElementById('admin-car-list');
    list.innerHTML = '';
    let count = 0;
    document.querySelectorAll('.cc').forEach((card, i) => {
        if (!card.id) card.id = 'car-' + i;
        const hidden = card.classList.contains('admin-hidden');
        const sold = card.classList.contains('sold');
        const name = (card.dataset.maker||'') + ' ' + (card.dataset.name||'').split(' ').slice(0,4).join(' ');
        const price = card.dataset.price || '';
        count++;

        const row = document.createElement('div');
        row.id = 'adminrow-' + card.id;
        row.style.cssText = `display:flex;align-items:center;gap:8px;background:${hidden?'#0d0d0d':'#111126'};padding:10px 12px;border-radius:12px;border:1px solid ${hidden?'#1a1a1a':'#1e1e3a'};opacity:${hidden?.5:1};transition:.2s`;
        row.innerHTML = `
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:700;color:${hidden?'#555':'#ddd'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
            <div style="font-size:11px;color:#555;margin-top:2px">${price}${sold?'&nbsp;&nbsp;<span style="color:#f59e0b;font-weight:700">● VENDU</span>':''}${hidden?'&nbsp;&nbsp;<span style="color:#ef4444;font-weight:700">● CACHÉ</span>':''}</div>
          </div>
          ${!hidden ? `
          <button onclick="adminEditCar('${card.id}')" title="Modifier" style="width:32px;height:32px;border-radius:8px;border:1px solid #2a2a4a;background:#0f0f2a;color:#60a5fa;cursor:pointer;font-size:14px">✏️</button>
          <button onclick="toggleSold(this,'${card.id}')" title="${sold?'Marquer disponible':'Marquer vendu'}" style="width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;background:${sold?'#16a34a':'#92400e'};color:#fff;font-size:14px">${sold?'✅':'🏷️'}</button>
          <button onclick="deleteCarAdmin('${card.id}')" title="Masquer" style="width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;background:#3f1111;color:#ef4444;font-size:14px">🗑️</button>
          ` : `
          <button onclick="restoreCarAdmin('${card.id}')" title="Restaurer" style="padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:#1e3a1e;color:#22c55e;font-size:11px;font-weight:700">↩️ Restaurer</button>
          `}`;
        list.appendChild(row);
    });
    if (count === 0) {
        list.innerHTML = '<div style="text-align:center;color:#444;padding:30px;font-size:13px">Aucun véhicule dans le catalogue.</div>';
    }
}

function adminEditCar(cardId) {
    adminTab('edit');
    setTimeout(() => {
        const sel = document.getElementById('edit-car-select');
        sel.value = cardId;
        loadCarForEdit();
    }, 100);
}

function toggleSold(btn, cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const isSold = card.classList.toggle('sold');
    btn.textContent = isSold ? '✅' : '🏷️';
    btn.style.background = isSold ? '#16a34a' : '#92400e';
    let soldCars = JSON.parse(localStorage.getItem('soldCars') || '[]');
    if (isSold) { if (!soldCars.includes(cardId)) soldCars.push(cardId); }
    else soldCars = soldCars.filter(id => id !== cardId);
    localStorage.setItem('soldCars', JSON.stringify(soldCars));
    buildAdminList();
}

function deleteCarAdmin(cardId) {
    if (!confirm('Masquer cette voiture du catalogue ?')) return;
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.add('admin-hidden');
    card.style.display = 'none';
    let deletedCars = JSON.parse(localStorage.getItem('deletedCars') || '[]');
    if (!deletedCars.includes(cardId)) deletedCars.push(cardId);
    localStorage.setItem('deletedCars', JSON.stringify(deletedCars));
    buildAdminList();
}

function restoreCarAdmin(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.remove('admin-hidden');
    card.style.display = '';
    let deletedCars = JSON.parse(localStorage.getItem('deletedCars') || '[]');
    deletedCars = deletedCars.filter(id => id !== cardId);
    localStorage.setItem('deletedCars', JSON.stringify(deletedCars));
    buildAdminList();
}

// ── Restaurer l'état au chargement ──
window.addEventListener('DOMContentLoaded', () => {
    // Restaurer galeries sauvegardées (base64)
    if (!window._carGalleries) window._carGalleries = {};
    try {
        const savedGals = JSON.parse(localStorage.getItem('carGalleries') || '{}');
        Object.assign(window._carGalleries, savedGals);
    } catch(e) {}
    // Restaurer voitures vendues
    const soldCars = JSON.parse(localStorage.getItem('soldCars') || '[]');
    soldCars.forEach(id => { const c = document.getElementById(id); if (c) c.classList.add('sold'); });
    // Restaurer voitures masquées
    const deletedCars = JSON.parse(localStorage.getItem('deletedCars') || '[]');
    deletedCars.forEach(id => { const c = document.getElementById(id); if (c) { c.classList.add('admin-hidden'); c.style.display = 'none'; }});
    // Restaurer voitures ajoutées dynamiquement
    const addedCars = JSON.parse(localStorage.getItem('addedCars') || '[]');
    addedCars.forEach(d => {
        if (document.getElementById(d.id)) return;
        // Résoudre les références d'images depuis le store
        const dResolved = { ...d };
        if (dResolved.img && dResolved.img.startsWith('__ref:')) {
            const refId = dResolved.img.split(':')[1];
            const gal = window._carGalleries[refId] || [];
            dResolved.img = gal[0] || 'images/image1.jpg';
        }
        if (dResolved.gallery && dResolved.gallery.startsWith('__ref:')) {
            const refId = dResolved.gallery.replace('__ref:','');
            const gal = window._carGalleries[refId] || [];
            dResolved.gallery = gal.join(',');
        }
        const html = buildCarCard(dResolved, d.id);
        const grid = document.getElementById('carGrid');
        if (grid) { grid.insertAdjacentHTML('beforeend', html); const c = document.getElementById(d.id); if(c){addTilt(c);co.observe(c);} }
    });
    // Restaurer modifications
    const editedCars = JSON.parse(localStorage.getItem('editedCars') || '{}');
    Object.entries(editedCars).forEach(([cardId, d]) => {
        const card = document.getElementById(cardId);
        if (!card) return;
        const classes = card.className;
        card.outerHTML = buildCarCard(d, cardId);
        const uc = document.getElementById(cardId);
        if (uc) { uc.className = classes; addTilt(uc); co.observe(uc); }
    });
});