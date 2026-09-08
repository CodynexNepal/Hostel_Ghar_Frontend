# Hostel Ghar Frontend

A modern web application for finding and booking hostels across Nepal.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Validation**: Yup
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library

## Project Structure

```
hostel-ghar-frontend/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (public)/      # Public pages
│   │   └── layout.tsx     # Root layout
│   ├── components/        # Reusable components
│   │   ├── ui/            # Atomic UI components
│   │   ├── navigation/    # Navigation components
│   │   ├── layout/        # Layout components
│   │   ├── sections/      # Page sections
│   │   └── providers/     # Context providers
│   ├── features/          # Feature-based modules
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   ├── types/             # TypeScript types
│   ├── constants/         # Constants
│   ├── config/            # Configuration files
│   ├── styles/            # Global styles
│   └── test/              # Test setup and utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd hostel-ghar-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Features

- 🏠 Browse hostels across Nepal
- 🔍 Advanced search and filtering
- 📱 Responsive design
- 📧 Contact and inquiry forms
- 📍 Location-based browsing
- 💰 Pricing comparison
- 🎨 Modern UI with Tailwind CSS

## Contributing

1. Create a new branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

This project is proprietary and confidential.
