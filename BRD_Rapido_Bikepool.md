# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Project Overview:** Formalizing Organic Commuter Two-Wheeler Sharing into a Dedicated P2P Feature  
**Document Version:** 2.2 (Updated to Match Full Live Web App UX)  
**Author:** Senior Product Manager  

---

## 1. Executive Summary: The Ground Reality & Organic Commuter Loophole

### What is Happening on the Ground Today?
Every day across major Indian cities (Bengaluru, Hyderabad, Pune, Delhi-NCR, Indore), thousands of two-wheeler owners commute from home to work, college, or marketplaces while spending over ₹3,500/month on petrol (₹100+/L).

To offset this daily expense, an increasing number of everyday two-wheeler owners are **onboarding onto the Rapido rider/Captain app**.

However, they are **not full-time commercial drivers**:
* When a bike owner travels from **Vijay Nagar to Palasia** (or *Sector R to Scheme 54*), they turn on the rider app **solely to find a co-traveler heading in their exact same direction**.
* They reject all off-route commercial rides, call passengers asking *"Where are you going?"*, and only accept the co-partner whose destination matches where they themselves are going.
* By doing this, the bike owner shares their empty pillion seat with a co-rider going the same way, reaches their own destination on schedule, and collects money to cover **70% to 100% of their daily petrol cost**.

### The Product Opportunity
Instead of forcing everyday commuters into a commercial taxi driver flow (which causes friction, cancellations, and awkward phone calls), Rapido can launch a dedicated **Peer-to-Peer RidePool & Highway Sharing Feature** directly inside the primary app where any commuter heading somewhere can easily share or host a ride.

---

## 2. Problem Statement & User Friction

| User Type | Friction on Current App | Real-World Impact |
| :--- | :--- | :--- |
| **Bike Owner (Commuter Host)**<br>*(Any daily commuter with a bike)* | • Forced into a commercial taxi workflow.<br>• Algorithm sends rides with 3 km detours.<br>• Lower acceptance score when rejecting off-route commercial rides. | Frustration, repeated cancellations, and awkward phone calls asking *"Bhaiya, kahan jana hai?"*. |
| **Passenger (Co-Rider)**<br>*(Anyone looking for a direct ride)* | • Suffers sudden ride cancellations when the rider realizes the route doesn't match.<br>• High auto/cab peak-hour surge fares (₹160–₹300). | Unpredictable daily commute; paying expensive commercial taxi surge rates for standard ₹40 corridor trips. |

---

## 3. Product Offerings & Live Web App Capabilities

Any person with a two-wheeler can host a ride, and any person needing a ride can share a ride.

```
                                  ┌─────────────────────────────┐
                                  │      RAPIDO RIDEPOOL        │
                                  └──────────────┬──────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
┌──────────────────────────────────────┐                     ┌──────────────────────────────────────┐
│        1. SHARE A RIDE (PASSENGER)   │                     │          2. HOST A RIDE (HOST)       │
│ • Interactive landmark autocomplete  │                     │ • 1-Minute Host Onboarding (Bike/     │
│ • Auto-distance detection:           │                     │   Scooter, Plate #, DigiLocker DL)   │
│   - Inside City: 5 – 30 km pool      │                     │ • Choose travel mode:                │
│   - Highway: > 30 km intercity       │                     │   A. Inside City (5–30 km)           │
│ • Verified co-riders & reviews       │                     │      Auto fuel fare + 5-min timer     │
│ • Rapido Safety Shield (Dual Helmet) │                     │   B. City-to-City Highway            │
│ • Live In-Trip HUD & Speedometer     │                     │      Schedule 1h+ & price slider     │
└──────────────────────────────────────┘                     └──────────────────────────────────────┘
```

### Offering 1: "Share a Ride" (Passenger Flow)
* **Interactive Location Autocomplete:** Live landmark dropdown (*Mahalaxmi Nagar, Vijay Nagar Square, Scheme 54, Palasia, Bhawarkua, Rajwada, Bhopal ISBT, Ujjain Bypass*) that dynamically recalculates distance, updates Leaflet map polyline routes, and adjusts fare math.
* **Intelligent Auto-Distance Routing:** Auto-detects **Inside City (5–30 km)** vs **Highway Intercity (>30 km)** upon landmark selection.
* **Corridor Host Discovery:** Displays verified hosts already riding along that path with bike model, ratings, trust badges, and passenger reviews.
* **Rapido Safety Shield:** Mandatory dual ISI helmet prompt and verified identity check before booking.
* **Live In-Trip HUD & Speedometer:** Real-time motorcycle tracking on map, dynamic speed readout (38–44 km/h), and emergency SOS support.

### Offering 2: "Host a Ride" (Two-Wheeler Owner / Any Commuter)
* **1-Minute Frictionless Host Onboarding:** 2-step setup selecting vehicle type (🏍️ Motorcycle vs 🛵 Scooter), brand/model, registration plate (`MP 09 AB 7842`), DigiLocker DL auto-verification (`DL-092021008742`), and spare ISI helmet declaration.
* **Mode A: Inside City Commute (5 km to 30 km):**
  * Host enters start and destination → System calculates fair fuel-split compensation (e.g., **₹52.00** for 8.2 km).
  * Host activates a **5-minute live matching countdown timer**.
  * Nearby commuters match along the corridor → Host accepts co-rider → navigates to bus stop → verifies 4-digit Start OTP → completes commute → receives direct wallet payout.
* **Mode B: City-to-City Highway (>30 km):**
  * Scheduled **≥1 hour in advance** for long-distance highway travel (e.g., Indore to Bhopal, 195 km).
  * Host sets price per seat via dynamic slider (Min ₹260, Suggested ₹360, Max ₹520).
  * Host declares spare helmet, luggage allowance (<7 kg backpack), and planned refreshment halts.

### Offering 3: Rapido SafeDial Calling Simulator
* Masked number calling overlay (*"Rapido SafeDial · Number Masked"*) with live call status timer, working Mute and Speaker toggles, and End Call control.

---

## 4. User Personas & Real-World Use Cases

### Persona 1: The Commuter Host (Rahul Sharma, 28)
* **Profile:** Everyday commuter riding a Royal Enfield Hunter 350 from Mahalaxmi Nagar to Scheme 54 (8.2 km).
* **Pain Point:** Spends ₹3,500/month on petrol; does not want to do full-time commercial driving.
* **RidePool Experience:** Completes 1-minute onboarding, sets his route, starts the 5-minute timer, picks up a co-rider at the bus stop, earns ₹52, and offsets his petrol costs without changing his schedule.

### Persona 2: The Daily Commuter Passenger (Ananya K., 24)
* **Profile:** Daily commuter traveling from Vijay Nagar to Scheme 54 (8 km).
* **Pain Point:** Daily auto fares surge to ₹160+; commercial cabs cancel frequently.
* **RidePool Experience:** Opens Rapido, selects drop location via location autocomplete, sees matching hosts heading her way with 4.9⭐ reviews, books for ₹43, meets at the bus stop, wears provided helmet, and reaches in 12 minutes.

### Persona 3: The Highway Co-Traveler (Vikram Joshi, 31)
* **Profile:** Traveling from Indore to Bhopal (195 km).
* **Pain Point:** Bus takes 4.5 hours; private cabs cost ₹2,800+.
* **RidePool Experience:** Books a seat on a verified Royal Enfield Himalayan highway ride for ₹360, shares highway travel expenses with a fellow commuter, and reaches comfortably in 3.5 hours.
