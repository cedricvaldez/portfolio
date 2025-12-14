# cdrvaldez. Portfolio Website

A modern, minimalist portfolio website built with React, TypeScript, and Framer Motion. Features interactive animations, custom cursor effects, and smooth scroll experiences.

![Portfolio Preview](https://img.shields.io/badge/Built%20with-React-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Features

### Interactive Animations
- **Typewriter Effect**: Animated text revealing for section headings
- **Scramble Text Effect**: Random letter scrambling on hover for navigation and contact labels
- **Spotlight Hover**: Dynamic opacity effects on services section
- **Custom Cursor**: Project image preview follows cursor with red dot indicator

### Sections
- **Hero**: Full-screen introduction with animated text
- **About**: Personal introduction with progressive text reveal
- **Work**: Project showcase with expandable details and image slideshows
- **Services**: Service offerings with accordion layout for mobile
- **Contact**: Gradient background section with social links and contact information

### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Accordion layouts for mobile views
- Smooth transitions between breakpoints

### Performance
- Optimized animations with Framer Motion
- Smooth scrolling with Lenis
- Lazy loading and viewport-triggered animations

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lenis** - Smooth scroll library

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd cdr
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## 🏗️ Project Structure

```
cdr/
├── src/
│   ├── components/
│   │   ├── About/
│   │   │   ├── About.tsx          # About section with typewriter effect
│   │   │   └── index.ts
│   │   ├── Contact/
│   │   │   ├── Contact.tsx        # Contact section with gradient & scramble effects
│   │   │   └── index.ts
│   │   ├── Hero/
│   │   │   ├── Hero.tsx           # Landing section
│   │   │   └── index.ts
│   │   ├── Services/
│   │   │   ├── Services.tsx       # Services with spotlight hover & accordion
│   │   │   └── index.ts
│   │   ├── UI/
│   │   │   ├── ScrollLogo.tsx     # Sticky navbar with scramble effects
│   │   │   └── index.ts
│   │   └── Work/
│   │       ├── Work.tsx           # Projects with custom cursor & slideshow
│   │       └── index.ts
│   ├── assets/
│   │   ├── images/                # Project images
│   │   └── logos/                 # Logo assets & favicon
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite configuration
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: '#000000',           // Black background
  secondary: '#f4f4f9',         // Light text
  'accent-red': '#e3342e',      // Accent color
  'accent-dark-red': '#762221', // Dark accent
}
```

### Content

#### Update Personal Information
- Edit [src/components/About/About.tsx](src/components/About/About.tsx) for bio content
- Edit [src/components/Contact/Contact.tsx](src/components/Contact/Contact.tsx) for contact details and social links

#### Add Projects
Edit [src/components/Work/Work.tsx](src/components/Work/Work.tsx):

```typescript
const projects: Project[] = [
  {
    id: 1,
    year: '2025',
    name: 'YOUR PROJECT NAME',
    category: 'WEB DESIGN / DEVELOPMENT',
    link: 'https://yourproject.com',
    description: 'Project description here...',
    techStack: ['React', 'TypeScript', 'Tailwind'],
    images: [image1, image2] // Import your images first
  },
  // Add more projects...
];
```

#### Update Services
Edit [src/components/Services/Services.tsx](src/components/Services/Services.tsx):

```typescript
const services: Service[] = [
  {
    id: 1,
    name: 'YOUR SERVICE',
    description: 'Service description here...'
  },
  // Add more services...
];
```

### Favicon
Replace [src/assets/logos/favicon-c.png](src/assets/logos/favicon-c.png) with your own favicon.

### Fonts
The site uses system fonts. To add custom fonts, update [src/index.css](src/index.css):

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy with default settings

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/cdr",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## 💡 Key Features Explained

### Typewriter Animation
Progressively reveals text character by character with a blinking cursor. Used in:
- About section heading
- Work section heading
- Services section heading

### Scramble Text Effect
Randomly cycles through letters before revealing the actual text on hover. Used in:
- Navigation menu items
- Contact section labels (MANILA, FACEBOOK, etc.)

### Custom Cursor
In the Work section, hovering over project names displays a red dot cursor and shows a preview image that follows your mouse.

### Spotlight Effect
In the Services section, hovering over one service dims others (opacity-40) while keeping the hovered service bright (opacity-100).

### Image Slideshow
Projects with multiple images automatically cycle through them every 3 seconds with smooth fade transitions.

## 📚 Additional Documentation

For detailed component documentation, see [COMPONENTS.md](COMPONENTS.md).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Julian Cedric Valdez**
- Website: [cdrvaldez.com](https://cdrvaldez.com)
- Email: cdrvldz@gmail.com
- Facebook: [@juliancedric.valdez](https://facebook.com/juliancedric.valdez)
- Instagram: [@cdrvaldez](https://instagram.com/cdrvaldez)
- Upwork: [Profile](https://www.upwork.com/freelancers/~018a01d4401f5ebd49)

## 🙏 Acknowledgments

- Design inspiration from [evmdsgn.com](https://evmdsgn.com)
- Built with modern web technologies and best practices
- Animation patterns inspired by contemporary web design trends

---

**Made with ❤️ and procrastination**

3. ⏳ About Section
4. ⏳ Services Section
5. ⏳ Contact Section
6. ⏳ Final Polish

---

Built with ❤️ using modern web technologies

