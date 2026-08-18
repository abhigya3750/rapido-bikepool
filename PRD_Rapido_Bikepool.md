# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Product Name:** Rapido RidePool (City Commute & Highway RideShare)  
**Document Version:** 2.0 (Production & Leadership Ready)  
**Author:** Senior Product Manager & UX Lead  
**Target Release:** Primary Rapido Consumer App (iOS & Android)  

---

## 1. Product Goals & Core Value Proposition

Rapido RidePool formalizes organic commuter behavior into an intuitive, zero-detour peer-to-peer bike sharing platform:
1. **For Two-Wheeler Owners (Hosts):** Offset 70% to 100% of daily fuel expenses by sharing their empty pillion seat along their existing work route.
2. **For Daily Commuters (Passengers):** Enjoy 50% cheaper, direct, surge-free corridor transit with corporate-verified co-riders.
3. **For Rapido (Platform):** Monetize a massive new commuter market with zero vehicle acquisition costs and high organic retention.

---

## 2. Complete User Flows & Screen Specifications

```
                                  ┌─────────────────────────────┐
                                  │      RAPIDO HOME SCREEN     │
                                  │    • "Where are you going?" │
                                  │    • Share vs Host Cards    │
                                  └──────────────┬──────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
┌──────────────────────────────────────┐                     ┌──────────────────────────────────────┐
│       FLOW 1: SHARE A RIDE           │                     │        FLOW 2: HOST A RIDE           │
│      (Passenger / Co-Rider)          │                     │     (Two-Wheeler Owner / Rider)      │
└──────────────────┬───────────────────┘                     └──────────────────┬───────────────────┘
                   │                                                            │
                   ├────────────────────────────────┐                           ├───────────────────────────────┐
                   ▼                                ▼                           ▼                               ▼
       ┌───────────────────────┐        ┌───────────────────────┐   ┌───────────────────────┐       ┌───────────────────────┐
       │ 1A. Inside City Pool  │        │ 1B. Highway RideShare │   │ 2A. Inside City Host  │       │ 2B. Highway Host      │
       │     (5 – 30 km)       │        │     (> 30 km)         │   │     (5 – 30 km)       │       │     (> 30 km)         │
       └───────────┬───────────┘        └───────────┬───────────┘   └───────────┬───────────┘       └───────────┬───────────┘
                   │                                │                           │                               │
                   ▼                                ▼                           ▼                               ▼
       ┌───────────────────────┐        ┌───────────────────────┐   ┌───────────────────────┐       ┌───────────────────────┐
       │ • Pickup Check Pin    │        │ • Intercity Hub Pin   │   │ • Route & Dist Check  │       │ • Schedule (1h+ rule) │
       │ • Matching Hosts List │        │ • Scheduled Feed      │   │ • Auto Fare (₹52.00)  │       │ • Dynamic Price Slider│
       │ • Safety Shield Modal │        │ • Seat Reservation    │   │ • 5-Min Hosting Timer │       │ • Helmet & Luggage    │
       │ • Start OTP (7842)    │        │ • Voucher Receipt     │   │ • Pickup Nav to Bus   │       │ • Live Highway Dash   │
       │ • Live In-Trip HUD    │        │ • Highway In-Trip HUD │   │ • OTP Verify Keypad   │       │ • Co-Traveler Accept  │
       │ • Review & Star Rate  │        │ • Highway Rating      │   │ • Host In-Trip HUD    │       │                       │
       └───────────────────────┘        └───────────────────────┘   │ • ₹52 Wallet Payout   │       │                       │
                                                                    │ • Rate Passenger ⭐   │       │                       │
                                                                    └───────────────────────┘       └───────────────────────┘
```

---

## 3. Screen-by-Screen Specifications & Wireframes

### Screen 0: Rapido Home Screen (`sheet-home`)
* **Search Trigger:** Large search bar with *"Where are you going?"* and prompt *"Search drop location, tech parks, or intercity hubs"*.
* **Hero Commute Section:** Two primary cards:
  * 🛵 **"Share a Ride"** (*Need a Ride · Auto-matches City (5-30km) or Highway (>30km) · Save up to 60%*)
  * 🏍️ **"Host a Ride"** (*Have a Bike · Riding alone? Share your pillion seat & split daily petrol*)
* **Standard Services Fleet:** Quick tiles for Bike Taxi, Auto, Cab, and Parcel.
* **Recent Commutes:** Instant shortcuts for *Mahalaxmi Nagar $\to$ Scheme 54* and *Indore $\to$ Bhopal*.

---

### Flow 1: Passenger "Share a Ride" (Unified City & Highway)

#### Step 1A: Search Route & Auto-Distance Detector (`sheet-passenger-search`)
* User enters pickup and drop points (or toggles quick presets: *Inside City 8.2 km* vs *Highway 195 km*).
* **System Logic:**
  * If $\text{Distance} \le 30\text{ km} \to$ Automatically categorizes as **Inside City Commute Pool**.
  * If $\text{Distance} > 30\text{ km} \to$ Automatically categorizes as **Highway Intercity RideShare**.

```
+-------------------------------------------------------+
|  Share a Ride                   [ INSIDE CITY 8.2 KM ]|
|                                                       |
|  (o) 722, Sector R, Mahalaxmi Nagar, Indore           |
|   |                                                   |
|  (*) Savitri Empire, Scheme No 54, Indore             |
|                                                       |
|  [ 📍 Inside City (8.2 km) ]  [ 🛣️ Highway (195 km) ]  |
|                                                       |
|  [ Next: Check Pickup Point ➔                       ] |
+-------------------------------------------------------+
```

#### Step 1B: Check Pickup Point (`sheet-passenger-pickup`)
* Fullscreen interactive map centers on green **`Pickup Point` speech bubble marker**.
* Card displays exact verified address and landmark meetup point.
* Primary CTA: **"Confirm pickup & See Matching Hosts"**.

#### Step 1C: Matching Hosts Discovery List (`sheet-passenger-discovery`)
* **City Commute Cards ($\le 30$ km):** Displays matching hosts departing within 5–10 mins (e.g. *Rahul Sharma ⭐4.9, Infosys verified, Royal Enfield Hunter 350, ₹43*).
* **Highway Cards ($>30$ km):** Displays scheduled highway rides with date, departure time, bike model (Himalayan 450), price per seat (₹360), and luggage limits.
* **Interactive Actions:**
  * **"👤 View Profile & Reviews":** Opens bottom sheet showing corporate badge, vehicle details, star rating, and recent passenger comments.
  * **"Choose Rider · ₹43":** Triggers Rapido Safety Shield.

#### Step 1D: Rapido Safety Shield Modal (`modal-safety-check`)
* Verification checklist:
  1. *Mandatory Dual Helmet:* Host provides sanitized ISI-certified helmet.
  2. *Corporate Verification:* Co-rider verified via corporate email + DigiLocker Govt ID.
  3. *Zero Detour Guarantee:* Meeting along direct corridor.
* CTA: **"I Agree & Confirm Booking"**.

#### Step 1E: Waiting & Ride Confirmed Screen (`sheet-passenger-waiting`)
* Progress bar $\to$ Confirmed state with **4-Digit Start OTP: `7842`**.
* Communication buttons: **"💬 Chat with Host"** (with pre-built quick reply chips) and **"📞 Call Host"**.
* Dynamic Fare breakdown tooltip (Base fuel share ₹38 + Platform fee ₹5 = Total ₹43).
* Primary CTA: **"Start Ride Navigation"**.

#### Step 1F: Active Passenger In-Trip HUD (`sheet-in-trip`)
* Displays live pulsing green status (*"RIDE IN PROGRESS"*).
* Live trip timer (`00:01`, `00:02`...).
* **Live Speedometer (`38–44 km/h`)** and remaining distance countdown (`8.2 km` $\to$ `0 km`).
* Live motorcycle pin moving along the corridor polyline on the map.
* Action buttons: **"✓ Arrived at Destination (Complete Ride)"** and **"🚨 Emergency SOS"**.

#### Step 1G: Post-Trip Summary & Host Rating Screen (`sheet-ride-completed`)
* Green checkmark hero + *"Ride Completed!"*.
* Transparent fare receipt breakdown.
* Interactive 5-star rating selector with dynamic description label (*Poor $\to$ Fair $\to$ Good $\to$ Excellent*).
* Compliment chips: *🏍️ Smooth Riding*, *⏰ On Time*, *🪖 Clean Helmet*, *💬 Friendly*.
* Optional written review textarea + **"Submit Review & Return to Home"**.

---

### Flow 2: Host Flow A — Inside the City (5–30 km)

#### Step 2A: Route Calculation & 5–30 km Validation (`sheet-host-city-setup`)
* Host enters Start and Office destination.
* Clicks **"📍 Calculate Route & Distance"**.
* System validates range:
  * If $<5$ km $\to$ Blocked (*"Minimum 5 km required for commute pooling"*).
  * If $>30$ km $\to$ Blocked (*"Exceeds 30 km. Please switch to City-to-City Highway mode"*).
  * If $5\text{ km} \le D \le 30\text{ km} \to$ Unlocks calculated fare: **`₹52.00`** (direct wallet credit) and fuel offset badge (*⚡ Offsets ~70% Fuel*).
* Host selects spare helmet and Pink Pool preferences $\to$ taps **"Start 5-Min Hosting Timer ⏱️"**.

#### Step 2B: Live 5-Minute Matching Radar (`sheet-host-city-timer`)
* Animated circular radial timer counting down from `05:00` to `00:00`.
* Active radar pulse on map.
* At 3 seconds, simulated match arrives:
  * Card: *"Ananya K. (⭐ 4.9 · TCS) waiting at Vijay Nagar Bus Stop (120m away)"*.
* Host taps **"Accept & Pick Up"**.

#### Step 2C: Host Pickup Navigation (`sheet-host-pickup-nav`)
* Map draws navigation route directly to passenger's pickup location.
* Banner: *"Head to Vijay Nagar Bus Stop (120m away) · ETA ~2 mins"*.
* Host communication tools: Chat with Ananya / Call Passenger.
* Host taps **"I Have Arrived at Pickup Point ➔"**.

#### Step 2D: Start OTP Verification Screen (`sheet-host-otp-verify`)
* Screen prompts: *"Ask passenger for 4-digit Start OTP"*.
* 4-Box PIN entry with quick-fill hint `7842`.
* Host taps **"Verify OTP & Start Commute 🏍️"**.

```
+-------------------------------------------------------+
|  [ 🔒 ] Ask Passenger for Start OTP                   |
|  Ask Ananya for the 4-digit code on her app           |
|                                                       |
|        [ 7 ]    [ 8 ]    [ 4 ]    [ 2 ]               |
|                                                       |
|  💡 Hint: Passenger's OTP is 7842                     |
|                                                       |
|  [ Verify OTP & Start Commute 🏍️                    ] |
+-------------------------------------------------------+
```

#### Step 2E: Host Active In-Trip HUD (`sheet-host-in-trip`)
* Displays passenger on pillion (*"Ananya K. · Destination: Savitri Empire"*).
* Live speedometer (`42 km/h`), distance remaining (`7.8 km`), and payout due (**₹52.00**).
* Host taps **"✓ Reached Destination (End Commute)"**.

#### Step 2F: Host Settlement & Passenger Rating Screen (`sheet-host-completed`)
* Hero display: **"₹52.00 Earned!"** (*Credited directly to Rapido Wallet / UPI*).
* Receipt shows **₹0.00 Rapido Take-Rate** on fuel-split.
* 5-Star rating for co-rider Ananya + compliment chips (*⏰ On Time at Spot*, *🪖 Wore Helmet*, *🤝 Polite*).
* CTA: **"Done & Return to Home"**.

---

### Flow 3: Host Flow B — City to City (Intercity Highway)

#### Step 3A: Highway Scheduler & Custom Price Slider (`sheet-host-intercity-setup`)
* Host selects origin & destination city (e.g. *Indore $\to$ Bhopal*).
* System calculates 195 km highway distance.
* Host selects date & time ($\ge 1\text{ hr}$ advance rule).
* **Dynamic Price Slider:** Bounded between Min ₹260, Suggested ₹360, and Max ₹520.
* Host checks spare helmet, 1-backpack luggage limit, and declares planned highway refreshment halt.
* Host taps **"Publish City-to-City Trip 🚀"**.

#### Step 3B: Active Highway Listing Dashboard (`sheet-host-intercity-dashboard`)
* Displays live trip summary card (*Indore $\to$ Bhopal · Tomorrow 07:30 AM · ₹360/seat*).
* Displays co-traveler request queue: *Vikram Joshi (⭐4.9 · Wipro)*.
* Host taps **"Accept Co-Traveler"** $\to$ generates booking voucher and schedules departure.

---

## 4. Technical Business Logic & Pricing Formulas

### A. Inside-City Commute Pricing Formula
$$ \text{Host Fuel Split Payout} = \text{Round}\left(15 + (\text{Distance in km} \times 4.50)\right) $$
$$ \text{Passenger Total Fare} = \text{Round}\left(15 + (\text{Distance in km} \times 3.40)\right) + 5.00 \text{ (Platform Fee)} $$

### B. Distance Constraint Rules
* **Minimum Distance for Commute Pooling:** $5.0\text{ km}$ (prevents hyper-local walking cannibalization).
* **Maximum Distance for Inside-City Pool:** $30.0\text{ km}$ (routes $>30$ km automatically transition to Highway Mode).

### C. Zero-Surge Policy
Commute pooling fares are mathematically pegged to fuel cost recovery and remain strictly immune to rain, peak-hour, or traffic surge pricing.

---

## 5. Non-Functional Requirements & UX Ergonomics

1. **Responsive Viewport Adaptation:** The application renders with `100dvh` dynamic height and `env(safe-area-inset)` padding on all mobile operating systems, and centers neatly on desktop browsers.
2. **Touch Targets:** All primary buttons maintain $\ge 48\text{px}$ height with high-contrast Rapido Golden Yellow (`#FFC400`) and Dark Slate (`#0F172A`) palettes.
3. **Map Performance:** Leaflet.js with CartoDB Voyager vector tiles for lightweight $<100\text{ms}$ pan/zoom response.
4. **State Machine Integrity:** Clean history stack navigation ensuring the hardware back button or map back pin gracefully returns to the previous step without broken states.

---

*End of PRD Document. Approved for Engineering Handoff & Stakeholder Review.*
