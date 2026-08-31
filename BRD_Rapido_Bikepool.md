# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Project Overview:** Formalizing Organic Commuter Two-Wheeler Sharing into a Dedicated P2P Commute Platform  
**Document Version:** 2.3 (Updated with Pink Pool, Recurring Matcher & Clean 2-Persona Architecture)  
**Author:** Abhigya Kanungo  

---

## 1. Executive Summary: The Ground Reality & Organic Commuter Loophole

### What is Happening on the Ground Today?
Every day across major Indian cities (Bengaluru, Hyderabad, Pune, Delhi-NCR, Indore), thousands of two-wheeler owners commute from home to work, college, or market hubs while spending over ₹3,500/month on petrol (₹100+/L).

To offset this daily commute expense, an increasing number of regular two-wheeler owners are **onboarding themselves onto the Rapido rider/Captain app**.

However, they are **not full-time commercial drivers**:
* When a bike owner travels a routine route (e.g. *Vijay Nagar to Palasia* or *Sector R to Scheme 54*), they turn on the rider app **solely to find a co-traveler heading in their exact same direction**.
* They reject all other off-route rides, often calling passengers to ask destination details to ensure it matches their own path.
* By doing this, the bike owner shares their empty pillion seat with a co-rider going the same way, reaching their own destination on schedule while covering 70% to 100% of their daily petrol cost.

### The Product Opportunity
Instead of forcing everyday commuters into a commercial taxi driver flow, Rapido can launch a dedicated **Peer-to-Peer RidePool & Highway Sharing Feature** directly inside the app where any commuter heading somewhere can easily share or host a ride.

---

## 2. Problem Statement & User Friction

| User Type | Friction on Current App | Real-World Impact |
| :--- | :--- | :--- |
| **Bike Owner (Commuter Host)**<br>*(Any daily commuter with a bike)* | • Forced into a commercial taxi workflow.<br>• Algorithm sends rides with 3 km detours.<br>• Lower acceptance score when rejecting off-route rides. | Frustration, repeated cancellations, and awkward phone calls asking *"Bhaiya, kahan jana hai?"*. |
| **Passenger (Co-Rider)**<br>*(Anyone looking for a direct ride)* | • Suffers sudden ride cancellations when the rider realizes the route doesn't match.<br>• High auto/cab peak-hour surge fares (₹160–₹300). | Unpredictable daily commute; paying expensive commercial taxi surge rates for standard ₹40 corridor trips. |

---

## 3. The Two Core Product Offerings & 2-Persona Architecture

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
│ • Auto-Detect Distance:              │                     │ • 1-Min Onboarding (Bike/Scooter,    │
│   - Inside City: 5 – 30 km pool      │                     │   Plate #, DigiLocker DL Check)      │
│   - Highway: > 30 km intercity       │                     │ • Auto-Detect Distance:              │
│ • 🌸 Pink Pool (Women Only) Filter   │                     │   - Inside City: Auto fuel fare      │
│ • 🔁 Mon–Fri Recurring Commute Pass  │                     │     + 5-min live hosting timer       │
│ • Direct Corridor Landmark Pickup    │                     │   - Highway: Schedule 1h+ in advance │
│ • Rapido Safety Shield (Dual Helmet) │                     │     + custom price slider            │
└──────────────────────────────────────┘                     └──────────────────────────────────────┘
```

### Core Product Capabilities:

1. **Intelligent Auto-Distance Detection:**
   * Both Personas (Passenger & Host) enter their starting point and destination.
   * System automatically detects whether the route is **Inside City (5–30 km)** or **Highway Intercity (>30 km)** without forcing disjointed upfront modes.

2. **🌸 Pink Pool Community (Women-Only Verified Commuting):**
   * Female commuters can toggle the Pink Pool filter to match exclusively with verified women hosts (*Priya Verma, Ananya K.*) featuring custom pink trust badges and DigiLocker Govt ID checks.

3. **🔁 Recurring Commute Matcher (Mon–Fri Commute Pass):**
   * Pairs daily commuters traveling the same route every morning (e.g. 08:30 AM) with a Mon–Fri Recurring Pass, saving 15% on weekly fuel split.

4. **Zero-Detour Landmark Pickups:**
   * Pickups and drops take place at arterial road bus stops and major landmarks (100m walk), ensuring the host never takes a detour off their commute path.

5. **Rapido Safety Shield & Telemetry:**
   * Dual ISI helmet check, 4-digit Start OTP verification, in-app Rapido SafeDial masked calling, live speed monitoring, and bilateral 5-star reviews.

---

## 4. User Personas & Real-World Use Cases

### Persona 1: The Commuter Host (Rahul Sharma, 28)
* **Profile:** Everyday commuter riding a Royal Enfield Hunter 350 from Mahalaxmi Nagar to Scheme 54 (8.2 km route).
* **Pain Point:** Spends ₹3,500/month on petrol; does not want to be a full-time driver.
* **RidePool Experience:** Sets route, starts 5-minute timer, picks up a co-rider at bus stop, earns ₹52, and offsets petrol costs without changing his schedule.

### Persona 2: The Women Commuter (Priya Verma, 25 & Ananya K., 24)
* **Profile:** Daily female office commuters (8 km route).
* **Pain Point:** Auto fares surge to ₹160+; safety concerns on late-evening rides.
* **RidePool Experience:** Enables **Pink Pool**, matches with verified female co-riders, locks a Mon–Fri Commute Pass, and enjoys safe, direct, affordable daily travel.

### Persona 3: The Highway Co-Traveler (Vikram Joshi, 31)
* **Profile:** Traveling from Indore to Bhopal (195 km).
* **Pain Point:** Bus takes 4.5 hours; private cabs cost ₹2,800+.
* **RidePool Experience:** Books a seat on a verified highway ride for ₹360, shares expenses, and reaches comfortably in 3.5 hours.
