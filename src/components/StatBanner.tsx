import { useRef, useState, useEffect } from 'react';

type StatItem = {
  end: number | null;
  suffix: string;
  display: string | null;
  label: string;
};

function CountUp({ end, suffix = '', duration = 1600, started }: {
  end: number; suffix?: string; duration?: number; started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let animId: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [started, end, duration]);

  return <>{count}{suffix}</>;
}

const statItems: StatItem[] = [
  { end: 35, suffix: '+', display: null, label: 'Years Experience' },
  { end: 3, suffix: '', display: null, label: 'Core Services' },
  { end: 100, suffix: '%', display: null, label: 'Satisfaction Rate' },
  { end: null, suffix: '', display: 'Free', label: 'Estimates' },
];

const statBorderClasses = [
  'border-r border-b lg:border-b-0 border-slate-200',
  'border-b lg:border-b-0 lg:border-r border-slate-200',
  'border-r border-slate-200',
  'border-slate-200',
];

export default function StatBanner() {
  const [statsStarted, setStatsStarted] = useState(false);
  const statBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.4 }
    );
    if (statBarRef.current) observer.observe(statBarRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={statBarRef} className="border-t border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center justify-center py-8 lg:py-10 px-4 text-center ${statBorderClasses[i]}`}>
              <span className="text-5xl lg:text-6xl font-black text-primary mb-2">
                {stat.end !== null
                  ? <CountUp end={stat.end} suffix={stat.suffix} started={statsStarted} />
                  : stat.display}
              </span>
              <span className="text-slate-500 text-sm font-semibold tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
