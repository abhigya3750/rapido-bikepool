# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Rapido RidePool & Highway: P2P Commute Platform

**Product Name:** Rapido RidePool & Highway  
**Document Version:** 5.1 (Complete 2-Persona Mon–Fri Partnership Edition)  
**Author:** Abhigya Kanungo  

---

## 1. Product Scope & Core Value Proposition

Rapido RidePool formalizes organic commuter behavior into an intuitive, zero-detour peer-to-peer bike sharing platform:
1. **Primary Core Model (Single A-to-B Ride):** Any commuter with a two-wheeler can offer their empty pillion seat for a single trip along their route; any passenger can book a single direct co-ride (₹35–₹45) with a 100m walk to the main road bus shelter.
2. **2-Persona Mon–Fri Commute Partnership:** Available on **BOTH** Passenger ("Need a Ride") and Host ("Host a Ride") modes:
   - **Passenger Side:** Filter hosts offering Mon–Fri daily commute passes.
   - **Host Side:** Toggle `[🔁 Mon–Fri Daily Partnership]`, configure daily departure time (09:30 AM), view daily match requests (*Ananya K. · TCS*), and lock a recurring Mon–Fri partnership with automated 09:15 AM departure alarms & proximity alerts (*"Passenger at pickup spot 📍"*).

---

## 2. Technical Architecture & Platform Retention Rationale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TECHNICAL ARCHITECTURE & RATIONALE                       │
└─────────────────────────────────────────────────────────────────────────────┘
  Component / Decision           Technical & Product Rationale
  ────────────────────           ──────────────────────────────
  1. Dual-Persona Mon–Fri Flow   • Available on both Passenger and Host screens.
                                 • Host configures 09:30 AM schedule, locks match,
                                   and receives automated 09:15 AM alarm & signal.

  2. Primary A-to-B Core         • Instant 1-click single-trip matching.
                                 • Passenger walks 100m to main road bus shelter,
                                   guaranteeing zero detour for Host.

  3. Rapido In-App Wallet        • Auto-deducts fare from Passenger Wallet and
                                   credits Host Wallet instantly upon OTP start.
                                   Eliminates cash hassle; retains 100% platform control.
                                   Also supports Cash & Personal UPI QR modes.

  4. Anti-Leakage Psychology     • Micro-Pricing (₹35–₹52/ride) creates social ego
                                   barrier against offline bargaining over ₹5.
                                 • Backup SLA Guarantee (free replacement ride if
                                   host cancels) retains passengers on-platform.

  5. 5-30 km City Boundary       • Trips <5 km ➔ Served by regular bike taxi/walking.
                                 • Trips 5-30 km ➔ High-frequency commute zone
                                   where fuel cost sharing offsets ₹3,500/mo petrol.

  6. Automated Fuel Pricing      • City Fare = ₹15 base + (Dist × ₹3.40/km) + ₹5 safety.
                                 • Prevents surge, price gouging & ensures Motor Vehicles
                                   Act compliance (Non-commercial peer fuel recovery).
```

---

## 3. Interactive Feature Architecture & Components

### A. Host Mon–Fri Daily Commute Setup (`sheet-host-city-setup`)
* **Rationale:** Bike hosts commuting daily want a predictable daily co-rider without running the 5-minute radar every morning.
* **Mechanism:** Switch pill `[🔁 Mon–Fri Daily Partnership]` reveals schedule box $\to$ displays co-rider requests (*Ananya K. · TCS*) $\to$ Host taps **"🤝 Partner Mon–Fri (09:30 AM)"** $\to$ Locks partnership and triggers 09:15 AM daily alarm.

### B. Primary Single A-to-B Ride Flow (`sheet-passenger-search` / `sheet-host-city-setup`)
* **Rationale:** Core foundation of the platform allowing any two-wheeler owner and passenger to connect for a single direct trip.
* **Mechanism:** Single-trip landmark search $\to$ 100m bus stop pickup $\to$ host discovery $\to$ 5-min timer $\to$ OTP verification $\to$ trip completion.

### C. Rapido In-App Wallet & Payment Flex (`modal-payments`)
* **Rationale:** Direct peer payments create friction and cash change delays.
* **Mechanism:** 
  - **Rapido Wallet Mode (Primary):** Instant auto-deduction from Passenger Balance (e.g. ₹250.00) $\to$ Instant auto-credit to Host Wallet with zero platform commission.
  - **Flex Modes:** Supports Pay at Drop (UPI QR) and Cash.

### D. 1-Minute Frictionless Host Onboarding (`sheet-host-onboarding`)
* **Rationale:** Commercial driver onboarding deters everyday commuters.
* **Mechanism:** 2-step setup collecting vehicle type (Motorcycle vs Scooter), model, registration plate (`MP 09 AB 7842`), auto DigiLocker DL verification (`DL-092021008742`), and spare ISI helmet declaration.

### E. 4-Digit Auto-Advancing OTP Keypad (`sheet-host-otp-verify`)
* **Rationale:** Prevents wrong boarding and ensures security before trip start.
* **Mechanism:** Digit boxes auto-advance focus on entry and return on `Backspace`. Includes 1-tap **"⚡ Auto-Fill 7842"** button for fast demonstration.

### F. Rapido SafeDial Calling Simulator (`modal-call-screen`)
* **Rationale:** Preserves passenger and host phone number privacy.
* **Mechanism:** Overlay displaying caller avatar, masked number badge (*"Rapido SafeDial · Number Masked"*), status timer, Mute & Speaker toggles, and End Call control.

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
               │ (OTP Verified & Wallet Deducted)
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
| **4** | OTP Verification | Host arrives ➔ enters 4-digit code (7842) shown on passenger's app. | PIN verification ensures correct rider boarding; Rapido Wallet auto-deducts. |
| **5** | Trip Settlement | Active HUD displays speed (42 km/h) and distance (7.8 km). | Host taps "Reached" ➔ ₹52.00 credited to wallet ➔ rates passenger. |

---

## 5. Engineering Acceptance Criteria

| Module | Acceptance Criteria | Status |
| :--- | :--- | :--- |
| **Host Mon–Fri Setup** | Supports Host Mon–Fri partnership setup, co-rider match preview, and 09:15 AM alarm lock. | **✓ Verified & Live** |
| **Primary Single A-to-B Ride** | Supports 1-click single trip matching for Passenger and Host with zero detour. | **✓ Verified & Live** |
| **Rapido Wallet Engine** | Supports Rapido In-App Wallet balance, auto-deduction, auto-payout, and cash/UPI modes. | **✓ Verified & Live** |
| **Unified Distance Engine** | Auto-switches to City Pool (≤30km) or Highway (>30km) upon destination change. | **✓ Verified & Live** |
| **Pink Pool Filter (🌸)** | Toggling Pink Pool filters host discovery to verified women commuters with custom badges. | **✓ Verified & Live** |
| **5-Min Host Radar** | Accurate countdown timer with zero-penalty cancellation if no match occurs. | **✓ Verified & Live** |
| **OTP Handshake** | Trip starts locked until the host enters matching 4-digit passenger OTP (7842). | **✓ Verified & Live** |
| **Responsive Layout** | Auto-scales to 100% full-screen (100dvh) on mobile and centers on browsers. | **✓ Verified & Live** |
