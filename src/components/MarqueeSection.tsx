import { useEffect, useRef } from 'react';
import bluebird from '../media/project/project-bluebird-ai.jpg';
import terragrip from '../media/project/project-terragrip-3d.jpg';
import japan from '../media/project/project-japan-travel.jpg';
import haven from '../media/project/project-haven-design.jpg';
import moss from '../media/project/project-3d-moss-branch.jpg';

const projects = {
  bluebird,
  terragrip,
  japan,
  haven,
  moss,
};

const rowOne = [projects.bluebird, projects.terragrip, projects.japan, projects.haven, projects.moss];
const rowTwo = [projects.haven, projects.moss, projects.bluebird, projects.terragrip, projects.japan];

function MarqueeRow({ images, rowRef }: { images: string[]; rowRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={rowRef} className="marquee-row ml-[-2160px] flex w-max gap-3">
      {Array.from({ length: 5 }, (_, copy) =>
        images.map((src, index) => (
          <img
            key={`${copy}-${index}-${src}`}
            src={src}
            className="h-[270px] w-[420px] flex-shrink-0 rounded-2xl object-cover"
            loading="lazy"
            draggable={false}
            alt=""
          />
        )),
      )}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const firstRow = rowOneRef.current;
    const secondRow = rowTwoRef.current;
    if (!section || !firstRow || !secondRow) return;

    const updateRows = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        firstRow.style.transform = 'translateX(-200px)';
        secondRow.style.transform = 'translateX(200px)';
        return;
      }
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      firstRow.style.transform = `translateX(${offset - 200}px)`;
      secondRow.style.transform = `translateX(${-offset + 200}px)`;
    };

    updateRows();
    window.addEventListener('scroll', updateRows, { passive: true });
    window.addEventListener('resize', updateRows);
    return () => {
      window.removeEventListener('scroll', updateRows);
      window.removeEventListener('resize', updateRows);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-3 overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ background: '#0C0C0C' }}
    >
      <MarqueeRow images={rowOne} rowRef={rowOneRef} />
      <MarqueeRow images={rowTwo} rowRef={rowTwoRef} />
    </section>
  );
}
