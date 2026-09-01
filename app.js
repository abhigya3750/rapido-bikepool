// Rapido Bikepool & Highway - Production UX Interaction Architecture (v2.2)

let map;
let pickupMarker;
let dropMarker;
let routePolyline;
let movingBikeMarker;

let countdownInterval = null;
let tripTimerInterval = null;
let hostTripTimerInterval = null;
let speedSimInterval = null;
let hostSpeedSimInterval = null;
let callTimerInterval = null;

let tripLiveSeconds = 0;
let hostLiveSeconds = 0;
let callLiveSeconds = 0;
let selectedPayment = 'Rapido Wallet';
let currentFare = 43;
let currentDistKm = 8.2;
let selectedRating = 5;
let hostSelectedRating = 5;
let pendingHostBookingIndex = 1;
let currentRouteType = 'city'; // 'city' (<=30km) or 'highway' (>30km)
let hostIsOnboarded = false; // State of Host Onboarding
let isPinkPoolFilterActive = false; // State for Women-Only Pink Pool Filter

// User & Host Registered Profile
let hostProfile = {
  vehicleType: 'Motorcycle',
  vehicleModel: 'Royal Enfield Hunter 350 (Blue)',
  plateNumber: 'MP 09 AB 7842',
  dlNumber: 'DL-092021008742',
  hasSpareHelmet: true
};

// Location database with real coordinates
const POPULAR_LOCATIONS = [
  {
    name: "722, Sector R, Mahalaxmi Nagar, Indore",
    sub: "Residential Hub · Mahalaxmi Nagar",
    coords: [22.7533, 75.8937],
    icon: "🏠",
    type: "city",
    distFromDefault: 0.0
  },
  {
    name: "Savitri Empire, Scheme No 54, Indore",
    sub: "Tech Park & Commercial Hub · Scheme 54",
    coords: [22.7441, 75.8821],
    icon: "🏢",
    type: "city",
    distFromDefault: 8.2
  },
  {
    name: "Vijay Nagar Square (C21 Mall / Bus Stop)",
    sub: "Major Transit Hub · AB Road Corridor",
    coords: [22.7536, 75.8935],
    icon: "📍",
    type: "city",
    distFromDefault: 2.4
  },
  {
    name: "Palasia Square (Industry House, Indore)",
    sub: "Central Business District · AB Road",
    coords: [22.7244, 75.8839],
    icon: "🏢",
    type: "city",
    distFromDefault: 6.8
  },
  {
    name: "Bhawarkua Square (University Hub, Indore)",
    sub: "Student & Coaching Corridor · BRTS",
    coords: [22.6931, 75.8665],
    icon: "🎓",
    type: "city",
    distFromDefault: 12.5
  },
  {
    name: "Rajwada Palace (City Center Market, Indore)",
    sub: "Historic Central Commercial Area",
    coords: [22.7196, 75.8577],
    icon: "🛍️",
    type: "city",
    distFromDefault: 9.4
  },
  {
    name: "Bhopal (ISBT Bus Terminal Hub)",
    sub: "Intercity Highway Corridor · 195 km",
    coords: [23.2599, 77.4126],
    icon: "🛣️",
    type: "highway",
    distFromDefault: 195.0
  },
  {
    name: "Ujjain (Mahakal Bypass Corridor)",
    sub: "Intercity Highway Corridor · 55 km",
    coords: [23.1765, 75.7885],
    icon: "🛣️",
    type: "highway",
    distFromDefault: 55.0
  }
];

// Navigation Stack for smooth back transitions
let navigationStack = ['sheet-home'];

// Coordinates
let defaultPickup = [22.7533, 75.8937]; // Sector R, Mahalaxmi Nagar
let defaultDrop = [22.7441, 75.8821];   // Scheme No 54, Savitri Empire
const highwayDrop = [23.2599, 77.4126];   // Bhopal

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initOtpInputs();
  goHome();
});

// ========================================================
// 1. MAP INITIALIZATION & ROUTING
// ========================================================

function initMap() {
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView(defaultPickup, 14);

  // Clean OpenStreetMap standard tiles (Free, high-res, zero watermark)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  drawRoute(defaultPickup, defaultDrop);
}

function drawRoute(pickupCoord, dropCoord) {
  if (pickupMarker) map.removeLayer(pickupMarker);
  if (dropMarker) map.removeLayer(dropMarker);
  if (routePolyline) map.removeLayer(routePolyline);
  if (movingBikeMarker) map.removeLayer(movingBikeMarker);

  // Green "Pickup Point" Speech Bubble Marker
  const pickupHtml = `
    <div class="custom-pickup-bubble">Pickup Point</div>
    <div style="width:14px; height:14px; background:#00875A; border:3px solid #FFF; border-radius:50%; margin:4px auto 0 auto; box-shadow:0 0 10px rgba(0,135,90,0.5);"></div>
  `;
  const pickupIcon = L.divIcon({
    html: pickupHtml,
    className: 'pickup-div-icon',
    iconSize: [90, 42],
    iconAnchor: [45, 42]
  });
  pickupMarker = L.marker(pickupCoord, { icon: pickupIcon }).addTo(map);

  // Red Destination Marker
  const dropHtml = `
    <div style="width:14px; height:14px; background:#DC2626; border:3px solid #FFF; border-radius:50%; box-shadow:0 0 10px rgba(220,38,38,0.5);"></div>
  `;
  const dropIcon = L.divIcon({
    html: dropHtml,
    className: 'drop-div-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
  dropMarker = L.marker(dropCoord, { icon: dropIcon }).addTo(map);

  const midLat = (pickupCoord[0] + dropCoord[0]) / 2 + (currentRouteType === 'highway' ? 0.05 : 0.003);
  const midLng = (pickupCoord[1] + dropCoord[1]) / 2 - (currentRouteType === 'highway' ? 0.05 : 0.003);
  const routePoints = [pickupCoord, [midLat, midLng], dropCoord];

  routePolyline = L.polyline(routePoints, {
    color: currentRouteType === 'highway' ? '#7C3AED' : '#0F172A',
    weight: 4.5,
    opacity: 0.85,
    dashArray: '8, 4'
  }).addTo(map);

  map.fitBounds(routePolyline.getBounds(), { padding: [70, 70] });
}

function recenterMap() {
  if (routePolyline) {
    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
  } else {
    map.setView(defaultPickup, 14);
  }
}

// ========================================================
// 2. NAVIGATION & HISTORY STACK
// ========================================================

function navigateTo(sheetId) {
  hideAllSheets();
  const target = document.getElementById(sheetId);
  if (target) {
    target.style.display = 'block';
    navigationStack.push(sheetId);
    
    // Toggle floating back button
    document.getElementById('map-back-btn').style.display = 
      (sheetId === 'sheet-home') ? 'none' : 'flex';
  }
}

function handleMapBack() {
  if (navigationStack.length > 1) {
    navigationStack.pop(); // Remove current
    const prevSheet = navigationStack[navigationStack.length - 1];
    hideAllSheets();
    const target = document.getElementById(prevSheet);
    if (target) {
      target.style.display = 'block';
    }
    document.getElementById('map-back-btn').style.display = 
      (prevSheet === 'sheet-home') ? 'none' : 'flex';
  } else {
    goHome();
  }
}

function goHome() {
  if (countdownInterval) clearInterval(countdownInterval);
  if (tripTimerInterval) clearInterval(tripTimerInterval);
  if (hostTripTimerInterval) clearInterval(hostTripTimerInterval);
  if (speedSimInterval) clearInterval(speedSimInterval);
  if (hostSpeedSimInterval) clearInterval(hostSpeedSimInterval);

  hideAllSheets();
  navigationStack = ['sheet-home'];
  const homeSheet = document.getElementById('sheet-home');
  if (homeSheet) homeSheet.style.display = 'block';
  document.getElementById('map-back-btn').style.display = 'none';

  setPassengerRouteType('city');
  recenterMap();
}

function hideAllSheets() {
  const sheets = document.querySelectorAll('.bottom-sheet');
  sheets.forEach(s => s.style.display = 'none');
}

// ========================================================
// 3. RAPIDO HOST ONBOARDING FLOW (QUICK 1-MIN SETUP)
// ========================================================

function openHostFlow() {
  if (!hostIsOnboarded) {
    goToOnboardingStep(1);
    navigateTo('sheet-host-onboarding');
  } else {
    openHostModeSelector();
  }
}

function selectVehicleType(type) {
  hostProfile.vehicleType = type;
  document.getElementById('v-type-motorcycle').classList.toggle('active', type === 'Motorcycle');
  document.getElementById('v-type-scooter').classList.toggle('active', type === 'Scooter');

  const modelSelect = document.getElementById('ob-vehicle-model');
  if (type === 'Scooter') {
    modelSelect.value = 'Honda Activa 6G (Grey)';
  } else {
    modelSelect.value = 'Royal Enfield Hunter 350 (Blue)';
  }
}

function goToOnboardingStep(step) {
  if (step === 1) {
    document.getElementById('ob-step-1-content').style.display = 'block';
    document.getElementById('ob-step-2-content').style.display = 'none';
    document.getElementById('ob-step-1-pill').classList.add('active');
    document.getElementById('ob-step-2-pill').classList.remove('active');
  } else {
    const plate = document.getElementById('ob-plate-number').value.trim();
    if (!plate) {
      alert("Please enter your vehicle registration plate number (e.g. MP 09 AB 1234)");
      return;
    }
    hostProfile.vehicleModel = document.getElementById('ob-vehicle-model').value;
    hostProfile.plateNumber = plate.toUpperCase();

    document.getElementById('ob-step-1-content').style.display = 'none';
    document.getElementById('ob-step-2-content').style.display = 'block';
    document.getElementById('ob-step-1-pill').classList.remove('active');
    document.getElementById('ob-step-2-pill').classList.add('active');
  }
}

function completeHostOnboarding() {
  const helmetChecked = document.getElementById('ob-chk-helmet').checked;
  if (!helmetChecked) {
    alert("Please confirm that you have a spare ISI-approved helmet for your co-rider.");
    return;
  }

  hostIsOnboarded = true;
  hostProfile.hasSpareHelmet = true;

  document.getElementById('host-picker-vehicle-summary').innerText = 
    `Hosting with ${hostProfile.vehicleModel} (${hostProfile.plateNumber})`;

  alert(`🎉 Host Setup Complete!\n\nVehicle: ${hostProfile.vehicleModel}\nPlate: ${hostProfile.plateNumber}\nDL Status: Verified via DigiLocker ✅\n\nYou are now ready to offer empty seats and split fuel!`);

  openHostModeSelector();
}

// ========================================================
// 4. PASSENGER FLOW: UNIFIED CITY & HIGHWAY RIDESHARE
// ========================================================

function startShareRideFlow() {
  navigateTo('sheet-passenger-search');
  showLocationSuggestions('passenger-drop');
}

function setPassengerRouteType(type) {
  currentRouteType = type;
  const pills = document.querySelectorAll('.switch-pill');
  pills.forEach(p => p.classList.remove('active'));

  if (type === 'city') {
    if (pills[0]) pills[0].classList.add('active');
    document.getElementById('passenger-pickup-input').value = "722, Sector R, Mahalaxmi Nagar, Indore";
    document.getElementById('passenger-drop-input').value = "Savitri Empire, Scheme No 54, Indore";
    document.getElementById('search-mode-tag').innerText = "Inside City (8.2 km)";
    document.getElementById('search-mode-tag').className = "badge-tag green";
    currentDistKm = 8.2;
    defaultPickup = [22.7533, 75.8937];
    defaultDrop = [22.7441, 75.8821];
    drawRoute(defaultPickup, defaultDrop);
  } else {
    if (pills[1]) pills[1].classList.add('active');
    document.getElementById('passenger-pickup-input').value = "Indore (Vijay Nagar Square Hub)";
    document.getElementById('passenger-drop-input').value = "Bhopal (ISBT Bus Terminal)";
    document.getElementById('search-mode-tag').innerText = "Highway (>30 km)";
    document.getElementById('search-mode-tag').className = "badge-tag purple";
    currentDistKm = 195.0;
    defaultPickup = [22.7536, 75.8935];
    drawRoute(defaultPickup, highwayDrop);
  }
}

function quickSelectRoute(title, pickup, drop, distKm) {
  document.getElementById('passenger-pickup-input').value = pickup;
  document.getElementById('passenger-drop-input').value = drop;
  currentDistKm = distKm;
  if (distKm > 30) {
    setPassengerRouteType('highway');
  } else {
    setPassengerRouteType('city');
  }
  startShareRideFlow();
}

function goToPassengerPickupCheck() {
  const pickup = document.getElementById('passenger-pickup-input').value;
  document.getElementById('display-pickup-point').innerText = pickup;
  document.getElementById('waiting-pickup-text').innerText = pickup;
  document.getElementById('waiting-drop-text').innerText = document.getElementById('passenger-drop-input').value;
  
  navigateTo('sheet-passenger-pickup');
}

function confirmPickupAndDiscoverHosts() {
  renderMatchingHostsList();
  navigateTo('sheet-passenger-discovery');
}

function toggleGenderFilter() {
  isPinkPoolFilterActive = !isPinkPoolFilterActive;
  const filterBtn = document.getElementById('gender-filter-text');
  if (isPinkPoolFilterActive) {
    filterBtn.innerHTML = '🌸 Pink Pool Only';
  } else {
    filterBtn.innerHTML = 'All Hosts';
  }
  renderMatchingHostsList();
}

function lockRecurringCommutePass(hostName, event) {
  if (event) event.stopPropagation();
  alert(`🔁 Mon–Fri Commute Pass Activated!\n\nYou are now paired with ${hostName} for your daily 08:30 AM commute.\n\n✨ Saved 15% extra on weekly fuel split!`);
}

function renderMatchingHostsList() {
  const listContainer = document.getElementById('host-cards-list');
  
  if (currentDistKm <= 30) {
    // INSIDE CITY COMMUTE (5-30 km)
    currentFare = Math.round(15 + (currentDistKm * 3.4) + 5);
    document.getElementById('discovery-title').innerText = isPinkPoolFilterActive ? "🌸 Women-Only Pink Hosts" : "Hosts Heading Your Way";
    document.getElementById('discovery-corridor-summary').innerText = `Calculated for ${currentDistKm} km daily commute`;
    document.getElementById('waiting-service-type-name').innerText = "Bikepool Commute";

    if (isPinkPoolFilterActive) {
      // PINK POOL (WOMEN ONLY) FILTER ACTIVE
      listContainer.innerHTML = `
        <!-- Pink Pool Host Card 1 -->
        <div class="host-card selected" onclick="selectHostCard(1)">
          <div class="host-card-top">
            <div class="host-profile-left">
              <div class="host-avatar" style="background:#EC4899;">PV</div>
              <div>
                <div class="host-name-row">
                  <span class="host-name">Priya Verma</span>
                  <span class="host-rating">⭐ 4.9 (54)</span>
                </div>
                <div class="host-badge-row">
                  <span class="trust-badge pink">🌸 Pink Pool Verified</span>
                  <span class="trust-badge helmet">Extra Helmet</span>
                </div>
              </div>
            </div>
            <div class="host-price-right" onclick="openFareBreakdown(event)">
              <div class="host-price">₹${currentFare}</div>
              <div class="host-old-price">₹140 on Taxi ℹ️</div>
            </div>
          </div>
          
          <div class="host-meta-row">
            <span>🛵 TVS Jupiter 125 (Grey)</span>
            <span>⏰ <strong>Leaving in 3 mins</strong></span>
          </div>

          <div class="host-pickup-notice">
            📍 Pickup: <strong>Sector R Gate Bus Stop</strong> (80m walk)
          </div>

          <div class="card-actions-row">
            <button class="view-reviews-btn" onclick="lockRecurringCommutePass('Priya Verma', event)">
              🔁 Mon–Fri Pass (Save 15%)
            </button>
            <button class="rapido-primary-btn sm-btn select-rider-btn" onclick="promptSafetyAndBookHost(1, event)">
              Choose Rider · ₹${currentFare}
            </button>
          </div>
        </div>

        <!-- Pink Pool Host Card 2 -->
        <div class="host-card" onclick="selectHostCard(2)">
          <div class="host-card-top">
            <div class="host-profile-left">
              <div class="host-avatar" style="background:#DB2777;">AK</div>
              <div>
                <div class="host-name-row">
                  <span class="host-name">Ananya K.</span>
                  <span class="host-rating">⭐ 4.8 (38)</span>
                </div>
                <div class="host-badge-row">
                  <span class="trust-badge pink">🌸 Pink Pool Verified</span>
                  <span class="trust-badge corporate">TCS Commuter</span>
                </div>
              </div>
            </div>
            <div class="host-price-right" onclick="openFareBreakdown(event)">
              <div class="host-price">₹${currentFare}</div>
              <div class="host-old-price">₹140 on Taxi ℹ️</div>
            </div>
          </div>
          
          <div class="host-meta-row">
            <span>🛵 Honda Activa 6G (Matte Black)</span>
            <span>⏰ <strong>Leaving in 7 mins</strong></span>
          </div>

          <div class="host-pickup-notice">
            📍 Pickup: <strong>Main Road Shelter</strong> (120m walk)
          </div>

          <div class="card-actions-row">
            <button class="view-reviews-btn" onclick="openHostReviewsModal('Ananya K.', '4.8', '38', 'Honda Activa 6G', 'Verified Commuter · Pink Pool', event)">
              👤 Profile & Reviews
            </button>
            <button class="rapido-primary-btn sm-btn select-rider-btn" onclick="promptSafetyAndBookHost(2, event)">
              Choose Rider · ₹${currentFare}
            </button>
          </div>
        </div>
      `;
    } else {
      // ALL HOSTS
      listContainer.innerHTML = `
        <!-- Host Card 1 -->
        <div class="host-card" onclick="selectHostCard(1)">
          <div class="host-card-top">
            <div class="host-profile-left">
              <div class="host-avatar">RS</div>
              <div>
                <div class="host-name-row">
                  <span class="host-name">Rahul Sharma</span>
                  <span class="host-rating">⭐ 4.9 (48)</span>
                </div>
                <div class="host-badge-row">
                  <span class="trust-badge corporate">Verified Commuter</span>
                  <span class="trust-badge helmet">Extra Helmet</span>
                </div>
              </div>
            </div>
            <div class="host-price-right" onclick="openFareBreakdown(event)">
              <div class="host-price">₹${currentFare}</div>
              <div class="host-old-price">₹140 on Taxi ℹ️</div>
            </div>
          </div>
          
          <div class="host-meta-row">
            <span>🏍️ Royal Enfield Hunter 350</span>
            <span>⏰ <strong>Leaving in 4 mins</strong></span>
          </div>

          <div class="host-pickup-notice">
            📍 Pickup: <strong>Main Road Bus Stop</strong> (120m walk · 2 mins)
          </div>

          <div class="card-actions-row">
            <button class="view-reviews-btn" onclick="lockRecurringCommutePass('Rahul Sharma', event)">
              🔁 Mon–Fri Pass (Save 15%)
            </button>
            <button class="rapido-primary-btn sm-btn select-rider-btn" onclick="promptSafetyAndBookHost(1, event)">
              Choose Rider · ₹${currentFare}
            </button>
          </div>
        </div>

        <!-- Host Card 2 -->
        <div class="host-card" onclick="selectHostCard(2)">
          <div class="host-card-top">
            <div class="host-profile-left">
              <div class="host-avatar" style="background:#EC4899;">PV</div>
              <div>
                <div class="host-name-row">
                  <span class="host-name">Priya Verma</span>
                  <span class="host-rating">⭐ 4.8 (32)</span>
                </div>
                <div class="host-badge-row">
                  <span class="trust-badge pink">🌸 Pink Pool</span>
                  <span class="trust-badge helmet">Extra Helmet</span>
                </div>
              </div>
            </div>
            <div class="host-price-right" onclick="openFareBreakdown(event)">
              <div class="host-price">₹${currentFare - 3}</div>
              <div class="host-old-price">₹140 on Taxi ℹ️</div>
            </div>
          </div>
          
          <div class="host-meta-row">
            <span>🛵 TVS Jupiter 125</span>
            <span>⏰ <strong>Leaving in 8 mins</strong></span>
          </div>

          <div class="host-pickup-notice">
            📍 Pickup: <strong>Sector R Gate</strong> (80m walk)
          </div>

          <div class="card-actions-row">
            <button class="view-reviews-btn" onclick="openHostReviewsModal('Priya Verma', '4.8', '32', 'TVS Jupiter 125', 'Verified Commuter · Pink Pool', event)">
              👤 Profile & Reviews
            </button>
            <button class="rapido-primary-btn sm-btn select-rider-btn" onclick="promptSafetyAndBookHost(2, event)">
              Choose Rider · ₹${currentFare - 3}
            </button>
          </div>
        </div>
      `;
    }
  } else {
    // HIGHWAY INTERCITY (>30 km)
    currentFare = 360;
    document.getElementById('discovery-title').innerText = "Highway Rides to Destination";
    document.getElementById('discovery-corridor-summary').innerText = `Calculated for ${currentDistKm} km Highway Corridor`;
    document.getElementById('waiting-service-type-name').innerText = "Highway Intercity RideShare";

    listContainer.innerHTML = `
      <!-- Highway Host 1 -->
      <div class="host-card" onclick="selectHostCard(1)">
        <div class="host-card-top">
          <div class="host-profile-left">
            <div class="host-avatar" style="background:#7C3AED;">RS</div>
            <div>
              <div class="host-name-row">
                <span class="host-name">Rahul Sharma</span>
                <span class="host-rating">⭐ 4.9 (48)</span>
              </div>
              <div class="host-badge-row">
                <span class="trust-badge corporate">Verified Commuter</span>
                <span class="trust-badge highway">Highway Certified</span>
              </div>
            </div>
          </div>
          <div class="host-price-right" onclick="openFareBreakdown(event)">
            <div class="host-price">₹360</div>
            <div class="host-old-price">₹2,800 on Cab ℹ️</div>
          </div>
        </div>
        
        <div class="host-meta-row">
          <span>🏍️ Royal Enfield Himalayan 450</span>
          <span>📅 <strong>Tomorrow · 07:30 AM</strong></span>
        </div>

        <div class="host-pickup-notice">
          📍 Pickup: <strong>Vijay Nagar Bypass Hub</strong> · ☕ 1 Food Court Halt
        </div>

        <div class="card-actions-row">
          <button class="view-reviews-btn" onclick="openHostReviewsModal('Rahul Sharma', '4.9', '48', 'Royal Enfield Himalayan 450', 'Verified Highway Host', event)">
            👤 Profile & Reviews
          </button>
          <button class="rapido-primary-btn sm-btn select-rider-btn" onclick="promptSafetyAndBookHost(1, event)">
            Book Highway Seat · ₹360
          </button>
        </div>
      </div>

      <!-- Highway Host 2 -->
      <div class="host-card" onclick="selectHostCard(2)">
        <div class="host-card-top">
          <div class="host-profile-left">
            <div class="host-avatar" style="background:#0284C7;">AK</div>
            <div>
              <div class="host-name-row">
                <span class="host-name">Amit Kulkarni</span>
                <span class="host-rating">⭐ 4.8 (29)</span>
              </div>
              <div class="host-badge-row">
                <span class="trust-badge corporate">Verified Commuter</span>
                <span class="trust-badge helmet">ISI Helmet</span>
              </div>
            </div>
          </div>
          <div class="host-price-right" onclick="openFareBreakdown(event)">
            <div class="host-price">₹380</div>
            <div class="host-old-price">₹2,800 on Cab ℹ️</div>
          </div>
        </div>
        
        <div class="host-meta-row">
          <span>🏍️ KTM Adventure 390</span>
          <span>📅 <strong>Tomorrow · 08:15 AM</strong></span>
        </div>

        <div class="host-pickup-notice">
          📍 Pickup: <strong>Radisson Square Bypass</strong>
        </div>

        <div class="card-actions-row">
          <button class="view-reviews-btn" onclick="openHostReviewsModal('Amit Kulkarni', '4.8', '29', 'KTM Adventure 390', 'Verified Highway Host', event)">
            👤 Profile & Reviews
          </button>
          <button class="rapido-primary-btn sm-btn select-rider-btn" onclick="promptSafetyAndBookHost(2, event)">
            Book Highway Seat · ₹380
          </button>
        </div>
      </div>
    `;
  }

  document.getElementById('confirmed-fare-val').innerText = `₹${currentFare}`;
  document.getElementById('total-fare-num').innerText = `₹${currentFare}`;
  document.getElementById('payment-modal-fare').innerText = `₹${currentFare}`;
}

function selectHostCard(index) {
  const cards = document.querySelectorAll('.host-card');
  cards.forEach(c => c.classList.remove('selected'));
  if (cards[index - 1]) cards[index - 1].classList.add('selected');
}

function promptSafetyAndBookHost(hostIndex, event) {
  if (event) event.stopPropagation();
  pendingHostBookingIndex = hostIndex;
  document.getElementById('modal-safety-check').style.display = 'flex';
}

function closeSafetyModal() {
  document.getElementById('modal-safety-check').style.display = 'none';
}

function confirmSafetyAndProceedBooking() {
  closeSafetyModal();
  bookHostRide(pendingHostBookingIndex);
}

function bookHostRide(hostIndex) {
  navigateTo('sheet-passenger-waiting');
  document.getElementById('waiting-status-title').innerText = "Searching for below services...";
  document.getElementById('waiting-progress-bar').style.display = 'block';
  document.getElementById('display-start-otp').style.display = 'none';
  document.getElementById('waiting-comm-actions').style.display = 'none';

  setTimeout(() => {
    document.getElementById('waiting-status-title').innerText = "Ride Confirmed! Rahul is on the way";
    document.getElementById('waiting-progress-bar').style.display = 'none';
    document.getElementById('display-start-otp').style.display = 'block';
    document.getElementById('waiting-comm-actions').style.display = 'flex';
  }, 1600);
}

// In-Trip Passenger Live Navigation
function startLiveTripScreen() {
  navigateTo('sheet-in-trip');
  document.getElementById('in-trip-fare-due').innerText = `₹${currentFare}`;
  document.getElementById('in-trip-dist-rem').innerText = `${currentDistKm} km`;

  tripLiveSeconds = 0;
  if (tripTimerInterval) clearInterval(tripTimerInterval);
  tripTimerInterval = setInterval(() => {
    tripLiveSeconds++;
    const m = String(Math.floor(tripLiveSeconds / 60)).padStart(2, '0');
    const s = String(tripLiveSeconds % 60).padStart(2, '0');
    document.getElementById('trip-live-timer').innerText = `${m}:${s}`;
  }, 1000);

  if (speedSimInterval) clearInterval(speedSimInterval);
  speedSimInterval = setInterval(() => {
    const randomSpeed = Math.floor(Math.random() * (46 - 36 + 1)) + 36;
    document.getElementById('in-trip-speed').innerText = `${randomSpeed} km/h`;
  }, 2000);

  simulateBikeMovement();
}

function simulateBikeMovement() {
  const bikeHtml = `<div class="bike-marker-icon">🏍️</div>`;
  const bikeIcon = L.divIcon({
    html: bikeHtml,
    className: 'moving-bike-div',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  const startCoord = defaultPickup;
  movingBikeMarker = L.marker(startCoord, { icon: bikeIcon }).addTo(map);

  let step = 0;
  const moveInterval = setInterval(() => {
    step++;
    const targetCoord = (currentRouteType === 'highway') ? highwayDrop : defaultDrop;
    const lat = startCoord[0] + (targetCoord[0] - startCoord[0]) * (step / 20);
    const lng = startCoord[1] + (targetCoord[1] - startCoord[1]) * (step / 20);
    movingBikeMarker.setLatLng([lat, lng]);

    if (step >= 20) {
      clearInterval(moveInterval);
    }
  }, 200);
}

function cancelPassengerRide() {
  if (confirm("Are you sure you want to cancel this ride?")) {
    goHome();
  }
}

function completeAndEndTrip() {
  if (tripTimerInterval) clearInterval(tripTimerInterval);
  if (speedSimInterval) clearInterval(speedSimInterval);
  
  document.getElementById('receipt-fuel-split').innerText = `₹${currentFare - 5}.00`;
  document.getElementById('receipt-total-fare').innerText = `₹${currentFare}.00`;
  document.getElementById('receipt-pay-method').innerText = selectedPayment;

  navigateTo('sheet-ride-completed');
}

function setRating(stars) {
  selectedRating = stars;
  const starEls = document.querySelectorAll('#star-rating-container .star');
  starEls.forEach((el, idx) => {
    el.classList.toggle('active', idx < stars);
  });

  const labels = {
    1: 'Poor (1/5)',
    2: 'Fair (2/5)',
    3: 'Good (3/5)',
    4: 'Very Good (4/5)',
    5: 'Excellent (5/5)'
  };
  document.getElementById('rating-desc-label').innerText = labels[stars] || 'Great';
}

function toggleCompliment(el) {
  el.classList.toggle('active');
}

function submitReviewAndFinish() {
  alert(`🌟 Thank you for your feedback!\n\nRating: ${selectedRating} Stars submitted for Rahul.\nYour review helps keep the Rapido Commute community safe & verified!`);
  goHome();
}

// ========================================================
// 5. COMPLETE HOST FLOW A: INSIDE THE CITY (5–30 KM)
// ========================================================

function openHostModeSelector() {
  navigateTo('sheet-host-mode-picker');
}

function startHostInsideCityFlow() {
  document.getElementById('host-calc-trigger-section').style.display = 'block';
  document.getElementById('host-calculated-fare-section').style.display = 'none';
  navigateTo('sheet-host-city-setup');
}

function calculateHostRouteAndFare() {
  const origin = document.getElementById('host-city-origin').value;
  const dest = document.getElementById('host-city-dest').value;

  if (!origin || !dest) {
    alert("Please enter both starting point and destination.");
    return;
  }

  const distKm = currentDistKm || 8.2;

  if (distKm > 30) {
    alert(`🛣️ Intercity Route Detected (${distKm} km)!\n\nAuto-switching to Highway City-to-City Host Setup.`);
    startHostCityToCityFlow();
    return;
  }

  const fare = Math.round(15 + (distKm * 4.5));
  document.getElementById('host-fare-calc').innerText = `₹${fare}.00`;
  document.getElementById('host-distance-text').innerText = `Distance: ${distKm} km (Valid: 5 to 30 km Range)`;

  document.getElementById('host-calc-trigger-section').style.display = 'none';
  document.getElementById('host-calculated-fare-section').style.display = 'block';
}

function startHost5MinCountdown() {
  navigateTo('sheet-host-city-timer');

  let totalSeconds = 300; // 5 minutes
  const clockEl = document.getElementById('host-countdown-clock');
  const alertBox = document.getElementById('host-match-alert');
  alertBox.style.display = 'none';

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) {
      clearInterval(countdownInterval);
      clockEl.innerText = "00:00";
      alert("5-Minute Window Finished: No co-rider matched on your route today. Have a safe solo commute!");
      goHome();
      return;
    }

    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    clockEl.innerText = `${mins}:${secs}`;

    // Simulate match notification after 3 seconds
    if (totalSeconds === 297) {
      alertBox.style.display = 'block';
    }
  }, 1000);
}

function hostAcceptPassenger() {
  clearInterval(countdownInterval);
  navigateTo('sheet-host-pickup-nav');
}

function hostArrivedAtPickup() {
  navigateTo('sheet-host-otp-verify');
  initOtpInputs();
}

function initOtpInputs() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`otp-digit-${i}`);
    if (el) el.value = '';
  }
}

function handleOtpKey(digitIndex, event) {
  const currentInput = document.getElementById(`otp-digit-${digitIndex}`);
  const nextInput = document.getElementById(`otp-digit-${digitIndex + 1}`);
  const prevInput = document.getElementById(`otp-digit-${digitIndex - 1}`);

  if (event.key === 'Backspace') {
    if (currentInput.value === '' && prevInput) {
      prevInput.focus();
    }
  } else if (currentInput.value.length === 1 && nextInput) {
    nextInput.focus();
  }
}

function autoFillPassengerOtp() {
  document.getElementById('otp-digit-1').value = '7';
  document.getElementById('otp-digit-2').value = '8';
  document.getElementById('otp-digit-3').value = '4';
  document.getElementById('otp-digit-4').value = '2';
}

function hostVerifyOtpAndStartRide() {
  const d1 = document.getElementById('otp-digit-1').value;
  const d2 = document.getElementById('otp-digit-2').value;
  const d3 = document.getElementById('otp-digit-3').value;
  const d4 = document.getElementById('otp-digit-4').value;
  const enteredOtp = `${d1}${d2}${d3}${d4}`;

  if (enteredOtp === '7842') {
    navigateTo('sheet-host-in-trip');
    startHostInTripHUD();
  } else {
    alert("Invalid OTP! Hint: Passenger's OTP is 7842");
  }
}

function startHostInTripHUD() {
  hostLiveSeconds = 0;
  if (hostTripTimerInterval) clearInterval(hostTripTimerInterval);
  hostTripTimerInterval = setInterval(() => {
    hostLiveSeconds++;
    const m = String(Math.floor(hostLiveSeconds / 60)).padStart(2, '0');
    const s = String(hostLiveSeconds % 60).padStart(2, '0');
    document.getElementById('host-live-timer').innerText = `${m}:${s}`;
  }, 1000);

  if (hostSpeedSimInterval) clearInterval(hostSpeedSimInterval);
  hostSpeedSimInterval = setInterval(() => {
    const spd = Math.floor(Math.random() * (45 - 38 + 1)) + 38;
    document.getElementById('host-speed-display').innerText = `${spd} km/h`;
  }, 2000);

  simulateBikeMovement();
}

function hostEndTripAndCollectEarnings() {
  if (hostTripTimerInterval) clearInterval(hostTripTimerInterval);
  if (hostSpeedSimInterval) clearInterval(hostSpeedSimInterval);
  navigateTo('sheet-host-completed');
}

function setHostRating(stars) {
  hostSelectedRating = stars;
  const starEls = document.querySelectorAll('#host-star-container .star');
  starEls.forEach((el, idx) => {
    el.classList.toggle('active', idx < stars);
  });

  const labels = {
    1: 'Needs Improvement (1/5)',
    2: 'Fair (2/5)',
    3: 'Good (3/5)',
    4: 'Very Good (4/5)',
    5: 'Great Co-Rider (5/5)'
  };
  document.getElementById('host-rating-label').innerText = labels[stars] || 'Great';
}

function submitHostReviewAndFinish() {
  alert("🎉 Commute Completed!\n\n₹52.00 has been transferred to your Rapido Wallet. Thank you for making cities greener!");
  goHome();
}

function cancelHost5MinTimer() {
  if (countdownInterval) clearInterval(countdownInterval);
  goHome();
}

function cancelHostPickup() {
  if (confirm("Cancel passenger pickup and ride solo?")) {
    goHome();
  }
}

// ========================================================
// 6. COMPLETE HOST FLOW B: CITY TO CITY (HIGHWAY)
// ========================================================

function startHostCityToCityFlow() {
  calculateIntercityDistance();
  navigateTo('sheet-host-intercity-setup');
}

function calculateIntercityDistance() {
  const dist = 195; // Indore to Bhopal
  document.getElementById('intercity-distance-label').innerText = `Distance: ${dist} km`;

  const minPrice = Math.round(dist * 1.3);
  const suggPrice = Math.round(dist * 1.85);
  const maxPrice = Math.round(dist * 2.6);

  const slider = document.getElementById('intercity-price-slider');
  slider.min = minPrice;
  slider.max = maxPrice;
  slider.value = suggPrice;

  document.getElementById('slider-min-lbl').innerText = `Min ₹${minPrice}`;
  document.getElementById('slider-sugg-lbl').innerText = `Suggested: ₹${suggPrice}`;
  document.getElementById('slider-max-lbl').innerText = `Max ₹${maxPrice}`;
  document.getElementById('intercity-price-val').innerText = `₹ ${suggPrice}`;
}

function updateIntercityPrice(val) {
  document.getElementById('intercity-price-val').innerText = `₹ ${val}`;
}

function publishIntercityTrip() {
  const price = document.getElementById('intercity-price-slider').value;
  document.getElementById('intercity-dash-price').innerText = `₹${price} per seat`;
  navigateTo('sheet-host-intercity-dashboard');
}

function acceptHighwayPassenger() {
  const price = document.getElementById('intercity-price-slider') ? document.getElementById('intercity-price-slider').value : '360';
  currentFare = parseInt(price, 10);
  currentDistKm = 195.0;
  currentRouteType = 'highway';

  // Update Highway Voucher Details
  document.getElementById('hw-voucher-pax-name').innerText = "Vikram Joshi (Wipro · ⭐ 4.9)";
  document.getElementById('hw-voucher-pickup').innerText = "Vijay Nagar Bypass Hub, Indore";
  document.getElementById('hw-voucher-price').innerText = `₹${currentFare}.00`;

  navigateTo('sheet-host-highway-confirmed');
}

function startHighwayHostDepartureNav() {
  document.getElementById('host-dist-display').innerText = `${currentDistKm} km`;
  navigateTo('sheet-host-pickup-nav');
}

// ========================================================
// 7. LOCATION SUGGESTIONS & AUTOCOMPLETE
// ========================================================

function showLocationSuggestions(targetInputId) {
  const listContainer = document.getElementById('passenger-suggestions-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';
  POPULAR_LOCATIONS.forEach(loc => {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    item.onclick = () => selectLocationSuggestion(loc, targetInputId);
    item.innerHTML = `
      <span class="sugg-icon">${loc.icon}</span>
      <div class="sugg-info">
        <span class="sugg-title">${loc.name}</span>
        <span class="sugg-sub">${loc.sub}</span>
      </div>
      <span class="sugg-dist-tag">${loc.type === 'highway' ? 'Highway' : 'City'}</span>
    `;
    listContainer.appendChild(item);
  });
}

function filterLocationSuggestions(query, targetInputId) {
  const listContainer = document.getElementById('passenger-suggestions-list');
  if (!listContainer) return;

  const filtered = POPULAR_LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(query.toLowerCase()) || 
    loc.sub.toLowerCase().includes(query.toLowerCase())
  );

  listContainer.innerHTML = '';
  filtered.forEach(loc => {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    item.onclick = () => selectLocationSuggestion(loc, targetInputId);
    item.innerHTML = `
      <span class="sugg-icon">${loc.icon}</span>
      <div class="sugg-info">
        <span class="sugg-title">${loc.name}</span>
        <span class="sugg-sub">${loc.sub}</span>
      </div>
      <span class="sugg-dist-tag">${loc.type === 'highway' ? 'Highway' : 'City'}</span>
    `;
    listContainer.appendChild(item);
  });
}

function selectLocationSuggestion(loc, targetInputId) {
  if (targetInputId === 'passenger-pickup') {
    document.getElementById('passenger-pickup-input').value = loc.name;
    defaultPickup = loc.coords;
  } else if (targetInputId === 'passenger-drop') {
    document.getElementById('passenger-drop-input').value = loc.name;
    defaultDrop = loc.coords;
    currentDistKm = loc.distFromDefault > 0 ? loc.distFromDefault : 8.2;
    if (loc.type === 'highway') {
      setPassengerRouteType('highway');
    } else {
      setPassengerRouteType('city');
    }
  } else if (targetInputId === 'host-origin') {
    document.getElementById('host-city-origin').value = loc.name;
  } else if (targetInputId === 'host-dest') {
    document.getElementById('host-city-dest').value = loc.name;
    currentDistKm = loc.distFromDefault > 0 ? loc.distFromDefault : 8.2;
    if (loc.type === 'highway') {
      currentRouteType = 'highway';
    } else {
      currentRouteType = 'city';
    }
  }

  drawRoute(defaultPickup, defaultDrop);
}

// ========================================================
// 8. IN-APP CHAT & LIVE CALLING SIMULATOR
// ========================================================

function openChatModal() {
  document.getElementById('modal-chat').style.display = 'flex';
}

function closeChatModal() {
  document.getElementById('modal-chat').style.display = 'none';
}

function sendChatMessage() {
  const input = document.getElementById('chat-text-input');
  const text = input.value.trim();
  if (!text) return;

  appendChatBubble(text, 'outgoing');
  input.value = '';

  setTimeout(() => {
    appendChatBubble('Got it! See you in 1 min at the spot 👍', 'incoming');
  }, 1200);
}

function sendQuickChatMessage(text) {
  appendChatBubble(text, 'outgoing');
  setTimeout(() => {
    appendChatBubble('Noted! Turning near the corner now 👍', 'incoming');
  }, 1000);
}

function appendChatBubble(text, type) {
  const container = document.getElementById('chat-messages-box');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.innerHTML = `<span>${text}</span><span class="bubble-time">Just now</span>`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function handleChatEnter(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}

// IN-APP CALL SIMULATOR
function triggerCallingModal(contactName, contactSub) {
  document.getElementById('call-contact-name').innerText = contactName;
  document.getElementById('call-contact-sub').innerText = contactSub;
  document.getElementById('call-avatar-text').innerText = contactName.split(' ').map(n => n[0]).join('');
  document.getElementById('modal-call-screen').style.display = 'flex';

  const statusEl = document.getElementById('call-status-timer');
  statusEl.innerText = "Ringing...";
  statusEl.style.color = "#F59E0B";

  callLiveSeconds = 0;
  if (callTimerInterval) clearInterval(callTimerInterval);

  setTimeout(() => {
    statusEl.style.color = "#34D399";
    callTimerInterval = setInterval(() => {
      callLiveSeconds++;
      const m = String(Math.floor(callLiveSeconds / 60)).padStart(2, '0');
      const s = String(callLiveSeconds % 60).padStart(2, '0');
      statusEl.innerText = `Connected (${m}:${s})`;
    }, 1000);
  }, 1800);
}

function endInAppCall() {
  if (callTimerInterval) clearInterval(callTimerInterval);
  document.getElementById('modal-call-screen').style.display = 'none';
}

function toggleCallMute(btn) {
  btn.classList.toggle('active');
  const lbl = btn.querySelector('.ctrl-lbl');
  lbl.innerText = btn.classList.contains('active') ? 'Muted' : 'Mute';
}

function toggleCallSpeaker(btn) {
  btn.classList.toggle('active');
  const lbl = btn.querySelector('.ctrl-lbl');
  lbl.innerText = btn.classList.contains('active') ? 'Speaker ON' : 'Speaker';
}

// ========================================================
// 9. FARE BREAKDOWN MODAL
// ========================================================

function openFareBreakdown(event) {
  if (event) event.stopPropagation();
  document.getElementById('break-fuel-label').innerText = `Base Fuel Cost Share (${currentDistKm} km)`;
  document.getElementById('break-fuel-val').innerText = `₹${currentFare - 5}.00`;
  document.getElementById('break-total-val').innerText = `₹${currentFare}.00`;
  
  if (currentDistKm > 30) {
    document.getElementById('break-savings-alert').innerHTML = `💰 <strong>You saved ₹2,440.00</strong> compared to intercity private cab surge!`;
  } else {
    document.getElementById('break-savings-alert').innerHTML = `💰 <strong>You saved ₹97.00</strong> compared to regular commercial cabs & auto surge!`;
  }

  document.getElementById('modal-fare-breakdown').style.display = 'flex';
}

function closeFareBreakdown() {
  document.getElementById('modal-fare-breakdown').style.display = 'none';
}

// ========================================================
// 10. HOST PROFILE & REVIEWS MODAL
// ========================================================

function openHostReviewsModal(name, rating, count, bike, badge, event) {
  if (event) event.stopPropagation();

  document.getElementById('modal-host-name').innerText = name;
  document.getElementById('modal-host-rating').innerText = `⭐ ${rating} (${count} shared rides)`;
  document.getElementById('modal-host-bike').innerText = bike;
  document.getElementById('modal-host-badge').innerText = badge;
  document.getElementById('modal-host-avatar').innerText = name.split(' ').map(n => n[0]).join('');

  document.getElementById('modal-host-profile').style.display = 'flex';
}

function closeHostReviewsModal() {
  document.getElementById('modal-host-profile').style.display = 'none';
}

// ========================================================
// 11. PAYMENTS & OFFERS MODALS
// ========================================================

function openPaymentModal() {
  document.getElementById('modal-payments').style.display = 'flex';
}

function closePaymentModal() {
  document.getElementById('modal-payments').style.display = 'none';
}

function selectPaymentMethod(method) {
  selectedPayment = method;
  document.getElementById('current-payment-name').innerText = `Paying via ${method}`;
  const radio = document.querySelector(`input[name="pay-method"][value="${method}"]`);
  if (radio) radio.checked = true;
}

function openOffersModal() {
  document.getElementById('modal-offers').style.display = 'flex';
}

function closeOffersModal() {
  document.getElementById('modal-offers').style.display = 'none';
}

function applyCoupon() {
  const code = document.getElementById('coupon-code-field').value.trim();
  if (code.toUpperCase() === 'RAPIDO50') {
    alert("🎉 Coupon Applied! ₹20 instant discount added.");
  } else {
    alert("Invalid or expired coupon code. Try 'RAPIDO50'");
  }
}

function openTripDetails() {
  alert(`Trip Details:\n\nService: ${currentDistKm > 30 ? 'Highway RideShare' : 'Bikepool Commute'}\nFare: ₹${currentFare}\nPickup: 722, Sector R, Mahalaxmi Nagar\nDrop: Savitri Empire, Scheme 54\nInsurance: Covered up to ₹5 Lakh by Rapido Shield`);
}

function openProfileDrawer() {
  alert(`Rapido Profile:\n\nUser: Abhigya\nHost Status: ${hostIsOnboarded ? 'Registered Host ✅' : 'Passenger'}\nVehicle: ${hostProfile.vehicleModel}\nPlate: ${hostProfile.plateNumber}\nDigiLocker Govt ID: Verified ✅`);
}

function openLocationPickerModal() {
  alert("Current Location set to: Sector R, Mahalaxmi Nagar, Indore (MP)");
}
