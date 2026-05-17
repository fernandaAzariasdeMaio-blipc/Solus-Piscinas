/* ── SOLUS PISCINAS v2 — script.js ── */

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Solus Piscinas v2: Sistema carregado.');

    /* 1. SISTEMA DE REVEAL (Animações de entrada) */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


    /* 2. SLIDER ANTES E DEPOIS */
    const slider = document.getElementById('baSlider');
    const afterPanel = document.getElementById('baAfterPanel');
    const handle = document.getElementById('baHandle');

    if (slider && afterPanel && handle) {
        let dragging = false;

        function setSliderPos(clientX) {
            const rect = slider.getBoundingClientRect();
            let pct = ((clientX - rect.left) / rect.width) * 100;
            pct = Math.min(Math.max(pct, 0), 100);
            afterPanel.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
            handle.style.left = `${pct}%`;
        }

        afterPanel.style.clipPath = 'inset(0 50% 0 0)';
        handle.style.left = '50%';

        slider.addEventListener('mousedown', e => { dragging = true; setSliderPos(e.clientX); });
        window.addEventListener('mousemove', e => { if (dragging) setSliderPos(e.clientX); });
        window.addEventListener('mouseup', () => { dragging = false; });

        slider.addEventListener('touchstart', e => {
            dragging = true;
            setSliderPos(e.touches[0].clientX);
        }, { passive: true });
        window.addEventListener('touchmove', e => {
            if (dragging) setSliderPos(e.touches[0].clientX);
        }, { passive: true });
        window.addEventListener('touchend', () => { dragging = false; });
    }


    /* 3. NAV — SOLID ON SCROLL */
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('solid', window.scrollY > 50);
        }, { passive: true });
    }


  /* 4. BURGER MENU */
const burger = document.querySelector('.burger');
const navList = document.querySelector('.nav-list');

if (burger && navList) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navList.classList.toggle('nav-open');
    });

    // Fecha ao clicar em links do menu
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('nav-open');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

    /* 5. SISTEMA DE ABAS (SERVIÇOS) */
     const snavBtns = document.querySelectorAll('.snav-btn');
     const serviceBlocks = document.querySelectorAll('.service-block');

    if (snavBtns.length && serviceBlocks.length) {
        // Garante que só o primeiro bloco aparece ao carregar
        serviceBlocks.forEach((block, i) => {
            block.style.display = i === 0 ? 'block' : 'none';
        });

        snavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');

                // Atualiza botões ativos
                snavBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Mostra/oculta blocos
                serviceBlocks.forEach(block => {
                    block.style.display = block.id === targetId ? 'block' : 'none';
                });

                // Scroll suave até a seção
                const target = document.getElementById(targetId);
                if (target) {
                    const offset = nav ? nav.offsetHeight + 16 : 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }


    /* 6. FAQ ACCORDION */
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-q');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            // Fecha todos
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                const q = i.querySelector('.faq-q');
                if (q) q.setAttribute('aria-expanded', 'false');
            });
            // Abre o clicado se estava fechado
            if (!wasOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });


    /* 7. SMOOTH SCROLL para links âncora */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = nav ? nav.offsetHeight + 16 : 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

});
