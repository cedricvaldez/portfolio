import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scramble text effect component
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
          .map((_char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
};

const ScrollLogo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 300);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-secondary/10"
    >
      <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="relative cursor-pointer" onClick={() => scrollToSection('hero')}>
          <h2 className="text-2xl md:text-3xl font-primary font-bold text-secondary leading-none">
            cdr.
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => setHoveredButton('home')}
            onMouseLeave={() => setHoveredButton(null)}
            className="text-sm md:text-base font-primary text-secondary/70 hover:text-accent-red transition-colors duration-300 uppercase"
          >
            <ScrambleText text="HOME" isHovered={hoveredButton === 'home'} />
          </button>
          <button
            onClick={() => scrollToSection('about')}
            onMouseEnter={() => setHoveredButton('about')}
            onMouseLeave={() => setHoveredButton(null)}
            className="text-sm md:text-base font-primary text-secondary/70 hover:text-accent-red transition-colors duration-300 uppercase"
          >
            <ScrambleText text="ABOUT" isHovered={hoveredButton === 'about'} />
          </button>
          <button
            onClick={() => scrollToSection('work')}
            onMouseEnter={() => setHoveredButton('work')}
            onMouseLeave={() => setHoveredButton(null)}
            className="text-sm md:text-base font-primary text-secondary/70 hover:text-accent-red transition-colors duration-300 uppercase"
          >
            <ScrambleText text="WORK" isHovered={hoveredButton === 'work'} />
          </button>
          <button
            onClick={() => scrollToSection('services')}
            onMouseEnter={() => setHoveredButton('services')}
            onMouseLeave={() => setHoveredButton(null)}
            className="text-sm md:text-base font-primary text-secondary/70 hover:text-accent-red transition-colors duration-300 uppercase"
          >
            <ScrambleText text="SERVICES" isHovered={hoveredButton === 'services'} />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            onMouseEnter={() => setHoveredButton('contact')}
            onMouseLeave={() => setHoveredButton(null)}
            className="text-sm md:text-base font-primary text-secondary/70 hover:text-accent-red transition-colors duration-300 uppercase"
          >
            <ScrambleText text="CONTACT" isHovered={hoveredButton === 'contact'} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default ScrollLogo;
