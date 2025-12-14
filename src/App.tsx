import { useSmoothScroll } from './hooks';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Services from './components/Services';
import Contact from './components/Contact';
import { ScrollLogo } from './components/UI';

function App() {
  // Initialize smooth scroll
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-secondary">
      {/* Scroll-based Logo */}
      <ScrollLogo />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Work Section */}
      <Work />

      {/* Services Section */}
      <Services />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}

export default App;

