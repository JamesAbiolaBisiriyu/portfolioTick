import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const aboutText = 'I am James Abiola Bisiriyu, an AI-native full-stack developer based in Lagos, Nigeria. I build practical digital products for small businesses and startups.';

const skills = [
  { name: 'Frontend', items: ['React', 'Bootstrap', 'Responsive design'] },
  { name: 'Backend', items: ['APIs', 'Databases'] },
  { name: 'Delivery', items: ['Git', 'AI-assisted workflows'] },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-12 overflow-hidden px-5 py-24 sm:gap-16 sm:px-8 md:gap-20 md:px-10"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn delay={0.1} duration={0.9} x={-80} y={0} className="pointer-events-none absolute left-[1%] top-[4%] z-0 w-[80px] sm:left-[2%] sm:w-[130px] md:left-[4%] md:w-[170px]">
        <img src="/media/decor/moon.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>
      <FadeIn delay={0.25} duration={0.9} x={-80} y={0} className="pointer-events-none absolute bottom-[8%] left-[3%] z-0 w-[70px] sm:left-[6%] sm:w-[110px] md:left-[10%] md:w-[150px]">
        <img src="/media/decor/smiley.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>
      <FadeIn delay={0.15} duration={0.9} x={80} y={0} className="pointer-events-none absolute right-[1%] top-[4%] z-0 w-[80px] sm:right-[2%] sm:w-[130px] md:right-[4%] md:w-[170px]">
        <img src="/media/decor/brick.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>
      <FadeIn delay={0.3} duration={0.9} x={80} y={0} className="pointer-events-none absolute bottom-[8%] right-[3%] z-0 w-[90px] sm:right-[6%] sm:w-[140px] md:right-[10%] md:w-[180px]">
        <img src="/media/decor/cursor.png" loading="lazy" className="h-auto w-full select-none" draggable={false} alt="" />
      </FadeIn>

      <div className="relative z-10 flex w-full max-w-[900px] flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[#0C0C0C]">
            AI-Native Full-Stack Developer
          </p>
          <h2 className="hero-heading mt-5 text-center font-black leading-none tracking-tight text-[#0C0C0C]" style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}>
            Building useful products with care.
          </h2>
        </FadeIn>
        <AnimatedText
          text={aboutText}
          className="max-w-[650px] text-center font-medium leading-relaxed text-[#0C0C0C]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />
        <div className="grid w-full gap-10 text-[#0C0C0C] sm:grid-cols-2 sm:gap-12">
          <FadeIn className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tight">Background</h3>
            <p className="leading-relaxed">My work is grounded in hands-on problem solving for Tollybis, a family frozen-food business, where a clearer digital presence and better workflows can create room for growth.</p>
            <p className="leading-relaxed">I strengthened my web development foundation through the GOMYCODE bootcamp and continue to learn by shipping useful, accessible products.</p>
          </FadeIn>
          <FadeIn className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-tight">Skills</h3>
            <div className="space-y-4">
              {skills.map((group) => (
                <div key={group.name}>
                  <h4 className="mb-2 font-semibold">{group.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span key={skill} className="rounded-full border border-[#0C0C0C] px-3 py-1 text-xs uppercase">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
        <FadeIn className="w-full max-w-[650px] space-y-4 text-center text-[#0C0C0C]">
          <h3 className="text-xl font-bold uppercase tracking-tight">How I work with AI</h3>
          <p className="leading-relaxed">I use AI as a thoughtful engineering partner: to explore ideas, shorten feedback loops, and automate repetitive work while keeping product decisions, review, and accountability human.</p>
        </FadeIn>
        <div className="relative z-10">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
