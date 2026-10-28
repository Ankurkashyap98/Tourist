/**
 * Trip Departure - Main Interactive Engine
 * Handles package filtering, itinerary modals, FAQ accordion, smooth counters, and clean routing
 */

// 0. Immediate Clean URL Enforcer (Strips .html, trailing slashes, and index from browser address bar)
(function enforceCleanUrlBar() {
  try {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      let path = window.location.pathname;
      let originalPath = path;

      // 1. Remove .html extension
      if (path.endsWith('.html')) {
        path = path.slice(0, -5);
      }

      // 2. Remove /index or index
      if (path.endsWith('/index')) {
        path = path.slice(0, -6);
      } else if (path === '/index' || path === 'index') {
        path = '';
      }

      // 3. Remove trailing slash on subroutes (e.g. /about/ -> /about)
      if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
      }

      if (!path) path = '/';

      if (path !== originalPath) {
        const cleanUrl = path + window.location.search + window.location.hash;
        window.history.replaceState(null, '', cleanUrl);
      }
    }
  } catch (e) {
    // Graceful fallback
  }
})();

// Package Database matching Homepage & Document requirements
const packagesData = [
  {
    id: 'kashmir-escape',
    title: 'Kashmir Valley Escape',
    category: 'india',
    destination: 'Kashmir',
    duration: 'Customizable Itinerary',
    durationVal: 6,
    theme: 'honeymoon',
    tags: ['Kashmir', 'India', 'Honeymoon', 'Family'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.9,
    reviews: 218,
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    highlights: ['Scenic Stays', 'Sightseeing', 'Private Transfers'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Srinagar & Dal Lake Houseboat Experience', desc: 'Warm reception at Srinagar airport. Transfer to premium luxury houseboat. Evening relaxing 1-hour romantic Shikara ride covering floating gardens and Char Chinar.' },
      { day: 'Day 2', title: 'Srinagar to Gulmarg Meadow of Flowers & Gondola Ride', desc: 'Ascend to Gulmarg at 8,825 ft. Enjoy snow activities, world highest golf course and spectacular Gondola cable car ride reaching Apharwat peak.' },
      { day: 'Day 3', title: 'Gulmarg to Pahalgam - Valley of Shepherds', desc: 'Drive through Awantipora ruins and Pampore saffron plateaus. Check into river-facing hotel in Pahalgam. Leisure walk along Lidder river.' },
      { day: 'Day 4', title: 'Aru Valley, Betaab Valley & Chandanwari Exploration', desc: 'Full day local excursion exploring pristine alpine meadows, Bollywood shooting locations, pine forests and snow bridges.' },
      { day: 'Day 5', title: 'Pahalgam to Srinagar & Mughal Gardens Tour', desc: 'Return to Srinagar. Visit famous UNESCO-notable Mughal marvels: Nishat Bagh, Shalimar Bagh, Chashme Shahi and Shankaracharya Temple.' },
      { day: 'Day 6', title: 'Departure with Sweet Memories', desc: 'Transfer to Srinagar Airport for onward journey with lifetime memories of Kashmir.' }
    ],
    inclusions: ['Scenic Stays (Houseboat + Hotels)', 'Sightseeing across Srinagar, Gulmarg & Pahalgam', 'Private Sanitized Transfers', 'Daily Breakfast & Dinner'],
    exclusions: ['Airfare / Train tickets', 'Personal expenses & Gondola ticket']
  },
  {
    id: 'kerala-backwaters',
    title: 'Kerala Backwaters & Hills',
    category: 'india',
    destination: 'Kerala',
    duration: 'Customizable Itinerary',
    durationVal: 5,
    theme: 'family',
    tags: ['Kerala', 'India', 'Honeymoon', 'Family'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.8,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    highlights: ['Backwater Experience', 'Hill Station', 'Local Sightseeing'],
    itinerary: [
      { day: 'Day 1', title: 'Cochin Arrival & Transfer to Misty Munnar', desc: 'Arrive at Cochin airport/station. Drive through scenic Cheeyappara & Valara waterfalls. Check in to Munnar resort amidst rolling tea hills.' },
      { day: 'Day 2', title: 'Munnar Sightseeing: Mattupetty, Tea Museum & Echo Point', desc: 'Explore Eravikulam National Park, Tea Museum, Photo Point, and boating in Mattupetty reservoir.' },
      { day: 'Day 3', title: 'Munnar to Thekkady Periyar Wildlife Sanctuary', desc: 'Scenic mountain transfer to Thekkady. Afternoon boat safari on Periyar Lake to spot wild elephants.' },
      { day: 'Day 4', title: 'Thekkady to Alleppey Houseboat Dream', desc: 'Drive to Alleppey. Board traditional thatched houseboat. Cruise through emerald canals and palm-fringed backwaters.' },
      { day: 'Day 5', title: 'Alleppey to Cochin Departure', desc: 'Disembark after breakfast. Visit Fort Kochi heritage streets before airport transfer.' }
    ],
    inclusions: ['Curated Hotel & Houseboat Stays', 'Breakfast & Houseboat Meals', 'Dedicated Private Cab', 'Sightseeing as per itinerary'],
    exclusions: ['Airfare', 'Entry tickets & personal expenses']
  },
  {
    id: 'ladakh-mystic',
    title: 'Mystic Ladakh & Nubra Valley',
    category: 'india',
    destination: 'Ladakh',
    duration: '7 Days • 6 Nights',
    durationVal: 7,
    theme: 'adventure',
    tags: ['Ladakh', 'India', 'Adventure'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Pangong Tso', 'Nubra Valley', 'Mountain Experiences'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Leh & Acclimatization', desc: 'Rest full day to acclimatize to high altitude. Evening visit to Shanti Stupa for sunset views.' },
      { day: 'Day 2', title: 'Leh Local: Magnetic Hill & Sangam Point', desc: 'Witness confluence of Indus and Zanskar rivers, Magnetic Hill and Gurudwara Pathar Sahib.' },
      { day: 'Day 3', title: 'Leh to Nubra Valley via Khardung La Pass', desc: 'Drive over mighty Khardung La (17,582 ft) into Nubra valley and white sand dunes.' },
      { day: 'Day 4', title: 'Nubra Valley to Pangong Tso via Shyok River', desc: 'Travel along the turquoise Shyok river route to the mesmerizing blue Pangong Lake.' },
      { day: 'Day 5', title: 'Pangong to Leh via Chang La Pass', desc: 'Early morning sunrise over Pangong. Return to Leh crossing Chang La pass (17,590 ft).' },
      { day: 'Day 6', title: 'Leh Market Shopping & Leisure', desc: 'Explore Leh Old Bazaar for pashmina shawls, apricots, and Tibetan souvenirs.' },
      { day: 'Day 7', title: 'Fly back with Himalayan Triumphs', desc: 'Drop off at Leh airport with unforgettable memories.' }
    ],
    inclusions: ['6 Nights stay with heating/camps', 'Breakfast & Dinner', 'Private 4x4 / Scorpio / Innova throughout', 'Inner Line Wildlife & Eco Permits'],
    exclusions: ['Flights', 'Rafting charges', 'Camel safari fee']
  },
  {
    id: 'rajasthan-heritage',
    title: 'Royal Rajasthan Heritage Tour',
    category: 'india',
    destination: 'Rajasthan',
    duration: 'Customizable Itinerary',
    durationVal: 6,
    theme: 'family',
    tags: ['Rajasthan', 'India', 'Family', 'Culture'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.8,
    reviews: 165,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    highlights: ['Forts & Palaces', 'Cultural Experiences', 'Private Sightseeing'],
    itinerary: [
      { day: 'Day 1', title: 'Jaipur Arrival & Cultural Welcome', desc: 'Check in to heritage hotel. Evening visit to Birla Temple and Chokhi Dhani ethnic resort.' },
      { day: 'Day 2', title: 'Jaipur Forts & Palaces Full Day', desc: 'Explore Amber Fort, Jal Mahal, Hawa Mahal and Jantar Mantar observatory.' },
      { day: 'Day 3', title: 'Jaipur to Jodhpur via Pushkar', desc: 'Stop at sacred Pushkar Lake and arrive in Sun City Jodhpur under Mehrangarh.' },
      { day: 'Day 4', title: 'Jodhpur to Udaipur via Ranakpur', desc: 'Visit Mehrangarh Fort and Jaswant Thada, then continue to the City of Lakes Udaipur.' },
      { day: 'Day 5', title: 'Udaipur City Palace & Lake Pichola', desc: 'Grand tour of majestic City Palace complex and evening boat ride across Lake Pichola.' },
      { day: 'Day 6', title: 'Udaipur Departure', desc: 'Transfer to Udaipur airport/railway station.' }
    ],
    inclusions: ['Curated Heritage & 4★ Stays', 'Daily Royal Buffet Breakfast', 'Private AC Sedan/SUV with chauffeur', 'All monument parking & interstate taxes'],
    exclusions: ['Monument entrance camera fees', 'Lake Pichola boat ticket', 'Air/rail tickets']
  },
  {
    id: 'dubai-escape',
    title: 'Dubai City & Desert Escape',
    category: 'international',
    destination: 'Dubai',
    duration: 'Customizable Itinerary',
    durationVal: 5,
    theme: 'family',
    tags: ['Dubai', 'International', 'Family', 'Adventure'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.9,
    reviews: 205,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Desert Safari', 'City Experiences', 'Leisure Time'],
    itinerary: [
      { day: 'Day 1', title: 'Welcome to Dubai & Marina Dhow Cruise', desc: 'Arrive at Dubai International Airport. Luxury transfer to hotel. Evening 5★ Marina Dhow cruise with skyline views.' },
      { day: 'Day 2', title: 'Dubai City Tour & Burj Khalifa At The Top', desc: 'Visit Dubai Frame, Jumeirah Mosque, Palm Jumeirah, Burj Al Arab photo stop, Dubai Mall and Burj Khalifa observation deck.' },
      { day: 'Day 3', title: 'Red Dune Desert Safari & Bedouin Camp', desc: 'Thrilling 4x4 dune bashing, sandboarding, camel rides, henna painting, fire show and lavish BBQ dinner under the desert stars.' },
      { day: 'Day 4', title: 'Miracle Garden & Leisure Shopping', desc: 'Wander through 150 million blooming flowers in Miracle Garden followed by shopping and leisure time.' },
      { day: 'Day 5', title: 'Gold Souk & Airport Farewell', desc: 'Morning visit to Gold & Spice Souk. Transfer to airport for flight home.' }
    ],
    inclusions: ['Curated City Hotel with breakfast', 'All airport transfers & tours in AC coaches', 'Burj Khalifa entrance ticket', 'Desert Safari with BBQ dinner'],
    exclusions: ['Airfare', 'Tourism Dirham fee', 'Personal shopping expenses']
  },
  {
    id: 'goa-beach',
    title: 'Goa Beach Holiday',
    category: 'india',
    destination: 'Goa',
    duration: 'Customizable Itinerary',
    durationVal: 4,
    theme: 'honeymoon',
    tags: ['Goa', 'India', 'Honeymoon', 'Adventure'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.7,
    reviews: 138,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    highlights: ['Beaches', 'Coastal Experiences', 'Leisure Time'],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & North Goa Beach Vibes', desc: 'Pick up from Goa airport/station. Check into beach resort. Evening unwind by Calangute beach shacks.' },
      { day: 'Day 2', title: 'North Goa Forts & Water Sports', desc: 'Explore Aguada Fort lighthouse, Chapora Fort, and participate in parasailing & jet skiing at Baga.' },
      { day: 'Day 3', title: 'South Goa Heritage & Mandovi River Cruise', desc: 'Visit UNESCO World Heritage churches in Old Goa, Miramar beach, and evening music sunset cruise on Mandovi river.' },
      { day: 'Day 4', title: 'Flea Market & Departure', desc: 'Last minute shopping before transfer to airport.' }
    ],
    inclusions: ['Curated Resort near Beach', 'Daily Buffet Breakfast', 'Private AC Cab for transfers & tours', 'Sunset River Cruise ticket'],
    exclusions: ['Flights', 'Water sports charges', 'Nightclub entries']
  },
  {
    id: 'himachal-escape',
    title: 'Himachal Mountain Escape',
    category: 'india',
    destination: 'Himachal',
    duration: 'Customizable Itinerary',
    durationVal: 6,
    theme: 'adventure',
    tags: ['Himachal', 'India', 'Family', 'Adventure'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.8,
    reviews: 196,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    highlights: ['Mountain Views', 'Scenic Routes', 'Private Cab'],
    itinerary: [
      { day: 'Day 1', title: 'Delhi/Chandigarh to Shimla', desc: 'Scenic uphill drive to Shimla. Check into hotel. Evening stroll along Mall Road and The Ridge.' },
      { day: 'Day 2', title: 'Kufri Snow Excursion & Shimla Heritage', desc: 'Visit Kufri amusement park, Himalayan Wildlife Zoo, and historic Vice Regal Lodge.' },
      { day: 'Day 3', title: 'Shimla to Manali via Kullu Valley', desc: 'Drive through Kullu valley, Pandoh Dam, and river rafting points. Check in to mountain view resort in Manali.' },
      { day: 'Day 4', title: 'Solang Valley & Atal Tunnel Adventure', desc: 'Full day adventure at Solang Valley. Cross the world-record Atal Tunnel into snowy Sissu valley.' },
      { day: 'Day 5', title: 'Manali Local Sightseeing', desc: 'Visit ancient Hadimba Devi Temple, Tibetan Monastery, and natural sulphur hot springs in Vashisht.' },
      { day: 'Day 6', title: 'Manali to Delhi/Chandigarh Departure', desc: 'Scenic descent drive with unforgettable Himalayan memories.' }
    ],
    inclusions: ['Curated Mountain Resorts', 'Daily Breakfast & Dinner', 'Private Cab throughout trip (Innova/Dzire)', 'Solang Valley & Atal Tunnel assistance'],
    exclusions: ['Adventure activities charges', 'Monument tickets', 'Personal expenses']
  },
  {
    id: 'north-india-discovery',
    title: 'North India Discovery Tour',
    category: 'india',
    destination: 'North India',
    duration: 'Customizable Itinerary',
    durationVal: 7,
    theme: 'family',
    tags: ['North India', 'India', 'Family', 'Culture'],
    price: 99,
    displayPrice: 'From ₹99/-',
    rating: 4.9,
    reviews: 172,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    highlights: ['Heritage', 'Mountains', 'Cultural Experiences'],
    itinerary: [
      { day: 'Day 1', title: 'Delhi Arrival & Historic Monuments', desc: 'Welcome in Delhi. Explore India Gate, Qutub Minar, and Red Fort before checking into hotel.' },
      { day: 'Day 2', title: 'Delhi to Agra - The City of Taj', desc: 'Morning drive to Agra. Witness the immortal beauty of the Taj Mahal and Agra Fort.' },
      { day: 'Day 3', title: 'Agra to Jaipur via Fatehpur Sikri', desc: 'Stop at UNESCO World Heritage city Fatehpur Sikri. Arrive in the Pink City of Jaipur.' },
      { day: 'Day 4', title: 'Jaipur Palaces & Amber Fort Exploration', desc: 'Explore Amber Fort, Jal Mahal, City Palace, and local bazaar.' },
      { day: 'Day 5', title: 'Jaipur to Amritsar / Golden Temple Route', desc: 'Journey to holy Amritsar. Witness evening Palki Sahib ceremony at Golden Temple.' },
      { day: 'Day 6', title: 'Wagah Border & Jallianwala Bagh', desc: 'Pay homage at Jallianwala Bagh and experience patriotic Wagah Border Beating Retreat ceremony.' },
      { day: 'Day 7', title: 'Departure with Timeless Memories', desc: 'Transfer to airport/railway station for onward journey.' }
    ],
    inclusions: ['Curated 4★ Hotels with Breakfast', 'Private AC Cab with experienced chauffeur', 'All interstate tolls and parking charges', 'Monument sightseeing coordination'],
    exclusions: ['Monument entry tickets', 'Airfare/Train tickets', 'Personal expenses']
  }
];

// Document Ready Setup
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  renderPackages(packagesData);
  initCategoryFilter();
  initSearchWidget();
  initFaqAccordion();
  initCounters();
  initScrollReveal();
  initModals();
  initInquiryForm();
  initHeroTypewriter();
  initMouseParallax();
  initRecentBookingsSimulator();
  initCleanLinks();
});

// 1. Sticky Header
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.floating-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('show');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// 2. Mobile Nav Menu
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-menu');
  const dropdownTriggers = document.querySelectorAll('.has-dropdown > a');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close on link click
    nav.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // Mobile dropdown toggle
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const parent = trigger.parentElement;
        parent.classList.toggle('open-sub');
      }
    });
  });
}

// 3. Render Packages into Grid
function renderPackages(data) {
  const container = document.getElementById('packagesGrid');
  if (!container) return;

  if (data.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 10px;">No Packages Found</h3>
        <p style="color: var(--text-muted);">Try adjusting your destination or duration filter to see more options.</p>
        <button class="btn btn-primary" onclick="resetFilters()" style="margin-top: 20px;">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = data.map((pkg, idx) => `
    <article class="package-card card-3d-wrap card-hover-tilt reveal delay-${(idx % 3) + 1}" data-category="${pkg.category}" data-id="${pkg.id}">
      <div class="card-media">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
        <span class="card-badge-top ${pkg.tags.includes('Best Seller') ? 'badge-deal' : ''}">${pkg.destination.toUpperCase()}</span>
        <div class="card-duration-chip">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          ${pkg.duration}
        </div>
      </div>
      <div class="card-body">
        <div class="card-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${pkg.destination.toUpperCase()}
        </div>
        <h3 class="card-title">${pkg.title}</h3>
        <p style="color: #64748b; font-size: 0.88rem; margin-bottom: 12px; font-weight: 600;">${pkg.duration}</p>
        <ul class="card-features-list">
          ${pkg.highlights.map(h => `
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
        <div class="card-footer">
          <div class="price-block">
            <div class="price-current">${pkg.displayPrice || ('From ₹' + pkg.price + '/-')}</div>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline btn-sm" onclick="openItineraryModal('${pkg.id}')">View Details →</button>
            <button class="btn btn-primary btn-sm btn-shimmer" onclick="openBookingModal('${pkg.id}')">Enquire</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Re-observe newly rendered cards
  initScrollReveal();
}

// 4. Category Filter Buttons
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = (btn.getAttribute('data-filter') || '').toLowerCase();

      if (cat === 'all' || !cat) {
        renderPackages(packagesData);
      } else {
        renderPackages(packagesData.filter(p => 
          (p.category && p.category.toLowerCase() === cat) || 
          (p.theme && p.theme.toLowerCase() === cat) || 
          (p.destination && p.destination.toLowerCase() === cat) ||
          (p.tags && p.tags.some(t => t.toLowerCase() === cat))
        ));
      }
    });
  });
}

// 5. Search Bar Filter
function initSearchWidget() {
  const form = document.getElementById('searchTourForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dest = document.getElementById('searchDestination').value.toLowerCase();
    const theme = document.getElementById('searchTheme').value.toLowerCase();
    const duration = document.getElementById('searchDuration').value;
    const budget = document.getElementById('searchBudget').value;

    let filtered = packagesData.filter(pkg => {
      let matchDest = !dest || pkg.destination.includes(dest);
      let matchTheme = !theme || pkg.theme === theme;
      let matchDuration = true;
      if (duration === 'short') matchDuration = pkg.durationVal <= 4;
      if (duration === 'medium') matchDuration = pkg.durationVal >= 5 && pkg.durationVal <= 6;
      if (duration === 'long') matchDuration = pkg.durationVal >= 7;

      let matchBudget = true;
      if (budget === 'budget') matchBudget = pkg.price <= 15000;
      if (budget === 'standard') matchBudget = pkg.price > 15000 && pkg.price <= 25000;
      if (budget === 'luxury') matchBudget = pkg.price > 25000;

      return matchDest && matchTheme && matchDuration && matchBudget;
    });

    renderPackages(filtered);

    // Smooth scroll down to packages
    const pkgSection = document.getElementById('packages');
    if (pkgSection) {
      pkgSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function resetFilters() {
  const form = document.getElementById('searchTourForm');
  if (form) form.reset();
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
  renderPackages(packagesData);
}

// 6. Itinerary Modal
function openItineraryModal(packageId) {
  const pkg = packagesData.find(p => p.id === packageId);
  if (!pkg) return;

  const modal = document.getElementById('itineraryModal');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  if (title) title.innerHTML = `${pkg.title} <span class="badge-tag" style="margin-left: 10px; font-size: 0.75rem;">${pkg.duration}</span>`;

  if (body) {
    body.innerHTML = `
      <div style="margin-bottom: 24px;">
        <img src="${pkg.image}" alt="${pkg.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 20px;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-alt); padding: 16px 20px; border-radius: var(--radius-md); margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Exclusive Discounted Price</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">₹${pkg.price.toLocaleString('en-IN')} <span style="font-size: 0.9rem; font-weight: 500; color: var(--text-muted);">/ person</span></div>
          </div>
          <div style="display: flex; gap: 10px;">
            <a href="https://wa.me/918899544803?text=Hi%20Trip%20Departure,%20I%20am%20interested%20in%20${encodeURIComponent(pkg.title)}" target="_blank" class="btn btn-sm" style="background: #25d366; color: white;">
              WhatsApp Query
            </a>
            <button class="btn btn-primary btn-sm" onclick="openBookingModal('${pkg.id}')">Book Online</button>
          </div>
        </div>

        <h4 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 16px; color: var(--primary);">Detailed Day-Wise Itinerary</h4>
        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px;">
          ${pkg.itinerary.map(item => `
            <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px 20px; border-left: 4px solid var(--accent);">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                <span style="background: rgba(255, 142, 38, 0.15); color: var(--accent); font-weight: 800; font-size: 0.78rem; padding: 2px 8px; border-radius: 4px;">${item.day}</span>
                <h5 style="font-size: 1.05rem; font-weight: 700; color: var(--primary);">${item.title}</h5>
              </div>
              <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">${item.desc}</p>
            </div>
          `).join('')}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
          <div style="background: rgba(6, 214, 160, 0.08); border: 1px solid rgba(6, 214, 160, 0.3); border-radius: var(--radius-md); padding: 18px;">
            <h5 style="color: #059669; font-size: 1rem; font-weight: 800; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              What is Included
            </h5>
            <ul style="font-size: 0.88rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px;">
              ${pkg.inclusions.map(inc => `<li>• ${inc}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: var(--radius-md); padding: 18px;">
            <h5 style="color: #dc2626; font-size: 1rem; font-weight: 800; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              What is Excluded
            </h5>
            <ul style="font-size: 0.88rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px;">
              ${pkg.exclusions.map(exc => `<li>• ${exc}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('open');
}

// 7. Booking Modal
function openBookingModal(packageId) {
  const pkg = packagesData.find(p => p.id === packageId) || packagesData[0];
  const modal = document.getElementById('bookingModal');
  const bookingPkgName = document.getElementById('bookingPackageName');
  if (bookingPkgName) bookingPkgName.value = pkg.title;

  closeAllModals();
  if (modal) modal.classList.add('open');
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
}

function initModals() {
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

// 8. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        });

        // Toggle current
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });
}

// 9. Stat Counter Animation
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-target');
          const prefix = stat.getAttribute('data-prefix') || '';
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target / 60;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              stat.innerText = prefix + Math.floor(count).toLocaleString('en-IN') + suffix;
              requestAnimationFrame(updateCount);
            } else {
              stat.innerText = prefix + target.toLocaleString('en-IN') + suffix;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

// 10. Scroll Reveal Animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));
}

// 11. Inquiry Form Submission & Toast Alert
function initInquiryForm() {
  const forms = [document.getElementById('leadInquiryForm'), document.getElementById('bookingModalForm')];

  forms.forEach(form => {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending Enquiry...';

      setTimeout(() => {
        btn.innerHTML = '✓ Enquiry Received!';
        showToast('Thank you! Your inquiry has been sent to Trip Departure. Our Jammu holiday expert will call you within 15 minutes.');
        form.reset();
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = origText;
          closeAllModals();
        }, 2500);
      }, 900);
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--primary);
      color: #ffffff;
      padding: 16px 28px;
      border-radius: var(--radius-pill);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid var(--accent);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="color: var(--accent-emerald); font-size: 1.3rem;">✓</span>
    <span>${message}</span>
  `;
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(120px)';
  }, 4500);
}

// 12. Hero Destination Typewriter / Rotator
// 12. Hero Synchronized Destination Rotator & Interactive Showcase
const HERO_DESTINATIONS = [
  {
    name: 'Kashmir Valley',
    tagline: 'Heavenly Kashmir & Gulmarg Snow',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=160&h=160&q=80',
    weather: '☀️ 16°C • Dal Lake, Srinagar',
    price: '₹16,999',
    priceUnit: '/ person (6 Days • Houseboat Stay)',
    ticketTitle: '15 Oct • 4 Seats Left',
    ticketSub: 'Next Group Departure (Srinagar)',
    stayInfo: '★★★★★ Luxury Houseboat & 4★ Resorts',
    modalId: 'kashmir-paradise',
    badgeText: 'Featured Signature Tour'
  },
  {
    name: 'Royal Rajasthan',
    tagline: 'Grand Rajasthan Forts & Desert Haveli',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=160&h=160&q=80',
    weather: '🏰 26°C • Amber Fort, Jaipur',
    price: '₹18,499',
    priceUnit: '/ person (7 Days • Heritage Palace Stays)',
    ticketTitle: '18 Oct • 6 Seats Left',
    ticketSub: 'Next Group Departure (Jaipur)',
    stayInfo: '★★★★★ Heritage Haveli & Royal Palace',
    modalId: 'rajasthan-royals',
    badgeText: 'Royal Heritage Special'
  },
  {
    name: 'Ladakh High Passes',
    tagline: 'Mystic Ladakh & Nubra Valley Safari',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=160&h=160&q=80',
    weather: '❄️ 8°C • Pangong Tso, 14,270 ft',
    price: '₹23,999',
    priceUnit: '/ person (7 Days • Swiss Camp Stay)',
    ticketTitle: '20 Oct • 3 Seats Left',
    ticketSub: 'Next Group Departure (Leh)',
    stayInfo: '★★★★★ Luxury Swiss Tents & 4x4 Chauffeur',
    modalId: 'ladakh-pangong',
    badgeText: 'Adventure Signature'
  },
  {
    name: 'Kerala Backwaters',
    tagline: 'God\'s Own Country & Munnar Hills',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=160&h=160&q=80',
    weather: '🌴 28°C • Alleppey Backwaters',
    price: '₹14,499',
    priceUnit: '/ person (5 Days • Private Houseboat)',
    ticketTitle: '22 Oct • 5 Seats Left',
    ticketSub: 'Next Group Departure (Cochin)',
    stayInfo: '★★★★★ AC Deluxe Houseboat & Tea Resorts',
    modalId: 'kerala-gods-own',
    badgeText: 'Tropical Serenity'
  },
  {
    name: 'Himachal & Manali Snow',
    tagline: 'Shimla, Kullu & Manali Snow Valley',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=160&h=160&q=80',
    weather: '❄️ 10°C • Solang & Rohtang Pass',
    price: '₹15,499',
    priceUnit: '/ person (6 Days • Scenic Valley Resort)',
    ticketTitle: '24 Oct • 4 Seats Left',
    ticketSub: 'Next Group Departure (Manali)',
    stayInfo: '★★★★★ Mountain View 4★ Resort & Heaters',
    modalId: 'himachal-manali-shimla',
    badgeText: 'Snow & Valley Escape'
  },
  {
    name: 'Dubai Desert & Luxury',
    tagline: 'Futuristic Dubai & Dune Bashing 5D/4N',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=160&h=160&q=80',
    weather: '✨ 29°C • Dubai Marina & Desert',
    price: '₹36,999',
    priceUnit: '/ person (5 Days • 4★ City Hotel)',
    ticketTitle: '28 Oct • 2 Seats Left',
    ticketSub: 'Next International Departure',
    stayInfo: '★★★★★ 4★ Downtown Hotel & Desert Safari',
    modalId: 'dubai-futuristic',
    badgeText: 'Global Luxury Tour'
  },
  {
    name: 'Goa Golden Coast',
    tagline: 'Sun-Kissed Beaches & Sunset Cruises',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=160&h=160&q=80',
    weather: '☀️ 31°C • Calangute & Baga Coast',
    price: '₹11,999',
    priceUnit: '/ person (4 Days • 4★ Beach Resort)',
    ticketTitle: '29 Oct • 8 Seats Left',
    ticketSub: 'Next Beach Group Departure',
    stayInfo: '★★★★★ 4★ Beachfront Resort & Cabs',
    modalId: 'goa-sun-sand',
    badgeText: 'Tropical Beach Break'
  }
];

// Preload high-res and thumb images immediately for zero-flicker transitions
(function preloadDestinationImages() {
  HERO_DESTINATIONS.forEach(item => {
    const imgBig = new Image();
    imgBig.src = item.image;
    const imgThumb = new Image();
    imgThumb.src = item.thumb;
  });
})();

let heroCurrentIndex = 0;
let heroActiveLayer = 'A';
let heroTypeTimeout = null;
let heroProgressAnim = null;

// Apply visual changes across showcase card, weather pill, tickets, prices, and badges
function applyDestinationVisuals(dest) {
  const slideA = document.getElementById('heroSlideA');
  const slideB = document.getElementById('heroSlideB');
  const weatherBadge = document.getElementById('heroWeatherBadge');
  const weatherText = document.getElementById('heroWeatherText');
  const bottomInfo = document.querySelector('.hero-card-bottom-info');
  const tourTitle = document.getElementById('heroTourTitle');
  const tourPrice = document.getElementById('heroTourPrice');
  const featuredBadge = document.getElementById('heroFeaturedBadge');
  const stayStars = document.getElementById('heroStayStars');
  const ticketTitle = document.getElementById('heroTicketTitle');
  const ticketSub = document.getElementById('heroTicketSub');
  const miniThumb = document.getElementById('heroRotatorThumb');

  // 1. Rotate Mini Thumbnail in Heading
  if (miniThumb) {
    miniThumb.classList.add('thumb-transitioning');
    setTimeout(() => {
      miniThumb.src = dest.thumb;
      miniThumb.alt = dest.name;
      miniThumb.classList.remove('thumb-transitioning');
    }, 180);
  }

  // 2. Dual-Layer Smooth Crossfade for Hero Card Image
  if (slideA && slideB) {
    if (heroActiveLayer === 'A') {
      slideB.src = dest.image;
      slideB.alt = dest.name;
      slideB.classList.add('active');
      slideA.classList.remove('active');
      heroActiveLayer = 'B';
    } else {
      slideA.src = dest.image;
      slideA.alt = dest.name;
      slideA.classList.add('active');
      slideB.classList.remove('active');
      heroActiveLayer = 'A';
    }
  }

  // 3. Weather Badge Crossfade
  if (weatherBadge) {
    weatherBadge.classList.add('badge-fade');
    setTimeout(() => {
      if (weatherText) weatherText.textContent = dest.weather;
      weatherBadge.classList.remove('badge-fade');
    }, 200);
  }

  // 4. Bottom Info Card Crossfade
  if (bottomInfo) {
    bottomInfo.classList.add('info-fade');
    setTimeout(() => {
      if (tourTitle) tourTitle.textContent = dest.tagline;
      if (featuredBadge) featuredBadge.textContent = dest.badgeText;
      if (tourPrice) {
        tourPrice.innerHTML = `From <strong>${dest.price}</strong> <span>${dest.priceUnit}</span>`;
      }
      bottomInfo.classList.remove('info-fade');
    }, 200);
  }

  // 5. Floating Departure & Stay Tags
  if (stayStars) stayStars.textContent = dest.stayInfo;
  if (ticketTitle) ticketTitle.textContent = dest.ticketTitle;
  if (ticketSub) ticketSub.textContent = dest.ticketSub;

  // 6. Highlight active tab button on card
  document.querySelectorAll('.dest-tab-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === heroCurrentIndex);
  });

  // 7. Highlight active quick chip on left
  document.querySelectorAll('#heroQuickChips .chip-item').forEach((chip, idx) => {
    chip.classList.toggle('active-chip', idx === heroCurrentIndex);
  });

  // 8. Highlight active destination gallery card in bottom deck
  const galleryCards = document.querySelectorAll('#heroDestGalleryDeck .dest-gallery-card');
  galleryCards.forEach((card, idx) => {
    const isActive = idx === heroCurrentIndex;
    card.classList.toggle('active', isActive);
  });
}

// Start animated progress bar across active cycle
function startProgressBar(durationMs) {
  const bar = document.getElementById('heroProgressFill');
  if (!bar) return;

  if (heroProgressAnim) {
    clearInterval(heroProgressAnim);
  }

  bar.style.transition = 'none';
  bar.style.width = '0%';

  const startTime = Date.now();
  heroProgressAnim = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, (elapsed / durationMs) * 100);
    bar.style.width = `${pct}%`;
    if (pct >= 100) {
      clearInterval(heroProgressAnim);
    }
  }, 40);
}

// User-clickable destination switcher (works from tabs, chips, or modal triggers)
window.switchDestinationDirectly = function(index) {
  if (index < 0 || index >= HERO_DESTINATIONS.length) return;
  if (heroTypeTimeout) clearTimeout(heroTypeTimeout);
  if (heroProgressAnim) clearInterval(heroProgressAnim);

  heroCurrentIndex = index;
  const dest = HERO_DESTINATIONS[heroCurrentIndex];

  // Update text immediately
  const el = document.getElementById('heroDestinationRotator');
  if (el) el.textContent = dest.name;

  // Update all visual layers
  applyDestinationVisuals(dest);
  startProgressBar(4500);

  // Resume auto-cycle after viewing
  heroTypeTimeout = setTimeout(() => {
    advanceToNextDestination();
  }, 4500);
};

// Clicking the showcase card opens full itinerary details
window.handleHeroCardClick = function() {
  const dest = HERO_DESTINATIONS[heroCurrentIndex];
  if (dest && dest.modalId && typeof window.openItineraryModal === 'function') {
    window.openItineraryModal(dest.modalId);
  } else {
    const pkgSec = document.getElementById('packages');
    if (pkgSec) pkgSec.scrollIntoView({ behavior: 'smooth' });
  }
};

function advanceToNextDestination() {
  const el = document.getElementById('heroDestinationRotator');
  if (!el) return;

  const currentWord = HERO_DESTINATIONS[heroCurrentIndex].name;
  let charIndex = currentWord.length;

  // Smooth backspace/delete effect
  function deleteText() {
    if (charIndex > 0) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      heroTypeTimeout = setTimeout(deleteText, 40);
    } else {
      // Advance to next index
      heroCurrentIndex = (heroCurrentIndex + 1) % HERO_DESTINATIONS.length;
      const nextDest = HERO_DESTINATIONS[heroCurrentIndex];
      applyDestinationVisuals(nextDest);
      startTypingNewDestination();
    }
  }

  deleteText();
}

function startTypingNewDestination() {
  const el = document.getElementById('heroDestinationRotator');
  if (!el) return;

  const nextWord = HERO_DESTINATIONS[heroCurrentIndex].name;
  let charIndex = 0;

  function typeText() {
    if (charIndex <= nextWord.length) {
      el.textContent = nextWord.substring(0, charIndex);
      charIndex++;
      heroTypeTimeout = setTimeout(typeText, 70);
    } else {
      // Pause at full word and start progress bar
      startProgressBar(3800);
      heroTypeTimeout = setTimeout(advanceToNextDestination, 3800);
    }
  }

  typeText();
}

function initHeroTypewriter() {
  if (window.CINEMATIC_HERO_LOADED) return;
  const el = document.getElementById('heroDestinationRotator');
  if (!el) return;

  // Initialize with initial destination
  heroCurrentIndex = 0;
  applyDestinationVisuals(HERO_DESTINATIONS[0]);
  startProgressBar(3800);

  heroTypeTimeout = setTimeout(advanceToNextDestination, 3800);
}

// 13. 3D Mouse Parallax on Hero Visual Stage
function initMouseParallax() {
  if (window.CINEMATIC_HERO_LOADED) return;
  const stage = document.querySelector('.hero-visual-stage');
  if (!stage) return;

  const ticketCard = stage.querySelector('.float-card-ticket');
  const hotelCard = stage.querySelector('.float-card-hotel');
  const mainCard = stage.querySelector('.hero-main-card');
  const ambientOrb = stage.querySelector('.hero-ambient-orb');

  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (clientX - centerX) / 35;
    const deltaY = (clientY - centerY) / 35;

    if (ticketCard) {
      ticketCard.style.transform = `translate3d(${-deltaX * 1.5}px, ${-deltaY * 1.5}px, 0)`;
    }
    if (hotelCard) {
      hotelCard.style.transform = `translate3d(${deltaX * 1.8}px, ${deltaY * 1.8}px, 0)`;
    }
    if (mainCard) {
      mainCard.style.transform = `perspective(1000px) rotateY(${deltaX * 0.4}deg) rotateX(${-deltaY * 0.4}deg)`;
    }
    if (ambientOrb) {
      ambientOrb.style.transform = `translate3d(${deltaX * 0.8}px, ${deltaY * 0.8}px, 0)`;
    }
  });
}

// 14. Real-time Recent Booking Simulator Notification
function initRecentBookingsSimulator() {
  const bookings = [
    { name: 'Rohit K.', city: 'Delhi', package: 'Heavenly Kashmir 6D/5N', time: '2 mins ago' },
    { name: 'Priya & Vikram', city: 'Chandigarh', package: 'Kerala Houseboat & Munnar', time: '5 mins ago' },
    { name: 'Col. Mehta', city: 'Jammu', package: 'Ladakh Pangong Lake Tour', time: '12 mins ago' },
    { name: 'Ananya S.', city: 'Mumbai', package: 'Dazzling Dubai & Desert Safari', time: '18 mins ago' },
    { name: 'Sameer G.', city: 'Pune', package: 'Royal Rajasthan Heritage', time: '24 mins ago' }
  ];

  let bookingIndex = 0;

  function showBookingChip() {
    let chip = document.getElementById('recentBookingPopup');
    if (!chip) {
      chip = document.createElement('div');
      chip.id = 'recentBookingPopup';
      chip.style.cssText = `
        position: fixed;
        bottom: 25px;
        left: 25px;
        background: rgba(11, 25, 44, 0.94);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 142, 38, 0.4);
        border-radius: var(--radius-md);
        padding: 12px 16px;
        color: #ffffff;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
        z-index: 998;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 340px;
        transform: translateY(120px);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      `;
      document.body.appendChild(chip);
    }

    const item = bookings[bookingIndex];
    bookingIndex = (bookingIndex + 1) % bookings.length;

    chip.innerHTML = `
      <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(37, 211, 102, 0.2); display: flex; align-items: center; justify-content: center; color: #25d366; flex-shrink: 0; font-size: 1.1rem;">
        ⚡
      </div>
      <div>
        <div style="font-size: 0.82rem; font-weight: 700; color: #ffffff; line-height: 1.2;">${item.name} (${item.city})</div>
        <div style="font-size: 0.76rem; color: var(--accent-gold); font-weight: 600;">Booked: ${item.package}</div>
        <div style="font-size: 0.7rem; color: #94a3b8;">${item.time} • Verified Booking</div>
      </div>
    `;

    chip.style.transform = 'translateY(0)';
    chip.style.opacity = '1';

    setTimeout(() => {
      chip.style.transform = 'translateY(120px)';
      chip.style.opacity = '0';
    }, 4500);
  }

  // First trigger after 4 seconds, then periodically every 14 seconds
  setTimeout(() => {
    showBookingChip();
    setInterval(showBookingChip, 14000);
  }, 4000);
}

// 15. Clean URL router: Ensures all internal links use professional clean routes without .html
function initCleanLinks() {
  document.querySelectorAll('a[href]').forEach(link => {
    let href = link.getAttribute('href');
    if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
      return;
    }

    // Convert index.html to /
    if (href === 'index.html' || href === './index.html' || href === '/index.html') {
      link.setAttribute('href', '/');
      return;
    }

    // Strip .html from internal links
    if (href.includes('.html')) {
      const parts = href.split('?');
      let route = parts[0].replace(/\.html$/, '');
      if (route.startsWith('./')) route = route.slice(2);
      if (!route.startsWith('/')) route = '/' + route;
      const query = parts[1] ? '?' + parts[1] : '';
      link.setAttribute('href', route + query);
    }
  });
}

