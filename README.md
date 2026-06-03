```markdown
# Carbone — Luxury Automobile Showroom

A full-stack luxury car showroom web application built as a portfolio project for **Code Eater** agency. Designed to demonstrate high-end UI/UX, cinematic animations, and modern full-stack architecture.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + TypeScript | Component framework |
| Vite | Build tool |
| Tailwind CSS v3 | Utility-first styling |
| GSAP + ScrollTrigger | Cinematic scroll animations |
| Framer Motion | Page transitions + micro interactions |
| Lenis | Smooth scroll |
| Zustand | Global state management |
| TanStack Query | Server state + API caching |
| Axios | HTTP client |
| React Router v6 | Client-side routing |
| React Hook Form | Form handling |

### Backend
| Technology | Purpose |
|---|---|
| Django 5 | Web framework |
| Django REST Framework | API layer |
| PostgreSQL | Production database |
| Cloudinary | Media storage (images + 3D models) |

### APIs & Services
| Service | Purpose |
|---|---|
| Anthropic API | AI car finder feature |
| Cloudinary | Car image + 3D model hosting |
| Resend | Email notifications |

### Deployment
| Platform | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Railway | Backend + database hosting |

---

## Features

- Cinematic hero section with full-screen video and poster fallback
- GSAP preloader with CB monogram logo animation
- 3D car viewer using `@google/model-viewer`
- AI-powered car finder quiz (Anthropic API)
- Side-by-side car comparison tool
- Advanced inventory filtering by category, price, fuel type
- Test drive booking system
- WhatsApp inquiry integration
- EMI calculator
- Wishlist with local persistence
- Fully responsive, mobile-first design
- Dark luxury design system throughout

---

## Car Categories

- Luxury
- Sports
- Electric
- Classic / Old Money
- SUV
- Pre-owned / Used

---

## Design System

```
Background:   #080808 · #111111 · #1a1a1a
Accent Gold:  #C9A96E
Text:         #F5F5F5
Muted:        #888888

Heading font: Cormorant Garamond (300, 400, 500)
Body font:    Montserrat (300, 400, 500)
```

---

## Project Structure

```
carbone-web/
├── src/
│   ├── components/
│   │   ├── Preloader/
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── CarCard/
│   │   ├── Compare/
│   │   ├── AIFinder/
│   │   └── Layout/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Inventory.tsx
│   │   ├── CarDetail.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── store/
│   ├── api/
│   ├── types/
│   ├── hooks/
│   └── assets/
├── public/
│   ├── hero.mp4
│   └── hero-poster.jpg
└── .env
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/Carbone.git
cd Carbone

# Install dependencies
npm install

# Add environment variables
cp .env.example .env
# Fill in VITE_API_URL

# Run dev server
npm run dev
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:8000/api
VITE_ANTHROPIC_API_KEY=your_key_here
```

---

## Brand

**Carbone** is a fictional luxury automobile showroom brand created for portfolio demonstration purposes by Code Eater agency.

Logo: CB monogram — beveled rectangle pillar through interlocked serif C and B letterforms. White on black. No color. Pure typographic luxury.

---

## Status

🚧 Currently in active development

---

*Built by [Code Eater](https://github.com/your-agency) — We eat code for breakfast.*
```

---

GitHub pe `README.md` file mein paste karo, username aur agency link apna daal dena. Yeh README portfolio visitors aur potential clients dono ke liye professional impression dega.
