# News Aggregator

A modern news aggregator built with React that pulls articles from various trusted sources and displays them in a clean, easy-to-read format.

## Features

- Search articles by keyword
- Filter articles by date, category, and source
- Personalized news feed with customizable sources and categories
- Mobile-responsive design
- Clean and modern UI
- Real-time updates using React Query
- State management with Zustand
- Docker support

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 9 or later

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your API keys:
   ```
   VITE_GUARDIAN_API_KEY=
   VITE_NYT_API_KEY=
   VITE_BBC_API_KEY=
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Docker

To run the application using Docker:

1. Build the image:
   ```bash
   docker build -t news-aggregator .
   ```

2. Run the container:
   ```bash
   docker run -p 4173:4173 news-aggregator
   ```

The application will be available at http://localhost:4173

## Architecture

The application follows a clean architecture pattern with the following structure:

- `/src/components`: React components
- `/src/services`: API integration and data fetching
- `/src/store`: State management using Zustand
- `/src/types`: TypeScript type definitions

## API Integration

The application integrates with the following news sources:
- The Guardian
- New York Times
- BBC News

Each API has its own implementation in the `services/api.ts` file.

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- React Query
- Zustand
- Axios
- date-fns
- Lucide React icons
- Vite