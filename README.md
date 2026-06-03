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

```
Background:   #080808 · #111111 · #1a1a1a
Accent Gold:  #C9A96E
Text:         #F5F5F5
Muted:        #888888

Heading font: Cormorant Garamond (300, 400, 500)
Body font:    Montserrat (300, 400, 500)
```


---
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
