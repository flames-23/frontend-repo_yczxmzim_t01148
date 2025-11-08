import React, { useRef } from 'react';
import HeroScene from './components/HeroScene';
import SectionJourney from './components/SectionJourney';
import RadialMenu from './components/RadialMenu';
import ProgressRail from './components/ProgressRail';

const App = () => {
  const mindRef = useRef(null);

  const handleStart = () => {
    const el = document.getElementById('mind');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      <RadialMenu />
      <ProgressRail />
      <HeroScene onCTAClick={handleStart} />
      <SectionJourney ref={mindRef} />
      <footer className="bg-white/80 py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} LifeSkillSphere. Built for calm growth.
      </footer>
    </div>
  );
};

export default App;
