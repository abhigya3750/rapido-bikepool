# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# Rapido Bikepool: Product Specifications & Screen Flows

**Product Focus:** 3 User Flows, Screen Layouts, and Feature Logic  
**Document Version:** 1.0 (Humanized & Ready for Sharing)  
**Author:** Senior Product Manager  

---

## 1. Flow 1: Passenger Experience ("Want to Share a Ride")

### How it works:
1. The user taps **"Share a Ride"** on the Rapido home screen.
2. The user enters their **Current Pickup Location** and **Destination**.
3. The app scans all active and upcoming hosts heading along that corridor.
4. The user sees a clean list of matching host cards, checks their ratings, reviews, and prices, and taps **"Join Ride"**.

### 📱 Screen Layout: Matching Hosts Discovery
```
+-------------------------------------------------------------+
|  <- Back               Shared Rides Near You         [Filter]|
+-------------------------------------------------------------+
|  [ O ] Pickup:  Indiranagar Metro Station                   |
|  [ . ] Drop:    Manyata Tech Park (12 km)                   |
|  [Time] Leaving: Next 10 mins                               |
+-------------------------------------------------------------+
| HOSTS HEADING TOWARDS YOUR DESTINATION (3 Available)        |
+-------------------------------------------------------------+
|                                                             |
| +---------------------------------------------------------+ |
| | [Photo] Rahul Sharma (⭐ 4.9 · 48 shared rides)          | |
| |         "Verified Office Commuter"                      | |
| |         Bike: Royal Enfield Hunter 350                  | |
| |         Extra Helmet: YES (Provided)                    | |
| |---------------------------------------------------------| |
| | Departure: Leaving in 4 mins                            | |
| | Pickup Point: Main Road Bus Stop (2 min walk)           | |
| | Drop Point:   Manyata Main Gate                         | |
| | Price:        ₹65 (Auto fare: ₹180)                     | |
| |                                                         | |
| | [ VIEW DETAILS & REVIEWS ]              [ CHOOSE RIDER ]| |
| +---------------------------------------------------------+ |
|                                                             |
| +---------------------------------------------------------+ |
| | [Photo] Priya Verma (⭐ 4.8 · 22 shared rides)           | |
| |         "Verified Commuter" · [Women Only Match]        | |
| |         Bike: TVS Jupiter                               | |
| |         Extra Helmet: YES                               | |
| |---------------------------------------------------------| |
| | Departure: Leaving in 8 mins                            | |
| | Price:        ₹60                                       | |
| |                                                         | |
| | [ VIEW DETAILS & REVIEWS ]              [ CHOOSE RIDER ]| |
| +---------------------------------------------------------+ |
+-------------------------------------------------------------+
```

---

## 2. Flow 2: Inside-City Host Experience (5 km – 30 km)

### How it works:
1. The rider taps **"Host a Ride" $\to$ "Inside City"**.
2. Enters their origin and destination.
3. The system checks the distance:
   - If between **5 km and 30 km**, the route is approved.
   - If $< 5\text{ km}$, app prompts: *"Minimum ride distance is 5 km"*.
   - If $> 30\text{ km}$, app prompts: *"Switch to City-to-City mode"*.
4. The screen displays the **automatically generated price**.
5. The rider sets departure to **"Leaving in 5 mins"** and hits **"Publish"**.
6. A **5-minute live countdown timer** starts. If a passenger selects the rider, the match is confirmed and navigation begins.

### 📱 Screen Layout: Inside-City Host Ride Setup
```
+-------------------------------------------------------------+
|  <- Cancel             Host Inside City Ride                 |
+-------------------------------------------------------------+
|  YOUR COMMUTE ROUTE                                         |
|  From: [ Current Location: HSR Layout Sector 2 ]            |
|  To:   [ Manyata Tech Park, Nagavara           ]            |
|  Total Distance: 18.5 km  [✓ Valid: 5 to 30 km Range]        |
+-------------------------------------------------------------+
|  DEPARTURE & COUNTDOWN                                      |
|  Departure: [ (•) Leaving in 5 mins   ( ) Pick Custom Time ]|
|                                                             |
|  Matching Window: 5 Minutes                                 |
|  (Your ride will be visible to nearby passengers for 5 min) |
+-------------------------------------------------------------+
|  AUTOMATIC FARE (Calculated by Rapido)                      |
|                                                             |
|  Total Fare:       ₹95                                      |
|  YOU RECEIVE:      ₹95 (Direct to your Wallet / UPI)        |
+-------------------------------------------------------------+
|  RIDER PREFERENCES                                          |
|  [X] I have an extra helmet for the passenger               |
|  [ ] Match with same gender only                            |
+-------------------------------------------------------------+
|                                                             |
|               [ START 5-MIN HOSTING TIMER ]                 |
+-------------------------------------------------------------+
```

### 📱 Screen Layout: Live 5-Minute Waiting State
```
+-------------------------------------------------------------+
|  <- Minimize              Live Ride Hosting                 |
+-------------------------------------------------------------+
|                                                             |
|                     [  04 : 18  ]                           |
|               MINUTES REMAINING TO MATCH                    |
|                                                             |
|  Your ride to Manyata Tech Park is visible to passengers    |
|  waiting along Outer Ring Road...                           |
|                                                             |
|  ---------------------------------------------------------  |
|  Estimated Fuel Split Earning: ₹95                          |
|  ---------------------------------------------------------  |
|                                                             |
|  [!] When a passenger chooses you, you'll hear a chime!     |
|                                                             |
|               [ CANCEL & RIDE SOLO (NO PENALTY) ]           |
+-------------------------------------------------------------+
```

---

## 3. Flow 3: City-to-City Host Experience (Inter-City)

### How it works:
1. The rider taps **"Host a Ride" $\to$ "City to City"**.
2. Selects their **Current City / Starting Point** and **Destination City / Drop Hub**.
3. Sets the **Date and Departure Time** (must be at least **1 hour in advance**).
4. Sets the **Price per Seat** that they want to charge the co-traveler.
5. Fills in trip details (extra helmet, maximum luggage allowed, planned tea/fuel halts).
6. Publishes the trip. Co-travelers heading to that city can view the listing and send a join request.

### 📱 Screen Layout: City-to-City Host Setup
```
+-------------------------------------------------------------+
|  <- Back              Host City-to-City Ride                 |
+-------------------------------------------------------------+
|  TRIP ROUTE                                                 |
|  From City: [ Bengaluru (Hebbal Junction) ]                 |
|  To City:   [ Mysuru (Suburban Bus Stand) ]                 |
|  Distance:  140 km                                          |
+-------------------------------------------------------------+
|  SCHEDULE DEPARTURE (Min 1 hour in advance)                 |
|  Date: [ Saturday, 18 Oct 2026 ]   Time: [ 07:00 AM ]       |
+-------------------------------------------------------------+
|  SET YOUR PRICE PER SEAT                                    |
|  How much do you want to charge your co-partner?            |
|                                                             |
|  Price: [ ₹ 350 ]   (Suggested range: ₹280 - ₹420)          |
|  [- Less -----------------o--------------------- More +]    |
+-------------------------------------------------------------+
|  TRAVEL SPECS & GEAR CHECK                                  |
|  Bike Model: [ Royal Enfield Himalayan ]                   |
|  [X] Extra Helmet Provided for Co-Partner                   |
|  [X] Luggage Limit: 1 Backpack only (< 7 kg)                |
|  Planned Halts: [ 1 Breakfast Stop at Maddur (20 mins) ]    |
+-------------------------------------------------------------+
|                                                             |
|                 [ PUBLISH CITY-TO-CITY RIDE ]               |
+-------------------------------------------------------------+
```

---

## 4. End-to-End Safety & Trust Elements
1. **Verified Rider Badges:** Shows if the rider is a verified daily commuter (e.g., corporate/college email badge).
2. **Ratings & Feedback:** Passengers leave reviews ("Smooth ride", "Punctual", "Clean helmet").
3. **Emergency SOS & Live Tracking:** Both rider and passenger get live GPS tracking and 1-tap SOS support.
