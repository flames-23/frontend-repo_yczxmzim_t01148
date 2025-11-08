import React, { useEffect, useState } from 'react';

const ids = ['mind', 'emotions', 'social', 'professional'];

const ProgressRail = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = height > 0 ? (scrollTop / height) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pointer-events-none fixed right-3 top-1/2 z-40 -translate-y-1/2">
      <div className="pointer-events-auto flex w-2 flex-col items-center">
        <div className="h-64 w-1 rounded-full bg-white/10">
          <div
            className="h-1/2 w-full rounded-full bg-white"
            style={{ height: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {ids.map((id) => (
            <button
              key={id}
              onClick={() => jump(id)}
              className="rounded-full bg-white/90 px-2 py-1 text-[10px] text-slate-900 shadow"
            >
              {id.slice(0, 1).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressRail;
