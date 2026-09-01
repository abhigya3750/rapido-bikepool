# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido RidePool & Highway: P2P Commute Platform

**Product Name:** Rapido RidePool & Highway  
**Document Version:** 5.0 (Ultimate Comprehensive Edition — All Features & Rationale)  
**Author:** Abhigya Kanungo  

---

## 1. Executive Summary & Ground Reality Loophole

### 1.1 The Ground Reality: The Petrol Offset Loophole
Across major Indian urban centers (Bengaluru, Hyderabad, Pune, Delhi-NCR, Indore), millions of everyday two-wheeler owners commute daily from Point A to Point B (work, college, coaching, gym, market). They spend over **₹3,500/month on petrol** (at ₹100+/L).

To offset this daily commute cost, an increasing number of regular two-wheeler owners **onboard onto the Rapido Captain app**.

However, they are **NOT commercial taxi drivers**:
* When a bike owner commutes along a routine corridor (e.g. *Vijay Nagar to Palasia* or *Sector R to Scheme 54*), they turn on the Captain app **solely to find a co-traveler heading in their exact same direction**.
* They reject off-route commercial rides, frequently calling passengers asking *"Bhaiya, kahan jana hai?"*, and only accept a passenger whose destination lies directly along their commute path.
* By doing this, the bike owner shares their empty pillion seat, reaches their destination on schedule, and collects money to cover **70% to 100% of their daily petrol cost**.

### 1.2 The Core Solution: Primary P2P Sharing + Mon–Fri Partnership Add-on
1. **Primary Core Model (Single Point A-to-B Trip):** Instant 1-click booking for anyone needing or offering a single co-ride from Point A to Point B. The passenger walks 100 meters to the main road bus shelter; the host shares their empty pillion seat for a fair fuel split (₹35–₹52).
2. **Add-on Module (Mon–Fri Commute Partnership):** An optional feature for regular commuters traveling the same route daily (e.g. 09:30 AM). They lock a Mon–Fri partnership once, receiving automated 09:15 AM departure alarms & proximity alerts (*"Passenger at pickup spot 📍"*) with zero daily manual searching.

### 1.3 Platform Unit Economics & Regulatory Protection
* **Zero Fleet Acquisition Cost:** Unlocks millions of personal two-wheelers already riding on Indian roads.
* **100% Regulatory Protection:** Non-commercial peer cost recovery (`₹15 base + [Dist × ₹3.40/km] + ₹5 platform fee`) complies fully with Motor Vehicles carpooling guidelines and is 100% immune to surge pricing.
* **Predictable Monetization:** Steady **₹5.00 platform & safety insurance fee per ride** collected directly via the Rapido In-App Wallet Engine.

---

## 2. Product Decision & Parameter Matrix

| Feature / Parameter | Core vs Add-On | Why It Exists & Problem Solved |
| :--- | :--- | :--- |
| **Single Point A-to-B Sharing** | **PRIMARY CORE** | Instant single-trip matching between any Host and Passenger going the same direction. Passenger walks 100m to main road bus shelter for a ₹40 direct co-ride. |
| **Mon–Fri Commute Partnership** | **ADD-ON FEATURE** | Optional partnership for daily commuters (09:30 AM). Automated 09:15 AM alarm & proximity alert ("Passenger at spot 📍") eliminates daily search. |
| **Rapido In-App Wallet Engine** | **CORE INFRA** | Auto-deducts fare from Passenger Wallet and credits Host Wallet instantly upon OTP start. Also supports Cash & Personal UPI QR modes. |
| **🌸 Pink Pool (Women Only)** | **ADD-ON FEATURE** | Optional filter matching female commuters exclusively with verified women hosts (*Priya Verma, Ananya K.*) featuring pink trust badges. |
| **5 km to 30 km City Range** | **CORE GUARDRAIL** | • Under 5 km ➔ Served by regular bike taxi/walking.<br>• 5 to 30 km ➔ Goldilocks commute zone (high petrol burn, high traffic).<br>• Over 30 km ➔ Intercity highway behavior requiring advance scheduling (≥1h) & price sliders. |
| **Automated City Pricing** | **CORE GUARDRAIL** | System auto-calculates fair fuel split (`₹15 base + ₹3.40/km + ₹5 safety fee`). Prevents surge, price gouging & ensures carpool compliance. |
| **Zero-Detour Main Pickups** | **CORE GUARDRAIL** | Personal bike owners WILL NOT enter narrow lanes. Pickup pins snap to main road bus shelters (100m walk). |
| **5-Minute Hosting Timer** | **CORE GUARDRAIL** | Host cannot wait indefinitely. If no match in 5 mins, timer ends with zero penalty so host rides solo. |

---

## 3. Anti-Leakage Rationale: Why Users Don't Go Offline

A common concern with recurring commute matching (Mon–Fri Pass) is disintermediation: *"Will the host and rider negotiate offline to save money?"*

Rapido RidePool prevents offline leakage through **Micro-Pricing Psychology & Safety Lock-In**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              WHY USERS STAY ON-PLATFORM (ANTI-LEAKAGE ENGINE)               │
└─────────────────────────────────────────────────────────────────────────────┘
  1. Micro-Pricing vs Ego Barrier ➔ Daily fare is so low (₹35–₹52/ride) that
                                    bargaining offline over ₹5 creates social
                                    awkwardness ("₹5 ke liye offline negotiate karunga
                                    kya? App se hi kar leta hoon, smooth hai!").

  2. Rapido Safety & Insurance    ➔ Offline rides forfeit ₹5 Lakh Rapido Shield
                                    insurance, live GPS tracking & emergency SOS.

  3. Automated Wallet Settlement  ➔ Zero daily cash hassle; automated payout
                                    directly into Host's Rapido Wallet / UPI.

  4. Backup SLA Guarantee         ➔ If Host gets sick or delayed on Wednesday,
                                    Rapido automatically covers a replacement ride
                                    at ZERO extra charge. Offline rides leave the
                                    passenger stranded.
```

---

## 4. Product Offerings & Feature Architecture

```
                                  ┌─────────────────────────────┐
                                  │      RAPIDO RIDEPOOL        │
                                  └──────────────┬──────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
┌──────────────────────────────────────┐                     ┌──────────────────────────────────────┐
│  PERSONA A: FILLING THE SEAT         │                     │  PERSONA B: OFFERING THE SEAT        │
│  (Passenger / Single A-to-B Ride)    │                     │  (Host / Offer Pillion Seat)          │
├──────────────────────────────────────┤                     ├──────────────────────────────────────┤
│ • Auto-Detect Distance Engine        │                     │ • 1-Min Onboarding (Bike/Scooter,    │
│   - Inside City: 5 – 30 km pool      │                     │   Plate #, DigiLocker DL Check)      │
│   - Highway: > 30 km intercity       │                     │ • Auto-Detect Distance Engine        │
│ • ADD-ON: 🌸 Pink Pool (Women Only)  │                     │   - Inside City: Auto fuel fare      │
│ • ADD-ON: 🔁 Mon–Fri Daily Commute   │                     │     + 5-min live hosting timer       │
│   Partnership (09:15 AM Alarm)       │                     │   - Highway: Schedule 1h+ in advance │
│ • 💳 Rapido Wallet Auto-Deduction    │                     │     + custom price slider            │
│ • Direct Corridor Landmark Pickup    │                     │ • 💳 Rapido Wallet Instant Payout   │
│ • Rapido Safety Shield (Dual Helmet) │                     │   (Also supports Cash / UPI QR)      │
└──────────────────────────────────────┘                     └──────────────────────────────────────┘
```

---

## 5. User Personas & Real-World Use Cases

### Persona 1: The Daily Bike Host (Rahul Sharma, 28)
* **Profile:** Rides a Royal Enfield Hunter 350 from Mahalaxmi Nagar to Scheme 54 (8.2 km).
* **Pain Point:** Spends ₹3,500/month on petrol; refuses to be a full-time driver or take detours.
* **RidePool Solution:** Onboards in 1 min, sets route, starts 5-min timer, picks up co-rider at bus shelter, earns ₹52 in his Rapido Wallet, and offsets petrol expenses without changing his routine.

### Persona 2: The Universal Passenger (Ananya K., 24)
* **Profile:** Daily commuter (8.2 km corridor).
* **Pain Point:** Auto fares surge to ₹160+; cab cancellations.
* **RidePool Solution:** Walks 100m to bus shelter, enables **Pink Pool**, matches with verified female host Priya Verma for ₹43, optionally locks a Mon–Fri Pass with 09:15 AM daily alarm, and pays seamlessly via Rapido Wallet.

### Persona 3: The Highway Co-Traveler (Vikram Joshi, 31)
* **Profile:** Traveling from Indore to Bhopal (195 km).
* **Pain Point:** Intercity bus takes 4.5 hours; private cabs cost ₹2,800+.
* **RidePool Solution:** Books a seat on a highway ride for ₹360, receives a confirmed voucher (`sheet-host-highway-confirmed`), shares travel costs, and arrives in 3.5 hours.
