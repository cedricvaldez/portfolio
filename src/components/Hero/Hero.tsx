import { motion, useScroll, useTransform } from 'framer-motion';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';
import { useRef } from 'react';
import PhotoTrail from './PhotoTrail';

const Hero = () => {
  const roles = ['Front-End Developer', 'UI/UX Designer'];
  const currentRole = useTypingAnimation({
    words: roles,
    typingSpeed: 80,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  // Scroll animation for logo and tagline
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Logo text shrinks and moves to top-left (0-20% scroll)
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const logoX = useTransform(scrollYProgress, [0, 0.2], [0, -450]);
  const logoY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Tagline moves up and scales down with logo
  const taglineScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const taglineY = useTransform(scrollYProgress, [0, 0.2], [0, -350]);
  const taglineX = useTransform(scrollYProgress, [0, 0.2], [0, -250]);
  
  // CTA button moves up and scales down with logo
  const ctaScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);
  const ctaY = useTransform(scrollYProgress, [0, 0.2], [0, -420]);
  const ctaX = useTransform(scrollYProgress, [0, 0.2], [0, -250]);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen bg-primary flex items-start justify-center overflow-hidden pt-8 md:pt-12"
    >
      {/* Yellow accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 w-full relative">
        
        {/* Left Side - Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between min-h-[calc(100vh-4rem)] w-full gap-16 max-w-3xl"
        >
          {/* Logo Text - Shrinks and moves to top-left on scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              scale: logoScale,
              x: logoX,
              y: logoY,
            }}
            className="relative origin-top-left"
          >
            <h1 className="font-primary font-bold text-secondary leading-none whitespace-nowrap overflow-visible" style={{ letterSpacing: '-0.10em', fontSize: 'clamp(5rem, 16vw, 15rem)' }}>
              cdrvaldez<span style={{ marginLeft: '-0.15em' }}>.</span>
            </h1>
          </motion.div>

          {/* Photo Trail - Shows between logo and tagline on mobile/tablet */}
          <div className="lg:hidden">
            <PhotoTrail />
          </div>

          {/* Bottom Section - Tagline and CTA */}
          <div className="space-y-6 pb-8">
          {/* Tagline with Typing Animation - Moves up with logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              scale: taglineScale,
              y: taglineY,
              x: taglineX,
            }}
            className="space-y-2 origin-top-left"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-secondary font-light text-secondary leading-relaxed whitespace-nowrap">
              Freelance{' '}
              <span className="inline-block min-w-[280px] text-left">
                <span className="text-accent-red font-semibold">
                  {currentRole}
                  <span className="animate-pulse">|,</span>
                </span>
              </span>
              <br />
              <span className="text-secondary/90">from the lovely Philippines</span>
            </h2>
          </motion.div>

          {/* CTA Button - Moves up and scales down */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              scale: ctaScale,
              y: ctaY,
              x: ctaX,
            }}
            className="origin-top-left"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-between px-8 py-6 bg-secondary text-primary rounded-full font-secondary font-semibold text-xl hover:bg-accent-red hover:text-secondary transition-all duration-300 transform hover:scale-105 min-w-[280px]"
            >
              Get in touch
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </a>
          </motion.div>
          </div>
        </motion.div>

        {/* Photo Trail Animation - Shows bottom right on desktop only */}
        <div className="hidden lg:block">
          <PhotoTrail />
        </div>
      </div>
    </section>
  );
};

export default Hero;
