# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Product Name:** Rapido RidePool & Highway  
**Document Version:** 3.0 (Master Technical Rationale & Specifications Edition)  
**Author:** Abhigya Kanungo  

---

## 1. Product Scope & Value Proposition

Rapido RidePool formalizes organic commuter behavior into an intuitive, zero-detour peer-to-peer bike sharing platform:
1. **For Hosts (Offering the Seat):** Any commuter with a bike can offset fuel expenses by sharing their empty pillion seat along their own destination route.
2. **For Passengers (Filling the Seat):** Affordable, direct, surge-free corridor transit with fellow commuters heading in the exact same direction.

---

## 2. Technical Design Rationale: "THE WHY" Behind Product Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TECHNICAL ARCHITECTURE & RATIONALE                       │
└─────────────────────────────────────────────────────────────────────────────┘
  Component / Decision           Technical & Product Rationale
  ────────────────────           ──────────────────────────────
  1. Auto-Distance Engine        • Routes ≤30 km auto-activate Inside City mode.
                                 • Routes >30 km auto-activate Highway Intercity mode.
                                 • Removes manual mode switching friction for BOTH
                                   Passengers ("Need a Ride") and Hosts ("Have a Bike").

  2. 5-30 km City Boundary       • Trips <5 km are better served by regular Rapido.
                                 • Trips 5-30 km represent high-frequency daily commutes
                                   (Vijay Nagar ➔ Palasia) where fuel cost sharing is vital.

  3. Automated Fuel Pricing      • City Fare = ₹15 base + (Dist × ₹3.40/km) + ₹5 safety.
                                 • Prevents surge, price gouging & ensures Motor Vehicles
                                   Act compliance (Non-commercial peer fuel recovery).

  4. Dynamic Highway Slider      • Long-distance intercity (>30 km) varies by bike model,
                                   tolls & halts. Bounded slider (Min ₹260, Sugg ₹360,
                                   Max ₹520) allows fair host price flexibility.

  5. Zero-Detour Bus Stops       • Pickup pins snap to main road corridor landmarks (100m
                                   walk for passenger), preventing host detours into lanes.
```

---

## 3. Interactive Feature Architecture & Components

### A. 1-Minute Frictionless Host Onboarding (`sheet-host-onboarding`)
* **Why this flow?** Commercial driver onboarding requires extensive documentation that discourages office commuters. 
* **Mechanism:** 2-step setup collecting vehicle type (🏍️ Motorcycle vs 🛵 Scooter), model, registration plate (`MP 09 AB 7842`), auto DigiLocker DL verification (`DL-092021008742`), and spare ISI helmet declaration.

### B. Interactive Location Autocomplete & Corridor Engine
* **Why this flow?** Manual map pinning leads to inaccurate route calculations.
* **Mechanism:** Dropdown with popular corridors (*Mahalaxmi Nagar, Vijay Nagar, Scheme 54, Palasia, Bhawarkua, Rajwada, Bhopal ISBT, Ujjain Bypass*). Selecting a landmark updates distance km, redraws Leaflet map polyline bounds, and recalculates fuel fare split.

### C. 4-Digit Auto-Advancing OTP Keypad (`sheet-host-otp-verify`)
* **Why this flow?** Prevents wrong boarding and ensures security before trip start.
* **Mechanism:** Digit boxes auto-advance focus on entry and return on `Backspace`. Includes a 1-tap **"⚡ Auto-Fill 7842"** button for fast demonstration.

### D. Rapido SafeDial Calling Simulator (`modal-call-screen`)
* **Why this flow?** Preserves passenger and host phone number privacy.
* **Mechanism:** Overlay displaying caller avatar, masked number badge (*"Rapido SafeDial · Number Masked"*), status timer (`00:01`, `00:02`...), working **Mute** & **Speaker** toggles, and End Call control.

---

## 4. Complete 5-Step Host Lifecycle (Inside City: 5–30 km)

```
┌────────────────────────────────┐
│ 1. Route Setup & Range Check  │
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
│ 4. OTP Verification            │
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

| Step | Lifecycle Stage | System Action & UI Screen | User Experience Outcome |
| :--- | :--- | :--- | :--- |
| **1** | Route Setup | Host enters origin & destination. System validates 5 to 30 km range. | Calculates exact fuel split (₹52.00) and displays fuel offset badge. |
| **2** | 5-Min Radar | Host taps "Start 5-Min Hosting Timer". Radial countdown activates. | Broadcasts route. Match alert arrives at 3s ("Ananya K. at Bus Stop"). |
| **3** | Navigation | Host taps "Accept & Pick Up". Map routes host to bus stops. | Displays ETA (~2 mins), landmark info, and masked chat/call tools. |
| **4** | OTP Verification | Host arrives ➔ enters 4-digit code (7842) shown on passenger's app. | PIN verification ensures correct rider boarding before ride starts. |
| **5** | Trip Settlement | Active HUD displays speed (42 km/h) and distance (7.8 km). | Host taps "Reached" ➔ ₹52.00 credited to wallet ➔ rates passenger. |

---

## 5. Host Flow B: City-to-City Highway (>30 km)

* **Advance Scheduling:** Intercity trips are scheduled $\ge 1\text{ hour}$ in advance (Indore to Bhopal, 195 km).
* **Dynamic Price Slider:** Host sets seat price bounded by fair fuel guardrails (Min ₹260, Suggested ₹360, Max ₹520).
* **Gear Checklist:** Host declares spare ISI helmet availability.
* **Confirmed Highway Voucher (`sheet-host-highway-confirmed`):** Displays co-traveler request (e.g. *Vikram Joshi · Wipro*) ➔ Host accepts ➔ Confirmed Voucher generated ➔ Departure Navigation ➔ Start OTP (`7842`) ➔ Highway Live Speedometer HUD ➔ ₹360.00 Settlement & Rating.

---

## 6. Engineering Acceptance Criteria

| Module | Acceptance Criteria | Status |
| :--- | :--- | :--- |
| **Unified Distance Engine** | Auto-switches to City Pool (≤30km) or Highway (>30km) upon destination change. | **✓ Verified & Live** |
| **Pink Pool Filter (🌸)** | Toggling Pink Pool filters host discovery to verified women commuters with custom badges. | **✓ Verified & Live** |
| **Recurring Commute Pass (🔁)** | Allows locking Mon–Fri daily commute pass with 15% fuel-split discount. | **✓ Verified & Live** |
| **5-Min Host Radar** | Accurate countdown timer with zero-penalty cancellation if no match occurs. | **✓ Verified & Live** |
| **OTP Handshake** | Trip starts locked until the host enters matching 4-digit passenger OTP (7842). | **✓ Verified & Live** |
| **Responsive Layout** | Auto-scales to 100% full-screen (100dvh) on mobile and centers on browsers. | **✓ Verified & Live** |
