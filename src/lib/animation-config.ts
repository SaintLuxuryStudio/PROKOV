export const DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  xslow: 1.2
} as const;

export const EASING = {
  smooth: [0.25, 0.1, 0.25, 1.0] as const,
  snap: [0.4, 0.0, 0.2, 1.0] as const,
  bounce: [0.34, 1.56, 0.64, 1.0] as const
};

export const sectionAnimation = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: DURATIONS.slow, ease: EASING.smooth }
};

export const staggerChildren = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: DURATIONS.normal }
};
