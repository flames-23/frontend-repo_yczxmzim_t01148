import React, { useEffect, useState } from 'react';

const anchors = [
  { id: 'intro', label: 'Intro' },
  { id: 'mind', label: 'Mind' },
  { id: 'emotions', label: 'Emotions' },
  { id: 'social', label: 'Social' },
  { id: 'professional', label: 'Pro' },
];

const ProgressRail = () => {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observers = anchors.map((a) => {
      const el = document.getElementById(a.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(a.id);
          });
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 top-1/2 z-40 -translate-y-1/2">
      <div className="flex flex-col items-center gap-2 rounded-full bg-white/70 p-2 shadow backdrop-blur">
        {anchors.map((a) => (
          <button
            key={a.id}
            aria-label={`Go to ${a.label}`}
            onClick={() => goTo(a.id)}
            className={`h-3 w-3 rounded-full transition ${active === a.id ? 'h-6 w-6 bg-slate-900' : 'bg-slate-400/60 hover:bg-slate-500'}`}
            title={a.label}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressRail;
