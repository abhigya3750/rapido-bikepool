# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Product Name:** Rapido RidePool & Highway  
**Document Version:** 3.0 (Master Executive Rationale & Strategy Edition)  
**Author:** Abhigya Kanungo  

---

## 1. Executive Vision: Why Rapido RidePool?

### 1.1 The Unsolved Ground Reality & Organic Commuter Loophole
Across Indian metropolitan and Tier-1/2 cities (Bengaluru, Hyderabad, Pune, Delhi-NCR, Indore), millions of everyday two-wheeler owners commute daily from home to office, college, or commercial hubs. They spend over **₹3,500/month on petrol** (at ₹100+/L).

To offset this heavy monthly expense, an increasing number of regular two-wheeler owners **onboard onto the Rapido Captain app**. 

However, they are **NOT full-time commercial drivers**:
* When a bike owner commutes along a routine corridor (e.g., *Vijay Nagar to Palasia* or *Sector R to Scheme 54*), they turn on the Captain app **solely to find a co-traveler heading in their exact same direction**.
* They reject off-route commercial rides, frequently calling passengers asking *"Bhaiya, kahan jana hai?"*, and only accept a passenger whose destination lies directly along their commute path.
* By doing this, the bike owner shares their empty pillion seat, reaches their destination on schedule, and collects money to cover **70% to 100% of their daily petrol cost**.

### 1.2 The Core Strategic Opportunity for Rapido
Forcing non-commercial daily commuters into a commercial taxi driver workflow creates high cancellation rates, algorithm friction, and driver dissatisfaction.

By formalizing this organic behavior into **Rapido RidePool & Highway**, Rapido unlocks a massive untapped supply of personal two-wheelers, eliminates commercial yellow-plate regulatory risks, and provides commuters with 50% cheaper, surge-free transit.

---

## 2. Strategic Rationale: "THE WHY" Behind Product Decisions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 PRODUCT DECISION & RATIONALE MATRIX                         │
└─────────────────────────────────────────────────────────────────────────────┘
  Feature / Parameter            Why It Exists & Problem Solved
  ───────────────────            ──────────────────────────────
  1. 5 km to 30 km Range         • Under 5 km ➔ Better served by walking/regular bike.
                                 • 5 to 30 km ➔ The Goldilocks zone for daily office
                                   commuting (high petrol burn, peak traffic).
                                 • Over 30 km ➔ Intercity highway behavior requiring
                                   advance scheduling (≥1h) & price sliders.

  2. Automated City Pricing      • System auto-calculates fair fuel split (₹15 base +
                                   ₹3.40/km + ₹5 safety fee). Prevents surge, price
                                   gouging & ensures Motor Vehicles carpool compliance.

  3. Dynamic Highway Slider      • Intercity travel (>30 km) varies by bike model,
                                   tolls & halts. Host requires price flexibility
                                   within bounded fair guardrails (e.g. ₹260–₹520).

  4. Zero-Detour Main Pickups    • Personal bike owners WILL NOT enter narrow lanes.
                                 • Pickup pins snap to main road bus shelters (100m walk).

  5. 5-Minute Hosting Timer      • Host cannot wait indefinitely. If no match in 5 mins,
                                   timer ends with zero penalty so host rides solo.
```

---

## 3. Product Offerings & Persona Architecture

Any person with a two-wheeler can host a ride (**Offering the Seat**), and any person needing a ride can share a ride (**Filling the Seat**).

```
                                  ┌─────────────────────────────┐
                                  │      RAPIDO RIDEPOOL        │
                                  └──────────────┬──────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
┌──────────────────────────────────────┐                     ┌──────────────────────────────────────┐
│  PERSONA A: FILLING THE SEAT         │                     │  PERSONA B: OFFERING THE SEAT        │
│  (Passenger / Need a Ride)           │                     │  (Host / Have a Bike)                 │
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

### 3.1 Persona A: Filling the Seat (Passenger Flow)
* **Why Search & Location Autocomplete?** Passengers enter pickup & drop via landmark autocomplete (*Vijay Nagar, Palasia, Bhawarkua, Rajwada, Bhopal ISBT*). The system auto-detects route distance ($\le 30$ km city vs $>30$ km highway) and dynamically redraws Leaflet map polyline routes.
* **Why 🌸 Pink Pool?** Female commuters represent 38%+ of transit riders but face safety friction. Toggling Pink Pool filters hosts to verified women commuters (*Priya Verma, Ananya K.*) with pink trust badges.
* **Why 🔁 Mon–Fri Commute Pass?** Eliminates daily booking hassle by auto-pairing the passenger with the same host every weekday at 08:30 AM (15% fuel-split discount).

### 3.2 Persona B: Offering the Seat (Commuter Host Flow)
* **Why 1-Minute Host Onboarding?** Two-step setup collecting vehicle type (🏍️ Motorcycle vs 🛵 Scooter), model, registration plate (`MP 09 AB 7842`), and auto DigiLocker DL verification (`DL-092021008742`). Eliminates complex commercial licensing.
* **Why Auto Fuel Pricing in City?** Eliminates awkward price haggling between everyday office goers.
* **Why Start OTP (`7842`) & Telemetry HUD?** Ensures correct rider boarding before ride start. Dynamic speedometer (38–44 km/h) reassures passenger safety.

---

## 4. User Personas & Real-World Use Cases

### Persona 1: The Commuter Host (Rahul Sharma, 28)
* **Profile:** Everyday IT commuter riding a Royal Enfield Hunter 350 from Mahalaxmi Nagar to Scheme 54 (8.2 km).
* **Pain Point:** Spends ₹3,500/month on petrol; refuses to be a full-time driver or take 3-km detours.
* **RidePool Solution:** Onboards in 1 min, sets route, starts 5-min timer, picks up co-rider at bus shelter, earns ₹52, and offsets petrol expenses without changing his routine.

### Persona 2: The Women Commuter (Ananya K., 24)
* **Profile:** Daily corporate commuter (8.2 km corridor).
* **Pain Point:** Commercial auto fares surge to ₹160+; safety concerns on evening rides.
* **RidePool Solution:** Enables **Pink Pool**, matches with verified female host Priya Verma, locks a Mon–Fri Commute Pass, and enjoys safe, direct, surge-free daily travel.

### Persona 3: The Highway Co-Traveler (Vikram Joshi, 31)
* **Profile:** Traveling from Indore to Bhopal (195 km).
* **Pain Point:** Intercity bus takes 4.5 hours; private cabs cost ₹2,800+.
* **RidePool Solution:** Books a seat on a verified Royal Enfield Himalayan highway ride for ₹360, shares travel costs, and arrives in 3.5 hours.
