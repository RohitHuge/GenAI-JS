# ClickCraft - AI Thumbnail Generator

A modern React application for generating AI-powered thumbnails with an intuitive user interface and beautiful design.

## Features

### 🎨 **Thumbnail Generation Flow**
1. **Mode Selection** - Choose between generating with or without a photo
2. **Prompt Input** - Describe your thumbnail vision with text
3. **Image Upload** - Optionally upload an image for inspiration
4. **AI Questions** - Answer style and preference questions
5. **Thumbnail Generation** - AI creates 3 unique thumbnails
6. **Download Options** - PNG, JPG, or ZIP download formats

### 🌓 **Theme System**
- **Light Mode** - Soft gradients from lilac to pink lavender
- **Dark Mode** - Rich Russian violet with neon effects
- **Auto-save** - Remembers user preference in localStorage

### ✨ **UI/UX Features**
- **Responsive Design** - Works on all device sizes
- **Microinteractions** - Smooth animations and hover effects
- **Accessibility** - Full keyboard navigation and screen reader support
- **Toast Notifications** - Success/error feedback
- **Form Validation** - Required field checking
- **Progress Indicators** - Visual feedback during AI processing

## Tech Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Context API** - State management
- **LocalStorage** - Data persistence

## Custom Color Palette

The app uses a carefully crafted color scheme:

```js
// Light Mode
- Primary: ultra_violet-500 (#5e548e)
- Secondary: african_violet-500 (#9f86c0)
- Accent: lilac-500 (#be95c4) to pink_lavender-500 (#e0b1cb)

// Dark Mode
- Background: russian_violet-500 (#231942)
- Cards: russian_violet-400 (#1c1435)
- Borders: ultra_violet-600 (#44307f)
- Text: lilac-300 (#d8c0dc)
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build
```bash
npm run build
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ThemeContext.jsx     # Dark/light mode management
│   ├── ThumbnailContext.jsx # Thumbnail generation state
│   ├── Modal.jsx            # Accessible modal component
│   ├── LoadingSpinner.jsx   # Progress indicator
│   └── Toast.jsx            # Notification system
├── pages/               # Page components
│   ├── Home.jsx             # Landing page
│   └── ThumbnailGenerator.jsx # Main thumbnail generator
├── App.jsx              # Main app with routing
└── index.css            # Global styles and Tailwind
```

## Usage

### 1. **Home Page** (`/`)
- Welcome screen with app overview
- Click "Start Creating Thumbnails" to begin

### 2. **Mode Selection**
- **With Photo**: Upload an image for AI inspiration
- **Just Prompt**: Describe your thumbnail with text only

### 3. **Prompt Input**
- Enter detailed description of desired thumbnail
- Upload image if "With Photo" mode selected
- Click "Generate Thumbnail" to proceed

### 4. **Answer Questions**
- AI presents 3 questions about style preferences
- Choose from quick options or write custom answers
- Click "Submit All Answers" when done

### 5. **View Results**
- Browse 3 AI-generated thumbnails
- Click thumbnails to enlarge
- Download individual images (PNG/JPG)
- Download all as ZIP file
- Copy to clipboard functionality

## State Management

The app uses React Context API for state management:

- **ThemeContext**: Manages dark/light mode
- **ThumbnailContext**: Handles the entire thumbnail generation flow
- **LocalStorage Sync**: Automatically saves progress

## Accessibility Features

- **Keyboard Navigation**: Full tab support
- **Focus Management**: Proper focus trapping in modals
- **Screen Reader**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG compliant color combinations
- **Escape Key**: Close modals with Esc key

## Customization

### Adding New Questions
Modify the `mockQuestions` array in `ThumbnailGenerator.jsx`:

```js
const mockQuestions = [
  {
    id: 4,
    q: "What mood should it convey?",
    options: ["Happy", "Serious", "Mysterious", "Energetic"],
    answer: ""
  }
];
```

### Changing Colors
Update the custom colors in `tailwind.config.js`:

```js
extend: {
  colors: {
    your_color: {
      DEFAULT: '#your-hex',
      100: '#lighter-shade',
      // ... more shades
    }
  }
}
```

## Future Enhancements

- **Real API Integration** - Replace mock data with actual AI services
- **Image Editing** - Basic cropping and adjustment tools
- **Templates** - Pre-designed thumbnail layouts
- **Batch Processing** - Generate multiple thumbnails at once
- **Export Options** - More file formats and sizes
- **User Accounts** - Save and manage thumbnail history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using React and Tailwind CSS
