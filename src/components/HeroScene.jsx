import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import ErrorBoundary from './ErrorBoundary';

const HeroScene = ({ onStart }) => {
  const [isClient, setIsClient] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Ensure Spline only mounts on client and allow Brave to settle WebGL context
    const t = setTimeout(() => setIsClient(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        {!failed && isClient && (
          <ErrorBoundary fallback={null}>
            <Spline
              scene="https://prod.spline.design/2Pz0HcxqkD1oS3S0/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
              onError={() => setFailed(true)}
            />
          </ErrorBoundary>
        )}
        {/* Graceful fallback if Spline fails (e.g., Brave Shields/WebGL) */}
        {(failed || !isClient) && (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600/20 via-fuchsia-500/10 to-emerald-500/20" />
        )}
      </div>

      {/* Subtle gradient veil that doesn't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-900/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">LifeSkillSphere</h1>
        <p className="mt-4 max-w-2xl text-slate-200 md:text-lg">
          Journey through growth across Mind, Emotions, Social, and Professional realms.
        </p>
        <div className="mt-8 flex gap-4">
          <button
            onClick={onStart}
            className="rounded-full bg-white/90 px-6 py-3 text-slate-900 shadow-lg shadow-slate-900/30 transition hover:bg-white"
          >
            Start the Journey
          </button>
          <a
            href="#about"
            className="rounded-full border border-white/30 px-6 py-3 text-white/90 backdrop-blur transition hover:border-white/50 hover:text-white"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroScene;
