"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

export function AnimatedCounter({
  end,
  label,
  suffix = ""
}: {
  end: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl">
        {inView ? (
          <CountUp end={end} duration={1.8} suffix={suffix} />
        ) : (
          <span className="opacity-0">0</span>
        )}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">{label}</p>
    </div>
  );
}
