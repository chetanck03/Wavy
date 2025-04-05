# आदित्य Optimizer

A modern web application built with React and TypeScript, featuring a beautiful UI powered by Tailwind CSS and Radix UI components.

## 🚀 Technologies Used

### Core Technologies
- **React 18** - A JavaScript library for building user interfaces
- **TypeScript** - For type-safe code
- **Vite** - Next Generation Frontend Tooling
- **React Router DOM** - For client-side routing

### UI/UX
- **Tailwind CSS** - A utility-first CSS framework
- **Radix UI** - Unstyled, accessible components for building high‑quality design systems
- **Lucide React** - Beautiful & consistent icons
- **Recharts** - A composable charting library for React
- **Embla Carousel** - For carousel/slider components
- **Sonner** - Toast notifications
- **React Day Picker** - For date picking functionality

### Form Handling & Validation
- **React Hook Form** - For efficient form handling
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### State Management & Data Fetching
- **@tanstack/react-query** - For data fetching and caching
- **@clerk/clerk-react** - For authentication and user management

### Development Tools
- **ESLint** - For code linting
- **SWC** - For fast compilation
- **PostCSS** - For processing CSS
- **Autoprefixer** - For adding vendor prefixes

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components/pages
├── services/      # API and service integrations
├── lib/           # Utility functions and configurations
├── hooks/         # Custom React hooks
└── App.tsx        # Main application component
```

## 🛠️ Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/chetanck03/Wavy.git
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_api_url
VITE_CLERK_SECRET_KEY=your_api_url
```

4. Start the development server:
```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

The project uses a comprehensive set of UI components from Radix UI, including:
- Accordion
- Alert Dialog
- Avatar
- Dialog
- Dropdown Menu
- Navigation Menu
- Progress
- Tabs
- Toast
- And many more...

## 🔐 Authentication

Authentication is handled using Clerk, providing secure user management and authentication flows.

## 📊 Data Visualization

The project uses Recharts for data visualization, allowing for the creation of beautiful and interactive charts.

## 🎯 Key Features

- Modern React with TypeScript
- Component-based architecture
- Responsive design with Tailwind CSS
- Form validation with React Hook Form and Zod
- Data fetching with React Query
- Beautiful UI components from Radix UI
- Authentication with Clerk
- Data visualization with Recharts

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.
