import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const items = [
  { id: 'mind', label: 'Mind' },
  { id: 'emotions', label: 'Emotions' },
  { id: 'social', label: 'Social' },
  { id: 'professional', label: 'Professional' },
];

const RadialMenu = () => {
  const [open, setOpen] = useState(false);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <div className="fixed right-6 top-6 z-50">
      <button
        aria-label="Open Menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur hover:bg-white"
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur">
          {items.map((it) => (
            <button
              key={it.id}
              onClick={() => goTo(it.id)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RadialMenu;
