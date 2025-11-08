import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Brain, Heart, Users, Briefcase } from 'lucide-react';

const sections = [
  {
    id: 'mind',
    title: 'Mind Skills',
    subtitle: 'Focus • Problem-Solving',
    colorFrom: 'from-sky-50',
    colorTo: 'to-sky-100',
    accent: 'text-sky-700',
    icon: Brain,
    description:
      'Sharpen clarity and strengthen your ability to navigate complex challenges with calm focus.',
    skills: [
      { name: 'Focus', description: 'Train attention and reduce distractions.' },
      { name: 'Problem-Solving', description: 'Structure decisions and think in systems.' },
    ],
  },
  {
    id: 'emotions',
    title: 'Emotional Skills',
    subtitle: 'Empathy • Resilience',
    colorFrom: 'from-orange-50',
    colorTo: 'to-rose-100',
    accent: 'text-rose-700',
    icon: Heart,
    description:
      'Grow emotional literacy, cultivate composure, and connect with others through authentic presence.',
    skills: [
      { name: 'Empathy', description: 'Read emotions and respond with care.' },
      { name: 'Resilience', description: 'Build bounce-back capacity after stress.' },
    ],
  },
  {
    id: 'social',
    title: 'Social Skills',
    subtitle: 'Teamwork • Communication',
    colorFrom: 'from-emerald-50',
    colorTo: 'to-teal-100',
    accent: 'text-emerald-700',
    icon: Users,
    description:
      'Develop trust, collaboration, and clear communication that turns groups into teams.',
    skills: [
      { name: 'Teamwork', description: 'Align goals and create shared momentum.' },
      { name: 'Communication', description: 'Listen deeply, speak clearly.' },
    ],
  },
  {
    id: 'professional',
    title: 'Professional Skills',
    subtitle: 'Leadership • Decision-Making',
    colorFrom: 'from-indigo-50',
    colorTo: 'to-violet-100',
    accent: 'text-indigo-700',
    icon: Briefcase,
    description:
      'Lead with confidence, make wise choices, and design systems that scale.',
    skills: [
      { name: 'Leadership', description: 'Inspire direction and empower others.' },
      { name: 'Decision-Making', description: 'Use data and intuition to act with clarity.' },
    ],
  },
];

const Section = ({ id, title, subtitle, colorFrom, colorTo, accent, icon: Icon, description, skills }) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-b ${colorFrom} ${colorTo}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center"
        >
          <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/70 shadow ${accent}`}>
            <Icon size={28} />
          </div>
          <h2 className="font-manrope text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {title}
          </h2>
          <p className="mt-2 text-base font-medium text-slate-600 sm:text-lg">{subtitle}</p>
          <p className="mt-6 max-w-2xl text-slate-600">{description}</p>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {skills.map((s) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl bg-white/70 p-6 shadow backdrop-blur-sm transition hover:shadow-lg"
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 via-transparent to-white/10" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{s.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.description}</p>
                </div>
                {!prefersReducedMotion && (
                  <motion.div
                    className="h-10 w-10 rounded-full bg-slate-900/5"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionJourney = () => {
  return (
    <div>
      {sections.map((s) => (
        <Section key={s.id} {...s} />
      ))}
    </div>
  );
};

export default SectionJourney;
