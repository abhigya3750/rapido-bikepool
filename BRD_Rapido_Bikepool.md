# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido RidePool: City Commute & Highway Bike-Sharing

**Project Overview:** Formalizing Organic Commuter Ride-Sharing into a Dedicated P2P Commute Platform  
**Document Version:** 2.0 (Updated & Ready for Rapido Leadership)  
**Author:** Senior Product Manager & Product Strategy Lead  
**Target Audience:** Rapido Founders, CPO, VP Product, Head of Operations & Mobility Strategy  

---

## 1. Executive Summary: The Organic Commuter Loophole

### What is Happening on the Ground Today?
In high-density Tier-1 and Tier-2 cities (Bengaluru, Hyderabad, Pune, Delhi-NCR, Indore), thousands of two-wheeler owners ride to work alone every morning while spending ₹3,000–₹5,000/month on petrol (₹100+/L).

To offset this daily commute cost, an increasing number of regular working professionals (IT employees, corporate executives, college students) are **onboarding themselves onto the commercial Rapido Captain app**. 

However, they are **not** commercial taxi drivers:
* When a bike owner travels from **Vijay Nagar to Palasia** (or *Mahalaxmi Nagar to Scheme 54*), they turn on the Captain app **solely to cherry-pick a passenger heading in their exact corridor**.
* They reject all other rides, call passengers to ask *"Where are you going?"*, and only accept the co-traveler whose destination matches their own office or destination.
* Once matched, the bike owner shares their empty pillion seat, reaches their workplace on schedule, and collects money from the passenger to cover 70% to 100% of their daily petrol cost.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE CURRENT COMMUTER LOOPHOLE ON RAPIDO                  │
└─────────────────────────────────────────────────────────────────────────────┘
  Bike Owner commutes           Turns on Rapido Captain        Filters for rides in
  Vijay Nagar ➔ Palasia   ───►  App (Commercial Taxi)    ───►  exact same corridor
                                                                      │
                                                                      ▼
  Collects fare to cover        Shares empty pillion seat      Rejects 80% rides, calls
  daily petrol (70-100%)  ◄───  with same-route commuter ◄───  pax: "Where to go?"
```

---

## 2. The Core Problem & Friction

While this behavior proves massive organic demand, using the commercial Captain app for casual commuting creates severe friction for both users and platform operations:

| Stakeholder | Friction on Current Commercial App | Real-World Impact |
| :--- | :--- | :--- |
| **The Bike Owner (Commuter Host)** | • Forced into commercial taxi workflow.<br>• Algorithm sends rides with 3 km detours.<br>• Penalized with lower acceptance rating for rejecting off-route rides. | Frequent cancellations, frustration, and awkward phone calls asking *"Bhaiya, kahan jana hai?"*. |
| **The Passenger (Co-Rider)** | • Suffers sudden cancellations when driver realizes the route doesn't match.<br>• High commercial auto/cab peak-hour surge fares (₹180–₹350). | Lack of predictable daily transit; paying commercial taxi rates for standard corridor trips. |
| **Rapido (The Platform)** | • High cancellation rates in commercial fleet.<br>• Distorted supply metrics during peak morning/evening rush hours.<br>• Missed revenue opportunity in peer-to-peer mobility. | Platform supply inefficiency and regulatory ambiguity on commercial vs cost-sharing trips. |

---

## 3. The Business Opportunity & Product Strategy

Instead of letting commuters misuse a commercial taxi interface, Rapido can formalize and monetize this organic behavior by launching a dedicated **Peer-to-Peer RidePool & Highway Sharing Product** directly inside the primary consumer app.

### Core Strategic Advantages for Rapido:
1. **Unlocking Latent Supply (Zero Fleet Acquisition Cost):** Millions of personal two-wheeler owners who would never drive a commercial bike taxi will willingly share an empty seat on their own route to save petrol.
2. **50% Cheaper Transit for Daily Commuters:** Passengers get verified, affordable corridor rides (e.g., ₹43 vs ₹140 on cab) with zero peak-hour surge.
3. **Corridor Efficiency & Zero Detour SLA:** Matches are made strictly along direct arterial roads and designated pickup hubs (e.g., main bus stops), eliminating driver detours.
4. **Intercity Highway Expansion:** Unlocking long-distance bike sharing (e.g., *Indore $\to$ Bhopal*, *Bengaluru $\to$ Mysuru*) with scheduled seat booking and custom price sharing.

---

## 4. The Two Product Offerings

Rapido RidePool introduces two clear, distinct modes within the consumer ecosystem:

```
                               ┌────────────────────────────────┐
                               │       RAPIDO RIDEPOOL          │
                               └───────────────┬────────────────┘
                                               │
                 ┌─────────────────────────────┴─────────────────────────────┐
                 ▼                                                           ▼
┌──────────────────────────────────┐                       ┌──────────────────────────────────┐
│ 1. SHARE A RIDE (PASSENGER)      │                       │ 2. HOST A RIDE (BIKE OWNER)      │
│ • Unified flow with auto-distance│                       │ • Choose travel type:            │
│   detection:                     │                       │   A. Inside City (5–30 km)       │
│   - Inside City: 5–30 km pool    │                       │      Auto fare + 5-min timer     │
│   - Highway: >30 km intercity    │                       │   B. City-to-City Highway        │
│ • Verified corporate co-riders   │                       │      Schedule 1h+ & custom price │
└──────────────────────────────────┘                       └──────────────────────────────────┘
```

### Offering 1: "Share a Ride" (Passenger Commuter)
* **Unified Corridor Search:** The passenger enters their origin and destination. The system automatically detects whether the route is **Inside City ($\le 30$ km)** or **Intercity Highway ($>30$ km)**.
* **Corridor Discovery:** Displays verified hosts already riding that path with vehicle model, rating, corporate verification badge (e.g., *Verified Infosys*, *TCS*), and verified passenger reviews.
* **Safety Shield:** Mandatory dual ISI helmet prompt and verified identity check before booking.
* **Live In-Trip HUD & Speedometer:** Real-time motorcycle tracking on map, dynamic speed readout, and emergency SOS button.

### Offering 2: "Host a Ride" (Two-Wheeler Owner)
* **Mode A: Inside the City (Daily Commute, 5 km to 30 km):**
  * Bike owner enters start and office destination.
  * System calculates fair fuel-split compensation (e.g., ₹52 for 8.2 km) based on transparent distance formulas.
  * Host activates a **5-minute live matching countdown timer**.
  * Nearby corridor commuters are notified; Host accepts co-rider $\to$ navigates to bus stop $\to$ verifies 4-digit Start OTP $\to$ completes commute $\to$ receives direct zero-commission wallet payout.
* **Mode B: City-to-City Highway (Intercity, $>30$ km):**
  * Scheduled $\ge 1\text{ hour}$ in advance for highway trips (e.g., 195 km).
  * Host sets price per seat via a dynamic slider bounded by fair fuel guardrails (Min ₹260, Suggested ₹360, Max ₹520).
  * Host declares spare helmet, luggage allowance ($<7$ kg backpack), and planned highway refreshment stops.

---

## 5. User Personas & Real-World Use Cases

### Persona 1: The Commuter Host (Rahul Sharma, 28)
* **Profile:** Senior Software Engineer at Infosys, Indore. Rides a Royal Enfield Hunter 350.
* **Commute:** Mahalaxmi Nagar $\to$ Scheme 54 Tech Park (8.2 km, Mon–Fri).
* **Pain Point:** Spends ₹3,500/month on petrol. Refuses to drive full-time commercial taxi.
* **RidePool Experience:** Sets office route in Rapido, clicks *"Start 5-Min Timer"*. Matches with Ananya at Vijay Nagar bus stop. Collects ₹52/day, saving ₹1,400+ every month without altering his schedule.

### Persona 2: The Daily Commuter Passenger (Ananya K., 24)
* **Profile:** IT Analyst at TCS, Indore.
* **Commute:** Vijay Nagar $\to$ Scheme 54.
* **Pain Point:** Daily auto fares surge to ₹160 during peak hours; commercial cabs cancel frequently.
* **RidePool Experience:** Opens Rapido, taps *"Share a Ride"*, sees Rahul's verified profile and 4.9⭐ reviews. Books a seat for ₹43, meets Rahul at the bus stop, wears provided helmet, and reaches work in 12 minutes.

### Persona 3: The Highway Co-Traveler (Vikram Joshi, 31)
* **Profile:** Regional Sales Manager traveling from Indore to Bhopal (195 km).
* **Pain Point:** Bus takes 4.5 hours; private cabs cost ₹2,800+.
* **RidePool Experience:** Books a seat on a verified Royal Enfield Himalayan highway ride for ₹360, shares the fuel cost, and completes the journey in 3.5 hours with a scheduled food court halt.

---

## 6. Platform Economics & Fair Fuel Cost Recovery

To ensure absolute compliance with Indian Motor Vehicle Rules and preserve a true cost-sharing culture, Rapido RidePool operates on a **Non-Commercial Cost-Recovery Model**:

$$ \text{Passenger Fare} = \text{Base Fuel Share (₹15 + ₹3.40/km)} + \text{Platform Safety Fee (₹5.00)} $$

* **Zero Surge Guarantee:** Peer-to-peer commute fares never surge during peak rain or rush hours.
* **100% Host Payout on Fuel Split:** Commuter hosts receive the full calculated fuel share without commercial commission deductions, driving virality and retention.
* **Direct Platform Revenue:** Rapido earns a steady ₹5.00 platform and safety insurance fee per pooled ride with zero driver acquisition expenditure.

---

## 7. Success Metrics for Rapido Leadership

1. **Daily Active Commute Rides:** Target 150,000+ daily pooled commute trips within 6 months in top 5 tech corridors.
2. **Supply Activation:** Onboard 50,000+ personal bike owners who are not registered on Captain.
3. **Cancellation Reduction:** Achieve $<3\%$ ride cancellation on P2P commute corridor rides vs $18\%$ on commercial fleet.
4. **CO₂ & Traffic Reduction:** Offset 450+ metric tons of carbon emissions monthly through empty seat optimization.

---

*This document is ready to be shared with Rapido Product Leadership alongside the live interactive prototype.*
