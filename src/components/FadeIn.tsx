import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMemo, type ElementType } from 'react';

type FadeInProps = {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: HTMLMotionProps<'div'>['style'];
  children?: React.ReactNode;
};

export default function FadeIn({ delay = 0, duration = 0.7, x = 0, y = 30, as = 'div', className, style, children }: FadeInProps) {
  const MotionElement = useMemo(() => motion.create(as), [as]);
  return (
    <MotionElement
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionElement>
  );
}
