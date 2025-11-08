import React, { useEffect, useState } from 'react';

const links = [
  { id: 'mind', label: 'Mind' },
  { id: 'emotions', label: 'Emotions' },
  { id: 'social', label: 'Social' },
  { id: 'professional', label: 'Professional' },
];

const RadialMenu = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.4, 0.6] }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed right-4 top-4 z-50">
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-white/90 px-4 py-2 text-slate-900 shadow"
      >
        Menu
      </button>
      {open && (
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-slate-900/80 p-3 text-sm text-white backdrop-blur">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`rounded-md px-3 py-2 text-left transition ${
                active === l.id ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadialMenu;
