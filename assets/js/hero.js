/**
 * Trip Departure - Cinematic Immersive Travel Hero Engine
 * Controls full-bleed crossfade, dynamic accent themes, text slide-up mask,
 * glass thumbnail dock, 60fps canvas bokeh, and lerp mouse parallax.
 */

(function () {
  'use strict';

  // Signal to main.js that dedicated cinematic hero engine is active
  window.CINEMATIC_HERO_LOADED = true;

  // 1. Destination Database with Distinct Accents & Verified Imagery
  const CINEMATIC_DESTINATIONS = [
    {
      name: 'Kashmir Valley',
      tagline: 'Heavenly Kashmir & Gulmarg Snow',
      sub: 'Luxury Houseboat on Dal Lake, Phase-1 Gondola & Lidder River Valley',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2200&q=85',
      thumb: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=300&h=200&q=80',
      weather: '☀️ 16°C • Dal Lake, Srinagar',
      price: '16,999',
      priceNum: 16999,
      duration: '6 Days • 5 Nights',
      ticketTitle: '15 Oct • 4 Seats Left',
      ticketSub: 'Next Group Departure',
      badge: 'Signature Tour',
      modalId: 'kashmir-paradise',
      accent: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.45)',
      accentGrad: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)'
    },
    {
      name: 'Royal Rajasthan',
      tagline: 'Grand Rajasthan Forts & Desert Haveli',
      sub: 'Amber Fort Jeep Ascent, Mehrangarh Heritage & Lake Pichola Stays',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2200&q=85',
      thumb: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=300&h=200&q=80',
      weather: '🏰 26°C • Amber Fort, Jaipur',
      price: '18,499',
      priceNum: 18499,
      duration: '7 Days • 6 Nights',
      ticketTitle: '18 Oct • 6 Seats Left',
      ticketSub: 'Next Group Departure',
      badge: 'Royal Heritage',
      modalId: 'rajasthan-royals',
      accent: '#f59e0b',
      accentGlow: 'rgba(245, 158, 11, 0.45)',
      accentGrad: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
    },
    {
      name: 'Ladakh High Passes',
      tagline: 'Mystic Ladakh & Nubra Valley Safari',
      sub: 'Khardung La Pass (17,582 ft), Pangong Tso Swiss Camps & Bactrian Camels',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2200&q=85',
      thumb: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=300&h=200&q=80',
      weather: '❄️ 8°C • Pangong Tso, 14,270 ft',
      price: '23,999',
      priceNum: 23999,
      duration: '7 Days • 6 Nights',
      ticketTitle: '20 Oct • 3 Seats Left',
      ticketSub: 'Next Adventure Departure',
      badge: 'Himalayan Wonder',
      modalId: 'ladakh-pangong',
      accent: '#06b6d4',
      accentGlow: 'rgba(6, 182, 212, 0.45)',
      accentGrad: 'linear-gradient(135deg, #06b6d4 0%, #38bdf8 100%)'
    },
    {
      name: 'Kerala Backwaters',
      tagline: "God's Own Country & Munnar Hills",
      sub: 'Private Alleppey Houseboat Cruise, Tea Gardens & Kathakali Show',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2200&q=85',
      thumb: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=300&h=200&q=80',
      weather: '🌴 28°C • Alleppey Backwaters',
      price: '14,499',
      priceNum: 14499,
      duration: '5 Days • 4 Nights',
      ticketTitle: '22 Oct • 5 Seats Left',
      ticketSub: 'Next Group Departure',
      badge: 'Tropical Serenity',
      modalId: 'kerala-gods-own',
      accent: '#10b981',
      accentGlow: 'rgba(16, 185, 129, 0.45)',
      accentGrad: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    },
    {
      name: 'Himachal & Manali',
      tagline: 'Shimla, Kullu & Manali Solang Valley',
      sub: 'Solang Snow Sports, Atal Tunnel Sissu Valley & Riverfront Mountain Stays',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2200&q=85',
      thumb: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=300&h=200&q=80',
      weather: '❄️ 10°C • Solang & Rohtang Pass',
      price: '15,499',
      priceNum: 15499,
      duration: '6 Days • 5 Nights',
      ticketTitle: '24 Oct • 4 Seats Left',
      ticketSub: 'Next Group Departure',
      badge: 'Pine & Snow Valley',
      modalId: 'himachal-manali-shimla',
      accent: '#6366f1',
      accentGlow: 'rgba(99, 102, 241, 0.45)',
      accentGrad: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
    },
    {
      name: 'Dubai Desert & Luxury',
      tagline: 'Futuristic Dubai & Dune Bashing 5D/4N',
      sub: 'Burj Khalifa 124th Floor, 4x4 Desert Dune Bashing & 5★ Marina Dhow Cruise',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85',
      thumb: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&h=200&q=80',
      weather: '✨ 29°C • Dubai Marina & Desert',
      price: '36,999',
      priceNum: 36999,
      duration: '5 Days • 4 Nights',
      ticketTitle: '28 Oct • 2 Seats Left',
      ticketSub: 'Next International Departure',
      badge: 'Global Luxury',
      modalId: 'dubai-futuristic',
      accent: '#eab308',
      accentGlow: 'rgba(234, 179, 8, 0.45)',
      accentGrad: 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)'
    },
    {
      name: 'Goa Golden Coast',
      tagline: 'Sun-Kissed Beaches & Sunset Cruises',
      sub: 'North Goa Shacks & Water Sports, Aguada Fort & Mandovi River Sunset Cruise',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=85',
      thumb: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&h=200&q=80',
      weather: '☀️ 31°C • Calangute & Baga Coast',
      price: '11,999',
      priceNum: 11999,
      duration: '4 Days • 3 Nights',
      ticketTitle: '29 Oct • 8 Seats Left',
      ticketSub: 'Next Beach Group Departure',
      badge: 'Tropical Escape',
      modalId: 'goa-sun-sand',
      accent: '#f43f5e',
      accentGlow: 'rgba(244, 63, 94, 0.45)',
      accentGrad: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)'
    }
  ];

  // Preload all destination images immediately
  (function preloadImages() {
    CINEMATIC_DESTINATIONS.forEach(dest => {
      const imgL = new Image();
      imgL.src = dest.image;
      const imgT = new Image();
      imgT.src = dest.thumb;
    });
  })();

  // Engine State
  let currentIndex = 0;
  let activeSlideId = 'A';
  let autoplayTimer = null;
  let progressInterval = null;
  const AUTOPLAY_INTERVAL = 5500;
  let isPaused = false;
  let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // DOM Elements
  let slideA, slideB, imgA, imgB;
  let destWordEl;
  let weatherTextEl, weatherPillEl;
  let cardTitleEl, cardSubEl, cardDurationEl, featuredBadgeEl;
  let priceAmountEl;
  let ticketDateEl, ticketSubEl;
  let dockTrackEl, dockProgressFillEl, dockCurrentEl, dockTotalEl;

  // --------------------------------------------------------------------------
  // Initialize Engine
  // --------------------------------------------------------------------------
  function initHero() {
    const heroSection = document.getElementById('heroCinematic');
    if (!heroSection) return;

    slideA = document.getElementById('heroBgSlideA');
    slideB = document.getElementById('heroBgSlideB');
    imgA = document.getElementById('heroBgImgA');
    imgB = document.getElementById('heroBgImgB');

    destWordEl = document.getElementById('heroDestWord');
    weatherTextEl = document.getElementById('heroWeatherText');
    weatherPillEl = document.getElementById('heroWeatherPill');

    cardTitleEl = document.getElementById('heroTourTitle');
    cardSubEl = document.getElementById('heroTourSub');
    cardDurationEl = document.getElementById('heroDurationText');
    featuredBadgeEl = document.getElementById('heroFeaturedBadge');
    priceAmountEl = document.getElementById('heroPriceAmount');

    ticketDateEl = document.getElementById('heroTicketTitle');
    ticketSubEl = document.getElementById('heroTicketSub');

    dockTrackEl = document.getElementById('dockItemsTrack');
    dockProgressFillEl = document.getElementById('dockProgressFill');
    dockCurrentEl = document.getElementById('dockCurrentIndex');
    dockTotalEl = document.getElementById('dockTotalCount');

    // Populate Thumbnail Dock Items
    renderDockItems();

    // Attach Dock Navigation Controls
    const prevBtn = document.getElementById('dockPrevBtn');
    const nextBtn = document.getElementById('dockNextBtn');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevDestination(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextDestination(); });

    // Pause Autoplay on Hover
    const glassCard = document.getElementById('heroGlassCard');
    const glassDock = document.getElementById('heroGlassDock');
    [glassCard, glassDock].forEach(el => {
      if (el) {
        el.addEventListener('mouseenter', () => { isPaused = true; });
        el.addEventListener('mouseleave', () => { isPaused = false; });
      }
    });

    // Touch Swipe Support on Hero
    initTouchSwipe(heroSection);

    // Initial Theme & Slide Setup
    applyDestinationState(0, false);

    // Start Autoplay Loop
    startAutoplay();

    // Particle Bokeh Background Canvas
    initCanvasBokeh();

    // Mouse Parallax with Smooth Lerp
    initMouseParallax();

    // On-load Page Timeline & Count-up
    initPageLoadTimeline();

    // Scroll Parallax Fade
    initScrollParallax();
  }

  // --------------------------------------------------------------------------
  // Render Dock Items
  // --------------------------------------------------------------------------
  function renderDockItems() {
    if (!dockTrackEl) return;
    if (dockTotalEl) {
      dockTotalEl.textContent = String(CINEMATIC_DESTINATIONS.length).padStart(2, '0');
    }

    dockTrackEl.innerHTML = CINEMATIC_DESTINATIONS.map((dest, idx) => `
      <div class="dock-item ${idx === 0 ? 'active' : ''}" data-index="${idx}" role="button" tabindex="0" aria-label="Select ${dest.name}">
        <img class="dock-item-img" src="${dest.thumb}" alt="${dest.name}" loading="lazy">
        <div class="dock-item-overlay">
          <span class="dock-item-name">${dest.name}</span>
          <span class="dock-item-price">From ₹${dest.price}</span>
        </div>
      </div>
    `).join('');

    dockTrackEl.querySelectorAll('.dock-item').forEach((item, idx) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        switchToDestination(idx);
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchToDestination(idx);
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Core Switch Destination Handler
  // --------------------------------------------------------------------------
  function switchToDestination(targetIndex, animate = true) {
    if (targetIndex < 0 || targetIndex >= CINEMATIC_DESTINATIONS.length) return;
    if (targetIndex === currentIndex && animate) return;

    currentIndex = targetIndex;
    applyDestinationState(currentIndex, animate);
    resetAutoplayTimer();
  }

  function nextDestination() {
    const nextIdx = (currentIndex + 1) % CINEMATIC_DESTINATIONS.length;
    switchToDestination(nextIdx, true);
  }

  function prevDestination() {
    const prevIdx = (currentIndex - 1 + CINEMATIC_DESTINATIONS.length) % CINEMATIC_DESTINATIONS.length;
    switchToDestination(prevIdx, true);
  }

  // --------------------------------------------------------------------------
  // Apply Destination State (Visuals, Dynamic Colors, Masks, & Wipe)
  // --------------------------------------------------------------------------
  function applyDestinationState(idx, animate = true) {
    const dest = CINEMATIC_DESTINATIONS[idx];
    if (!dest) return;

    // 1. Shift Dynamic Accent CSS Variables
    const root = document.documentElement;
    root.style.setProperty('--hero-accent', dest.accent);
    root.style.setProperty('--hero-accent-glow', dest.accentGlow);
    root.style.setProperty('--hero-accent-grad', dest.accentGrad);

    // 2. Dual-Layer Ken Burns Background Crossfade & Wipe Reveal
    if (slideA && slideB && imgA && imgB) {
      if (activeSlideId === 'A') {
        imgB.src = dest.image;
        imgB.alt = dest.name;
        slideB.classList.remove('entering');
        void slideB.offsetWidth; // Trigger reflow
        slideB.classList.add('active', 'entering');
        slideA.classList.remove('active', 'entering');
        activeSlideId = 'B';
      } else {
        imgA.src = dest.image;
        imgA.alt = dest.name;
        slideA.classList.remove('entering');
        void slideA.offsetWidth; // Trigger reflow
        slideA.classList.add('active', 'entering');
        slideB.classList.remove('active', 'entering');
        activeSlideId = 'A';
      }
    }

    // 3. Headline Word Slide-Up Mask Transition (No background box)
    if (destWordEl) {
      if (animate && !isReducedMotion) {
        destWordEl.classList.add('slide-out');
        setTimeout(() => {
          destWordEl.textContent = dest.name;
          destWordEl.classList.remove('slide-out');
          destWordEl.classList.add('slide-in-prep');
          void destWordEl.offsetWidth;
          destWordEl.classList.remove('slide-in-prep');
          destWordEl.classList.add('slide-in');
        }, 220);
      } else {
        destWordEl.textContent = dest.name;
      }
    }

    // 4. Floating Weather Pill
    if (weatherPillEl && weatherTextEl) {
      if (animate && !isReducedMotion) {
        weatherPillEl.classList.add('fade-out');
        setTimeout(() => {
          weatherTextEl.textContent = dest.weather;
          weatherPillEl.classList.remove('fade-out');
        }, 180);
      } else {
        weatherTextEl.textContent = dest.weather;
      }
    }

    // 5. Glass Showcase Card Details
    if (cardTitleEl) cardTitleEl.textContent = dest.tagline;
    if (cardSubEl) cardSubEl.textContent = dest.sub;
    if (cardDurationEl) cardDurationEl.textContent = dest.duration;
    if (featuredBadgeEl) featuredBadgeEl.textContent = dest.badge;

    // 6. Smooth Price Count-Up
    if (priceAmountEl) {
      animateNumberCount(priceAmountEl, dest.priceNum);
    }

    // 7. Departure Ticket Glass Chip
    if (ticketDateEl) ticketDateEl.textContent = dest.ticketTitle;
    if (ticketSubEl) ticketSubEl.textContent = dest.ticketSub;

    // 8. Update Dock Item Active State & Counter
    if (dockCurrentEl) {
      dockCurrentEl.textContent = String(idx + 1).padStart(2, '0');
    }

    if (dockTrackEl) {
      const items = dockTrackEl.querySelectorAll('.dock-item');
      items.forEach((item, i) => {
        const isActive = i === idx;
        item.classList.toggle('active', isActive);
        if (isActive) {
          // Smooth center active item into view on horizontal track
          const itemLeft = item.offsetLeft - dockTrackEl.offsetLeft;
          dockTrackEl.scrollTo({
            left: itemLeft - (dockTrackEl.clientWidth / 2) + (item.clientWidth / 2),
            behavior: 'smooth'
          });
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Number Count-Up Utility
  // --------------------------------------------------------------------------
  function animateNumberCount(targetEl, targetNum) {
    if (!targetEl) return;
    const currentNum = parseInt(targetEl.textContent.replace(/,/g, ''), 10) || 0;
    const diff = targetNum - currentNum;
    if (diff === 0 || isReducedMotion) {
      targetEl.textContent = targetNum.toLocaleString('en-IN');
      return;
    }

    const duration = 500;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const value = Math.round(currentNum + diff * easeProgress);
      targetEl.textContent = value.toLocaleString('en-IN');
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // --------------------------------------------------------------------------
  // Autoplay & Progress Bar Engine
  // --------------------------------------------------------------------------
  function startAutoplay() {
    resetAutoplayTimer();
  }

  function resetAutoplayTimer() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    if (progressInterval) clearInterval(progressInterval);

    if (dockProgressFillEl) {
      dockProgressFillEl.style.width = '0%';
    }

    let elapsed = 0;
    const tickRate = 50;

    progressInterval = setInterval(() => {
      if (!isPaused) {
        elapsed += tickRate;
        const pct = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
        if (dockProgressFillEl) {
          dockProgressFillEl.style.width = `${pct}%`;
        }
        if (elapsed >= AUTOPLAY_INTERVAL) {
          clearInterval(progressInterval);
          nextDestination();
        }
      }
    }, tickRate);
  }

  // --------------------------------------------------------------------------
  // Touch Swipe Gesture Support
  // --------------------------------------------------------------------------
  function initTouchSwipe(element) {
    if (!element) return;
    let touchStartX = 0;
    let touchEndX = 0;

    element.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        nextDestination();
      } else if (touchEndX > touchStartX + threshold) {
        prevDestination();
      }
    }
  }

  // --------------------------------------------------------------------------
  // Lightweight Canvas Bokeh Ambient Particles
  // --------------------------------------------------------------------------
  function initCanvasBokeh() {
    const canvas = document.getElementById('heroBokehCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particleCount = window.innerWidth < 768 ? 14 : 26;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.1,
        opacity: Math.random() * 0.45 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI
      });
    }

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    function renderParticles() {
      if (!isVisible || isReducedMotion) {
        requestAnimationFrame(renderParticles);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const currentAccent = CINEMATIC_DESTINATIONS[currentIndex].accent;

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseVal += p.pulseSpeed;

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) { p.x = width + 10; }
        if (p.x > width + 10) { p.x = -10; }

        const currentOpacity = p.opacity * (0.65 + 0.35 * Math.sin(p.pulseVal));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = currentAccent;
        ctx.globalAlpha = currentOpacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = currentAccent;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // --------------------------------------------------------------------------
  // Mouse Parallax with Smooth Damped Lerp (60fps)
  // --------------------------------------------------------------------------
  function initMouseParallax() {
    if (window.innerWidth < 1024 || isReducedMotion) return;

    const bgSlides = document.querySelectorAll('.hero-bg-img');
    const cardCol = document.getElementById('heroCardCol');
    const weatherPill = document.getElementById('heroWeatherPill');
    const ticketChip = document.getElementById('heroTicketChip');

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX; // Range -1 to 1
      targetY = (e.clientY - centerY) / centerY; // Range -1 to 1
    }, { passive: true });

    function lerpLoop() {
      // Damped lerp factor
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      if (cardCol) {
        cardCol.style.transform = `translate3d(${currentX * 16}px, ${currentY * 16}px, 0)`;
      }
      if (weatherPill) {
        weatherPill.style.transform = `translate3d(${-currentX * 12}px, ${-currentY * 12}px, 0)`;
      }
      if (ticketChip) {
        ticketChip.style.transform = `translate3d(${currentX * 22}px, ${currentY * 22}px, 0)`;
      }
      if (bgSlides.length > 0) {
        bgSlides.forEach(slide => {
          slide.style.transform = `scale(1.06) translate3d(${-currentX * 8}px, ${-currentY * 8}px, 0)`;
        });
      }

      requestAnimationFrame(lerpLoop);
    }

    lerpLoop();
  }

  // --------------------------------------------------------------------------
  // On-load Page Timeline Stagger & Number Count-Up
  // --------------------------------------------------------------------------
  function initPageLoadTimeline() {
    const animElements = document.querySelectorAll('.hero-anim-init');
    animElements.forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('hero-anim-loaded');
      }, 120 + idx * 110);
    });

    // Count-up for trust metrics (10,000+ Explorers)
    const countUpEls = document.querySelectorAll('.hero-trust-caption .count-up');
    countUpEls.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 10000;
      const suffix = el.getAttribute('data-suffix') || '+';
      let current = 0;
      const stepTime = 25;
      const stepVal = Math.ceil(target / (1200 / stepTime));

      const timer = setInterval(() => {
        current += stepVal;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString('en-IN') + suffix;
      }, stepTime);
    });
  }

  // --------------------------------------------------------------------------
  // Scroll Parallax Fade Out
  // --------------------------------------------------------------------------
  function initScrollParallax() {
    const heroSection = document.getElementById('heroCinematic');
    if (!heroSection || isReducedMotion) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      if (scrollY < heroHeight) {
        const opacityVal = Math.max(0, 1 - (scrollY / (heroHeight * 0.85)));
        const translateYVal = scrollY * 0.28;
        const container = heroSection.querySelector('.hero-container');
        if (container) {
          container.style.opacity = opacityVal;
          container.style.transform = `translate3d(0, ${translateYVal}px, 0)`;
        }
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // Global Handlers for Itinerary Modal & External Switch Calls
  // --------------------------------------------------------------------------
  window.handleHeroCardClick = function () {
    const dest = CINEMATIC_DESTINATIONS[currentIndex];
    if (dest && dest.modalId && typeof window.openItineraryModal === 'function') {
      window.openItineraryModal(dest.modalId);
    } else {
      const pkgSec = document.getElementById('packages');
      if (pkgSec) pkgSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  window.switchDestinationDirectly = function (index) {
    switchToDestination(index, true);
  };

  // Start on DOMContentLoaded or immediate execution
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }
})();
