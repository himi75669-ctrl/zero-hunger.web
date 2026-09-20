/* ==========================================================================
   FOODLINK - ZERO HUNGER (UN SDG 2) CORE JAVASCRIPT ENGINE
   Includes Mock DB, Leaflet Map integration, Chart.js, Routers, Role Switcher,
   AI Food Matching, AI Description Generator, and LocalStorage persistence.
   ========================================================================== */

// Global State & Database Seed
const INITIAL_STATE = {
  currentUserRole: 'donor', // 'donor' | 'volunteer' | 'ngo' | 'admin'
  currentUser: {
    id: 'u_1',
    name: 'Green Valley Caterers',
    email: 'contact@greenvalley.com',
    role: 'donor',
    phone: '+91 98765 43210',
    location: 'Anna Nagar, Chennai'
  },
  donations: [
    {
      id: 'don_101',
      donor_id: 'u_1',
      donor_name: 'Green Valley Caterers',
      food_name: 'Surplus Banquet Rice & Paneer Butter Masala',
      category: 'Cooked Meals',
      servings: 120,
      dietary_type: 'Vegetarian',
      preparation_time: '2026-09-20T18:00',
      pickup_deadline: '2026-09-21T02:00',
      location: '12th Main Road, Anna Nagar, Chennai',
      lat: 13.0850,
      lng: 80.2100,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      status: 'Available', // 'Available' | 'Accepted' | 'Picked Up' | 'Delivered'
      instructions: 'Hot packed in stainless thermoware containers. Requires covered transport vehicle.',
      phone: '+91 98765 43210',
      created_at: '2026-09-20T19:30:00Z'
    },
    {
      id: 'don_102',
      donor_id: 'u_5',
      donor_name: 'Royal Feast Hotel',
      food_name: 'Fresh Bakery Croissants & Fruit Sandwiches',
      category: 'Bakery & Snacks',
      servings: 60,
      dietary_type: 'Vegetarian',
      preparation_time: '2026-09-20T17:00',
      pickup_deadline: '2026-09-21T04:00',
      location: 'T. Nagar, Chennai',
      lat: 13.0418,
      lng: 80.2341,
      image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
      status: 'Accepted',
      instructions: 'Individual box packaging ready for rapid distribution.',
      phone: '+91 94440 12345',
      created_at: '2026-09-20T18:45:00Z'
    },
    {
      id: 'don_103',
      donor_id: 'u_6',
      donor_name: 'SRM College Hostel Mess',
      food_name: 'Chapati, Vegetable Kurma & Steamed Rice',
      category: 'Cooked Meals',
      servings: 180,
      dietary_type: 'Vegetarian',
      preparation_time: '2026-09-20T20:00',
      pickup_deadline: '2026-09-21T01:30',
      location: 'Kattankulathur, Chennai',
      lat: 12.8231,
      lng: 80.0444,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
      status: 'Available',
      instructions: 'Please bring food-grade insulated buckets for transfer.',
      phone: '+91 98401 99887',
      created_at: '2026-09-20T21:00:00Z'
    },
    {
      id: 'don_104',
      donor_id: 'u_7',
      donor_name: 'Fresh Farm Produce Market',
      food_name: 'Assorted Organic Apples & Bananas Crates',
      category: 'Fresh Produce / Fruits',
      servings: 90,
      dietary_type: 'Vegan',
      preparation_time: '2026-09-20T14:00',
      pickup_deadline: '2026-09-22T12:00',
      location: 'Koyambedu Wholesale Market, Chennai',
      lat: 13.0694,
      lng: 80.1948,
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
      status: 'Delivered',
      instructions: 'Crated in wooden boxes.',
      phone: '+91 97900 11223',
      created_at: '2026-09-20T15:00:00Z'
    },
    {
      id: 'don_105',
      donor_id: 'u_8',
      donor_name: 'Ananda Bhavan Function Hall',
      food_name: 'Sambar Rice & Curd Rice Packets',
      category: 'Cooked Meals',
      servings: 75,
      dietary_type: 'Vegetarian',
      preparation_time: '2026-09-20T19:00',
      pickup_deadline: '2026-09-21T03:00',
      location: 'Adyar, Chennai',
      lat: 13.0012,
      lng: 80.2565,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      status: 'Available',
      instructions: 'Pre-sealed leaf parcel packets.',
      phone: '+91 91760 54321',
      created_at: '2026-09-20T20:15:00Z'
    }
  ],
  volunteers: [
    { id: 'v_1', user_id: 'u_2', name: 'Rahul Sharma', phone: '+91 98840 11223', lat: 13.0780, lng: 80.2150, status: 'Active', total_trips: 12, total_km: 48.5 },
    { id: 'v_2', user_id: 'v_u2', name: 'Priya Sundaram', phone: '+91 98410 44556', lat: 13.0450, lng: 80.2400, status: 'Active', total_trips: 24, total_km: 92.0 },
    { id: 'v_3', user_id: 'v_u3', name: 'Karthik Raja', phone: '+91 97100 77889', lat: 13.0050, lng: 80.2500, status: 'Active', total_trips: 8, total_km: 31.2 },
    { id: 'v_4', user_id: 'v_u4', name: 'Sneha Patel', phone: '+91 96000 33221', lat: 13.0600, lng: 80.1900, status: 'Active', total_trips: 15, total_km: 54.0 },
    { id: 'v_5', user_id: 'v_u5', name: 'Arun Kumar', phone: '+91 95511 66778', lat: 12.8300, lng: 80.0500, status: 'Active', total_trips: 19, total_km: 78.4 }
  ],
  ngos: [
    { id: 'ngo_1', user_id: 'u_3', name: 'Hope Welfare Foundation', reg_num: 'NGO-TN-2021-4401', address: 'Kilpauk, Chennai', lat: 13.0800, lng: 80.2400, status: 'Verified', phone: '+91 44 2640 1122' },
    { id: 'ngo_2', user_id: 'n_u2', name: 'Akshaya Patra Trust Center', reg_num: 'NGO-TN-2018-1120', address: 'Guindy, Chennai', lat: 13.0067, lng: 80.2020, status: 'Verified', phone: '+91 44 2250 8899' },
    { id: 'ngo_3', user_id: 'n_u3', name: 'Annadhanam Children Home', reg_num: 'NGO-TN-2023-9902', address: 'Tambaram, Chennai', lat: 12.9249, lng: 80.1000, status: 'Pending Verification', phone: '+91 94444 33311' }
  ],
  deliveries: [
    {
      id: 'del_1',
      donation_id: 'don_102',
      donation_title: 'Fresh Bakery Croissants & Fruit Sandwiches',
      volunteer_id: 'v_1',
      volunteer_name: 'Rahul Sharma',
      ngo_name: 'Hope Welfare Foundation',
      pickup_time: '2026-09-20T19:00:00Z',
      status: 'Picked Up', // 'Accepted' -> 'Picked Up' -> 'Delivered'
      created_at: '2026-09-20T18:50:00Z'
    },
    {
      id: 'del_2',
      donation_id: 'don_104',
      donation_title: 'Assorted Organic Apples & Bananas Crates',
      volunteer_id: 'v_2',
      volunteer_name: 'Priya Sundaram',
      ngo_name: 'Akshaya Patra Trust Center',
      pickup_time: '2026-09-20T16:00:00Z',
      delivery_time: '2026-09-20T17:15:00Z',
      status: 'Delivered',
      created_at: '2026-09-20T15:30:00Z'
    }
  ],
  notifications: [
    { id: 'n_1', title: 'New Surplus Food Nearby', message: 'Green Valley Caterers posted 120 servings of Banquet Rice near Anna Nagar.', time: '10 mins ago', read: false, type: 'alert' },
    { id: 'n_2', title: 'Pickup Accepted!', message: 'Volunteer Rahul Sharma accepted your bakery donation.', time: '45 mins ago', read: false, type: 'success' },
    { id: 'n_3', title: 'NGO Food Request Received', message: 'Hope Foundation requested 60 servings from your listing.', time: '2 hours ago', read: true, type: 'info' }
  ]
};

// State Store Manager
class AppState {
  constructor() {
    const saved = localStorage.getItem('foodlink_state_v1');
    if (saved) {
      try {
        this.data = JSON.parse(saved);
      } catch (e) {
        this.data = JSON.parse(JSON.stringify(INITIAL_STATE));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(INITIAL_STATE));
    }
  }

  save() {
    localStorage.setItem('foodlink_state_v1', JSON.stringify(this.data));
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(INITIAL_STATE));
    this.save();
    window.location.reload();
  }
}

const store = new AppState();
let leafletMap = null;
let mapMarkersGroup = null;

// ==================== INITIALIZATION & ROUTING ====================
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  updateAuthHeader();
  renderNotifications();
  updateImpactNumbers();
});

function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash, false);
}

function navigateTo(viewId, pushHash = true) {
  if (pushHash) {
    window.location.hash = viewId;
  }

  // Update Nav Active State
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-view') === viewId);
  });

  // Switch View Visibility
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewId}`) || document.getElementById('view-home');
  targetView.classList.add('active');

  // Trigger View Specific Renderers
  if (viewId === 'home') {
    renderHomeDonations();
  } else if (viewId === 'find-food') {
    setTimeout(initLeafletMap, 150);
  } else if (viewId === 'volunteer') {
    renderVolunteerPage();
  } else if (viewId === 'dashboard') {
    renderDashboard();
  } else if (viewId === 'admin') {
    renderAdminPage();
  } else if (viewId === 'impact') {
    setTimeout(initChartJS, 200);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== ROLE SWITCHER & DEMO CONTROLLER ====================
function switchDemoRole(role) {
  store.data.currentUserRole = role;
  
  if (role === 'donor') {
    store.data.currentUser = { id: 'u_1', name: 'Green Valley Caterers', email: 'contact@greenvalley.com', role: 'donor' };
  } else if (role === 'volunteer') {
    store.data.currentUser = { id: 'v_1', name: 'Rahul Sharma', email: 'rahul@volunteer.org', role: 'volunteer' };
  } else if (role === 'ngo') {
    store.data.currentUser = { id: 'ngo_1', name: 'Hope Welfare Foundation', email: 'contact@hopetrust.org', role: 'ngo' };
  } else if (role === 'admin') {
    store.data.currentUser = { id: 'admin_1', name: 'Platform Administrator', email: 'admin@foodlink.org', role: 'admin' };
  }

  store.save();
  updateAuthHeader();

  // If on Dashboard, re-render
  if (document.getElementById('view-dashboard').classList.contains('active')) {
    renderDashboard();
  } else if (document.getElementById('view-volunteer').classList.contains('active')) {
    renderVolunteerPage();
  }

  showToast(`Switched Role to ${role.toUpperCase()}`);
}

function resetDemoData() {
  if (confirm('Reset all demo listings, volunteers, and notifications back to original state?')) {
    store.reset();
  }
}

function updateAuthHeader() {
  const container = document.getElementById('auth-buttons-container');
  const user = store.data.currentUser;

  if (user) {
    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="tag tag-success" style="cursor:pointer;" onclick="navigateTo('dashboard')">
          <i class="fa-solid fa-user"></i> ${user.name}
        </span>
        <button class="btn btn-outline btn-sm" onclick="openAuthModal()"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="openAuthModal()"><i class="fa-solid fa-user-plus"></i> Sign In / Register</button>
    `;
  }

  // Update role selector dropdown value
  const sel = document.getElementById('current-role-select');
  if (sel) sel.value = store.data.currentUserRole;
}

// ==================== 1. HOME VIEW RENDERER ====================
function renderHomeDonations() {
  const container = document.getElementById('home-donations-grid');
  if (!container) return;

  const available = store.data.donations.filter(d => d.status === 'Available');

  if (available.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">No live surplus food listings available at this moment.</div>`;
    return;
  }

  container.innerHTML = available.slice(0, 3).map(don => `
    <div class="food-card">
      <div class="card-img-wrapper">
        <img src="${don.image}" alt="${don.food_name}">
        <span class="badge-diet">${don.dietary_type === 'Vegetarian' ? '🟢 Veg' : '🔴 Non-Veg'}</span>
        <span class="badge-status tag tag-success">${don.status}</span>
      </div>
      <div class="food-card-body">
        <h3 class="food-card-title">${don.food_name}</h3>
        <p class="donor-subname"><i class="fa-solid fa-building-user"></i> ${don.donor_name}</p>
        
        <div class="food-meta-grid">
          <div class="meta-item"><i class="fa-solid fa-users"></i> ${don.servings} Servings</div>
          <div class="meta-item"><i class="fa-solid fa-clock"></i> Pickup by ${formatTime(don.pickup_deadline)}</div>
          <div class="meta-item"><i class="fa-solid fa-location-dot"></i> ${don.location.split(',')[0]}</div>
          <div class="meta-item"><i class="fa-solid fa-utensils"></i> ${don.category}</div>
        </div>

        <div class="food-card-footer">
          <span class="distance-tag"><i class="fa-solid fa-person-walking"></i> ~2.4 km away</span>
          <button class="btn btn-primary btn-sm" onclick="openFoodDetailModal('${don.id}')">View Details & Accept</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== 2. DONATION FORM & AI FEATURES ====================
function setPresetImage(url) {
  document.getElementById('food_image').value = url;
}

function useCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      document.getElementById('location').value = `GPS: (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}) Near MG Road, Chennai`;
      showToast('GPS Coordinates Captured!');
    }, () => {
      document.getElementById('location').value = 'Anna Nagar 2nd Avenue, Chennai';
      showToast('Location set to default city hub');
    });
  }
}

function generateAIFoodDescription() {
  const name = document.getElementById('food_name').value || 'Fresh Surplus Meals';
  const servings = document.getElementById('servings').value || '50';
  const category = document.getElementById('category').value;
  const diet = document.getElementById('dietary_type').value;

  const desc = `[AI Standardized Listing]: Freshly prepared ${diet.toLowerCase()} ${category.toLowerCase()} (${name}) suitable for ${servings} individuals. Packed hygienically in food-grade thermoware containers. Recommended for immediate pickup and consumption before deadline.`;
  
  document.getElementById('instructions').value = desc;
  showToast('AI Food Description Generated!');
}

function handleDonationSubmit(e) {
  e.preventDefault();

  const don = {
    id: `don_${Date.now()}`,
    donor_id: store.data.currentUser.id,
    donor_name: store.data.currentUser.name || 'Anonymous Donor',
    food_name: document.getElementById('food_name').value,
    category: document.getElementById('category').value,
    servings: parseInt(document.getElementById('servings').value),
    dietary_type: document.getElementById('dietary_type').value,
    preparation_time: document.getElementById('preparation_time').value,
    pickup_deadline: document.getElementById('pickup_deadline').value,
    location: document.getElementById('location').value,
    lat: 13.0800 + (Math.random() - 0.5) * 0.08,
    lng: 80.2100 + (Math.random() - 0.5) * 0.08,
    image: document.getElementById('food_image').value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    status: 'Available',
    instructions: document.getElementById('instructions').value,
    phone: document.getElementById('donor_phone').value,
    created_at: new Date().toISOString()
  };

  store.data.donations.unshift(don);

  // Trigger Notification
  store.data.notifications.unshift({
    id: `n_${Date.now()}`,
    title: 'Surplus Food Donation Published',
    message: `${don.donor_name} published ${don.servings} servings of ${don.food_name}.`,
    time: 'Just now',
    read: false,
    type: 'success'
  });

  store.save();
  renderNotifications();
  showToast('Food Donation Published Successfully!');
  document.getElementById('donation-form').reset();
  navigateTo('find-food');
}

// ==================== 3. LEAFLET MAP & DIRECTORY ====================
function initLeafletMap() {
  const mapElem = document.getElementById('leaflet-map');
  if (!mapElem) return;

  if (!leafletMap) {
    leafletMap = L.map('leaflet-map').setView([13.0600, 80.2200], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors | FoodLink Zero Hunger'
    }).addTo(leafletMap);

    mapMarkersGroup = L.layerGroup().addTo(leafletMap);
  }

  renderMapMarkers('all');
  renderDirectoryCards(store.data.donations);
}

function renderMapMarkers(filter = 'all') {
  if (!mapMarkersGroup) return;
  mapMarkersGroup.clearLayers();

  // 1. Food Donations Markers (Green)
  if (filter === 'all' || filter === 'donations') {
    store.data.donations.forEach(don => {
      const icon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:#10b981; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3); border:2px solid #fff;"><i class="fa-solid fa-bowl-food" style="font-size:14px;"></i></div>`
      });

      const marker = L.marker([don.lat, don.lng], { icon }).addTo(mapMarkersGroup);
      marker.bindPopup(`
        <div style="font-family:sans-serif; padding:4px;">
          <strong style="font-size:0.95rem; color:#0f172a;">${don.food_name}</strong>
          <p style="font-size:0.8rem; margin:4px 0; color:#475569;">${don.servings} Servings • ${don.donor_name}</p>
          <span class="tag tag-success">${don.status}</span>
          <br><br>
          <button class="btn btn-primary btn-sm" onclick="openFoodDetailModal('${don.id}')">View Details</button>
        </div>
      `);
    });
  }

  // 2. NGOs Markers (Blue)
  if (filter === 'all' || filter === 'ngos') {
    store.data.ngos.forEach(ngo => {
      const icon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:#0284c7; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3); border:2px solid #fff;"><i class="fa-solid fa-building-ngo" style="font-size:14px;"></i></div>`
      });

      const marker = L.marker([ngo.lat, ngo.lng], { icon }).addTo(mapMarkersGroup);
      marker.bindPopup(`
        <div style="font-family:sans-serif; padding:4px;">
          <strong style="font-size:0.95rem; color:#0f172a;">${ngo.name}</strong>
          <p style="font-size:0.8rem; margin:4px 0; color:#475569;">Registered NGO • ${ngo.address}</p>
          <span class="tag tag-info">${ngo.status}</span>
        </div>
      `);
    });
  }

  // 3. Volunteers Markers (Orange)
  if (filter === 'all' || filter === 'volunteers') {
    store.data.volunteers.forEach(vol => {
      const icon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background:#f97316; color:#fff; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3); border:2px solid #fff;"><i class="fa-solid fa-person-biking" style="font-size:14px;"></i></div>`
      });

      const marker = L.marker([vol.lat, vol.lng], { icon }).addTo(mapMarkersGroup);
      marker.bindPopup(`
        <div style="font-family:sans-serif; padding:4px;">
          <strong style="font-size:0.95rem; color:#0f172a;">${vol.name} (Volunteer)</strong>
          <p style="font-size:0.8rem; margin:4px 0; color:#475569;">Trips: ${vol.total_trips} | Dist: ${vol.total_km} km</p>
          <span class="tag tag-warning">Active Transporter</span>
        </div>
      `);
    });
  }
}

function filterMapMarkers(type) {
  document.querySelectorAll('.map-filter-pills .pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === type);
  });
  renderMapMarkers(type);
}

function renderDirectoryCards(donations) {
  const container = document.getElementById('directory-cards-container');
  if (!container) return;

  if (donations.length === 0) {
    container.innerHTML = `<p style="padding:20px; text-align:center; color:var(--text-muted);">No matching listings found.</p>`;
    return;
  }

  container.innerHTML = donations.map(don => `
    <div class="dir-card" onclick="openFoodDetailModal('${don.id}')">
      <div class="dir-card-header">
        <h4>${don.food_name}</h4>
        <span class="tag ${don.status === 'Available' ? 'tag-success' : 'tag-warning'}">${don.status}</span>
      </div>
      <div class="dir-card-body">
        <p><i class="fa-solid fa-users text-emerald"></i> ${don.servings} Servings (${don.dietary_type})</p>
        <p><i class="fa-solid fa-location-dot text-blue"></i> ${don.location}</p>
        <p><i class="fa-solid fa-clock text-orange"></i> Deadline: ${formatTime(don.pickup_deadline)}</p>
      </div>
    </div>
  `).join('');
}

function handleDirectorySearch(query) {
  const q = query.toLowerCase();
  const filtered = store.data.donations.filter(d => 
    d.food_name.toLowerCase().includes(q) || 
    d.donor_name.toLowerCase().includes(q) || 
    d.location.toLowerCase().includes(q)
  );
  renderDirectoryCards(filtered);
}

// ==================== 4. VOLUNTEER LOGISTICS ====================
function renderVolunteerPage() {
  document.getElementById('vol-accepted-count').textContent = store.data.deliveries.filter(d => d.status !== 'Delivered').length;
  
  const available = store.data.donations.filter(d => d.status === 'Available');
  const availableGrid = document.getElementById('vol-available-grid');

  if (availableGrid) {
    if (available.length === 0) {
      availableGrid.innerHTML = `<p style="grid-column:1/-1; padding:30px; text-align:center; color:var(--text-muted);">No open food pickups right now.</p>`;
    } else {
      availableGrid.innerHTML = available.map(don => `
        <div class="food-card">
          <div class="card-img-wrapper">
            <img src="${don.image}" alt="${don.food_name}">
            <span class="badge-diet">${don.dietary_type}</span>
            <span class="badge-status tag tag-success">Pickup Open</span>
          </div>
          <div class="food-card-body">
            <h3 class="food-card-title">${don.food_name}</h3>
            <p class="donor-subname"><i class="fa-solid fa-building"></i> ${don.donor_name}</p>
            <div class="food-meta-grid">
              <div class="meta-item"><i class="fa-solid fa-users"></i> ${don.servings} Servings</div>
              <div class="meta-item"><i class="fa-solid fa-location-dot"></i> ${don.location.split(',')[0]}</div>
            </div>
            <button class="btn btn-primary btn-block" onclick="acceptPickup('${don.id}')">
              <i class="fa-solid fa-hand-holding-box"></i> Accept Pickup Task
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  // Deliveries List Pipeline
  const delList = document.getElementById('vol-my-deliveries-list');
  if (delList) {
    delList.innerHTML = store.data.deliveries.map(del => `
      <div class="delivery-card">
        <div class="delivery-info">
          <h4>${del.donation_title}</h4>
          <p><i class="fa-solid fa-user-gear"></i> Volunteer: ${del.volunteer_name} | Destination: ${del.ngo_name}</p>
        </div>
        <div class="pipeline-steps">
          <span class="pipe-step ${del.status === 'Accepted' || del.status === 'Picked Up' || del.status === 'Delivered' ? 'done' : ''}">Accepted</span>
          <span class="pipe-step ${del.status === 'Picked Up' || del.status === 'Delivered' ? 'done' : (del.status === 'Accepted' ? 'current' : '')}">Picked Up</span>
          <span class="pipe-step ${del.status === 'Delivered' ? 'done' : ''}">Delivered</span>
        </div>
        <div>
          ${del.status === 'Accepted' ? `<button class="btn btn-secondary btn-sm" onclick="updateDeliveryStatus('${del.id}', 'Picked Up')">Mark Picked Up</button>` : ''}
          ${del.status === 'Picked Up' ? `<button class="btn btn-primary btn-sm" onclick="updateDeliveryStatus('${del.id}', 'Delivered')">Mark Delivered</button>` : ''}
          ${del.status === 'Delivered' ? `<span class="tag tag-success"><i class="fa-solid fa-check"></i> Complete</span>` : ''}
        </div>
      </div>
    `).join('');
  }
}

function switchVolunteerTab(tab) {
  document.querySelectorAll('.volunteer-tabs .tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.vol-tab-content').forEach(c => c.classList.remove('active'));
  
  if (tab === 'available') {
    document.querySelectorAll('.volunteer-tabs .tab-btn')[0].classList.add('active');
    document.getElementById('vol-tab-available').classList.add('active');
  } else {
    document.querySelectorAll('.volunteer-tabs .tab-btn')[1].classList.add('active');
    document.getElementById('vol-tab-my-deliveries').classList.add('active');
  }
}

function acceptPickup(donationId) {
  const don = store.data.donations.find(d => d.id === donationId);
  if (!don) return;

  don.status = 'Accepted';

  const newDel = {
    id: `del_${Date.now()}`,
    donation_id: don.id,
    donation_title: don.food_name,
    volunteer_id: store.data.currentUser.id,
    volunteer_name: store.data.currentUser.name || 'Rahul Sharma',
    ngo_name: 'Hope Welfare Foundation',
    pickup_time: new Date().toISOString(),
    status: 'Accepted',
    created_at: new Date().toISOString()
  };

  store.data.deliveries.unshift(newDel);

  store.data.notifications.unshift({
    id: `n_${Date.now()}`,
    title: 'Donation Pickup Accepted',
    message: `${newDel.volunteer_name} accepted the pickup for ${don.food_name}.`,
    time: 'Just now',
    read: false,
    type: 'info'
  });

  store.save();
  renderNotifications();
  showToast('Pickup Task Accepted!');
  renderVolunteerPage();
}

function updateDeliveryStatus(delId, newStatus) {
  const del = store.data.deliveries.find(d => d.id === delId);
  if (!del) return;

  del.status = newStatus;
  const don = store.data.donations.find(d => d.id === del.donation_id);
  if (don) don.status = newStatus;

  if (newStatus === 'Delivered') {
    del.delivery_time = new Date().toISOString();
  }

  store.save();
  showToast(`Delivery status updated to ${newStatus}`);
  renderVolunteerPage();
}

// ==================== 5. DASHBOARD RENDERER ====================
function renderDashboard() {
  const container = document.getElementById('dashboard-dynamic-content');
  const role = store.data.currentUserRole;

  document.getElementById('dashboard-role-title').textContent = `${role.toUpperCase()} Dashboard`;
  document.getElementById('chip-role-name').textContent = role.toUpperCase();

  if (role === 'donor') {
    const myDonations = store.data.donations;
    const totalServings = myDonations.reduce((acc, d) => acc + d.servings, 0);

    container.innerHTML = `
      <div class="dashboard-stats-grid">
        <div class="card stat-widget">
          <div class="widget-icon text-emerald"><i class="fa-solid fa-box-open"></i></div>
          <div><h4>${myDonations.length}</h4><p>Total Listed Donations</p></div>
        </div>
        <div class="card stat-widget">
          <div class="widget-icon text-blue"><i class="fa-solid fa-utensils"></i></div>
          <div><h4>${totalServings}</h4><p>Total Meals Rescued</p></div>
        </div>
        <div class="card stat-widget">
          <div class="widget-icon text-orange"><i class="fa-solid fa-clock-rotate-left"></i></div>
          <div><h4>${myDonations.filter(d => d.status === 'Available').length}</h4><p>Active Unpicked Listings</p></div>
        </div>
      </div>

      <div class="card form-card">
        <h3><i class="fa-solid fa-list-check"></i> My Published Food Listings</h3>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr><th>Food Name</th><th>Servings</th><th>Status</th><th>Pickup Deadline</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${myDonations.map(d => `
                <tr>
                  <td><strong>${d.food_name}</strong></td>
                  <td>${d.servings} Servings</td>
                  <td><span class="tag ${d.status === 'Available' ? 'tag-success' : 'tag-warning'}">${d.status}</span></td>
                  <td>${formatTime(d.pickup_deadline)}</td>
                  <td><button class="btn btn-outline btn-sm" onclick="openFoodDetailModal('${d.id}')">View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (role === 'ngo') {
    container.innerHTML = `
      <div class="dashboard-stats-grid">
        <div class="card stat-widget">
          <div class="widget-icon text-emerald"><i class="fa-solid fa-building-ngo"></i></div>
          <div><h4>Verified NGO</h4><p>Hope Welfare Foundation</p></div>
        </div>
        <div class="card stat-widget">
          <div class="widget-icon text-blue"><i class="fa-solid fa-hand-holding-heart"></i></div>
          <div><h4>450 Servings</h4><p>Received This Month</p></div>
        </div>
      </div>

      <div class="card form-card">
        <h3><i class="fa-solid fa-bullhorn"></i> Available Food Surplus For Request</h3>
        <div class="donations-grid mt-3">
          ${store.data.donations.filter(d => d.status === 'Available').map(d => `
            <div class="food-card">
              <div class="food-card-body">
                <h4>${d.food_name}</h4>
                <p>${d.servings} Servings • ${d.location}</p>
                <button class="btn btn-secondary btn-block mt-3" onclick="requestFoodForNGO('${d.id}')">Request Food Delivery</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    navigateTo('admin');
  }
}

function requestFoodForNGO(donId) {
  showToast('Food Request Sent to Donor & Nearest Transporter!');
}

// ==================== 6. ADMIN DASHBOARD RENDERER ====================
function renderAdminPage() {
  document.getElementById('admin-users-total').textContent = store.data.volunteers.length + store.data.ngos.length + 10;
  document.getElementById('admin-ngos-total').textContent = store.data.ngos.length;
  document.getElementById('admin-donations-total').textContent = store.data.donations.length;

  // NGO Verification Table
  const ngoBody = document.querySelector('#table-ngo-verification tbody');
  if (ngoBody) {
    ngoBody.innerHTML = store.data.ngos.map(ngo => `
      <tr>
        <td><strong>${ngo.name}</strong></td>
        <td><code>${ngo.reg_num}</code></td>
        <td>${ngo.address}</td>
        <td><span class="tag ${ngo.status === 'Verified' ? 'tag-success' : 'tag-warning'}">${ngo.status}</span></td>
        <td>
          ${ngo.status === 'Pending Verification' 
            ? `<button class="btn btn-primary btn-sm" onclick="verifyNGO('${ngo.id}')">Approve & Verify</button>` 
            : `<button class="btn btn-outline btn-sm" disabled>Verified</button>`}
        </td>
      </tr>
    `).join('');
  }

  // Food Donation Moderation Table
  const donBody = document.querySelector('#table-admin-donations tbody');
  if (donBody) {
    donBody.innerHTML = store.data.donations.map(don => `
      <tr>
        <td><strong>${don.food_name}</strong></td>
        <td>${don.donor_name}</td>
        <td>${don.servings} Servings</td>
        <td><span class="tag tag-info">${don.status}</span></td>
        <td>${formatTime(don.pickup_deadline)}</td>
        <td>
          <button class="btn btn-outline btn-sm text-danger" onclick="deleteDonationByAdmin('${don.id}')">
            <i class="fa-solid fa-trash"></i> Remove
          </button>
        </td>
      </tr>
    `).join('');
  }
}

function verifyNGO(ngoId) {
  const ngo = store.data.ngos.find(n => n.id === ngoId);
  if (ngo) {
    ngo.status = 'Verified';
    store.save();
    showToast(`${ngo.name} has been verified!`);
    renderAdminPage();
  }
}

function deleteDonationByAdmin(donId) {
  if (confirm('Are you sure you want to remove this listing?')) {
    store.data.donations = store.data.donations.filter(d => d.id !== donId);
    store.save();
    showToast('Listing removed by Admin');
    renderAdminPage();
  }
}

// ==================== 7. CHART.JS INTEGRATION ====================
function initChartJS() {
  const ctx1 = document.getElementById('chart-monthly-meals');
  const ctx2 = document.getElementById('chart-food-categories');

  if (ctx1 && !ctx1.chartInstance) {
    ctx1.chartInstance = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Meals Rescued',
          data: [1200, 2400, 3800, 5100, 7350],
          backgroundColor: '#10b981',
          borderRadius: 6
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  if (ctx2 && !ctx2.chartInstance) {
    ctx2.chartInstance = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Cooked Meals', 'Bakery & Snacks', 'Fresh Produce', 'Packaged Foods'],
        datasets: [{
          data: [55, 20, 15, 10],
          backgroundColor: ['#10b981', '#f97316', '#0284c7', '#8b5cf6']
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}

// ==================== MODALS & UTILITIES ====================
function openFoodDetailModal(id) {
  const don = store.data.donations.find(d => d.id === id);
  if (!don) return;

  const content = document.getElementById('modal-food-detail-content');
  content.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
      <img src="${don.image}" alt="${don.food_name}" style="width:100%; height:250px; object-fit:cover; border-radius:12px;">
      <div>
        <span class="tag tag-success mb-2">${don.status}</span>
        <h2 style="font-size:1.4rem; color:#0f172a; margin-top:6px;">${don.food_name}</h2>
        <p style="font-size:0.85rem; color:#64748b;">Listed by <strong>${don.donor_name}</strong></p>
        <hr style="margin:12px 0; border:none; border-top:1px solid #e2e8f0;">
        <p><strong>Category:</strong> ${don.category}</p>
        <p><strong>Quantity:</strong> ${don.servings} Servings (${don.dietary_type})</p>
        <p><strong>Pickup Location:</strong> ${don.location}</p>
        <p><strong>Pickup Deadline:</strong> ${formatTime(don.pickup_deadline)}</p>
        <p><strong>Contact:</strong> ${don.phone}</p>
        <br>
        <button class="btn btn-primary btn-block" onclick="acceptPickup('${don.id}'); closeFoodDetailModal();">
          <i class="fa-solid fa-truck-ramp-box"></i> Accept Pickup as Volunteer
        </button>
      </div>
    </div>
  `;

  document.getElementById('modal-food-detail').classList.remove('hidden');
}

function closeFoodDetailModal() {
  document.getElementById('modal-food-detail').classList.add('hidden');
}

function openAuthModal() {
  document.getElementById('modal-auth').classList.remove('hidden');
}

function closeAuthModal() {
  document.getElementById('modal-auth').classList.add('hidden');
}

function switchAuthTab(tab) {
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-register').classList.toggle('active', tab === 'register');
  document.getElementById('form-login').classList.toggle('active', tab === 'login');
  document.getElementById('form-register').classList.toggle('active', tab === 'register');
}

function toggleRegFields(role) {
  document.getElementById('ngo-extra-fields').classList.toggle('hidden', role !== 'ngo');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  closeAuthModal();
  showToast('Logged in successfully!');
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  closeAuthModal();
  showToast('Account registered successfully!');
}

function toggleNotificationPanel() {
  document.getElementById('notif-panel').classList.toggle('hidden');
}

function renderNotifications() {
  const list = document.getElementById('notif-list');
  const badge = document.getElementById('notif-count');
  if (!list) return;

  const unreadCount = store.data.notifications.filter(n => !n.read).length;
  if (badge) badge.textContent = unreadCount;

  list.innerHTML = store.data.notifications.map(n => `
    <div class="notif-item ${!n.read ? 'unread' : ''}">
      <div class="notif-icon"><i class="fa-solid fa-bell"></i></div>
      <div class="notif-content">
        <strong>${n.title}</strong>
        <p>${n.message}</p>
        <span class="notif-time">${n.time}</span>
      </div>
    </div>
  `).join('');
}

function markAllNotificationsRead() {
  store.data.notifications.forEach(n => n.read = true);
  store.save();
  renderNotifications();
}

function updateImpactNumbers() {
  // Animates or sets static counters
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 20px; right: 20px;
    background: #0f172a; color: #fff; padding: 12px 20px;
    border-radius: 8px; font-weight: 600; font-size: 0.9rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3); z-index: 3000;
    border-left: 4px solid #10b981; animation: fadeIn 0.3s;
  `;
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald" style="margin-right:8px;"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function formatTime(isoStr) {
  if (!isoStr) return 'N/A';
  const d = new Date(isoStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + d.toLocaleDateString();
}

function toggleMobileNav() {
  document.getElementById('nav-menu').classList.toggle('open');
}
