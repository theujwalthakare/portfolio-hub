"use client";

import { useState } from 'react';

interface Resource {
  name: string;
  link: string;
}

interface Step {
  title: string;
  content: string;
  videoUrl?: string;
  resources?: Resource[];
  code?: string;
}

interface Phase {
  id: string;
  title: string;
  steps: Step[];
}

const phases: Phase[] = [
  {
    id: "foundation",
    title: "Phase 1: Foundation Setup",
    steps: [
      {
        title: "01. Initial Setup",
        content: "Set up your development environment and basic tools.",
        code: "# Initial setup commands\necho 'Setting up development environment'"
      },
      {
        title: "02. Environment Configuration",
        content: "Configure your local development environment.",
        code: "# Environment configuration\nexport NODE_ENV=development"
      }
    ]
  },
  {
    id: "domain",
    title: "Phase 2: Domain Acquisition & GitHub Education",
    steps: [
      {
        title: "03. Accessing the GitHub Student Developer Pack (CRITICAL)",
        content: "Unlock industry-exclusive free tools. Step-by-step guide on verifying your student status to gain access to free domain registration (e.g., Namecheap or Name.com) and cloud credits.",
        videoUrl: "https://www.youtube.com/watch?v=WxMFzncm0t4",
        resources: [{ name: "Apply for Student Developer Pack", link: "https://education.github.com/pack" }],
        code: `# This step is UI-based. Follow the link above and select 'Student'.
# Required documents: Student ID / Enrollment Letter.`
      },
      {
        title: "04. Free Domain Registration & Acquisition",
        content: "Use the GitHub Student Pack benefits to secure a free `.me` or `.tech` custom domain for one year. This is your professional brand identity.",
        videoUrl: "https://www.youtube.com/watch?v=p1QU3kLFPdg",
        resources: [
          { name: "Namecheap - Free .me Domain (1 Year)", link: "https://www.namecheap.com/github-student-developer-pack/" },
          { name: "Name.com - Free Domain (.live, .studio, .app, .dev)", link: "https://www.name.com/partner/github-students" },
          { name: "GitHub Student Pack Domain Services", link: "https://education.github.com/pack#domain-services" }
        ],
        code: `# Domain selection is UI-based. Choose a domain name:
# e.g., <yourname>.tech or <yourname>.me`
      }
    ]
  }
];

export default function LearnPage() {
  const [activePhase, setActivePhase] = useState(() => {
    const savedPhase = typeof window !== "undefined" ? localStorage.getItem('prap_active_phase') : null;
    return savedPhase ?? "foundation";
  });
  const [activeStep, setActiveStep] = useState(() => {
    const savedStep = typeof window !== "undefined" ? localStorage.getItem('prap_active_step') : null;
    return savedStep !== null ? parseInt(savedStep, 10) : 0;
  });
  const [activeTab, setActiveTab] = useState("tutorial");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const saveProgress = (phaseId: string, stepIndex: number) => {
    localStorage.setItem('prap_active_phase', phaseId);
    localStorage.setItem('prap_active_step', stepIndex.toString());
  };

  const currentPhase = phases.find(p => p.id === activePhase);
  const currentStep = currentPhase?.steps[activeStep];
  
  const copyCode = () => {
    if (currentStep?.code) {
      navigator.clipboard.writeText(currentStep.code);
      setCopyStatus("COPIED!");
      setTimeout(() => setCopyStatus(null), 1500);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    try {
      const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/youtu\.be\/|\/v\/|\/e\/|watch\?v=|\/user\/\S*#\w\/\w\/|\/yts\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/);
      return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
    } catch (e) {
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(currentStep?.videoUrl || "");

  const handleStepChange = (newStep: number) => {
    setActiveStep(newStep);
    setActiveTab('tutorial');
    saveProgress(activePhase, newStep);
  };

  return (
    <div className="flex-1 ml-80">
      <div className="max-w-6xl mx-auto p-8">
        {embedUrl ? (
          <div className="mb-8 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-2xl shadow-green-900/30">
            <div className="p-3 bg-gray-800 border-b border-gray-700">
                <span className="text-blue-400 text-sm">VIDEO_GUIDE: Step {activeStep + 1} Walkthrough</span>
            </div>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title="YouTube video player"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
              <span className="text-red-400">VIDEO PENDING: Focus on terminal commands and documentation below.</span>
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-green-400 mb-2">
            {currentPhase?.title ?? ""}
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-sm">
              {currentStep?.title ?? ""}
            </span>
          </div>
        </div>

        <div className="flex border-b border-gray-700 mb-6">
            <button
                onClick={() => setActiveTab('tutorial')}
                className={`px-4 py-2 text-sm transition-colors ${
                    activeTab === 'tutorial' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'
                }`}
            >
                TUTORIAL_STEPS & COMMANDS
            </button>
            <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 text-sm transition-colors ${
                    activeTab === 'resources' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'
                }`}
            >
                EXTERNAL_RESOURCES
            </button>
        </div>

        {activeTab === 'tutorial' ? (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <p className="text-gray-300 mb-6 leading-relaxed">
              {currentStep?.content ?? ""}
            </p>

            <div className="bg-black border border-gray-600 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={copyCode}
                  className={`text-xs px-3 py-1 rounded transition-colors ${copyStatus ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-green-400 hover:bg-gray-700'}`}
                >
                  {copyStatus || 'COPY_CODE'}
                </button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                <code className="block">{currentStep?.code ?? ""}</code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <h3 className="text-blue-400 font-bold text-xl mb-4">
                External Links & Downloads
            </h3>
            <ul className="space-y-4">
                {(currentStep?.resources ?? []).map((res: Resource, index: number) => (
                    <li key={index} className="flex items-center gap-4">
                        <span className="text-blue-400">🔗</span>
                        <a 
                            href={res.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-400 transition-colors"
                        >
                            {res.name}
                        </a>
                    </li>
                ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors shadow-md"
          >
            ← PREVIOUS_STEP
          </button>
          
          <div className="flex gap-2">
            {(currentPhase?.steps ?? []).map((_: Step, index: number) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeStep ? 'bg-green-400 shadow-lg shadow-green-500/50' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => handleStepChange(Math.min((currentPhase?.steps?.length ?? 1) - 1, activeStep + 1))}
            disabled={activeStep === ((currentPhase?.steps?.length ?? 1) - 1)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors shadow-lg shadow-green-600/50"
          >
            NEXT_STEP →
          </button>
        </div>
      </div>
    </div>
  );
}