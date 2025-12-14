import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface StorylineItem {
  id: number;
  text: string;
}

const storylineItems: StorylineItem[] = [
  {
    id: 1,
    text: "Hi, I'm Julian Cedric Valdez — developer, designer, and digital problem-solver. Graduated with a degree in Information Technology from San Beda College Alabang. I specialize in building React.js interfaces that feel smooth, modern, and intentional. But I'm no stranger to PHP, HTML, CSS, and classic web development—I build what the project needs.",
  },
  {
    id: 2,
    text: "I focus on clean code, fast performance, and pixel-perfect detail. My goal? To craft websites that clients love to own, and users love to navigate. If you've got an idea— I can turn it into a real, functional, beautiful digital product.",
  },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  const fullText = 'Who I Am,';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Typewriter effect
  useEffect(() => {
    if (!hasAnimated) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Type speed: 100ms per character

    return () => clearInterval(interval);
  }, [hasAnimated]);

  // Pre-calculate transforms for each storyline item
  const transforms = storylineItems.map((_, index) => {
    const totalSteps = storylineItems.length;
    const stepStart = index / totalSteps;
    const stepEnd = (index + 1) / totalSteps;
    
    const opacity = useTransform(
      scrollYProgress,
      [stepStart - 0.05, stepStart, stepEnd - 0.05, stepEnd],
      [0, 1, 1, 0]
    );

    return { opacity };
  });

  // FIN. opacity - fades in at the end, fades out when scrolling back
  const finOpacity = useTransform(
    scrollYProgress,
    [0.95, 0.98, 1],
    [0, 1, 1]
  );

  return (
    <div id="about" ref={containerRef} className="relative" style={{ height: `${storylineItems.length * 200}vh` }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen bg-primary flex items-center justify-center overflow-hidden">
        <div className="w-full px-8 md:px-16 lg:px-24">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setHasAnimated(true)}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-bold text-secondary leading-tight">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block"
              >
                {displayedText.length < fullText.length && '|'}
              </motion.span>
            </h2>
          </motion.div>

          {/* Text Container - Transitions happen here */}
          <div className="relative min-h-[300px] flex items-start justify-start max-w-7xl">
            {storylineItems.map((item, index) => {
              const characters = item.text.split('');
              const totalSteps = storylineItems.length;
              const stepStart = index / totalSteps;
              const stepEnd = (index + 1) / totalSteps;
              
              return (
                <motion.p
                  key={item.id}
                  style={{ opacity: transforms[index].opacity }}
                  className="absolute text-3xl md:text-4xl lg:text-5xl font-primary font-bold leading-relaxed text-justify"
                >
                  {characters.map((char, charIndex) => {
                    const totalChars = characters.length;
                    const charProgress = charIndex / totalChars;
                    const charStart = stepStart + charProgress * (stepEnd - stepStart) * 0.3;
                    const charPeak = stepStart + charProgress * (stepEnd - stepStart) * 0.6;
                    
                    const charOpacity = useTransform(
                      scrollYProgress,
                      [charStart, charPeak],
                      [0.25, 1]
                    );

                    return (
                      <motion.span
                        key={charIndex}
                        style={{ opacity: charOpacity }}
                        className="text-secondary"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </motion.p>
              );
            })}
            
            {/* FIN. - appears at the end */}
            <motion.p
              style={{ opacity: finOpacity }}
              className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl lg:text-8xl font-primary font-bold text-secondary"
            >
              FIN.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
