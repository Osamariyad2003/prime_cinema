# Prime Cinema - Frontend

A modern, premium cinema booking platform built with React and Vite, featuring a sleek black, white, and red design inspired by contemporary minimalism.

## 🎬 Features

- **Responsive Design**: Fully responsive UI optimized for all devices
- **Movie Browsing**: Browse current movies with detailed information
- **Showtimes**: View movie schedules in a clean list layout
- **Quick Booking**: Fast and intuitive booking flow
- **Cinema Locations**: Find nearby Prime Cinema locations
- **Loyalty Program**: Premium loyalty card system with perks
- **Modern UI**: Bold typography, minimal design, and smooth animations

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Montserrat Font** - Typography

## 🎨 Design System

- **Color Palette**: 
  - Primary: Black (#050505)
  - Accent: Red (#E50914)
  - Text: White (#FFFFFF)
  - Gray tones for secondary elements
- **Typography**: Montserrat (300-900 weights)
- **Layout**: Minimal, bold, and clean

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server (runs on port 6000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Port Configuration
The dev server runs on **port 6000** by default. You can change this in `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 6000, // Change to your preferred port
  },
})
```

### API Configuration
The frontend connects to the backend API at `http://localhost:4000/api`. Update the API base URL in `src/services/api.js` if needed:

```javascript
const API_BASE_URL = 'http://localhost:4000/api';
```

## 📁 Project Structure

```
prime_cinema_front/
├── src/
│   ├── components/       # React components
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Showtimes.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── QuickBooking.jsx
│   │   ├── LoyaltySection.jsx
│   │   └── ...
│   ├── services/         # API services
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── vite.config.js       # Vite configuration
└── package.json
```

## 🌐 Available Routes

- `/` - Home page with hero and quick booking
- `/movies` - Browse all movies
- `/showtimes` - View movie schedules
- `/locations` - Cinema locations
- `/club` - Loyalty program
- `/events` - Upcoming events
- `/contact` - Contact page

## 🎯 Key Components

### Hero
Full-screen hero section with call-to-action buttons

### QuickBooking
Interactive booking widget with movie/cinema/date/time selection

### Showtimes
List-based layout showing upcoming movie sessions with real-time data

### MovieGrid
Grid display of current movies with poster images

### LoyaltySection
Premium 3D animated loyalty card presentation

## 🔗 Backend Integration

This frontend requires the Prime Cinema backend API to be running. The backend handles:
- Movie data
- Showtime schedules
- Cinema information
- Booking management

**Backend Repository**: `cinema_booking_API-main`
**Backend Port**: 4000

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👥 Development

Created for Prime Cinemas - Jordan's premier entertainment destination.

## 📄 License

Private project - All rights reserved
