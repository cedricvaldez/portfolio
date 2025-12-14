import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ImageSlide {
  id: number;
  src: string;
  alt: string;
}

// Placeholder images - you'll replace these with your actual images
const slides: ImageSlide[] = [
  { id: 1, src: '/placeholder-1.jpg', alt: 'Image 1' },
  { id: 2, src: '/placeholder-2.jpg', alt: 'Image 2' },
  { id: 3, src: '/placeholder-3.jpg', alt: 'Image 3' },
  { id: 4, src: '/placeholder-4.jpg', alt: 'Image 4' },
];

const ImageShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for images
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-secondary overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-primary font-bold text-primary">
            A Glimpse<br />of Me.
          </h2>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`relative ${
                index % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <motion.div
                style={{ y: index % 2 === 0 ? y : undefined }}
                className="aspect-[4/3] rounded-2xl overflow-hidden bg-accent-gray/20 backdrop-blur-sm border border-primary/10 hover:border-accent-red/50 transition-all duration-500 group"
              >
                {/* Placeholder - Replace with actual images */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent-gray/30 to-accent-dark-red/20 group-hover:scale-105 transition-transform duration-700">
                  <div className="text-center">
                    <p className="text-primary/40 font-primary text-sm mb-2">
                      Image Placeholder {slide.id}
                    </p>
                    <p className="text-primary/30 text-xs">
                      Add your photos here
                    </p>
                  </div>
                </div>
                
                {/* Uncomment when you add real images */}
                {/* <img 
                  src={slide.src} 
                  alt={slide.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                /> */}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
    </section>
  );
};

export default ImageShowcase;
