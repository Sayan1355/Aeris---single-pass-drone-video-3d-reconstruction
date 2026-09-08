import React from 'react';
import { LandingNav } from './components/LandingNav';
import { HeroSection } from './components/HeroSection';
import { TechnicalStrip } from './components/TechnicalStrip';
import { PipelineStory } from './components/PipelineStory';
import { OutputsSection } from './components/OutputsSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { FinalCTA } from './components/FinalCTA';
import { LandingFooter } from './components/LandingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#07090E] text-[#F8FAFC] selection:bg-[#38BDF8] selection:text-[#07090E] overflow-y-auto">
      {/* Translucent Navigation Bar */}
      <LandingNav />

      {/* First Viewport: Full-Screen Cinematic 3D Experience (Matches Reference Image) */}
      <HeroSection />

      {/* Below-The-Fold Content Sections (Scrollable Document Flow) */}
      <TechnicalStrip />
      <PipelineStory />
      <OutputsSection />
      <ApplicationsSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
