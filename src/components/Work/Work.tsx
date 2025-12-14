import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import urbanHustleImg1 from '../../assets/images/urbanhustle-project-images.png';
import urbanHustleImg2 from '../../assets/images/urbanhustle-project-images-2.png';

interface Project {
  id: number;
  year: string;
  name: string;
  category: string;
  link: string;
  description: string;
  techStack: string[];
  images?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    year: '2025',
    name: 'URBAN HUSTLE PRODUCTIONS',
    category: 'Web Development',
    link: '#',
    description: 'A modern marketing web application built with cutting-edge technologies, focusing on performance and user experience. (Client have not decided to launch the project yet, so the link is currently inactive.)',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    images: [urbanHustleImg1, urbanHustleImg2],
  },
];

// Slideshow component for project images
const ImageSlideshow = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-96 lg:h-[32rem] bg-secondary/10 border border-secondary/20 overflow-hidden">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      ))}
    </div>
  );
};

// Mobile slideshow component
const MobileImageSlideshow = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 sm:h-80 bg-secondary/10 border border-secondary/20 overflow-hidden">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      ))}
    </div>
  );
};

const Work = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isHoveringRow, setIsHoveringRow] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  const fullText = 'WORKS.';

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
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
    <section id="work" className="min-h-screen bg-primary py-8 md:py-12 relative">
      {/* Red Dot Cursor */}
      {isHoveringRow && (
        <motion.div
          className="fixed pointer-events-none z-50 hidden md:block"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-3 h-3 bg-accent-red rounded-full" />
        </motion.div>
      )}

      {/* Custom Cursor Image */}
      {hoveredProject !== null && expandedId !== hoveredProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed pointer-events-none z-50 hidden md:block"
          style={{
            left: cursorPos.x + 20,
            top: cursorPos.y + 20,
          }}
        >
          <img
            src={projects.find(p => p.id === hoveredProject)?.images?.[0]}
            alt="Project preview"
            className="w-50 h-48 object-cover border-2 border-accent-red shadow-2xl"
          />
        </motion.div>
      )}

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

        {/* Projects Table */}
        <div className="space-y-0">
          {projects.map((project, index) => {
            const isExpanded = expandedId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-secondary/20"
              >
                {/* Mobile Layout - Accordion */}
                <div className="md:hidden">
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="w-full text-left py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Project Info */}
                      <div className="flex-1">
                        <h3 className={`text-2xl sm:text-3xl font-primary font-bold leading-tight uppercase transition-colors duration-300 ${
                          isExpanded ? 'text-accent-red' : 'text-secondary'
                        }`}>
                          {project.name}
                        </h3>
                      </div>

                      {/* Plus/Minus Icon */}
                      <div className="flex-shrink-0">
                        <span className="text-secondary text-2xl font-primary font-light">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Collapsible Content - Mobile */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 space-y-4">
                      {/* Image Slideshow */}
                      {project.images && project.images.length > 0 ? (
                        <MobileImageSlideshow images={project.images} />
                      ) : (
                        <div className="w-full h-48 bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                          <span className="text-secondary/40 text-sm font-primary uppercase">Image Placeholder</span>
                        </div>
                      )}

                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-primary font-bold text-secondary/80 uppercase tracking-wide mb-2">About</h4>
                        <p className="text-xs font-primary text-secondary/70 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-xs font-primary font-bold text-secondary/80 uppercase tracking-wide mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs font-primary text-secondary/70 bg-secondary/5 border border-secondary/20 px-2 py-1 uppercase"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Desktop Layout - 4 Column Table */}
                <div className="hidden md:block">
                  <button
                    onClick={() => toggleExpand(project.id)}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHoveringRow(true)}
                    onMouseLeave={() => {
                      setIsHoveringRow(false);
                      setHoveredProject(null);
                    }}
                    className="w-full grid grid-cols-12 gap-4 items-center py-4 md:py-5 lg:py-6 group cursor-none text-left"
                  >
                    {/* Year */}
                    <div className="col-span-2">
                      <span className="text-sm md:text-base font-primary font-light text-secondary/60 group-hover:text-secondary transition-colors duration-300 uppercase">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Name */}
                    <div 
                      className="col-span-5"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <h3 className={`text-xl md:text-2xl lg:text-3xl font-primary font-bold leading-tight uppercase transition-colors duration-300 ${
                        isExpanded ? 'text-accent-red' : 'text-secondary group-hover:text-accent-red'
                      }`}>
                        {project.name}
                      </h3>
                    </div>

                    {/* Category */}
                    <div className="col-span-4">
                      <p className="text-xs md:text-sm font-primary text-secondary/60 group-hover:text-secondary transition-colors duration-300 uppercase tracking-wide">
                        {project.category}
                      </p>
                    </div>

                    {/* Plus/Minus Icon */}
                    <div className="col-span-1 text-right">
                      <span className="text-secondary/40 group-hover:text-accent-red transition-colors duration-300 text-xl">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </div>
                  </button>

                  {/* Collapsible Content - Desktop */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pt-2">
                      <div className="grid grid-cols-12 gap-6">
                        {/* Image Slideshow */}
                        <div className="col-span-6">
                          {project.images && project.images.length > 0 ? (
                            <ImageSlideshow images={project.images} />
                          ) : (
                            <div className="w-full h-96 lg:h-[32rem] bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                              <span className="text-secondary/40 text-sm font-primary uppercase">Image Placeholder</span>
                            </div>
                          )}
                        </div>

                        {/* Info Section */}
                        <div className="col-span-6 space-y-6">
                          {/* Description */}
                          <div>
                            <h4 className="text-sm font-primary font-bold text-secondary/80 uppercase tracking-wide mb-3">About</h4>
                            <p className="text-sm font-primary text-secondary/70 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech Stack */}
                          <div>
                            <h4 className="text-sm font-primary font-bold text-secondary/80 uppercase tracking-wide mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-xs font-primary text-secondary/70 bg-secondary/5 border border-secondary/20 px-3 py-1.5 uppercase"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Link */}
                          <div>
                            <a
                              href={project.link}
                              className="inline-flex items-center gap-2 text-sm font-primary font-bold text-accent-red hover:text-accent-red/80 transition-colors duration-300 uppercase"
                            >
                              View Project
                              <span>→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
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

export default Work;
