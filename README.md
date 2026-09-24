# ⚡ Pokémon Pokédex App

A high-performance visual encyclopedia for Generation I Pokémon built with Next.js App Router, React Server Components, Tailwind CSS, and the public PokéAPI.

---

## Project Overview

**Pokémon Pokédex App** renders a dynamic, responsive encyclopedia of the original 151 Pokémon. Utilizing Next.js 14/15 React Server Components, Pokémon lists and detail pages are server-rendered with optimized caching and pure server-side state transitions between Grid and List viewing modes.

---

## Features

- **React Server Components (RSC)**: Data fetching executed securely on the server with `force-cache` optimization.
- **Dual View Modes**: Seamless toggle between interactive visual Grid and compact tabular List layouts.
- **Detailed Pokémon Profiles**: Comprehensive views displaying national Pokédex IDs, official artwork, elemental typings, metric height/weight, and animated base stat meters.
- **Zero Client Waterfall**: Static assets and API responses resolved ahead of client delivery with instant response times.
- **Responsive Dark Theme**: Modern slate palette with vibrant elemental accent gradients.

---

## Prerequisites

- **Node.js**: `>= 18.17.0`
- **Package Manager**: `npm`, `pnpm`, or `yarn`

---

## Installation and Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your web browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Serve the Production Build
```bash
npm run start
```

---

## Configuration & External APIs

The application communicates with the public PokéAPI REST endpoint:
- **API Endpoint**: `https://pokeapi.co/api/v2`
- **Sprites CDN**: `https://raw.githubusercontent.com/PokeAPI/sprites/master/...`

No API keys are required for default operation.

---

## Defensive Security Architecture

- **URI Encoding & Input Validation**: Route and query parameters (`id`, `view`) are sanitized and validated with bounded pagination to eliminate injection or path traversal attempts.
- **Next.js Image Domain Allowlisting**: Image loading is restricted to trusted GitHub PokéAPI sprite repositories configured in `next.config.ts`.
- **Server-Side Data Isolation**: API calls occur server-side, eliminating browser token exposure and CORS vulnerabilities.

---
