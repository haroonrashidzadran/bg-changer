# Professional Background Changer

A modern, professional React application that allows users to dynamically change the background color with a sleek glassmorphism design.

## Features

- **Professional Color Palette**: 10 carefully selected colors with sophisticated names
- **Full Viewport Design**: Takes complete advantage of screen real estate
- **Glassmorphism UI**: Modern semi-transparent header with backdrop blur
- **Smooth Animations**: Cubic-bezier transitions and hover effects
- **Responsive Design**: Adapts to mobile and desktop screens
- **Active State Indicators**: Visual feedback for selected colors
- **Color Information Display**: Shows both color names and hex codes

## Tech Stack

- **React 18** with Hooks (useState)
- **Vite** for fast development and building
- **CSS3** with modern features (backdrop-filter, grid, transitions)
- **ESLint** for code quality

## Installation

1. Clone the repository:
```bash
git clone https://github.com/haroonrashidzadran/bg-changer.git
cd bg-changer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

Simply click on any color button to instantly change the background color. The selected color is highlighted with a white glow effect, and the current color information is displayed in the header.

## Available Colors

- **Slate** (#1e293b)
- **Navy** (#1e40af)
- **Emerald** (#059669)
- **Violet** (#7c3aed)
- **Rose** (#e11d48)
- **Amber** (#d97706)
- **Teal** (#0d9488)
- **Indigo** (#4338ca)
- **Crimson** (#dc2626)
- **Charcoal** (#374151)

## Project Structure

```
bg-changer/
├── src/
│   ├── App.jsx          # Main component with useState logic
│   ├── App.css          # Professional styling
│   └── main.jsx         # React entry point
├── public/
├── package.json
└── README.md
```

## Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).