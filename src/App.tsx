import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';

function PlaceholderSection({ id, label, dark = true }: { id?: string; label: string; dark?: boolean }) {
  return (
    <section id={id} className={dark ? 'min-h-screen bg-[#0C0C0C]' : 'min-h-screen bg-white text-[#0C0C0C]'}>
      <h2 className="sr-only">{label}</h2>
    </section>
  );
}

export default function App() {
  return (
    <main className="font-kanit overflow-x-clip bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
