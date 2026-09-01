# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Rapido RidePool & Highway: P2P Commute Platform

**Product Name:** Rapido RidePool & Highway  
**Document Version:** 4.0 (Final Master Technical Edition for Rapido Leadership)  
**Author:** Abhigya Kanungo  

---

## 1. Product Scope & Core Capabilities

Rapido RidePool formalizes organic commuter behavior into an intuitive, zero-detour peer-to-peer bike sharing platform:
1. **For Hosts (Offering the Seat):** Any commuter with a two-wheeler (Motorcycle/Scooter) can offset daily fuel expenses by sharing their empty pillion seat along their own destination route.
2. **For Passengers (Filling the Seat):** Universal Point A-to-B transit (work, college, gym, market) for anyone wanting affordable, direct, surge-free co-rides (₹35–₹45) with a short 100m walk to the main road bus shelter.

---

## 2. Technical Architecture & Platform Retention Rationale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TECHNICAL ARCHITECTURE & RATIONALE                       │
└─────────────────────────────────────────────────────────────────────────────┘
  Component / Decision           Technical & Product Rationale
  ────────────────────           ──────────────────────────────
  1. Rapido In-App Wallet        • Auto-deducts fare from Passenger Wallet and
                                   credits Host Wallet instantly upon OTP start.
                                   Eliminates cash hassle; retains 100% platform control.
                                   Also supports Cash & Personal UPI QR modes.

  2. Mon–Fri Commute Alarm       • Optional daily partnership (e.g. 09:30 AM).
                                   Automated 09:15 AM alarm & proximity trigger
                                   ("Passenger at spot 📍") eliminates daily search.

  3. Anti-Leakage Psychology     • Micro-Pricing (₹35–₹52/ride) creates social ego
                                   barrier against offline bargaining over ₹5.
                                 • Backup SLA Guarantee (free replacement ride if
                                   host cancels) retains passengers on-platform.

  4. 5-30 km City Boundary       • Trips <5 km ➔ Served by regular bike taxi/walking.
                                 • Trips 5-30 km ➔ High-frequency commute zone
                                   where fuel cost sharing offsets ₹3,500/mo petrol.

  5. Automated Fuel Pricing      • City Fare = ₹15 base + (Dist × ₹3.40/km) + ₹5 safety.
                                 • Prevents surge, price gouging & ensures Motor Vehicles
                                   Act compliance (Non-commercial peer fuel recovery).
```

---

## 3. Interactive Feature Architecture & Components

### A. Rapido In-App Wallet & Payment Flex (`modal-payments`)
* **Rationale:** Direct peer payments create friction and cash change delays.
* **Mechanism:** 
  - **Rapido Wallet Mode (Primary):** Instant auto-deduction from Passenger Balance (e.g. ₹250.00) $\to$ Instant auto-credit to Host Wallet with zero platform commission.
  - **Flex Modes:** Supports Pay at Drop (UPI QR) and Cash.

### B. Mon–Fri Daily Commute Partnership & Proximity Alarm
* **Rationale:** Daily commuters want a reliable partnership without repeated manual matching.
* **Mechanism:** Partners once for Mon–Fri 09:30 AM commute. At 09:15 AM, system triggers an automated alarm & proximity notification (*"Passenger Ananya is at Sector R Bus Stop 📍"*).

### C. 1-Minute Frictionless Host Onboarding (`sheet-host-onboarding`)
* **Rationale:** Commercial driver onboarding deters everyday commuters.
* **Mechanism:** 2-step setup collecting vehicle type (Motorcycle vs Scooter), model, registration plate (`MP 09 AB 7842`), auto DigiLocker DL verification (`DL-092021008742`), and spare ISI helmet declaration.

### D. 4-Digit Auto-Advancing OTP Keypad (`sheet-host-otp-verify`)
* **Rationale:** Prevents wrong boarding and ensures security before trip start.
* **Mechanism:** Digit boxes auto-advance focus on entry and return on `Backspace`. Includes 1-tap **"⚡ Auto-Fill 7842"** button for fast demonstration.

### E. Rapido SafeDial Calling Simulator (`modal-call-screen`)
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

## 5. Host Flow B: City-to-City Highway (>30 km)

* **Advance Scheduling:** Intercity trips are scheduled $\ge 1\text{ hour}$ in advance (Indore to Bhopal, 195 km).
* **Dynamic Price Slider:** Host sets seat price bounded by fair fuel guardrails (Min ₹260, Suggested ₹360, Max ₹520).
* **Confirmed Highway Voucher (`sheet-host-highway-confirmed`):** Displays co-traveler request (e.g. *Vikram Joshi · Wipro*) ➔ Host accepts ➔ Confirmed Voucher generated ➔ Departure Navigation ➔ Start OTP (`7842`) ➔ Highway Live Speedometer HUD ➔ ₹360.00 Wallet Settlement & Rating.

---

## 6. Engineering Acceptance Criteria

| Module | Acceptance Criteria | Status |
| :--- | :--- | :--- |
| **Rapido Wallet Engine** | Supports Rapido In-App Wallet balance, auto-deduction, auto-payout, and cash/UPI modes. | **✓ Verified & Live** |
| **Mon–Fri Commute Alarm** | Supports 09:15 AM automated alarm & proximity alert ("Passenger at spot 📍"). | **✓ Verified & Live** |
| **Unified Distance Engine** | Auto-switches to City Pool (≤30km) or Highway (>30km) upon destination change. | **✓ Verified & Live** |
| **Pink Pool Filter (🌸)** | Toggling Pink Pool filters host discovery to verified women commuters with custom badges. | **✓ Verified & Live** |
| **5-Min Host Radar** | Accurate countdown timer with zero-penalty cancellation if no match occurs. | **✓ Verified & Live** |
| **OTP Handshake** | Trip starts locked until the host enters matching 4-digit passenger OTP (7842). | **✓ Verified & Live** |
| **Responsive Layout** | Auto-scales to 100% full-screen (100dvh) on mobile and centers on browsers. | **✓ Verified & Live** |
