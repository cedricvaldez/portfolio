# Components Documentation

Detailed documentation for all components in the portfolio website.

## Table of Contents
- [Hero](#hero)
- [About](#about)
- [Work](#work)
- [Services](#services)
- [Contact](#contact)
- [ScrollLogo (Navbar)](#scrolllogo-navbar)

---

## Hero

**Location**: `src/components/Hero/Hero.tsx`

### Purpose
Landing section that serves as the first impression. Full-screen introduction with animated text and smooth transitions.

### Features
- Full viewport height display
- Animated text reveals with Framer Motion
- Responsive typography scaling
- Section ID for smooth navigation

### Props
None - standalone component

### Key Code Patterns
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

### Customization
- Edit text content directly in the component
- Adjust animation timing via `transition` prop
- Modify responsive text sizes in Tailwind classes

---

## About

**Location**: `src/components/About/About.tsx`

### Purpose
Personal introduction section with progressive text reveal and typewriter animation for the heading.

### Features
- **Typewriter Effect**: Heading animates character by character
- **Blinking Cursor**: Visual indicator during typewriter animation
- **Progressive Text Reveal**: Content fades in while scrolling
- **One-time Animation**: `hasAnimated` state prevents re-animation

### State Management
```tsx
const [displayedText, setDisplayedText] = useState('');
const [hasAnimated, setHasAnimated] = useState(false);
```

### Key Parameters
- **Character Delay**: 100ms per character
- **Animation Trigger**: On component mount
- **Cursor Blink**: CSS opacity animation

### Customization
```tsx
// Change typewriter speed
const timer = setTimeout(() => {
  // ... 
}, 100); // Change this value (milliseconds)

// Change heading text
const fullText = "Your Custom Heading";
```

---

## Work

**Location**: `src/components/Work/Work.tsx`

### Purpose
Showcase portfolio projects with expandable details, image slideshows, and custom cursor effects.

### Features
1. **4-Column Table Layout** (Desktop)
   - Year (2 cols) | Name (5 cols) | Category (4 cols) | +/- (1 col)

2. **Image Slideshow**
   - Auto-cycles every 3 seconds
   - Smooth fade transitions
   - Separate mobile component

3. **Custom Cursor**
   - Red dot indicator on row hover
   - Project image preview follows mouse
   - Hidden when project is expanded

4. **Expandable Details**
   - Description
   - Tech stack chips
   - Image slideshow

### Interfaces
```tsx
interface Project {
  id: number;
  year: string;
  name: string;
  category: string;
  link: string;
  description: string;
  techStack: string[];
  images: string[];
}
```

### State Management
```tsx
const [expandedId, setExpandedId] = useState<number | null>(null);
const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
const [hoveredProject, setHoveredProject] = useState<number | null>(null);
const [isHoveringRow, setIsHoveringRow] = useState(false);
```

### Custom Cursor Logic
```tsx
// Show custom cursor when:
// - Hovering over a project (hoveredProject !== null)
// - Not expanding that project (expandedId !== hoveredProject)
// - Not hovering over the row itself (isHoveringRow is true for red dot only)
```

### Image Slideshow Component
```tsx
const ImageSlideshow = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  // Render with fade transitions
};
```

### Adding New Projects
```tsx
const projects: Project[] = [
  {
    id: 1,
    year: '2025',
    name: 'PROJECT NAME',
    category: 'CATEGORY',
    link: 'https://project.com',
    description: 'Description here...',
    techStack: ['React', 'TypeScript'],
    images: [img1, img2] // Import images first
  },
  // Add more...
];
```

---

## Services

**Location**: `src/components/Services/Services.tsx`

### Purpose
Display service offerings with interactive hover effects (desktop) and accordion layout (mobile).

### Features
1. **Spotlight Hover Effect** (Desktop)
   - Dim all services on group hover (opacity-40)
   - Brighten hovered service (opacity-100)
   - Red accent on service name hover

2. **Accordion Layout** (Mobile)
   - Click to expand/collapse
   - +/- icons
   - Service name turns red when expanded

3. **Typewriter Animation**
   - "SERVICES." heading reveals character by character

4. **Zigzag Layout** (Desktop)
   - Alternating left/right alignment

### Interfaces
```tsx
interface Service {
  id: number;
  name: string;
  description: string;
}
```

### Spotlight Effect Implementation
```tsx
// Parent wrapper with named group
<div className="group/services">
  {/* Each service */}
  <motion.div className="group-hover/services:opacity-40 hover:!opacity-100">
    <h3 className="group-hover/services:text-accent-red">
      {service.name}
    </h3>
  </motion.div>
</div>
```

### Mobile Accordion
```tsx
const [expandedId, setExpandedId] = useState<number | null>(null);

// Toggle function
const toggleExpand = (id: number) => {
  setExpandedId(expandedId === id ? null : id);
};
```

### Adding New Services
```tsx
const services: Service[] = [
  {
    id: 1,
    name: 'SERVICE NAME',
    description: 'Service description here...'
  },
  // Add more...
];
```

---

## Contact

**Location**: `src/components/Contact/Contact.tsx`

### Purpose
Contact information section with gradient background, scramble text effects, and social links.

### Features
1. **Gradient Background**
   - Black to dark red gradient
   - Creates dramatic visual impact

2. **Scramble Text Effect**
   - Random letter scrambling on hover
   - Applied to: MANILA, FACEBOOK, UPWORK, INSTAGRAM

3. **Two-Column Layout**
   - Left: Main heading
   - Right: Contact information table

4. **Clickable Social Labels**
   - Social names are links
   - Hover turns text red
   - Maintains scramble effect

### ScrambleText Component
```tsx
const ScrambleText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index]; // Revealed character
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3; // Gradual reveal
    }, 30); // 30ms interval

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
};
```

### Gradient Implementation
```tsx
<section 
  style={{
    background: 'linear-gradient(to bottom, #000000 0%, #762221 100%)',
  }}
>
```

### State Management
```tsx
const [hoveredItem, setHoveredItem] = useState<string | null>(null);

// Usage
<span
  onMouseEnter={() => setHoveredItem('facebook')}
  onMouseLeave={() => setHoveredItem(null)}
>
  <ScrambleText text="FACEBOOK" isHovered={hoveredItem === 'facebook'} />
</span>
```

### Updating Contact Information
```tsx
// Location
<ScrambleText text="MANILA" isHovered={hoveredItem === 'manila'} />
<span>14.5995° N | 120.9842° E</span>

// Email
<a href="mailto:your@email.com">your@email.com</a>

// Socials - Now clickable
<a href="https://facebook.com/yourprofile">
  <ScrambleText text="FACEBOOK" isHovered={hoveredItem === 'facebook'} />
</a>
```

---

## ScrollLogo (Navbar)

**Location**: `src/components/UI/ScrollLogo.tsx`

### Purpose
Sticky navigation bar that appears after scrolling, with scramble text effects on hover.

### Features
1. **Scroll Detection**
   - Appears after 300px scroll
   - Sticky positioning at top

2. **Scramble Text Effect**
   - All navigation buttons scramble on hover
   - Same effect as Contact section

3. **Smooth Navigation**
   - Scrolls to section IDs
   - Custom scrollToSection function

4. **Backdrop Blur**
   - Semi-transparent background
   - Blur effect for depth

### Navigation Items
```tsx
const navItems = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'WORK' },
  { id: 'services', label: 'SERVICES' },
  { id: 'contact', label: 'CONTACT' }
];
```

### Scroll Detection
```tsx
const { scrollY } = useScroll();
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const unsubscribe = scrollY.on('change', (latest) => {
    setIsScrolled(latest > 300);
  });
  return () => unsubscribe();
}, [scrollY]);
```

### Smooth Scroll Implementation
```tsx
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
```

### State Management
```tsx
const [hoveredButton, setHoveredButton] = useState<string | null>(null);

// Usage
<button
  onMouseEnter={() => setHoveredButton(item.label)}
  onMouseLeave={() => setHoveredButton(null)}
>
  <ScrambleText 
    text={item.label} 
    isHovered={hoveredButton === item.label} 
  />
</button>
```

### Styling Classes
```tsx
className={`
  fixed top-0 left-0 w-full z-50
  bg-primary/95 backdrop-blur-sm
  border-b border-secondary/10
  transition-transform duration-300
  ${isScrolled ? 'translate-y-0' : '-translate-y-full'}
`}
```

---

## Common Animation Patterns

### Fade In on Scroll
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

### Staggered Children
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
>
```

### Conditional Rendering with Animation
```tsx
{isExpanded && (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Content */}
  </motion.div>
)}
```

---

## Performance Optimization Tips

1. **Viewport Once**
   - Use `viewport={{ once: true }}` to prevent re-animation on scroll

2. **Cleanup Intervals**
   - Always return cleanup functions in useEffect
   ```tsx
   return () => clearInterval(interval);
   ```

3. **Conditional Animation**
   - Use state flags like `hasAnimated` to prevent unnecessary animations

4. **Image Optimization**
   - Use appropriate image formats (WebP when possible)
   - Compress images before importing

5. **Lazy Loading**
   - Framer Motion's `whileInView` provides built-in viewport detection

---

## Troubleshooting

### Typewriter not animating
- Check if `hasAnimated` state is preventing re-animation
- Verify useEffect dependencies

### Cursor not following mouse
- Ensure `onMouseMove` is attached to correct element
- Check z-index of cursor element
- Verify `pointer-events-none` class on cursor

### Scramble effect not working
- Confirm hover state is toggling correctly
- Check if `isHovered` prop is passed correctly
- Verify characters constant includes desired letters

### Slideshow not cycling
- Check if images array has multiple items
- Verify interval is not being cleared prematurely
- Ensure modulo operation is correct

---

**Last Updated**: December 14, 2025
