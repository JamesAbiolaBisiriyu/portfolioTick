import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const aboutText = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0.1} duration={0.9} x={-80} y={0} className="pointer-events-none absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src="/media/decor/moon.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>
      <FadeIn delay={0.25} duration={0.9} x={-80} y={0} className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src="/media/decor/smiley.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>
      <FadeIn delay={0.15} duration={0.9} x={80} y={0} className="pointer-events-none absolute right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src="/media/decor/brick.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>
      <FadeIn delay={0.3} duration={0.9} x={80} y={0} className="pointer-events-none absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src="/media/decor/cursor.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            About me
          </h2>
        </FadeIn>
        <AnimatedText
          text={aboutText}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
        <div className="relative z-10">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
