// Rapido Bikepool & Highway - Senior UX Interaction Architecture

let map;
let pickupMarker;
let dropMarker;
let routePolyline;
let movingBikeMarker;
let countdownInterval = null;
let tripTimerInterval = null;
let tripLiveSeconds = 0;
let selectedPayment = 'Cash';
let currentFare = 43;
let currentDistKm = 8.2;
let selectedRating = 5;

// Navigation Stack for smooth back transitions
let navigationStack = ['sheet-home'];

// Default Coordinates: Indore (from user's screenshots)
const defaultPickup = [22.7533, 75.8937]; // Sector R, Mahalaxmi Nagar
const defaultDrop = [22.7441, 75.8821];   // Scheme No 54, Savitri Empire

document.addEventListener('DOMContentLoaded', () => {
  initMap();
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

  // CartoDB clean vector tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map);

  drawRoute(defaultPickup, defaultDrop);
}

function drawRoute(pickupCoord, dropCoord) {
  if (pickupMarker) map.removeLayer(pickupMarker);
  if (dropMarker) map.removeLayer(dropMarker);
  if (routePolyline) map.removeLayer(routePolyline);
  if (movingBikeMarker) map.removeLayer(movingBikeMarker);

  // Green "Pickup Point" Speech Bubble Marker (Screenshot 5)
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

  const midLat = (pickupCoord[0] + dropCoord[0]) / 2 + 0.003;
  const midLng = (pickupCoord[1] + dropCoord[1]) / 2 - 0.003;
  const routePoints = [pickupCoord, [midLat, midLng], dropCoord];

  routePolyline = L.polyline(routePoints, {
    color: '#0F172A',
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
    
    // Toggle floating back button (hidden on Home)
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
  hideAllSheets();
  navigationStack = ['sheet-home'];
  const homeSheet = document.getElementById('sheet-home');
  if (homeSheet) homeSheet.style.display = 'block';
  document.getElementById('map-back-btn').style.display = 'none';
  recenterMap();
}

function hideAllSheets() {
  const sheets = document.querySelectorAll('.bottom-sheet');
  sheets.forEach(s => s.style.display = 'none');
}

// ========================================================
// 3. HOME SCREEN ACTIONS
// ========================================================

function startShareRideFlow() {
  navigateTo('sheet-passenger-search');
}

function openHostModeSelector() {
  navigateTo('sheet-host-mode-picker');
}

function startHostInsideCityFlow() {
  // Reset previous calculation state so price is not shown prematurely
  document.getElementById('host-calc-trigger-section').style.display = 'block';
  document.getElementById('host-calculated-fare-section').style.display = 'none';
  navigateTo('sheet-host-city-setup');
}

function startHostCityToCityFlow() {
  calculateIntercityDistance();
  navigateTo('sheet-host-intercity-setup');
}

function quickSelectRoute(title, pickup, drop, distKm) {
  document.getElementById('passenger-pickup-input').value = pickup;
  document.getElementById('passenger-drop-input').value = drop;
  currentDistKm = distKm;
  startShareRideFlow();
}

// ========================================================
// 4. PASSENGER FLOW: SHARE A RIDE
// ========================================================

function goToPassengerPickupCheck() {
  const pickup = document.getElementById('passenger-pickup-input').value;
  document.getElementById('display-pickup-point').innerText = pickup;
  document.getElementById('waiting-pickup-text').innerText = pickup;
  document.getElementById('waiting-drop-text').innerText = document.getElementById('passenger-drop-input').value;
  
  navigateTo('sheet-passenger-pickup');
}

function confirmPickupAndDiscoverHosts() {
  // Calculate dynamic fares for the corridor
  const baseFuelFare = Math.round(15 + (currentDistKm * 3.4));
  currentFare = baseFuelFare;
  
  document.getElementById('pax-card-price-1').innerText = `₹${currentFare}`;
  document.getElementById('pax-card-price-2').innerText = `₹${currentFare - 3}`;
  document.getElementById('confirmed-fare-val').innerText = `₹${currentFare}`;
  document.getElementById('total-fare-num').innerText = `₹${currentFare}`;
  document.getElementById('payment-modal-fare').innerText = `₹${currentFare}`;
  document.getElementById('discovery-corridor-summary').innerText = `Calculated for ${currentDistKm} km corridor`;

  navigateTo('sheet-passenger-discovery');
}

function selectHostCard(index) {
  const cards = document.querySelectorAll('.host-card');
  cards.forEach(c => c.classList.remove('selected'));
  if (cards[index - 1]) cards[index - 1].classList.add('selected');
}

function bookHostRide(hostIndex, event) {
  if (event) event.stopPropagation();
  
  navigateTo('sheet-passenger-waiting');
  document.getElementById('waiting-status-title').innerText = "Searching for below services...";
  document.getElementById('waiting-progress-bar').style.display = 'block';
  document.getElementById('display-start-otp').style.display = 'none';

  // Simulate instant matching after 1.5 seconds
  setTimeout(() => {
    document.getElementById('waiting-status-title').innerText = "Ride Confirmed! Rahul is arriving";
    document.getElementById('waiting-progress-bar').style.display = 'none';
    document.getElementById('display-start-otp').style.display = 'block';
  }, 1600);
}

// ========================================================
// 4E. IN-TRIP LIVE NAVIGATION SCREEN
// ========================================================

function startLiveTripScreen() {
  navigateTo('sheet-in-trip');
  document.getElementById('in-trip-fare-due').innerText = `₹${currentFare}`;
  document.getElementById('in-trip-dist-rem').innerText = `${currentDistKm} km`;

  // Start trip live timer
  tripLiveSeconds = 0;
  if (tripTimerInterval) clearInterval(tripTimerInterval);
  tripTimerInterval = setInterval(() => {
    tripLiveSeconds++;
    const m = String(Math.floor(tripLiveSeconds / 60)).padStart(2, '0');
    const s = String(tripLiveSeconds % 60).padStart(2, '0');
    document.getElementById('trip-live-timer').innerText = `${m}:${s}`;
  }, 1000);

  // Simulate motorcycle movement on map
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

  const startCoord = [22.7500, 75.8900];
  movingBikeMarker = L.marker(startCoord, { icon: bikeIcon }).addTo(map);

  let step = 0;
  const moveInterval = setInterval(() => {
    step++;
    const lat = startCoord[0] + (defaultPickup[0] - startCoord[0]) * (step / 20);
    const lng = startCoord[1] + (defaultPickup[1] - startCoord[1]) * (step / 20);
    movingBikeMarker.setLatLng([lat, lng]);

    if (step >= 20) {
      clearInterval(moveInterval);
    }
  }, 200);
}

function showLiveTrackingState() {
  recenterMap();
}

function cancelPassengerRide() {
  if (confirm("Are you sure you want to cancel this ride?")) {
    goHome();
  }
}

// ========================================================
// 4F. END RIDE & POST-TRIP REVIEW RATING SCREEN
// ========================================================

function completeAndEndTrip() {
  if (tripTimerInterval) clearInterval(tripTimerInterval);
  
  // Set Receipt Details
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
  const comment = document.getElementById('review-comment-input').value;
  alert(`🌟 Thank you for your feedback!\n\nRating: ${selectedRating} Stars submitted for Rahul.\nYour review helps keep the Rapido Commute community safe & verified!`);
  goHome();
}

// ========================================================
// 5. HOST REVIEWS & PROFILE MODAL
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
// 6. HOST FLOW A: INSIDE THE CITY (5–30 KM)
// ========================================================

function calculateHostRouteAndFare() {
  const origin = document.getElementById('host-city-origin').value;
  const dest = document.getElementById('host-city-dest').value;

  if (!origin || !dest) {
    alert("Please enter both starting point and destination.");
    return;
  }

  // Simulated Distance calculation (8.2 km for Mahalaxmi -> Scheme 54)
  const distKm = 8.2;

  // Validate 5 km to 30 km range
  if (distKm < 5.0) {
    alert("❌ Distance too short for commute pooling (Minimum 5 km required).");
    return;
  }
  if (distKm > 30.0) {
    alert("❌ Route exceeds 30 km. Please switch to City-to-City Highway mode.");
    return;
  }

  // Calculate fare
  const fare = Math.round(15 + (distKm * 4.5));
  document.getElementById('host-fare-calc').innerText = `₹${fare}.00`;
  document.getElementById('host-distance-text').innerText = `Distance: ${distKm} km (Valid: 5 to 30 km Range)`;

  // Reveal calculated fare section
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

    // Simulate match notification after 4 seconds
    if (totalSeconds === 296) {
      alertBox.style.display = 'block';
    }
  }, 1000);
}

function hostAcceptPassenger() {
  clearInterval(countdownInterval);
  alert("🎉 Co-Rider Accepted!\n\nPassenger: Ananya K.\nPickup Point: Vijay Nagar Bus Stop\nStart OTP: 7842\n\nGPS Route Navigation Started!");
  goHome();
}

function cancelHost5MinTimer() {
  if (countdownInterval) clearInterval(countdownInterval);
  goHome();
}

// ========================================================
// 7. HOST FLOW B: CITY TO CITY (INTERCITY HIGHWAY)
// ========================================================

function calculateIntercityDistance() {
  const fromCity = document.getElementById('intercity-from-city').value;
  const toCity = document.getElementById('intercity-to-city').value;
  
  // Calculate simulated distance and bounds
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
  const fromCity = document.getElementById('intercity-from-city').value;
  const toCity = document.getElementById('intercity-to-city').value;
  const price = document.getElementById('intercity-price-slider').value;
  const date = document.getElementById('intercity-date').value;
  const time = document.getElementById('intercity-time').value;

  alert(`🚀 Intercity Highway Trip Published!\n\nRoute: ${fromCity} ➔ ${toCity}\nDate: ${date} at ${time}\nPrice: ₹${price} per seat\n\nYour listing is now live for co-travelers heading between these cities!`);
  goHome();
}

// ========================================================
// 8. PAYMENTS & OFFERS MODALS
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

function toggleGenderFilter() {
  const filterBtn = document.getElementById('gender-filter-text');
  if (filterBtn.innerText === 'All Hosts') {
    filterBtn.innerText = 'Women Only 🌸';
  } else {
    filterBtn.innerText = 'All Hosts';
  }
}

function openTripDetails() {
  alert(`Trip Details:\n\nService: Rapido Bikepool Commute\nFare: ₹${currentFare}\nPickup: 722, Sector R, Mahalaxmi Nagar\nDrop: Savitri Empire, Scheme 54\nInsurance: Covered up to ₹5 Lakh by Rapido Shield`);
}

function openProfileDrawer() {
  alert("Rapido Profile:\n\nUser: Abhigya\nRating: ⭐ 4.9 (Trusted Commuter)\nCorporate Email: Verified ✅\nDigiLocker Govt ID: Verified ✅");
}

function openLocationPicker() {
  alert("Current Location set to: Sector R, Mahalaxmi Nagar, Indore");
}
