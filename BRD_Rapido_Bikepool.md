# BUSINESS REQUIREMENTS DOCUMENT (BRD)
# Rapido Bikepool & Intercity Ride-Share

**Project Overview:** Introducing Peer-to-Peer Commute & City-to-City Bike Sharing  
**Document Version:** 1.0 (Humanized & Ready for Sharing)  
**Author:** Senior Product Manager  

---

## 1. The Real-World Discovery (The Market Gap)

### What is happening today?
Every day in major cities (Bengaluru, Hyderabad, Pune, Delhi-NCR), thousands of bike owners ride to work alone while spending significant money on daily petrol (₹100+/L). 

To offset this cost, many bike owners onboard themselves onto the **Rapido Captain app**—not because they want to be full-time commercial drivers, but simply because **they want to share their empty pillion seat with a stranger heading in the exact same direction and split the travel cost.**

### Where is the problem?
The current Rapido Captain app is built for on-demand commercial taxi drivers, not casual daily commuters:
* **The Route Problem:** When a bike owner wants to go to their office, the app gives them random ride requests going in completely different directions. The bike owner has to keep canceling rides or calling passengers to ask *"Where are you going?"*.
* **The Passenger Problem:** Passengers traveling during peak hours face high auto/cab surge fares (₹200–₹350) or frequent cancellations, when all they need is an affordable, direct ride with someone already heading that way.

### The Opportunity
Instead of forcing casual commuters to use a commercial driver flow, Rapido can launch a dedicated **Peer-to-Peer Bike Sharing Experience** with two simple, intuitive offerings:
1. **Host a Ride:** A bike owner going somewhere lists their route and shares their empty seat.
2. **Want to Share a Ride:** A passenger traveling to that same area discovers matching hosts, compares their ratings and prices, and hops on.

---

## 2. The Two New Core Services

```
                                  RAPIDO BIKE SHARE
                                          │
            ┌─────────────────────────────┴─────────────────────────────┐
            ▼                                                           ▼
┌───────────────────────────────┐                           ┌───────────────────────────────┐
│     SERVICE 1: HOST A RIDE    │                           │ SERVICE 2: WANT TO SHARE RIDE │
│   (For Bike Owners / Riders)  │                           │   (For Passengers / Users)    │
├───────────────────────────────┤                           ├───────────────────────────────┤
│ 1. Inside the City (5-30 km)  │                           │ • Enter Current Location      │
│    • Automatic Rapido Pricing │                           │ • Enter Destination           │
│    • 5-Min Live Timer         │                           │ • Browse Matching Hosts       │
│                               │                           │ • Compare Ratings, Reviews    │
│ 2. City-to-City (Inter-City)  │                           │   & Vehicle                   │
│    • Scheduled 1 hr+ ahead    │                           │ • Pick Host & Share Ride      │
│    • Host sets their price    │                           │                               │
└───────────────────────────────┘                           └───────────────────────────────┘
```

---

## 3. Deep Dive: The Two "Host a Ride" Features

### Feature A: Inside the City (Intra-City Commute)
This feature is designed for daily city commuters (e.g., traveling from home to office).

* **Distance Range (5 km to 30 km):**
  * Minimum distance is **5 km** (to prevent tiny hops that disrupt commute speed).
  * Maximum distance is **30 km** (covers all major city commute routes).
* **Automatic Price Calculation by Rapido:**
  * The price is automatically calculated and displayed by Rapido based on the distance.
  * The rider doesn't need to guess or negotiate—the fare is calculated fairly to cover fuel sharing.
* **5-Minute Minimum Listing & Departure Countdown:**
  * When the rider is ready to leave, they list the ride at least **5 minutes before departure**.
  * A **5-minute live waiting timer** runs on the screen. During this window, nearby passengers heading the same way can see and choose the rider.
  * When a passenger joins, they connect and leave together.

---

### Feature B: City-to-City (Inter-City Long Distance)
This feature is designed for riders traveling from one city to a nearby city (e.g., Bengaluru $\to$ Mysuru, Pune $\to$ Mumbai, Delhi $\to$ Agra).

* **Advance Scheduling (At least 1 Hour in Advance):**
  * The rider chooses their starting city and the destination city.
  * The ride must be scheduled at least **1 hour before departure** (or days in advance).
* **Host Sets Their Own Price:**
  * The rider chooses the price they want to charge the co-traveler to share the fuel, tolls, and trip costs.
* **Luggage & Travel Details:**
  * The rider specifies if an extra helmet is provided, max backpack size, and any planned rest/tea stops along the highway.
* **Direct Match:**
  * Travelers searching for that city route can view the listing, check the rider's profile, and book their shared seat.

---

## 4. The Three User Personas

### 👤 Persona 1: The Passenger (Want to Share a Ride)
* **Who they are:** A college student or office worker looking for a fast, affordable, and direct ride to their destination.
* **How they use it:**
  1. Opens Rapido $\to$ chooses current location and destination.
  2. Sees a list of real bike hosts traveling along the same route.
  3. Evaluates hosts based on **star ratings, passenger feedback, bike model, and price**.
  4. Selects their preferred host and shares the ride.

---

### 🏍️ Persona 2: The Inside-City Host (Daily Commuter)
* **Who they are:** A bike owner traveling 5 km to 30 km across the city to work or study.
* **How they use it:**
  1. Enters starting point and destination.
  2. Views the automatically generated Rapido price.
  3. Hits publish 5 minutes before leaving (starts the 5-minute waiting countdown).
  4. Gets matched with a co-rider waiting along their path, picks them up, and splits the fuel cost.

---

### 🛣️ Persona 3: The City-to-City Host (Intercity Traveler)
* **Who they are:** A rider traveling on a weekend or business trip between two cities.
* **How they use it:**
  1. Enters origin city, destination city, date, and departure time (at least 1 hour ahead).
  2. Sets their preferred seat price.
  3. Confirms travel details (extra helmet, luggage limit).
  4. Accepts a co-traveler and enjoys a shared, cost-effective highway journey.

---

## 5. Summary Matrix: How the Features Compare

| Feature Attribute | Inside City Ride Host | City-to-City Ride Host | Passenger (Share a Ride) |
| :--- | :--- | :--- | :--- |
| **Distance Scope** | **5 km to 30 km** | **City to City (30 km+)** | Matches any host corridor |
| **Scheduling SLA** | **5-minute countdown** (Instant / Short lead) | **Scheduled $\ge 1\text{ hr}$ ahead** | On-demand or pre-booked |
| **Pricing Control** | **Automatically set by Rapido** | **Set by the Host** | Clear upfront price per host |
| **Route Decider** | **Host's personal commute** | **Host's intercity trip** | Selects host going to same place |
| **Key Benefit** | Recovers daily petrol cost with 0 detour | Splits highway expenses & gets travel companion | Fast, verified ride at 50% lower cost than cabs |
