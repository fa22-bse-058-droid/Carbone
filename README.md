<div align="center">

# CARBONE

### Luxury Automobile Showroom

*Engineering Luxury Redefined*

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)](https://djangoproject.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

[Live Demo](https://carbone-zw9z.vercel.app) · [Report Bug](https://github.com/fa22-bse-058-droid/Carbone/issues) · [Request Feature](https://github.com/fa22-bse-058-droid/Carbone/issues)

</div>

---

## Overview

Carbone is a full-stack luxury automobile showroom platform built as a flagship portfolio project for **Code Eater** agency. The project demonstrates high-end UI/UX engineering, cinematic animation systems, and modern full-stack architecture — targeting premium local automotive businesses in Pakistan.

Every design and engineering decision prioritises a single goal: make the user feel like they are browsing a Rolls-Royce or Mansory website, not a local dealership.

---

## Screenshots

> Home · Inventory · Car Detail · Services · About · Contact

<img width="1918" height="906" alt="Screenshot 2026-06-04 235024" src="https://github.com/user-attachments/assets/2d637389-3220-4427-a5af-af982e61d66f" />
<img width="1918" height="908" alt="Screenshot 2026-06-17 202431" src="https://github.com/user-attachments/assets/1578eeba-abe1-4cbf-8604-6d3357112e15" />

<img width="1918" height="906" alt="Screenshot 2026-06-17 202454" src="https://github.com/user-attachments/assets/7b8fa48f-e25a-4b0e-8634-c8cd55758e5d" />
<img width="1918" height="910" alt="Screenshot 2026-06-17 202548" src="https://github.com/user-attachments/assets/e49d9c1f-49fe-4cf1-9c84-a9fd4f3e76d4" />

<img width="1918" height="896" alt="Screenshot 2026-06-17 202523" src="https://github.com/user-attachments/assets/ea4492a1-d8b7-4908-8ca2-e4f987eddb7f" />
<img width="1918" height="911" alt="Screenshot 2026-06-17 202625" src="https://github.com/user-attachments/assets/10ed5479-c7e1-413a-8a70-2f5b60a58d5e" />

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Component framework — strict typing throughout |
| Vite | Sub-second HMR, optimised production builds |
| Tailwind CSS v3 | Utility-first styling with custom design system |
| GSAP + ScrollTrigger | Cinematic scroll animations, preloader sequences |
| Framer Motion | Page transitions, card interactions, micro-animations |
| Lenis | Inertia-based smooth scroll |
| Zustand | Lightweight global state (wishlist, filters, compare) |
| TanStack Query | Server state management with smart caching |
| Axios | HTTP client with interceptors for auth |
| React Router v6 | Client-side routing with lazy loading |
| React Hook Form | Performant form handling with validation |

### Backend

| Technology | Purpose |
|---|---|
| Django 5 | Core web framework |
| Django REST Framework | RESTful API layer with serializers |
| PostgreSQL | Production-grade relational database |
| Cloudinary | CDN-backed media storage for images and 3D models |
| Gunicorn | Production WSGI server |
| WhiteNoise | Static file serving |

### APIs & Integrations

| Service | Purpose |
|---|---|
| Anthropic Claude API | AI-powered car finder — quiz to recommendation engine |
| Cloudinary | Car images + `.glb` 3D model hosting |
| Resend | Transactional email for booking confirmations |
| WhatsApp Business | One-click inquiry with pre-filled messages |

### Deployment

| Platform | Purpose |
|---|---|
| Vercel | Frontend — global CDN, instant deploys on push |
| Railway | Django backend + PostgreSQL |

---

## Features

**Cinematic Experience**
- Full-screen hero section with video background and poster fallback
- GSAP preloader — CB monogram logo animates in on first visit
- Scroll-triggered reveals, parallax effects, and letter-by-letter text animations
- Lenis smooth scroll across all pages

**Inventory System**
- 18+ vehicles across 6 categories — Luxury, Sports, Electric, Classic, SUV, Used
- Real-time filtering by category, fuel type, and price
- Animated card grid with wishlist, hover effects, and sold state
- Side-by-side car comparison panel

**Car Detail Page**
- Multi-image gallery with thumbnail navigation
- Full spec breakdown — engine, HP, torque, top speed, 0-100, drivetrain
- 3D car viewer via `@google/model-viewer` for featured vehicles
- Live EMI / finance calculator
- Test drive booking form with time slot selection
- One-click WhatsApp inquiry with pre-filled car details

**AI Car Finder**
- 3-question quiz — budget, use case, lifestyle vibe
- Anthropic Claude API returns top 3 personalised recommendations
- API key secured server-side in Django — never exposed to frontend

**Business Features**
- WhatsApp integration on every car card and detail page
- Test drive booking system with confirmation flow
- Contact page with dual-showroom info (Lahore + Karachi)
- Services page — financing, trade-in, concierge delivery, after-sale
- About page — brand legacy timeline, leadership team, stats

---

## Design System

```
─────────────────────────────────────────
  COLORS
─────────────────────────────────────────
  Background Primary    #080808
  Background Secondary  #111111
  Background Tertiary   #1a1a1a
  Accent Gold           #C9A96E
  Text Primary          #F5F5F5
  Text Muted            #888888

─────────────────────────────────────────
  TYPOGRAPHY
─────────────────────────────────────────
  Headings    Cormorant Garamond  300 · 400 · 500
  Body / UI   Montserrat          300 · 400 · 500

─────────────────────────────────────────
  ANIMATION RULES
─────────────────────────────────────────
  Only animate transform and opacity
  GPU-accelerated — zero layout recalc
  Slow = luxury · Fast = cheap
─────────────────────────────────────────
```

---

## Project Structure

```
Carbone/
├── carbone-web/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Preloader/        # GSAP logo animation
│   │   │   ├── Navbar/           # Fixed nav, scroll behavior
│   │   │   ├── Hero/             # Cinematic video hero
│   │   │   ├── CarCard/          # Inventory card component
│   │   │   ├── Compare/          # Side-by-side panel
│   │   │   ├── AIFinder/         # Quiz + API integration
│   │   │   └── Layout/           # App shell
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Inventory.tsx
│   │   │   ├── CarDetail.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── AIFinderPage.tsx
│   │   ├── store/                # Zustand stores
│   │   ├── api/                  # Axios client + endpoints
│   │   ├── types/                # TypeScript interfaces
│   │   ├── hooks/                # useGSAP, useLenis
│   │   └── assets/               # Images, logo, 3D models
│   ├── public/
│   │   ├── hero.mp4
│   │   └── hero-poster.jpg
│   ├── vercel.json
│   └── .env
│
└── carbone-backend/              # Django backend
    ├── cars/                     # Car model + API
    ├── inquiries/                # Inquiry + booking
    ├── ai_finder/                # Anthropic API view
    └── manage.py
```

---

## Getting Started

### Prerequisites

```bash
node >= 18
python >= 3.11
```

### Frontend

```bash
# Clone the repository
git clone https://github.com/fa22-bse-058-droid/Carbone.git
cd Carbone/carbone-web

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add VITE_API_URL=http://localhost:8000/api

# Start development server
npm run dev
```

### Backend

```bash
cd Carbone/carbone-backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add DATABASE_URL, ANTHROPIC_API_KEY, CLOUDINARY credentials

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

---

## Environment Variables

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

### Backend `.env`

```env
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost/carbone
ANTHROPIC_API_KEY=your_anthropic_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

## Deployment

### Frontend → Vercel

```bash
# Push to main branch — Vercel auto-deploys
git push origin main
```

Vercel Settings:
- Framework: `Vite`
- Root Directory: `carbone-web`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Backend → Railway

```bash
# Connect GitHub repo to Railway
# Add environment variables in Railway dashboard
# Deploy from main branch
```

---

## Roadmap

- [x] Home page with cinematic hero
- [x] Full inventory with filtering
- [x] Car detail page with EMI calculator
- [x] Test drive booking system
- [x] WhatsApp inquiry integration
- [x] Services page
- [x] About page with legacy timeline
- [x] Contact page with dual showroom info
- [ ] 3D car viewer (`@google/model-viewer`)
- [ ] AI car finder (Anthropic API)
- [ ] Django REST API backend
- [ ] Admin panel for inventory management
- [ ] Mobile responsive polish
- [ ] Performance optimisation (Lighthouse 90+)

---

[![GitHub](https://img.shields.io/badge/GitHub-fa22--bse--058--droid-181717?style=flat&logo=github)](https://github.com/fa22-bse-058-droid)

---

<div align="center">

*Carbone — Where every vehicle tells a story of excellence.*

</div>
