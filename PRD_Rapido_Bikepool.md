# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Product Name:** Rapido RidePool (City Commute & Highway RideShare)  
**Document Version:** 2.3 (Updated with Pink Pool, Recurring Matcher & Clean 2-Persona Architecture)  
**Author:** Abhigya Kanungo  

---

## 1. Product Scope & Value Proposition

Rapido RidePool formalizes organic commuter behavior into an intuitive, zero-detour peer-to-peer bike sharing platform:
1. **For Hosts (Offering the Seat):** Any commuter with a bike can offset fuel expenses by sharing their empty pillion seat along their own destination route.
2. **For Passengers (Filling the Seat):** Affordable, direct, surge-free corridor transit with fellow commuters heading in the exact same direction.

---

## 2. Unified 2-Persona Flow Architecture

The passenger and host experiences are consolidated into a single intelligent entry point that automatically detects route distance and commuter preferences:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         2-PERSONA FLOW ARCHITECTURE                         │
└─────────────────────────────────────────────────────────────────────────────┘
  Persona A: Filling the Seat ──► Route Entry ──► Auto Distance (City vs Hwy)
  • Search Destination           • ≤30km: City Pool   • Pink Pool Filter (🌸)
  • Choose Verified Host         • >30km: Highway     • Mon-Fri Pass Option (🔁)

  Persona B: Offering the Seat ──► Route Entry ──► Auto Distance (City vs Hwy)
  • 1-Min Host Onboarding        • ≤30km: 5-min Radar • Auto Fuel Fare (₹52)
  • Vehicle & DigiLocker DL      • >30km: Hwy Slider  • Direct Wallet Settlement
```

### Key Architectural Capabilities:

* **Auto-Distance Sensing Engine:** Entering a destination automatically detects **Inside City (5–30 km)** vs **Highway (>30 km)** for both Passengers and Hosts.
* **🌸 Pink Pool Community Engine:** Toggle switch filters hosts to show verified women commuters (*Priya Verma, Ananya K.*) with custom pink trust badges and DigiLocker ID checks.
* **🔁 Mon–Fri Recurring Commute Pass:** One-tap subscription locking the same verified co-rider every weekday at 08:30 AM with a 15% fuel-split discount.
* **Direct Landmark Pickups:** Pickup pins snap to nearest arterial road bus stops (100m walk), maintaining a zero-detour guarantee for hosts.
* **Rapido SafeDial & Telemetry:** Masked VoIP calling simulator, 4-digit start OTP verification (`7842`), live speedometer HUD (38–44 km/h), and bilateral ratings.

---

## 3. Complete 5-Step Host Lifecycle (Inside City: 5–30 km)

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

## 4. Host Flow B: City-to-City Highway (>30 km)

* **Advance Scheduling:** Intercity trips are scheduled $\ge 1\text{ hour}$ in advance.
* **Dynamic Price Slider:** Host sets seat price bounded by fair fuel guardrails (Min ₹260, Suggested ₹360, Max ₹520).
* **Gear & Halt Checklist:** Host declares spare ISI helmet and planned refreshment halts.
* **Active Dashboard:** Live listing feed shows co-traveler requests (e.g., *Vikram Joshi*) ➔ Host accepts ➔ travel voucher generated.

---

## 5. Safety, Trust & Compliance Engine

* **Dual ISI Helmet Check:** Pre-ride modal requires both parties to confirm sanitized ISI helmet availability.
* **Commuter Verification:** Identity verification + DigiLocker Govt ID badge displayed on profiles.
* **Telemetry & SOS:** Live speed monitoring (38–44 km/h) and one-tap emergency SOS connected to response team.

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
