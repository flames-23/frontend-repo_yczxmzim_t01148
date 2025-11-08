import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

const HeroScene = ({ onCTAClick }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="intro" className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-sky-50 via-white to-sky-100">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/3bq8wJSWwQj8S3gZ/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-manrope text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"
        >
          LifeSkillSphere — Journey Through Growth
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 max-w-2xl text-lg text-slate-600"
        >
          Master the skills that shape your world. Scroll to begin your journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10"
        >
          <button
            onClick={onCTAClick}
            className="rounded-full bg-sky-600 px-6 py-3 text-white shadow-lg shadow-sky-600/30 transition hover:-translate-y-0.5 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          >
            Start your LifeSkill Journey
          </button>
        </motion.div>

        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
              className="rounded-full border border-slate-300/60 p-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroScene;
