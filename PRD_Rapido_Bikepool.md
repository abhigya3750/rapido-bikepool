# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Product Name:** Rapido RidePool (City Commute & Highway RideShare)  
**Document Version:** 2.2 (Updated to Match Full Live Web App UX)  
**Author:** Senior Product Manager & UX Lead  

---

## 1. Product Scope & Core Capabilities

Rapido RidePool formalizes organic commuter behavior into an intuitive, zero-detour peer-to-peer bike sharing platform:
1. **For Two-Wheeler Owners (Hosts):** Any commuter with a bike can offset their daily fuel expenses by sharing their empty pillion seat along their own destination route.
2. **For Passengers:** Enjoy affordable, direct, surge-free corridor transit with fellow commuters heading in the exact same direction.

---

## 2. Interactive Feature Architecture & Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       INTERACTIVE PRODUCT COMPONENTS                        │
└─────────────────────────────────────────────────────────────────────────────┘
  1-Min Host Onboarding ──► Live Location Search ──► 4-Digit Auto OTP Keypad
  • Bike / Scooter grid     • Landmark presets       • Auto-advance on digit
  • Plate # & DigiLocker    • Route recalculation    • Backspace handling
  • Spare Helmet check      • Leaflet polyline       • 1-Tap '7842' shortcut
```

### A. 1-Minute Frictionless Host Onboarding (`sheet-host-onboarding`)
* **Step 1 (Vehicle Setup):** User selects vehicle category (🏍️ Motorcycle vs 🛵 Scooter), vehicle brand/model (*Royal Enfield Hunter 350, Honda Activa 6G, Pulsar 150*), and enters registration plate (`MP 09 AB 7842`).
* **Step 2 (Safety & Verification):** Auto-linked DigiLocker Driving License status (`DL-092021008742`) + Spare ISI Helmet declaration check.
* **Profile Persistence:** Activated host profile details display dynamically on hosting screens and host profile cards.

### B. Interactive Location Autocomplete & Corridor Engine
* **Landmark Suggestions Dropdown:** Displays real city & highway hubs (*Mahalaxmi Nagar, Vijay Nagar Square, Scheme 54, Palasia, Bhawarkua, Rajwada, Bhopal ISBT, Ujjain Bypass*).
* **Dynamic Recalculation:** Selecting any landmark updates distance km, redraws Leaflet map polyline routes with animated bounds, and recalculates fuel fare split.

### C. 4-Digit Auto-Advancing OTP Keypad (`sheet-host-otp-verify`)
* Input digit boxes automatically advance focus to the next field upon entry and return focus on `Backspace`.
* Includes a 1-tap **"⚡ Auto-Fill 7842"** button for fast interactive demonstration.

### D. Rapido SafeDial Calling Simulator (`modal-call-screen`)
* Displays caller avatar, masked number privacy notice (*"Rapido SafeDial · Number Masked"*), ringing tone animation $\to$ live status timer (`00:01`, `00:02`...), working **Mute** and **Speaker** toggles, and End Call control.

---

## 3. Unified Passenger Flow Architecture ("Share a Ride")

* **Step 1 (Route Entry & Auto-Detection):** User enters pickup and destination. Routes ≤30 km automatically activate **Inside City Commute mode**; routes >30 km activate **Highway Intercity mode**.
* **Step 2 (Pickup Landmark Pin):** Interactive map centers on green `Pickup Point` bubble marker pointing to the nearest direct arterial road bus stop (120m walk).
* **Step 3 (Matching Hosts Discovery):** Displays co-riders on route with vehicle model, star rating (4.9⭐), trust badges, and real written reviews.
* **Step 4 (Rapido Safety Shield):** Mandatory dual ISI helmet confirmation and verified identity check before booking.
* **Step 5 (Active Trip HUD & Speedometer):** 4-digit start OTP (`7842`) → live moving bike marker on map → dynamic speedometer (38–44 km/h) → bilateral 5-star rating.

---

## 4. Complete 5-Step Host Lifecycle (Inside City: 5–30 km)

```
┌────────────────────────────────┐
│ 1. Route Setup & 5-30km Check  │
│    Calculates fare: ₹52.00     │
└──────────────┬─────────────────┘
               │ (Host taps "Start 5-Min Timer")
               ▼
┌────────────────────────────────┐
│ 2. 5-Min Live Hosting Radar    │
│    "Ananya K. matched on path" │
└──────────────┬─────────────────┘
               │ (Host taps "Accept & Pick Up")
               ▼
┌────────────────────────────────┐
│ 3. Host Pickup Navigation      │
│    • Direct route to bus stop  │
│    • Masked in-app chat & call │
│    • "I Have Arrived at Pickup"│
└──────────────┬─────────────────┘
               │ (Host arrives at spot)
               ▼
┌────────────────────────────────┐
│ 4. Start OTP Verification      │
│    • 4-box PIN keypad (7 8 4 2)│
│    • "Verify OTP & Start Ride" │
└──────────────┬─────────────────┘
               │ (OTP Verified)
               ▼
┌────────────────────────────────┐
│ 5. Host In-Trip & Settlement   │
│    • Live Speedometer (42 km/h)│
│    • ₹52.00 direct wallet payout│
│    • Rate passenger Ananya ⭐  │
└────────────────────────────────┘
```

| Lifecycle Step | System Action & UI Screen | User Experience Outcome |
| :--- | :--- | :--- |
| **1. Route Setup & Range Check** | Host enters origin & destination. System validates 5 to 30 km range. | Calculates exact fuel split compensation (**₹52.00**) and displays fuel offset badge. |
| **2. 5-Min Hosting Radar** | Host taps *"Start 5-Min Hosting Timer"*. Radial countdown radar activates on map. | Broadcasts route to nearby commuters. Match alert arrives at 3s (*"Ananya K. at Bus Stop"*). |
| **3. Host Pickup Navigation** | Host taps *"Accept & Pick Up"*. Map routes host directly to passenger's bus stop. | Displays ETA (~2 mins), landmark info, and masked in-app chat/call tools. |
| **4. Start OTP Verification** | Host arrives at spot ➔ enters 4-digit code shown on passenger's app (`7842`). | PIN verification ensures correct rider boarding before ride start. |
| **5. Host In-Trip & Settlement** | Active HUD displays speed (42 km/h), distance (7.8 km), and passenger on pillion. | Host taps *"Reached Destination"* ➔ **₹52.00** credited to wallet ➔ rates passenger. |

---

## 5. Host Flow B: City-to-City Highway (>30 km)

* **Advance Scheduling:** Intercity trips are scheduled **≥1 hour in advance** (e.g., Indore to Bhopal, 195 km).
* **Dynamic Price Slider:** Host sets seat price bounded by fair fuel guardrails (Min ₹260, Suggested ₹360, Max ₹520).
* **Gear & Halt Checklist:** Host declares spare ISI helmet, luggage allowance (<7 kg standard backpack), and planned highway refreshment halts.
* **Active Highway Dashboard:** Live listing feed shows co-traveler requests (e.g., *Vikram Joshi*) ➔ Host accepts ➔ confirmed travel voucher generated.

---

## 6. Safety, Trust & Compliance Engine

* **Dual ISI Helmet Check:** Pre-ride modal requires host and passenger to confirm sanitized ISI helmet availability.
* **Commuter Verification:** Identity verification + DigiLocker Govt ID badge displayed on profiles.
* **Telemetry & SOS:** Live speed monitoring (38–44 km/h) and one-tap emergency SOS connected to Rapido emergency response.

---

## 7. Engineering Acceptance Criteria

| Module | Acceptance Criteria | Status |
| :--- | :--- | :--- |
| **Host Onboarding** | Stepper collects vehicle type, model, plate #, verifies DL via DigiLocker, and activates profile. | **✓ Verified & Live** |
| **Location Autocomplete** | Selecting landmark updates distance, redraws polyline, and recalculates fare math. | **✓ Verified & Live** |
| **Unified Distance Engine** | Auto-switches to City Pool (≤30km) or Highway (>30km) upon destination change. | **✓ Verified & Live** |
| **5-Min Host Radar** | Accurate countdown timer with zero-penalty cancellation if no match occurs. | **✓ Verified & Live** |
| **OTP Keypad** | Auto-advances focus on digit press; 1-tap `7842` shortcut verifies ride start. | **✓ Verified & Live** |
| **SafeDial Calling Simulator** | Displays masked number calling modal with status timer, mute, speaker, and end call controls. | **✓ Verified & Live** |
| **Responsive Layout** | Auto-scales to 100% full-screen (`100dvh`) on mobile and centers on web browsers. | **✓ Verified & Live** |
