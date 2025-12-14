import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
          .map((char, index) => {
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

const Contact = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section 
      id="contact" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #000000 0%, #762221 100%)',
      }}
    >
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Side - Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-primary font-bold text-secondary leading-tight">
              Got an Idea?
              <br />
              <span className="text-secondary/80">I'm Ready When You Are</span>
            </h2>
          </motion.div>

          {/* Right Side - Contact Info Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-0"
          >
            {/* Location */}
            <div className="border-t border-secondary/20 py-6">
              <h3 className="text-xs md:text-sm font-primary font-bold text-secondary/60 uppercase tracking-widest mb-4">
                Location
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-base md:text-lg font-primary text-secondary uppercase cursor-default"
                    onMouseEnter={() => setHoveredItem('manila')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <ScrambleText text="MANILA" isHovered={hoveredItem === 'manila'} /> <span className="text-secondary/50">[PH]</span>
                  </span>
                  <span className="text-xs md:text-sm font-primary text-secondary/50">
                    14.5995° N | 120.9842° E
                  </span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="border-t border-secondary/20 py-6">
              <h3 className="text-xs md:text-sm font-primary font-bold text-secondary/60 uppercase tracking-widest mb-4">
                Email
              </h3>
              <div className="flex items-center justify-between">
                <a 
                  href="mailto:cdrvldz@gmail.com"
                  className="text-base md:text-lg font-primary text-secondary uppercase hover:text-accent-red transition-colors duration-300"
                >
                cdrvldz@gmail.com
                </a>
                <a
                  href="mailto:juliancedricvaldez@gmail.com"
                  className="text-xs md:text-sm font-primary text-secondary/50 hover:text-secondary transition-colors duration-300 uppercase"
                >
                  Drop me a message
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="border-t border-secondary/20 py-6">
              <h3 className="text-xs md:text-sm font-primary font-bold text-secondary/60 uppercase tracking-widest mb-4">
                Socials
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <a 
                    href="https://www.facebook.com/juliancedric.valdez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-primary text-secondary uppercase cursor-pointer hover:text-accent-red transition-colors duration-300"
                    onMouseEnter={() => setHoveredItem('facebook')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <ScrambleText text="FACEBOOK" isHovered={hoveredItem === 'facebook'} />
                  </a>
                  <a
                    href="https://www.facebook.com/juliancedric.valdez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-primary text-secondary/50 hover:text-secondary transition-colors duration-300 uppercase"
                  >
                    facebook.com/juliancedric.valdez
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <a 
                    href="https://www.upwork.com/freelancers/~018a01d4401f5ebd49"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-primary text-secondary uppercase cursor-pointer hover:text-accent-red transition-colors duration-300"
                    onMouseEnter={() => setHoveredItem('upwork')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <ScrambleText text="UPWORK" isHovered={hoveredItem === 'upwork'} />
                  </a>
                  <a
                    href="https://www.upwork.com/freelancers/~018a01d4401f5ebd49"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-primary text-secondary/50 hover:text-secondary transition-colors duration-300 uppercase"
                  >
                    upwork.com/freelancers/~018a01d4401f5ebd49
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <a 
                    href="https://www.instagram.com/cdrvaldez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-primary text-secondary uppercase cursor-pointer hover:text-accent-red transition-colors duration-300"
                    onMouseEnter={() => setHoveredItem('instagram')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <ScrambleText text="INSTAGRAM" isHovered={hoveredItem === 'instagram'} />
                  </a>
                  <a
                    href="https://www.instagram.com/cdrvaldez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-primary text-secondary/50 hover:text-secondary transition-colors duration-300 uppercase"
                  >
                    instagram.com/cdrvaldez/
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Border */}
            <div className="border-t border-secondary/20"></div>
          </motion.div>
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-24 text-center"
        >
          <p className="text-xs md:text-sm font-primary text-secondary/40 uppercase tracking-wide">
            WTF? WHAT THE FREAK! © 2025
          </p>
          <p className="text-xs md:text-sm font-primary text-secondary/40 uppercase tracking-wide mt-2">
            Made with ❤️ and procrastination
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
