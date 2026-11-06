# 🌱 EcoFeast - Food Waste Management & Rescue Platform

An intelligent, community-driven **Food Waste Management System** built with **React**, **Vite**, **Tailwind CSS**, and **LocalStorage**. 

EcoFeast bridges individuals, restaurants, hotels, and supermarkets having surplus wholesome food with local charities, shelters, and food banks. It promotes environmental sustainability by reducing landfill food waste and combating community hunger.

---

## 🌟 Key Features & Functionality

### 1. 🔐 Authentication & Role-Based Access (LocalStorage)
- **Role Support**:
  - **🏢 Food Donor**: Restaurants, hotels, caterers, supermarkets, and individuals with excess food.
  - **🥫 Charity / Food Bank**: Non-profits, community shelters, and soup kitchens claiming food for distribution.
  - **🛡️ Platform Administrator / Coordinator**: Oversees platform activity, verifies NGO credentials, reviews logistics, and tracks city-wide environmental metrics.
- **Persistent Sessions**: User accounts, credentials, and sessions are safely persisted in browser `localStorage`.
- **⚡ 1-Click Demo Login**: Pre-seeded demo credentials accessible right from the login modal.

### 2. ⚠️ Urgent Perishable Food Alerts
- Real-time countdown tracking for perishable cooked meals and ripe produce expiring within **6 hours**.
- Dynamic visual alert banner warning charities of impending food expiration to prevent landfill waste.
- One-click urgent reservation action.

### 3. 📍 Location-Based Matching & Proximity Filter
- Filter surplus food listings by location zone and proximity:
  - *Downtown Central (< 1 mi)*
  - *North District (2-3 mi)*
  - *Westside Green (3-5 mi)*
  - *East End Riverside (5+ mi)*
- Proximity tags on each card (`0.8 miles away`, `3.4 miles away`).

### 4. 🍱 Surplus Food Posting (Donor Module)
- Donors can list surplus items with:
  - Title, Food Category (Cooked Meals, Bakery, Fresh Produce, Dairy, Pantry Staples)
  - Dietary Tags (Vegetarian, Vegan, Non-Vegetarian, Halal)
  - Servings count & estimated weight in kg
  - Expiry / Consume-by date & time
  - Storage Requirements (*Keep Warm*, *Cold Storage 2-4°C*, *Room Temperature*, *Frozen*)
  - Pickup window timing & street address
  - High-resolution preset food photo thumbnails

### 5. 🤝 Claiming & Digital Pickup Pass (Charity Module)
- Certified charities can claim any available surplus donation.
- Generates an immediate **Digital Food Rescue Pass** with a unique tracking code (e.g., `#CLM-7491`) and scannable QR simulation.
- Lifecycle tracking:
  1. **Claimed / Reserved**
  2. **Picked Up from Donor**
  3. **Distributed to Community**

### 6. 📜 Donation History & Environmental Impact
- Donors and charities can view their complete donation & claim history.
- Live EPA-standard sustainability calculations:
  - **Meals Rescued**
  - **Landfill Food Waste Diverted (kg)**
  - **CO₂ Equivalent Emissions Prevented (kg)**

### 7. 🛡️ Admin Management & Moderation Center
- **Overview & KPIs**: Platform-wide metrics on food saved and CO₂ prevented.
- **Listing Moderation**: Full CRUD management of all listings (approve, edit, remove, toggle status).
- **Logistics Radar**: Monitor active food transfers between donors and recipient food banks.
- **NGO Directory & Verification**: Grant or revoke verified partner badges.
- **Reset Demo Data**: One-click restore button for quick evaluation.

---

## 🔑 Pre-Seeded Demo Accounts

You can click any of the **1-Click Quick Demo Buttons** on the sign-in modal, or log in manually with:

| Role | Email | Password | Organization |
| :--- | :--- | :--- | :--- |
| **🛡️ Admin** | `admin@ecofeast.org` | `admin123` | City Food Rescue Alliance |
| **🏢 Food Donor** | `donor@metrohotel.com` | `donor123` | Grand Metropolis Hotel & Banquets |
| **🥫 Charity / Food Bank** | `recipient@hopefoodbank.org` | `recipient123` | Hope Community Food Bank & Shelter |

You can also click **"Register Organization"** to sign up new custom donor or charity accounts anytime!

---

## 💻 Tech Stack
- **Frontend**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Data Persistence**: LocalStorage (`foodwaste_users`, `foodwaste_listings`, `foodwaste_impact`)
- **Hosting Target**: Vercel

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## ☁️ Deployment on Vercel

The project is pre-configured with `vercel.json` for seamless Single Page Application (SPA) routing.

### Method 1: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Food Waste Management System"
   git remote add origin https://github.com/YOUR_USERNAME/food-waste-management.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** > **"Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**! Your application will be live with an SSL HTTPS domain in seconds.

### Method 2: Deploy via Vercel CLI
```bash
# Install or run Vercel CLI
npx vercel

# Follow prompts:
# - Set up and deploy? [Y]
# - Which scope? [Your Account]
# - Link to existing project? [N]
# - What's your project's name? [food-waste-management]
# - In which directory is your code located? [./]
# Deploy to production:
npx vercel --prod
```
