import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Service {
  id: number;
  name: string;
  description: string;
}

const services: Service[] = [
  {
    id: 1,
    name: 'DIGITAL',
    description: 'Build fast, modern websites that turn ideas into seamless digital experiences',
  },
  {
    id: 2,
    name: 'UI/UX',
    description: 'Design intuitive, aesthetic interfaces that make every interaction feel effortless',
  },
];

const Services = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  const fullText = 'SERVICES.';

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

  return (
    <section id="services" className="min-h-screen bg-primary py-8 md:py-12">
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* Top border */}
        <div className="border-t border-secondary/20 mb-8 md:mb-12"></div>
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setHasAnimated(true)}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-12"
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

        {/* Services List */}
        <div className="space-y-0 md:group/services">
          {services.map((service, index) => {
            const isEven = index % 2 === 1;
            const isExpanded = expandedId === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-secondary/20 py-3 md:py-4 lg:py-5 md:group-hover/services:opacity-40 md:hover:!opacity-100 transition-opacity duration-300"
              >
                {/* Mobile Layout - Accordion */}
                <div className="md:hidden">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="w-full flex items-center justify-between cursor-pointer"
                  >
                    {/* Plus/Minus Icon */}
                    <div className="flex-shrink-0 w-8">
                      <span className="text-secondary text-2xl font-primary font-light transition-transform duration-300">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </div>

                    {/* Service Name */}
                    <div className="flex-1 px-4">
                      <h3 className={`text-4xl sm:text-5xl font-primary font-bold leading-none uppercase transition-colors duration-300 ${
                        isExpanded ? 'text-accent-red' : 'text-secondary'
                      }`}>
                        {service.name}
                      </h3>
                    </div>
                  </button>

                  {/* Collapsible Description */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-8 pr-4">
                      <p className="text-xs font-primary text-secondary/80 leading-relaxed uppercase tracking-wide">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Desktop Layout - Grid with Hover */}
                {!isEven ? (
                  // Odd items: Number left | Large Text left | Description right
                  <div className="hidden md:grid grid-cols-12 gap-1 items-center group cursor-pointer">
                    {/* Number */}
                    <div className="col-span-1">
                      <span className="text-secondary/30 group-hover:text-secondary transition-colors duration-300 text-sm md:text-base font-primary font-light">
                        [{service.id}]
                      </span>
                    </div>

                    {/* Service Name */}
                    <div className="col-span-11 md:col-span-6 lg:col-span-6">
                      <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-primary font-bold text-secondary group-hover:text-accent-red group-hover/services:opacity-40 group-hover:!opacity-100 transition-all duration-300 leading-none uppercase">
                        {service.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="col-span-11 col-start-2 md:col-span-5 lg:col-span-5 md:col-start-8 mt-4 md:mt-0">
                      <p className="text-[10px] md:text-xs font-primary text-secondary/60 group-hover:text-secondary transition-colors duration-300 leading-relaxed uppercase tracking-wide max-w-sm md:ml-auto">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Even items: Description left | Large Text right | Number right
                  <div className="hidden md:grid grid-cols-12 gap-1 items-center group cursor-pointer">
                    {/* Description */}
                    <div className="col-span-11 md:col-span-5 lg:col-span-5 col-start-2 md:col-start-1 mt-4 md:mt-0">
                      <p className="text-[10px] md:text-xs font-primary text-secondary/60 group-hover:text-secondary transition-colors duration-300 leading-relaxed uppercase tracking-wide max-w-sm md:mr-auto">
                        {service.description}
                      </p>
                    </div>

                    {/* Service Name */}
                    <div className="col-span-11 md:col-span-6 lg:col-span-6 md:col-start-7 text-right">
                      <h3 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-primary font-bold text-secondary group-hover:text-accent-red group-hover/services:opacity-40 group-hover:!opacity-100 transition-all duration-300 leading-none uppercase">
                        {service.name}
                      </h3>
                    </div>

                    {/* Number */}
                    <div className="col-span-1 md:col-start-12 text-right">
                      <span className="text-secondary/30 group-hover:text-secondary transition-colors duration-300 text-sm md:text-base font-primary font-light">
                        [{service.id}]
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom border */}
        <div className="border-t border-secondary/20 mt-0"></div>
      </div>
    </section>
  );
};

export default Services;
