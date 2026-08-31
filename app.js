// Rapido RidePool & Intercity Commute — Clean State Architecture & Logic

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
let hostPickupSlaInterval = null;

let tripLiveSeconds = 0;
let hostLiveSeconds = 0;
let callLiveSeconds = 0;
let hostPickupSlaSeconds = 120; // 2-min pickup SLA

let selectedPayment = 'Cash';
let currentFare = 43;
let currentDistKm = 8.2;
let selectedRating = 5;
let hostSelectedRating = 5;
let pendingHostBookingIndex = 1;
let currentRouteType = 'city'; // 'city' (<=30km) or 'intercity' (>30km)
let hostIsOnboarded = false;
let isPinkPoolActive = false;
let isRecurringPassActive = false;

// Host Profile
let hostProfile = {
  vehicleType: 'Motorcycle',
  vehicleModel: 'Royal Enfield Hunter 350 (Blue)',
  plateNumber: 'MP 09 AB 7842',
  dlNumber: 'DL-092021008742',
  hasSpareHelmet: true
};

// Indore & Highway Corridors Database
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
    sub: "Student & Coaching Corridor",
    coords: [22.6931, 75.8665],
    icon: "🎓",
    type: "city",
    distFromDefault: 12.5
  },
  {
    name: "Rajwada Palace (City Center Market, Indore)",
    sub: "Historic Central Commercial Hub",
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
    type: "intercity",
    distFromDefault: 195.0
  },
  {
    name: "Ujjain (Mahakal Bypass Corridor)",
    sub: "Intercity Highway Corridor · 55 km",
    coords: [23.1765, 75.7885],
    icon: "🛣️",
    type: "intercity",
    distFromDefault: 55.0
  }
];

let navigationStack = ['sheet-home'];
let defaultPickup = [22.7533, 75.8937];
let defaultDrop = [22.7441, 75.8821];
const highwayDrop = [23.2599, 77.4126];

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initOtpInputs();
  goHome();
});

// MAP INIT & ROUTE DRAWING
function initMap() {
  map = L.map('map', { zoomControl: false, attributionControl: false }).setView(defaultPickup, 14);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
  drawRoute(defaultPickup, defaultDrop);
}

function drawRoute(pickupCoord, dropCoord) {
  if (pickupMarker) map.removeLayer(pickupMarker);
  if (dropMarker) map.removeLayer(dropMarker);
  if (routePolyline) map.removeLayer(routePolyline);
  if (movingBikeMarker) map.removeLayer(movingBikeMarker);

  const pickupHtml = `
    <div style="background:#00875A; color:#FFF; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px; box-shadow:0 2px 6px rgba(0,0,0,0.2);">Pickup Point</div>
    <div style="width:12px; height:12px; background:#00875A; border:2px solid #FFF; border-radius:50%; margin:2px auto 0 auto;"></div>
  `;
  pickupMarker = L.marker(pickupCoord, { icon: L.divIcon({ html: pickupHtml, className: 'p-icon', iconSize: [80, 36], iconAnchor: [40, 36] }) }).addTo(map);

  const dropHtml = `<div style="width:12px; height:12px; background:#EF4444; border:2px solid #FFF; border-radius:50%; box-shadow:0 0 8px rgba(239,68,68,0.5);"></div>`;
  dropMarker = L.marker(dropCoord, { icon: L.divIcon({ html: dropHtml, className: 'd-icon', iconSize: [12, 12], iconAnchor: [6, 6] }) }).addTo(map);

  const midLat = (pickupCoord[0] + dropCoord[0]) / 2 + (currentRouteType === 'intercity' ? 0.05 : 0.003);
  const midLng = (pickupCoord[1] + dropCoord[1]) / 2 - (currentRouteType === 'intercity' ? 0.05 : 0.003);

  routePolyline = L.polyline([pickupCoord, [midLat, midLng], dropCoord], {
    color: currentRouteType === 'intercity' ? '#7C3AED' : '#0F172A',
    weight: 4,
    opacity: 0.85,
    dashArray: '8, 4'
  }).addTo(map);

  map.fitBounds(routePolyline.getBounds(), { padding: [60, 60] });
}

function recenterMap() {
  if (routePolyline) map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
  else map.setView(defaultPickup, 14);
}

// NAVIGATION STACK
function navigateTo(sheetId) {
  hideAllSheets();
  const target = document.getElementById(sheetId);
  if (target) {
    target.style.display = 'block';
    navigationStack.push(sheetId);
    document.getElementById('map-back-btn').style.display = (sheetId === 'sheet-home') ? 'none' : 'flex';
  }
}

function handleMapBack() {
  if (navigationStack.length > 1) {
    navigationStack.pop();
    const prev = navigationStack[navigationStack.length - 1];
    hideAllSheets();
    const target = document.getElementById(prev);
    if (target) target.style.display = 'block';
    document.getElementById('map-back-btn').style.display = (prev === 'sheet-home') ? 'none' : 'flex';
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
  if (hostPickupSlaInterval) clearInterval(hostPickupSlaInterval);

  hideAllSheets();
  navigationStack = ['sheet-home'];
  document.getElementById('sheet-home').style.display = 'block';
  document.getElementById('map-back-btn').style.display = 'none';

  setPassengerRouteType('city');
  recenterMap();
}

function hideAllSheets() {
  document.querySelectorAll('.bottom-sheet').forEach(s => s.style.display = 'none');
}

// PERSONA A: PASSENGER FLOW ("BOOK A SEAT")
function startPassengerFlow() {
  navigateTo('sheet-passenger-search');
  showLocationSuggestions('passenger-drop');
}

function setPassengerRouteType(type) {
  currentRouteType = type;

  if (type === 'city') {
    document.getElementById('passenger-pickup-input').value = "722, Sector R, Mahalaxmi Nagar, Indore";
    document.getElementById('passenger-drop-input').value = "Savitri Empire, Scheme No 54, Indore";
    document.getElementById('search-mode-tag').innerText = "City Pool";
    document.getElementById('search-mode-tag').className = "badge-tag green";
    currentDistKm = 8.2;
    defaultPickup = [22.7533, 75.8937];
    defaultDrop = [22.7441, 75.8821];
    drawRoute(defaultPickup, defaultDrop);
  } else {
    document.getElementById('passenger-pickup-input').value = "Indore (Vijay Nagar Square)";
    document.getElementById('passenger-drop-input').value = "Bhopal (ISBT Bus Terminal)";
    document.getElementById('search-mode-tag').innerText = "Intercity (>30km)";
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
  if (distKm > 30) setPassengerRouteType('intercity');
  else setPassengerRouteType('city');
  startPassengerFlow();
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

function renderMatchingHostsList() {
  const listContainer = document.getElementById('host-cards-list');
  
  if (currentDistKm <= 30) {
    currentFare = Math.round(15 + (currentDistKm * 3.4) + 5); // ₹43
    document.getElementById('discovery-title').innerText = isPinkPoolActive ? "Pink Pool Verified Hosts 🌸" : "Hosts Heading Your Way";
    document.getElementById('discovery-corridor-summary').innerText = `Calculated for ${currentDistKm} km corridor`;

    listContainer.innerHTML = `
      <div class="host-card">
        <div class="host-card-top">
          <div class="host-profile-left">
            <div class="host-avatar">RS</div>
            <div>
              <div class="host-name">Rahul Sharma</div>
              <div class="host-rating">⭐ 4.9 (48 shared rides)</div>
            </div>
          </div>
          <div class="host-price-right">
            <div class="host-price">₹${currentFare}</div>
          </div>
        </div>
        <div class="host-meta-row">
          <span>🏍️ Royal Enfield Hunter 350</span>
          <span>⏰ Leaving in 4 mins</span>
        </div>
        <div class="card-actions-row">
          <button class="rapido-primary-btn select-rider-btn" onclick="bookHostRide(1)">
            Book Seat · ₹${currentFare}
          </button>
        </div>
      </div>

      <div class="host-card" style="border-color:#FBCFE8; background:#FDF2F8;">
        <div class="host-card-top">
          <div class="host-profile-left">
            <div class="host-avatar" style="background:#EC4899;">PV</div>
            <div>
              <div class="host-name">Priya Verma 🌸</div>
              <div class="host-rating">⭐ 4.8 (Pink Pool Verified)</div>
            </div>
          </div>
          <div class="host-price-right">
            <div class="host-price">₹${currentFare - 3}</div>
          </div>
        </div>
        <div class="host-meta-row">
          <span>🛵 TVS Jupiter 125</span>
          <span>⏰ Leaving in 8 mins</span>
        </div>
        <div class="card-actions-row">
          <button class="rapido-primary-btn select-rider-btn" style="background:#EC4899; color:#FFF;" onclick="bookHostRide(2)">
            Book Pink Seat · ₹${currentFare - 3}
          </button>
        </div>
      </div>
    `;
  } else {
    currentFare = 360;
    document.getElementById('discovery-title').innerText = "Intercity Rides to Destination";
    document.getElementById('discovery-corridor-summary').innerText = `Calculated for ${currentDistKm} km Highway Corridor`;

    listContainer.innerHTML = `
      <div class="host-card">
        <div class="host-card-top">
          <div class="host-profile-left">
            <div class="host-avatar" style="background:#7C3AED;">RS</div>
            <div>
              <div class="host-name">Rahul Sharma</div>
              <div class="host-rating">⭐ 4.9 (Intercity Certified)</div>
            </div>
          </div>
          <div class="host-price-right">
            <div class="host-price">₹360</div>
          </div>
        </div>
        <div class="host-meta-row">
          <span>🏍️ Royal Enfield Himalayan 450</span>
          <span>📅 Tomorrow · 07:30 AM</span>
        </div>
        <div class="card-actions-row">
          <button class="rapido-primary-btn select-rider-btn" onclick="bookHostRide(1)">
            Book Intercity Seat · ₹360
          </button>
        </div>
      </div>
    `;
  }

  document.getElementById('confirmed-fare-val').innerText = `₹${currentFare}`;
}

function bookHostRide(hostIndex) {
  navigateTo('sheet-passenger-waiting');
  document.getElementById('waiting-status-title').innerText = "Matching with Co-Rider...";
  document.getElementById('waiting-progress-bar').style.display = 'block';
  document.getElementById('display-start-otp').style.display = 'none';
  document.getElementById('waiting-comm-actions').style.display = 'none';

  setTimeout(() => {
    document.getElementById('waiting-status-title').innerText = "Ride Confirmed! Rahul is on the way";
    document.getElementById('waiting-progress-bar').style.display = 'none';
    document.getElementById('display-start-otp').style.display = 'block';
    document.getElementById('waiting-comm-actions').style.display = 'flex';
  }, 1500);
}

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
}

function cancelPassengerRide() {
  if (confirm("Cancel this ride?")) goHome();
}

function completeAndEndTrip() {
  if (tripTimerInterval) clearInterval(tripTimerInterval);
  if (speedSimInterval) clearInterval(speedSimInterval);

  document.getElementById('receipt-fuel-split').innerText = `₹${currentFare - 5}.00`;
  document.getElementById('receipt-total-fare').innerText = `₹${currentFare}.00`;
  navigateTo('sheet-ride-completed');
}

function submitReviewAndFinish() {
  alert("🌟 Thank you! Rating submitted.");
  goHome();
}

// PERSONA B: HOST FLOW ("OFFER A SEAT" - AUTO DETECT)
function openHostFlow() {
  if (!hostIsOnboarded) {
    goToOnboardingStep(1);
    navigateTo('sheet-host-onboarding');
  } else {
    startHostSetupScreen();
  }
}

function selectVehicleType(type) {
  hostProfile.vehicleType = type;
  document.getElementById('v-type-motorcycle').classList.toggle('active', type === 'Motorcycle');
  document.getElementById('v-type-scooter').classList.toggle('active', type === 'Scooter');
}

function goToOnboardingStep(step) {
  if (step === 1) {
    document.getElementById('ob-step-1-content').style.display = 'block';
    document.getElementById('ob-step-2-content').style.display = 'none';
  } else {
    document.getElementById('ob-step-1-content').style.display = 'none';
    document.getElementById('ob-step-2-content').style.display = 'block';
  }
}

function completeHostOnboarding() {
  hostIsOnboarded = true;
  alert("🎉 Setup Complete! You are now verified to offer empty seats.");
  startHostSetupScreen();
}

function startHostSetupScreen() {
  document.getElementById('host-calc-trigger-section').style.display = 'block';
  document.getElementById('host-calculated-fare-section').style.display = 'none';
  navigateTo('sheet-host-city-setup');
}

function calculateHostRouteAndFare() {
  const distKm = currentDistKm || 8.2;
  let fare = 0;

  if (distKm <= 30) {
    fare = Math.round(15 + (distKm * 4.5));
    document.getElementById('host-mode-badge').innerText = "City Pool";
    document.getElementById('host-distance-text').innerText = `Distance: ${distKm} km (City Commute)`;
  } else {
    fare = Math.round(distKm * 1.85);
    document.getElementById('host-mode-badge').innerText = "Intercity";
    document.getElementById('host-distance-text').innerText = `Distance: ${distKm} km (Intercity Highway)`;
  }

  document.getElementById('host-fare-calc').innerText = `₹${fare}.00`;
  document.getElementById('host-calc-trigger-section').style.display = 'none';
  document.getElementById('host-calculated-fare-section').style.display = 'block';
}

function startHost5MinCountdown() {
  navigateTo('sheet-host-city-timer');
  let totalSecs = 300;
  const clockEl = document.getElementById('host-countdown-clock');
  document.getElementById('host-match-alert').style.display = 'none';

  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    totalSecs--;
    if (totalSecs < 0) {
      clearInterval(countdownInterval);
      alert("No match found along your route today. Safe solo ride!");
      goHome();
      return;
    }
    const mins = String(Math.floor(totalSecs / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    clockEl.innerText = `${mins}:${secs}`;

    if (totalSecs === 297) {
      document.getElementById('host-match-alert').style.display = 'block';
    }
  }, 1000);
}

function hostAcceptPassenger() {
  clearInterval(countdownInterval);
  navigateTo('sheet-host-pickup-nav');

  // Start 2-min pickup SLA timer for host
  hostPickupSlaSeconds = 120;
  const slaClock = document.getElementById('host-pickup-countdown');
  if (hostPickupSlaInterval) clearInterval(hostPickupSlaInterval);
  hostPickupSlaInterval = setInterval(() => {
    hostPickupSlaSeconds--;
    if (hostPickupSlaSeconds < 0) {
      clearInterval(hostPickupSlaInterval);
      slaClock.innerText = "00:00";
      alert("⏱️ 2-Min Pickup SLA Finished: Passenger did not arrive at shelter. You can depart solo with zero penalty!");
      return;
    }
    const m = String(Math.floor(hostPickupSlaSeconds / 60)).padStart(2, '0');
    const s = String(hostPickupSlaSeconds % 60).padStart(2, '0');
    slaClock.innerText = `${m}:${s}`;
  }, 1000);
}

function hostArrivedAtPickup() {
  if (hostPickupSlaInterval) clearInterval(hostPickupSlaInterval);
  navigateTo('sheet-host-otp-verify');
}

function initOtpInputs() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`otp-digit-${i}`);
    if (el) el.value = '';
  }
}

function handleOtpKey(index, event) {
  const curr = document.getElementById(`otp-digit-${index}`);
  const next = document.getElementById(`otp-digit-${index + 1}`);
  const prev = document.getElementById(`otp-digit-${index - 1}`);

  if (event.key === 'Backspace' && curr.value === '' && prev) prev.focus();
  else if (curr.value.length === 1 && next) next.focus();
}

function autoFillPassengerOtp() {
  document.getElementById('otp-digit-1').value = '7';
  document.getElementById('otp-digit-2').value = '8';
  document.getElementById('otp-digit-3').value = '4';
  document.getElementById('otp-digit-4').value = '2';
}

function hostVerifyOtpAndStartRide() {
  const code = `${document.getElementById('otp-digit-1').value}${document.getElementById('otp-digit-2').value}${document.getElementById('otp-digit-3').value}${document.getElementById('otp-digit-4').value}`;
  if (code === '7842') {
    navigateTo('sheet-host-in-trip');
    startHostInTripHUD();
  } else {
    alert("Invalid OTP! Hint: 7842");
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
}

function hostEndTripAndCollectEarnings() {
  if (hostTripTimerInterval) clearInterval(hostTripTimerInterval);
  if (hostSpeedSimInterval) clearInterval(hostSpeedSimInterval);
  navigateTo('sheet-host-completed');
}

function submitHostReviewAndFinish() {
  alert("💰 ₹52.00 credited to your Rapido Wallet!");
  goHome();
}

function cancelHost5MinTimer() {
  if (countdownInterval) clearInterval(countdownInterval);
  goHome();
}

function cancelHostPickup() {
  if (confirm("Cancel pickup?")) goHome();
}

// LOCATION AUTOCOMPLETE
function showLocationSuggestions(targetInputId) {
  const list = document.getElementById('passenger-suggestions-list');
  if (!list) return;
  list.innerHTML = '';
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
      <span class="sugg-dist-tag">${loc.type === 'intercity' ? 'Intercity' : 'City'}</span>
    `;
    list.appendChild(item);
  });
}

function filterLocationSuggestions(query, targetInputId) {
  const list = document.getElementById('passenger-suggestions-list');
  if (!list) return;
  const filtered = POPULAR_LOCATIONS.filter(loc => loc.name.toLowerCase().includes(query.toLowerCase()));
  list.innerHTML = '';
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
      <span class="sugg-dist-tag">${loc.type === 'intercity' ? 'Intercity' : 'City'}</span>
    `;
    list.appendChild(item);
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
    if (loc.type === 'intercity') setPassengerRouteType('intercity');
    else setPassengerRouteType('city');
  } else if (targetInputId === 'host-origin') {
    document.getElementById('host-city-origin').value = loc.name;
  } else if (targetInputId === 'host-dest') {
    document.getElementById('host-city-dest').value = loc.name;
    currentDistKm = loc.distFromDefault > 0 ? loc.distFromDefault : 8.2;
  }
  drawRoute(defaultPickup, defaultDrop);
}

// FEATURE MODALS (PINK POOL, MON-FRI PASS, BACKUP SLA)
function openPinkPoolModal() {
  document.getElementById('modal-pink-pool').style.display = 'flex';
}

function closePinkPoolModal() {
  document.getElementById('modal-pink-pool').style.display = 'none';
}

function activatePinkPoolFilter() {
  isPinkPoolActive = true;
  closePinkPoolModal();
  alert("🌸 Pink Pool Active! Showing verified female hosts & co-riders.");
  startPassengerFlow();
}

function togglePinkSearchFilter() {
  isPinkPoolActive = !isPinkPoolActive;
  const btn = document.getElementById('toggle-pink-search');
  btn.classList.toggle('active', isPinkPoolActive);
}

function openRecurringPassModal() {
  document.getElementById('modal-recurring-pass').style.display = 'flex';
}

function closeRecurringPassModal() {
  document.getElementById('modal-recurring-pass').style.display = 'none';
}

function activateRecurringCommutePass() {
  isRecurringPassActive = true;
  closeRecurringPassModal();
  document.getElementById('home-recurring-pass-badge').style.display = 'flex';
  alert("🔁 Mon–Fri Commute Pass Activated! Auto-matching with Rahul Sharma at 08:30 AM every weekday.");
}

function triggerBackupSlaDemo() {
  document.getElementById('modal-backup-sla').style.display = 'flex';
}

function closeBackupSlaModal() {
  document.getElementById('modal-backup-sla').style.display = 'none';
}

// CHAT & SAFEDIAL CALL SIMULATOR
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
    appendChatBubble('Got it! See you at the shelter 👍', 'incoming');
  }, 1000);
}

function sendQuickChatMessage(text) {
  appendChatBubble(text, 'outgoing');
  setTimeout(() => {
    appendChatBubble('Noted! Turning the corner now 👍', 'incoming');
  }, 1000);
}

function appendChatBubble(text, type) {
  const box = document.getElementById('chat-messages-box');
  const b = document.createElement('div');
  b.className = `chat-bubble ${type}`;
  b.innerHTML = `<span>${text}</span><span class="bubble-time">Just now</span>`;
  box.appendChild(b);
  box.scrollTop = box.scrollHeight;
}

function handleChatEnter(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function triggerCallingModal(name, sub) {
  document.getElementById('call-contact-name').innerText = name;
  document.getElementById('call-contact-sub').innerText = sub;
  document.getElementById('call-avatar-text').innerText = name.split(' ').map(n => n[0]).join('');
  document.getElementById('modal-call-screen').style.display = 'flex';

  const status = document.getElementById('call-status-timer');
  status.innerText = "Ringing...";
  status.style.color = "#F59E0B";

  callLiveSeconds = 0;
  if (callTimerInterval) clearInterval(callTimerInterval);
  setTimeout(() => {
    status.style.color = "#34D399";
    callTimerInterval = setInterval(() => {
      callLiveSeconds++;
      const m = String(Math.floor(callLiveSeconds / 60)).padStart(2, '0');
      const s = String(callLiveSeconds % 60).padStart(2, '0');
      status.innerText = `Connected (${m}:${s})`;
    }, 1000);
  }, 1800);
}

function endInAppCall() {
  if (callTimerInterval) clearInterval(callTimerInterval);
  document.getElementById('modal-call-screen').style.display = 'none';
}

function toggleCallMute(btn) {
  btn.classList.toggle('active');
}

function toggleCallSpeaker(btn) {
  btn.classList.toggle('active');
}

function openPaymentModal() { alert("Payment method: Cash / Wallet / UPI"); }
function openOffersModal() { alert("Commute Coupon: RAPIDO50 applied!"); }
function openProfileDrawer() { alert("Profile: Abhigya · Verified Commuter"); }
function openLocationPickerModal() { alert("Current Location: Sector R, Mahalaxmi Nagar, Indore"); }
