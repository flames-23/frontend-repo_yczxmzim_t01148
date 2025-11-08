import React, { useRef } from 'react';
import HeroScene from './components/HeroScene';
import SectionJourney from './components/SectionJourney';
import RadialMenu from './components/RadialMenu';
import ProgressRail from './components/ProgressRail';
import AnimatedBackground from './components/AnimatedBackground';

const App = () => {
  const firstSectionRef = useRef(null);

  const handleStart = () => {
    const el = document.getElementById('mind');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950">
      <AnimatedBackground />

      <RadialMenu />
      <ProgressRail />

      <HeroScene onStart={handleStart} />

      <SectionJourney ref={firstSectionRef} />
    </div>
  );
};

export default App;
