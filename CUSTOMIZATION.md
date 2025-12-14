# Customization Guide

Complete guide to customizing your portfolio website.

## Table of Contents
- [Colors & Branding](#colors--branding)
- [Typography](#typography)
- [Content Updates](#content-updates)
- [Adding Projects](#adding-projects)
- [Updating Services](#updating-services)
- [Contact Information](#contact-information)
- [Animation Timing](#animation-timing)
- [Layout Adjustments](#layout-adjustments)

---

## Colors & Branding

### Primary Colors

Edit `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#000000',           // Main background color
        secondary: '#f4f4f9',         // Text color
        'accent-red': '#e3342e',      // Accent/highlight color
        'accent-dark-red': '#762221', // Dark accent (gradient)
      },
    },
  },
};
```

### Where Colors Are Used

| Color | Usage |
|-------|-------|
| `primary` | Background, navbar |
| `secondary` | All text content |
| `accent-red` | Hover states, active elements |
| `accent-dark-red` | Contact section gradient |

### Changing the Gradient

Contact section gradient in [src/components/Contact/Contact.tsx](src/components/Contact/Contact.tsx):

```tsx
<section 
  style={{
    background: 'linear-gradient(to bottom, #000000 0%, #762221 100%)',
    //           Change direction ↑      Start ↑   End ↑   Stop ↑
  }}
>
```

Options:
- Direction: `to bottom`, `to right`, `to top-right`, etc.
- Add more stops: `#000000 0%, #333333 50%, #762221 100%`

---

## Typography

### System Fonts

Current setup uses system fonts. Edit [src/index.css](src/index.css):

```css
@layer base {
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
}
```

### Adding Custom Fonts

#### Option 1: Google Fonts

1. Add import to [src/index.css](src/index.css):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

@layer base {
  body {
    font-family: 'Inter', sans-serif;
  }
}
```

2. Update Tailwind config:
```javascript
fontFamily: {
  primary: ['Inter', 'sans-serif'],
},
```

#### Option 2: Self-Hosted Fonts

1. Add font files to `src/assets/fonts/`

2. Add font-face in [src/index.css](src/index.css):
```css
@font-face {
  font-family: 'CustomFont';
  src: url('./assets/fonts/CustomFont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
```

3. Use in Tailwind:
```javascript
fontFamily: {
  primary: ['CustomFont', 'sans-serif'],
},
```

### Font Sizes

Responsive text sizes use Tailwind's responsive utilities:

```tsx
// Small on mobile, larger on desktop
<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
```

Customize breakpoints in `tailwind.config.js`:

```javascript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
},
```

---

## Content Updates

### Hero Section

Edit [src/components/Hero/Hero.tsx](src/components/Hero/Hero.tsx):

```tsx
<h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
  YOUR NAME
</h1>
<p className="text-lg md:text-xl lg:text-2xl">
  Your tagline or role
</p>
```

### About Section

Edit [src/components/About/About.tsx](src/components/About/About.tsx):

```tsx
// Typewriter heading
const fullText = "Your Custom Heading";

// Bio paragraph
<p className="text-base md:text-lg lg:text-xl">
  Your bio text here...
</p>
```

#### Typewriter Speed

```tsx
const timer = setTimeout(() => {
  // ...
}, 100); // milliseconds per character (lower = faster)
```

---

## Adding Projects

### Step 1: Add Images

1. Place project images in `src/assets/images/`
2. Import in [src/components/Work/Work.tsx](src/components/Work/Work.tsx):

```tsx
import projectImg1 from '../assets/images/project1.png';
import projectImg2 from '../assets/images/project2.png';
```

### Step 2: Add Project Data

```tsx
const projects: Project[] = [
  {
    id: 1, // Unique ID
    year: '2025',
    name: 'PROJECT NAME',
    category: 'WEB DESIGN / DEVELOPMENT',
    link: 'https://yourproject.com', // or '#' if no link
    description: `
      Detailed project description here.
      Explain the problem, solution, and impact.
    `,
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    images: [projectImg1, projectImg2] // Array of imported images
  },
  {
    id: 2,
    year: '2024',
    name: 'ANOTHER PROJECT',
    // ... more properties
  },
];
```

### Step 3: Image Requirements

**Recommended specs:**
- Format: PNG or JPG (WebP for better performance)
- Size: 1920x1080px or similar 16:9 aspect ratio
- File size: < 500KB (compress images)

**Compression tools:**
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

### Slideshow Timing

Change auto-cycle speed:

```tsx
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 3000); // milliseconds (3000 = 3 seconds)
  
  return () => clearInterval(interval);
}, [images]);
```

---

## Updating Services

Edit [src/components/Services/Services.tsx](src/components/Services/Services.tsx):

```tsx
const services: Service[] = [
  {
    id: 1,
    name: 'SERVICE NAME',
    description: `
      Detailed service description.
      Explain what you offer and the value you provide.
    `
  },
  {
    id: 2,
    name: 'ANOTHER SERVICE',
    description: '...'
  },
  // Add more services
];
```

### Service Layout

The component automatically handles:
- **Desktop**: Zigzag alternating layout (left/right)
- **Mobile**: Stacked accordion

No additional configuration needed!

---

## Contact Information

Edit [src/components/Contact/Contact.tsx](src/components/Contact/Contact.tsx):

### Heading

```tsx
<h2>
  Your Heading
  <br />
  <span>Your Subheading</span>
</h2>
```

### Location

```tsx
<ScrambleText text="YOUR CITY" isHovered={hoveredItem === 'location'} />
<span className="text-secondary/50">[COUNTRY CODE]</span>

<span className="text-xs md:text-sm">
  12.3456° N | 78.9012° E
</span>
```

Find coordinates: [Google Maps](https://maps.google.com) → Right-click location → Copy coordinates

### Email

```tsx
<a href="mailto:your@email.com">
  your@email.com
</a>

<a href="mailto:your@email.com">
  Your CTA Text
</a>
```

### Social Links

```tsx
<a 
  href="https://facebook.com/yourprofile"
  target="_blank"
  rel="noopener noreferrer"
>
  <ScrambleText text="FACEBOOK" isHovered={hoveredItem === 'facebook'} />
</a>

<a href="https://facebook.com/yourprofile">
  facebook.com/yourprofile
</a>
```

**Supported platforms**: Any! Just update the text and URL.

### Footer

```tsx
<p>
  Your Custom Footer Text
</p>
<p>
  Secondary Footer Line
</p>
```

---

## Animation Timing

### Typewriter Effect

**Location**: About, Work, Services sections

```tsx
const timer = setTimeout(() => {
  setDisplayedText(fullText.slice(0, currentIndex));
  setCurrentIndex((prev) => prev + 1);
}, 100); // Speed in milliseconds
```

- Lower = faster (50ms = very fast)
- Higher = slower (200ms = very slow)
- Recommended: 80-120ms

### Scramble Effect

**Location**: Navbar, Contact section

```tsx
const interval = setInterval(() => {
  // ...scrambling logic
  iterations += 1 / 3; // Reveal speed
}, 30); // Scramble speed in milliseconds
```

**Adjust reveal speed:**
- `iterations += 1` - Instant reveal (no scramble)
- `iterations += 1/2` - Fast reveal
- `iterations += 1/3` - Normal (current)
- `iterations += 1/5` - Slow reveal

**Adjust scramble speed:**
- 20ms = very fast scrambling
- 30ms = normal (current)
- 50ms = slower, more visible

### Fade-in Animations

**Location**: All sections

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ 
    duration: 0.8,  // Animation length in seconds
    delay: 0.2,     // Delay before starting
    ease: [0.22, 1, 0.36, 1] // Easing curve
  }}
>
```

**Common easing curves:**
- `[0.22, 1, 0.36, 1]` - Smooth (current)
- `"easeInOut"` - Standard
- `"easeOut"` - Starts fast, ends slow
- `[0.76, 0, 0.24, 1]` - Snappy

### Disable "Once" Animation

To animate every time element enters viewport:

```tsx
viewport={{ once: false }} // Re-animates on each scroll
```

---

## Layout Adjustments

### Section Padding

Adjust spacing around sections:

```tsx
// Current
<div className="py-16 md:py-24">

// Tighter spacing
<div className="py-8 md:py-12">

// More spacious
<div className="py-24 md:py-32">
```

### Container Width

Control max-width of content:

```tsx
// Current
<div className="container mx-auto px-6 md:px-12">

// Wider
<div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">

// Narrower
<div className="container mx-auto px-8 md:px-16 max-w-6xl">
```

### Grid Layouts

Contact section uses 2-column grid:

```tsx
// Current
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

// Change breakpoint
<div className="grid grid-cols-1 md:grid-cols-2"> // Splits at 768px

// Adjust gap
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> // Smaller gap
```

### Responsive Breakpoints

| Class | Screen Width |
|-------|--------------|
| `sm:` | ≥ 640px |
| `md:` | ≥ 768px |
| `lg:` | ≥ 1024px |
| `xl:` | ≥ 1280px |
| `2xl:` | ≥ 1536px |

Example usage:
```tsx
<div className="
  text-base      {/* Default (mobile) */}
  sm:text-lg     {/* Small screens and up */}
  md:text-xl     {/* Medium screens and up */}
  lg:text-2xl    {/* Large screens and up */}
">
```

---

## Favicon

### Replace Favicon

1. Create your favicon image (PNG recommended)
2. Save as `src/assets/logos/favicon-c.png`
3. Recommended size: 512x512px or 256x256px

The `index.html` already references this file:
```html
<link rel="icon" type="image/png" href="/src/assets/logos/favicon-c.png" />
```

### Multiple Sizes (Advanced)

For better browser support:

1. Create multiple sizes: 16x16, 32x32, 180x180, 512x512
2. Add to `index.html`:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

---

## Advanced: Custom Animations

### Create Reusable Animation Variants

```tsx
// In your component
const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeInVariants}
>
```

### Stagger Children Animation

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Delay between each child
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## Testing Your Changes

### Development

```bash
npm run dev
```

### Build & Preview

```bash
npm run build
npm run preview
```

### Check for Errors

```bash
npm run lint
```

---

## Need Help?

- Check [COMPONENTS.md](COMPONENTS.md) for detailed component documentation
- Review [README.md](README.md) for installation and setup
- Visit [Tailwind CSS Docs](https://tailwindcss.com/docs) for styling
- Visit [Framer Motion Docs](https://www.framer.com/motion/) for animations

---

**Last Updated**: December 14, 2025
