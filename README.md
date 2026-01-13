# 🛰️ Find the ISS

A React application that displays the real-time location of the International Space Station (ISS).

**[Live Demo →](https://elkmar.github.io/find-the-iss/)**

## Features

- 🌍 Real-time ISS coordinates (latitude & longitude)
- 🗺️ Interactive map showing ISS position
- 🏳️ Country/ocean detection based on ISS location
- 🔄 Auto-refresh every 5 minutes + manual refresh button

## Tech Stack

- **React 18** - UI framework
- **Leaflet** - Interactive maps
- **Axios** - HTTP client
- **GitHub Actions** - CI/CD deployment

## APIs Used

- [Where the ISS at?](https://wheretheiss.at/) - ISS position data
- [OpenCage Geocoding](https://opencagedata.com/) - Reverse geocoding for country names

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Elkmar/find-the-iss.git
cd find-the-iss

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and add your OpenCage API key
```

### Development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

```bash
npm run build
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_OPENCAGE_API_KEY` | Your [OpenCage](https://opencagedata.com/) API key for geocoding |

## Deployment

This project uses GitHub Actions for automatic deployment to GitHub Pages. Every push to `main` triggers a new deployment.

To deploy manually, set up the `REACT_APP_OPENCAGE_API_KEY` secret in your repository settings.

## License

MIT
