# 🛵 Rapido Bikepool & Highway RideShare

> **A Peer-to-Peer Commute & City-to-City Two-Wheeler Sharing Platform.**  
> Built to monetize organic commuter behavior on Rapido, offset daily fuel costs for bike owners, and deliver 50% cheaper, verified corridor transit for passengers.

---

## 🌟 Overview & Product Architecture

Rapido RidePool introduces two core offerings alongside the standard Rapido fleet:
1. **Share a Ride (Passenger Flow):**
   - Corridor route search & landmark snapping.
   - Interactive map with the signature **Green `Pickup Point` bubble marker**.
   - Matching hosts discovery with verified corporate badges, vehicle details, star ratings, and passenger reviews.
   - Live **In-Trip HUD** with moving motorcycle telemetry, live elapsed timer, and SOS support.
   - **Post-Trip Review & Rating Screen** with interactive 5-star rating, compliment chips, and fare receipt.

2. **Host a Ride (Two-Wheeler Owner Flow):**
   - **Inside the City (5 km – 30 km):** Automatic Rapido fuel-split fare calculation + **5-minute live matching countdown timer** + zero detour SLA.
   - **City to City (Intercity Highway):** Advance scheduling ($\ge 1\text{ hr}$ ahead) + interactive price slider + spare helmet & luggage specification.

---

## 📑 Product Documentation
- [Business Requirements Document (BRD)](BRD_Rapido_Bikepool.md)
- [Product Requirements Document (PRD)](PRD_Rapido_Bikepool.md)
- [Interactive Visual Reader (HTML)](Read_PRD_and_BRD.html)

---

## 🚀 Live Demo & Deployment

### Run Locally:
```bash
# Clone the repository
git clone <your-repo-url>
cd "Rapido project"

# Start local server
python3 -m http.server 3000
```
Open `http://localhost:3000` in your browser.

### Deploy to Vercel (1-Click):
1. Push this repository to your **GitHub** account.
2. Go to **[vercel.com](https://vercel.com)** $\to$ Click **"Add New Project"**.
3. Import this GitHub repository.
4. Click **"Deploy"** (Zero configuration needed).

---

## 🎨 Design Tokens & UI/UX Stack
- **Typography:** Plus Jakarta Sans & JetBrains Mono
- **Brand Colors:** Rapido Golden Yellow (`#FFC400`), Dark Slate (`#0F172A`), Pickup Green (`#00875A`)
- **Map Engine:** Leaflet.js with CartoDB Voyager tiles
- **Layout:** Mobile-first responsive bottom-sheet modal architecture
