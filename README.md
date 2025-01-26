# Worst Restaurant Finder

Welcome to the Worst Restaurant Finder! This project aims to help users find the worst-rated restaurants in their area. Whether you're looking for a laugh or just want to avoid a bad dining experience, this app has you covered.

## Features

- **Search by Location**: Find the worst restaurants near you.
- **User Reviews**: Read reviews from other users to see why these restaurants are rated poorly.
- **Rating System**: View the overall rating and individual scores for food, service, and ambiance.
- **Map Integration**: See the location of each restaurant on a map.

## Installation

To get started with the Worst Restaurant Finder, follow these steps:

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/worst-restaurant-finder.git
  ```
2. Navigate to the project directory:
  ```bash
  cd worst-restaurant-finder
  ```
3. Install the dependencies:
  ```bash
  npm install
  ```
4. Configure your API key 
  - Enable these services on your Google Cloud Platform:
    - Geocoding API
    - Places API
    - Maps JavaScript API  
  - Create an .env file in the root project and put your API key like this :
  ```bash
  VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
  ```

## Usage

To start the application, run:
```bash
npm run dev
```

Open your browser and go to `http://localhost:5173` to use the app.
