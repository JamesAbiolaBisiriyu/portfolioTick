import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import { startLivingPortrait } from '../livingPortrait';
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    startLivingPortrait();
  }, []);

  return (
    <section
      id="home"
      className="relative flex h-screen flex-col"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={-20} className="relative z-20">
        <nav className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          {[
            ['HOME', '#home'],
            ['PROJECT', '#projects'],
            ['ABOUT ME', '#about'],
            ['CONTACT', '#contact'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="mt-6 w-full overflow-hidden sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full whitespace-nowrap text-center text-[11vw] font-black uppercase leading-none tracking-tight sm:text-[11.8vw] md:text-[12.4vw] lg:text-[13vw]">
            Hi, i’m james
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            ai-native full-stack developer building practical digital products for small businesses and startups
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <div className="hero-portrait-wrap" id="magnetWrap">
        <FadeIn delay={0.6} y={30}>
          <div className="hero-portrait-inner" id="magnetInner">
            <img id="faceFallback" src="/avatar/rest.png" alt="Portrait of James Abiola Bisiriyu" />
            <canvas id="faceGl" aria-hidden="true" />
            <div id="faceProps" aria-hidden="true">
              <svg id="faceFly" viewBox="0 0 32 32">
                <path className="wing" d="M15.5 14.5C10 8 3 10 4 15c.4 2.2 5 2.2 11.5 1Z" />
                <path className="wing r" d="M16.5 14.5C22 8 29 10 28 15c-.4 2.2-5 2.2-11.5 1Z" />
                <ellipse cx="16" cy="17" rx="2.5" ry="6" />
                <circle cx="16" cy="11" r="2" />
              </svg>
              <svg id="faceHand" viewBox="0 0 32 32">
                <path className="open" d="M11 28c-2-2-3-5-3-9v-7c0-1 .8-2 1.8-2s1.8 1 1.8 2v4-9c0-1 .8-2 1.8-2s1.8 1 1.8 2v8-10c0-1 .8-2 1.8-2s1.8 1 1.8 2v10-7c0-1 .8-2 1.8-2s1.8 1 1.8 2v10c1-1 2-1 2.7-.5 1 .8.2 4.5-1.2 7.5-1.4 3-4 4.5-7.5 4.5H11Z" />
                <path className="grab" d="M10 28c-2-2-2-5-2-9v-7c0-1 .8-2 1.8-2s1.8 1 1.8 2v5l1-10c.1-1 1-1.7 2-1.6s1.6.9 1.5 2l-.5 8 1.5-7.5c.2-1 1-1.6 2-1.4s1.5 1 1.3 2l-1 7.5 1.5-4c.4-1 1.4-1.3 2.2-.8.8.5.8 1.6.4 2.5l-2.2 6c2-1 3-.2 3.2.7.3 1.3-2.2 4.8-4.5 6.3-2.3 1.5-5.8 1.3-8 1.3Z" />
              </svg>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
