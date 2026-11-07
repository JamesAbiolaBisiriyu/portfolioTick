import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from './FadeIn';

const services = [
  ['Frontend Development', 'Responsive, accessible interfaces built with React and Bootstrap that feel clear and work well on every screen.'],
  ['Backend and APIs', "Reliable APIs and databases that store, protect and serve your product's data."],
  ['Full-Stack Web Apps', 'End-to-end products, from idea to a live deployment, with frontend, backend, database and hosting working together.'],
  ['Business Websites and Automation', 'A clear online presence for small businesses, with repetitive tasks automated through AI-assisted workflows.'],
];

function ServiceRow({ index, title, description }: { index: number; title: string; description: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start 95%', 'center 58%'] });
  const initialX = index % 2 === 0 ? -220 : 220;
  const x = useTransform(scrollYProgress, [0, 1], [initialX, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);

  return (
    <div ref={rowRef} className="border-b border-[rgba(12,12,12,.15)] first:border-t">
      <motion.div style={{ x, opacity }} className="flex items-start gap-5 py-8 will-change-transform sm:gap-8 sm:py-10 md:gap-12 md:py-12">
        <span className="contact-gradient-text select-none font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="pt-2">
          <h3 className="font-medium uppercase text-[#0C0C0C]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{title}</h3>
          <p className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>{description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="price" className="relative overflow-hidden rounded-t-[40px] px-5 py-20 pb-24 sm:rounded-t-[50px] sm:px-8 sm:py-24 sm:pb-32 md:rounded-t-[60px] md:px-10 md:py-32 md:pb-44" style={{ background: '#FFFFFF' }}>
      <FadeIn>
        <h2 className="mb-16 font-black uppercase leading-none text-[#0C0C0C] sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>Services</h2>
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {services.map(([title, description], index) => <ServiceRow key={title} index={index} title={title} description={description} />)}
      </div>
    </section>
  );
}
