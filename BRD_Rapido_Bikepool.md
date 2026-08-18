# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Project Overview:** Formalizing Organic Commuter Bike-Sharing into a Dedicated P2P Commute Platform  
**Document Version:** 2.1 (Streamlined Product & User Focus)  
**Author:** Senior Product Manager  

---

## 1. Executive Summary: The Ground Reality & Organic Commuter Loophole

### What is Happening on the Ground Today?
Every day across major Indian cities (Bengaluru, Hyderabad, Pune, Delhi-NCR, Indore), thousands of two-wheeler owners commute from one place to another (e.g. home to college, office, or marketplace) while spending significant money on daily petrol (₹100+/L).

To offset this daily commute cost, an increasing number of regular two-wheeler owners are **onboarding themselves onto the Rapido Captain/Rider app**.

However, they are **not full-time commercial drivers**:
* When a bike owner travels from **Vijay Nagar to Palasia** (or *Sector R to Scheme 54*), they turn on the rider app **solely to find a co-traveler heading in their exact same direction**.
* They reject all other rides, call passengers asking *"Where are you going?"*, and only accept the co-partner whose destination matches where they themselves are going.
* By doing this, the bike owner shares their empty pillion seat with a stranger going the same way, reaches their own destination on schedule, and collects money to cover **70% to 100% of their daily petrol cost**.

### The Product Opportunity
Instead of forcing everyday commuters into a commercial taxi driver flow (which causes friction, high cancellations, and phone calls), Rapido can launch a dedicated **Peer-to-Peer RidePool & Highway Sharing Feature** directly inside the app where any commuter heading somewhere can easily share or host a ride.

---

## 2. Problem Statement & User Friction

| User Type | Friction on Current App | Real-World Impact |
| :--- | :--- | :--- |
| **Bike Owner (Commuter Host)**<br>*(Any daily commuter with a two-wheeler)* | • Forced into a commercial taxi workflow.<br>• Algorithm sends rides with 3 km detours.<br>• Lower acceptance score when rejecting off-route commercial rides. | Frustration, repeated cancellations, and awkward phone calls asking *"Bhaiya, kahan jana hai?"*. |
| **Passenger (Co-Rider)**<br>*(Anyone looking for an affordable direct ride)* | • Suffers sudden ride cancellations when the rider realizes the route doesn't match.<br>• High auto/cab peak-hour surge fares (₹160–₹300). | Unpredictable daily commute; paying expensive commercial taxi surge rates for standard ₹40 corridor trips. |

---

## 3. The Two Core Product Offerings

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
│ • Unified flow with auto-distance    │                     │ • Any two-wheeler owner heading in   │
│   detection:                         │                     │   that direction can offer seat:     │
│   - Inside City: 5 – 30 km pool      │                     │   A. Inside City (5–30 km)           │
│   - Highway: > 30 km intercity       │                     │      Auto fare + 5-min timer         │
│ • Verified co-riders & reviews       │                     │   B. City-to-City Highway            │
│ • Direct corridor landmark pickup    │                     │      Schedule 1h+ & custom price     │
└──────────────────────────────────────┘                     └──────────────────────────────────────┘
```

### Offering 1: "Share a Ride" (Passenger)
* **Intelligent Auto-Distance Detection:** The user enters their pickup and destination. The system automatically detects whether the route is **Inside City (5–30 km)** or **Highway Intercity (>30 km)**.
* **Corridor Discovery:** Displays verified hosts already riding along that path with bike model, ratings, trust badges, and passenger reviews.
* **Safety Shield:** Mandatory dual ISI helmet prompt and verified identity check before booking.
* **Live In-Trip HUD & Speedometer:** Real-time motorcycle tracking on map, dynamic speed readout (38–44 km/h), and emergency SOS support.

### Offering 2: "Host a Ride" (Two-Wheeler Owner / Any Commuter)
* **Mode A: Inside City (5 km to 30 km):**
  * Host enters start and destination.
  * System calculates fair fuel-split compensation (e.g., **₹52.00** for 8.2 km).
  * Host activates a **5-minute live matching countdown timer**.
  * Nearby commuters match along the corridor → Host accepts co-rider → navigates to bus stop → verifies 4-digit Start OTP → completes commute → receives direct wallet payout.
* **Mode B: City-to-City Highway (>30 km):**
  * Scheduled **≥1 hour in advance** for long-distance highway travel (e.g., Indore to Bhopal, 195 km).
  * Host sets price per seat via a dynamic slider (Min ₹260, Suggested ₹360, Max ₹520).
  * Host declares spare helmet, luggage allowance (<7 kg backpack), and planned refreshment halts.

---

## 4. User Personas & Real-World Use Cases

### Persona 1: The Commuter Host (Rahul Sharma, 28)
* **Profile:** Everyday commuter riding a Royal Enfield Hunter 350 from Mahalaxmi Nagar to Scheme 54 (8.2 km).
* **Pain Point:** Spends ₹3,500/month on petrol; does not want to do full-time commercial driving.
* **RidePool Experience:** Sets his route, starts the 5-minute timer, picks up a co-rider at the bus stop, earns ₹52, and offsets his petrol costs without changing his schedule.

### Persona 2: The Daily Commuter Passenger (Ananya K., 24)
* **Profile:** Daily commuter traveling from Vijay Nagar to Scheme 54 (8 km).
* **Pain Point:** Daily auto fares surge to ₹160+; commercial cabs cancel frequently.
* **RidePool Experience:** Opens Rapido, taps *"Share a Ride"*, sees matching hosts heading her way with 4.9⭐ reviews, books for ₹43, meets at the bus stop, wears provided helmet, and reaches in 12 minutes.

### Persona 3: The Highway Co-Traveler (Vikram Joshi, 31)
* **Profile:** Traveling from Indore to Bhopal (195 km).
* **Pain Point:** Bus takes 4.5 hours; private cabs cost ₹2,800+.
* **RidePool Experience:** Books a seat on a verified Royal Enfield Himalayan highway ride for ₹360, shares highway travel expenses with a fellow commuter, and reaches comfortably in 3.5 hours.
