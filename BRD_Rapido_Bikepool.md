# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Product Name:** Rapido RidePool & Highway  
**Document Version:** 3.1 (Universal P2P Commute & Platform Retention Edition)  
**Author:** Abhigya Kanungo  

---

## 1. Executive Summary: Universal Point A-to-B Peer Sharing

### 1.1 The Ground Reality: Universal Transit & The Petrol Offset Loophole
Across Indian cities (Bengaluru, Hyderabad, Pune, Delhi-NCR, Indore), millions of two-wheeler owners commute daily from Point A to Point B—whether going to work, college, coaching centers, gyms, or markets. They spend over **₹3,500/month on petrol** (at ₹100+/L).

To offset this heavy fuel expense, an increasing number of regular two-wheeler owners **onboard onto the Rapido Captain app**. 

However, they are **NOT commercial taxi drivers**:
* When a bike owner travels a routine route (e.g. *Vijay Nagar to Palasia* or *Sector R to Scheme 54*), they turn on the Captain app **solely to find a co-traveler heading in their exact same direction**.
* They reject off-route commercial rides, frequently calling passengers asking *"Bhaiya, kahan jana hai?"*, and only accept a passenger whose destination lies directly along their commute path.
* By doing this, the bike owner shares their empty pillion seat, reaches their destination on schedule, and collects money to cover **70% to 100% of their daily petrol cost**.

### 1.2 The Passenger Insight: Affordable Universal Transit
Passengers aren't just office workers—they are **students, shoppers, freelancers, and daily commuters** who just need to travel from Point A to Point B.

Instead of paying ₹140+ for an auto or booking an expensive single taxi:
* The passenger is happy to **walk 100 meters to the nearest main road bus shelter** for pickup and drop.
* In return, they get a direct co-ride along the corridor for a fraction of the cost (**₹35 to ₹45**).

---

## 2. Platform Retention Rationale: Why Users Don't Go Offline

A common concern with recurring commute matching (Mon–Fri Pass) is disintermediation: *"Will the host and rider negotiate offline to save money?"*

Rapido RidePool prevents offline leakage through **Micro-Pricing Psychology & Safety Lock-In**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              WHY USERS STAY ON-PLATFORM (ANTI-LEAKAGE ENGINE)               │
└─────────────────────────────────────────────────────────────────────────────┘
  1. Micro-Pricing vs Ego Barrier ➔ Daily fare is so low (₹35–₹52/ride) that
                                    bargaining offline over ₹5 or ₹10 creates social
                                    awkwardness ("₹5 ke liye offline negotiate karunga
                                    kya? App se hi kar leta hoon, smooth hai!").

  2. Rapido Safety & Insurance    ➔ Offline rides forfeit ₹5 Lakh Rapido Shield
                                    insurance, live GPS tracking & emergency SOS.

  3. Automated UPI Settlement     ➔ No daily cash/change hassle; automated payout
                                    directly to Host's UPI wallet.

  4. Backup SLA Guarantee         ➔ If Host gets sick or delayed on Wednesday,
                                    Rapido automatically covers a replacement ride
                                    at ZERO extra charge. Offline rides leave the
                                    passenger stranded.
```

---

## 3. Product Decision & Parameter Matrix

| Feature / Parameter | Why It Exists & Problem Solved |
| :--- | :--- |
| **Universal Point A-to-B Matching** | Works for anyone traveling anywhere (work, college, gym, market). Passenger walks 100m to main road shelter for a ₹40 direct co-ride. |
| **5 km to 30 km Range** | • Under 5 km ➔ Served by regular bike taxi/walking.<br>• 5 to 30 km ➔ The Goldilocks commute zone (high petrol burn, high traffic).<br>• Over 30 km ➔ Intercity highway behavior requiring advance scheduling (≥1h) & price sliders. |
| **Automated City Pricing** | System auto-calculates fair fuel split (`₹15 base + ₹3.40/km + ₹5 safety fee`). Prevents surge, price gouging & ensures Motor Vehicles carpool compliance. |
| **Dynamic Highway Slider** | Intercity travel (>30 km) varies by bike model, tolls & halts. Host requires price flexibility within bounded fair guardrails (e.g. ₹260–₹520). |
| **Zero-Detour Main Pickups** | Personal bike owners WILL NOT enter narrow lanes. Pickup pins snap to main road bus shelters (100m walk). |
| **5-Minute Hosting Timer** | Host cannot wait indefinitely. If no match in 5 mins, timer ends with zero penalty so host rides solo. |

---

## 4. Product Offerings & Persona Architecture

```
                                  ┌─────────────────────────────┐
                                  │      RAPIDO RIDEPOOL        │
                                  └──────────────┬──────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
┌──────────────────────────────────────┐                     ┌──────────────────────────────────────┐
│  PERSONA A: FILLING THE SEAT         │                     │  PERSONA B: OFFERING THE SEAT        │
│  (Passenger / Universal Need a Ride) │                     │  (Host / Have a Bike)                 │
├──────────────────────────────────────┤                     ├──────────────────────────────────────┤
│ • Auto-Detect Distance Engine        │                     │ • 1-Min Onboarding (Bike/Scooter,    │
│   - Inside City: 5 – 30 km pool      │                     │   Plate #, DigiLocker DL Check)      │
│   - Highway: > 30 km intercity       │                     │ • Auto-Detect Distance Engine        │
│ • 🌸 Pink Pool (Women Only) Filter   │                     │   - Inside City: Auto fuel fare      │
│ • 🔁 Mon–Fri Recurring Commute Pass  │                     │     + 5-min live hosting timer       │
│ • Direct Corridor Landmark Pickup    │                     │   - Highway: Schedule 1h+ in advance │
│ • Rapido Safety Shield (Dual Helmet) │                     │     + custom price slider            │
└──────────────────────────────────────┘                     └──────────────────────────────────────┘
```

### 4.1 Persona A: Filling the Seat (Passenger Flow)
* **Universal Landmark Autocomplete:** Passengers enter pickup & drop via landmark autocomplete (*Vijay Nagar, Palasia, Bhawarkua, Rajwada, Bhopal ISBT*). Route distance ($\le 30$ km city vs $>30$ km highway) auto-detects and updates Leaflet map polyline routes.
* **🌸 Pink Pool Community:** Female commuters can toggle the Pink Pool filter to match exclusively with verified women hosts (*Priya Verma, Ananya K.*) featuring custom pink trust badges and DigiLocker Govt ID checks.
* **🔁 Mon–Fri Commute Pass:** Auto-pairs passenger with preferred host every weekday morning (15% discount), retained on-platform via Backup SLA & zero-cash convenience.

### 4.2 Persona B: Offering the Seat (Commuter Host Flow)
* **1-Minute Host Onboarding:** 2-step setup collecting vehicle type (🏍️ Motorcycle vs 🛵 Scooter), model, registration plate (`MP 09 AB 7842`), and auto DigiLocker DL verification (`DL-092021008742`).
* **Auto Fuel Pricing in City:** System calculates exact fuel offset (e.g. **₹52.00** for 8.2 km), transferred directly to UPI wallet.
* **Start OTP (`7842`) & Telemetry HUD:** PIN verification ensures correct rider boarding. Speedometer HUD (38–44 km/h) reassures passenger safety.

---

## 5. User Personas & Real-World Use Cases

### Persona 1: The Daily Bike Host (Rahul Sharma, 28)
* **Profile:** Rides a Royal Enfield Hunter 350 from Mahalaxmi Nagar to Scheme 54 (8.2 km).
* **Pain Point:** Spends ₹3,500/month on petrol; refuses to be a full-time driver or take detours.
* **RidePool Solution:** Onboards in 1 min, sets route, starts 5-min timer, picks up co-rider at bus shelter, earns ₹52, and offsets petrol expenses without changing his routine.

### Persona 2: The Universal Passenger (Ananya K., 24)
* **Profile:** Daily commuter (8.2 km corridor).
* **Pain Point:** Auto fares surge to ₹160+; cab cancellations.
* **RidePool Solution:** Walks 100m to bus shelter, enables **Pink Pool**, matches with verified female host Priya Verma for ₹43, and locks a Mon–Fri Pass.

### Persona 3: The Highway Co-Traveler (Vikram Joshi, 31)
* **Profile:** Traveling from Indore to Bhopal (195 km).
* **Pain Point:** Intercity bus takes 4.5 hours; private cabs cost ₹2,800+.
* **RidePool Solution:** Books a seat on a highway ride for ₹360, shares travel costs, and arrives in 3.5 hours.
