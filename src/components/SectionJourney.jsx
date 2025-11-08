import React, { useEffect, useRef } from 'react';

const sections = [
  { id: 'mind', title: 'Mind', color: 'from-indigo-500/20 to-transparent', desc: 'Sharpen focus, critical thinking, and learning agility.' },
  { id: 'emotions', title: 'Emotions', color: 'from-rose-500/20 to-transparent', desc: 'Build resilience, self-awareness, and calm under pressure.' },
  { id: 'social', title: 'Social', color: 'from-emerald-500/20 to-transparent', desc: 'Grow empathy, communication, and collaboration.' },
  { id: 'professional', title: 'Professional', color: 'from-amber-500/20 to-transparent', desc: 'Level up execution, leadership, and creative problem solving.' },
];

const Card = ({ title, text }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-md transition hover:bg-white/10">
    <h4 className="text-lg font-semibold">{title}</h4>
    <p className="mt-2 text-sm text-white/80">{text}</p>
  </div>
);

const SectionJourney = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reveal = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };

    const io = new IntersectionObserver(reveal, { threshold: 0.2 });
    const items = container.querySelectorAll('[data-reveal]');
    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section ref={containerRef} id="journey" className="relative w-full bg-slate-950 text-white">
      {sections.map((s) => (
        <div key={s.id} id={s.id} className="relative mx-auto min-h-[100svh] w-full max-w-6xl px-6 py-24">
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${s.color}`} />

          <div className="relative">
            <h2 className="text-3xl font-bold md:text-5xl">{s.title}</h2>
            <p className="mt-3 max-w-2xl text-white/80">{s.desc}</p>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              <div data-reveal className="opacity-0 translate-y-6 transition-all duration-700">
                <Card title="Foundations" text="Principles and mental models that underpin this area." />
              </div>
              <div data-reveal className="opacity-0 translate-y-6 transition-all duration-700 delay-100">
                <Card title="Practice" text="Actionable exercises to build real skill." />
              </div>
              <div data-reveal className="opacity-0 translate-y-6 transition-all duration-700 delay-200">
                <Card title="Reflection" text="Prompts to integrate learning with life." />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer ensures full scroll to the very bottom */}
      <footer id="about" className="mx-auto w-full max-w-6xl px-6 py-16 text-center text-white/70">
        <p>Made for curious minds. Keep exploring.</p>
      </footer>
    </section>
  );
};

export default SectionJourney;
