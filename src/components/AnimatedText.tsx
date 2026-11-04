import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const words = text.split(' ');
  const characters = text.length;
  let index = 0;

  return (
    <p ref={ref} aria-label={text} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const rendered = (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((character) => {
              const characterIndex = index++;
              return (
                <span key={`${character}-${characterIndex}`} className="relative inline-block">
                  <span className="invisible">{character}</span>
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ opacity: useTransform(scrollYProgress, [characterIndex / characters, (characterIndex + 1) / characters], [0.2, 1]) }}
                  >
                    {character}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
        return wordIndex < words.length - 1 ? [rendered, ' '] : rendered;
      })}
    </p>
  );
}
