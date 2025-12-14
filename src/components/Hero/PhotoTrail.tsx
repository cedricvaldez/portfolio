import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Import images
import portrait1 from '../../assets/images/portrait-1.webp';
import portrait2 from '../../assets/images/portrait-2.webp';
import portrait3 from '../../assets/images/portrait-3.webp';
import portrait4 from '../../assets/images/portrait-4.webp';
import portrait5 from '../../assets/images/portrait-5.webp';
import portrait6 from '../../assets/images/portrait-6.webp';
import portrait7 from '../../assets/images/portrait-7.webp';

const images = [portrait1, portrait2, portrait3, portrait4, portrait5, portrait6, portrait7];

interface TrailImage {
  id: number;
  src: string;
  x: number;
  y: number;
}

const PhotoTrail = () => {
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAddTime = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  useSpring(mouseX, springConfig);
  useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseInside = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!mouseInside) {
        // Clear all photos when cursor leaves the area
        setTrail([]);
        return;
      }

      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      mouseX.set(relativeX);
      mouseY.set(relativeY);

      // Add new image to trail with velocity-based timing
      const now = Date.now();
      if (now - lastAddTime.current > 250) { // Add image every 250ms (increased from 150ms for more spread)
        lastAddTime.current = now;
        
        setTrail((prev) => {
          const newImage: TrailImage = {
            id: Date.now(),
            src: images[currentImageIndex],
            x: relativeX,
            y: relativeY,
          };

          // Keep only last 8 images
          const newTrail = [...prev, newImage].slice(-8);
          return newTrail;
        });

        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [currentImageIndex, mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-8 right-8 md:right-16 w-[800px] h-[375px] rounded-2xl overflow-hidden
                 lg:block lg:bottom-8 lg:right-8 lg:w-[800px] lg:h-[375px]
                 max-lg:relative max-lg:w-full max-lg:h-[200px] max-lg:mx-auto max-lg:my-8 max-lg:max-w-md max-lg:left-1/2 max-lg:-translate-x-1/2"
    >
      {/* Hidden Message - "Greetings!" in the middle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: trail.length > 0 ? 0.50 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-primary font-bold text-primary whitespace-nowrap select-none"
        >
          Hi!
        </motion.h3>
      </div>

      {/* Trail Images */}
      {trail.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ 
            opacity: 1 - (index * 0.12), 
            scale: 1 - (index * 0.08),
            rotate: 0
          }}
          exit={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            left: image.x,
            top: image.y,
            x: '-50%',
            y: '-50%',
            zIndex: trail.length - index,
          }}
          className="pointer-events-none"
        >
          <img
            src={image.src}
            alt={`Portrait ${index + 1}`}
            className="w-32 h-40 object-cover rounded-xl border-2 border-secondary/20 shadow-xl"
            draggable={false}
          />
        </motion.div>
      ))}

      {/* Hover Instruction - appears on first load */}
      {trail.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full h-full flex items-center justify-center text-secondary/40 font-secondary text-sm"
        >
          Move your cursor here!
        </motion.div>
      )}
    </div>
  );
};

export default PhotoTrail;
