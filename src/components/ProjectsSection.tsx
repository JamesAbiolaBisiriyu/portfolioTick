import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import bluebird from '../media/project/project-bluebird-ai.jpg';
import terragrip from '../media/project/project-terragrip-3d.jpg';
import japan from '../media/project/project-japan-travel.jpg';
import haven from '../media/project/project-haven-design.jpg';
import moss from '../media/project/project-3d-moss-branch.jpg';

const cards = [
  { name: 'Bluebird AI Security', category: 'Client', leftTop: japan, leftBottom: moss, right: bluebird },
  { name: 'TerraGrip Hardware 3D', category: 'Personal', leftTop: moss, leftBottom: haven, right: terragrip },
  { name: 'Haven AI Design System', category: 'Client', leftTop: bluebird, leftBottom: japan, right: haven },
];

function ProjectCard({ card, index, progress }: { card: typeof cards[number]; index: number; progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const total = cards.length;
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.03]);

  return (
    <div className="sticky top-24 h-[85vh] md:top-32">
      <motion.div
        className="relative rounded-[40px] border-2 border-[#D7E2EA] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ background: '#0C0C0C', scale, top: index * 28, transformOrigin: 'top center' }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:mb-6 md:mb-8">
          <span className="contact-gradient-text font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>{String(index + 1).padStart(2, '0')}</span>
          <div>
            <p className="font-light uppercase tracking-widest text-[#D7E2EA] opacity-60" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)' }}>{card.category}</p>
            <h3 className="font-medium uppercase text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{card.name}</h3>
          </div>
          <LiveProjectButton />
        </div>
        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4 md:gap-5">
            <img src={card.leftTop} className="h-[clamp(130px,16vw,230px)] w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" loading="lazy" alt="" />
            <img src={card.leftBottom} className="h-[clamp(160px,22vw,340px)] w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" loading="lazy" alt="" />
          </div>
          <div className="w-[60%]">
            <img src={card.right} className="h-full w-full rounded-[30px] object-cover sm:rounded-[40px] md:rounded-[50px]" loading="lazy" alt="" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] });

  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] px-5 pb-32 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32" style={{ background: '#0C0C0C' }}>
      <FadeIn>
        <h2 className="hero-heading mb-16 font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>Project</h2>
      </FadeIn>
      <div ref={listRef} className="mx-auto max-w-7xl">
        {cards.map((card, index) => <ProjectCard key={card.name} card={card} index={index} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}
