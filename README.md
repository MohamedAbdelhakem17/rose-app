# Rose App

A modern Next.js application with a comprehensive design system and reusable UI components.

## 🎨 Design System

This project includes a carefully crafted design system with the following color palette:

### Color Palette

- **Maroon**: `#fbeaea` to `#20090c` (11 shades)
- **Red**: `#fef2f2` to `#450a0a` (11 shades)
- **Pink**: `#fff0f8` to `#340021` (11 shades)
- **Soft Pink**: `#fff1f5` to `#590414` (11 shades)
- **Blue**: `#eff6ff` to `#162456` (11 shades)
- **Emerald**: `#ecfdf5` to `#002c22` (11 shades)
- **Yellow**: `#fefce8` to `#422006` (11 shades)
- **Zinc**: `#fafafa` to `#090906` (11 shades)

Each color includes 11 shades (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) for consistent design implementation.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Code Quality**: Prettier, ESLint
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
├── components/
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MainLayout.tsx
│   │   └── Section.tsx
│   ├── providers/         # Context providers
│   │   └── ThemeProvider.tsx
│   └── shared/            # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       ├── Label.tsx
│       └── index.ts
├── hooks/                 # Custom React hooks
├── i18n/                  # Internationalization
├── lib/                   # Utilities and configurations
│   ├── apis/             # API utilities
│   ├── constants/        # App constants
│   ├── schemes/          # Validation schemas
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
└── styles/               # Global styles
```

## 🎯 UI Components

### Available Components

- **Button**: Multiple variants including design system colors
- **Input**: Form input with error states and helper text
- **Textarea**: Multi-line text input with validation
- **Card**: Container component with header, content, and footer
- **Badge**: Status and label indicators
- **Label**: Form labels with required field indicators

### Usage Example

```tsx
import { Button, Input, Card, CardContent } from '@/components/shared';

export function ExampleComponent() {
  return (
    <Card>
      <CardContent>
        <Input placeholder='Enter your name' />
        <Button variant='maroon' size='lg'>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Styling

### Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Design system colors integrated
- Custom CSS variables for theming
- Responsive design utilities
- Dark mode support

### CSS Variables

The project uses CSS variables for consistent theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 20 14.3% 4.1%;
  --primary: 24 9.8% 10%;
  /* ... more variables */
}
```

## 🔧 Development

### Code Formatting

The project uses Prettier for code formatting:

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

### Linting

ESLint is configured for code quality:

```bash
pnpm lint
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🌙 Theme Support

The application supports both light and dark themes using Next.js themes:

```tsx
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export function App() {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design principles using Tailwind CSS breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚀 Deployment

The application is ready for deployment on Vercel, Netlify, or any other platform that supports Next.js.

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
