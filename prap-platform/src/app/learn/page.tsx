"use client";
import React, { useState, useEffect } from "react";

// --- CORE DATA STRUCTURE (EXPANDED FOR ADVANCED CURRICULUM) ---
const phases = [
  {
    id: "foundation",
    title: "Phase 1: Foundation & GitOps Setup",
    steps: [
      {
        title: "01. Industrial Environment Setup (Node & VSCode)",
        content: "Establish your local environment. We mandate VS Code and Node.js (LTS) to ensure compliance with industrial toolchain standards. Verify version consistency.",
        videoUrl: "https://www.youtube.com/watch?v=Ez8F0nW6S-w",
        resources: [{ name: "Install Node.js & npm (LTS)", link: "https://nodejs.org/" }, { name: "Download VS Code", link: "https://code.visualstudio.com/" }, { name: "Download Git", link: "https://git-scm.com/downloads" }],
        code: `# Check Node and npm versions
node -v 
npm -v
# Initialize local Git repository
git init
# Clone the official PRAP Portfolio Scaffold
git clone https://github.com/PRAP/v2-scaffold.git`
      },
      {
        title: "02. GitHub Identity & Secure Authentication",
        content: "Configure your GitHub account and set up secure authentication methods (SSH Keys) to streamline deployment commits. This replaces password-based auth for security.",
        videoUrl: "https://www.youtube.com/watch?v=snCP3c7wXw0",
        resources: [{ name: "GitHub Docs: Generating SSH Key", link: "https://docs.github.com/en/authentication/connecting-to-github-with-ssh" }],
        code: `# Generate SSH key pair
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add SSH key to your GitHub account settings
ssh -T git@github.com`
      }
    ]
  },
  {
    id: "domain-acquisition",
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
      },
      {
        title: "05. Project Hosting with GitHub Pages (MVP Deployment)",
        content: "Execute your initial deployment using GitHub Pages. This provides instant live hosting for your portfolio and confirms basic link functionality.",
        videoUrl: "https://www.youtube.com/watch?v=M5mg0r4ajt4",
        resources: [{ name: "GitHub Pages Documentation", link: "https://docs.github.com/en/pages" }],
        code: `# Push code to GitHub 'main' branch
git add .
git commit -m "feat: initial portfolio commit"
git push origin main

# Enable GitHub Pages in Repository Settings > Pages`
      }
    ]
  },
  {
    id: "deployment-automation",
    title: "Phase 3: CI/CD & Custom DNS Configuration",
    steps: [
      {
        title: "06. Custom Domain Integration (DNS Configuration)",
        content: "Connect your newly acquired custom domain (e.g., `yourname.tech`) to your GitHub Pages or Vercel deployment. This requires setting up **CNAME** records.",
        videoUrl: "https://www.youtube.com/watch?v=QKfk7YFILws",
        resources: [{ name: "DNS Records Explained", link: "https://www.cloudflare.com/learning/dns/what-is-dns/" }],
        code: `# Example CNAME record setup (at your domain registrar):
# Type: CNAME
# Host: @ (or blank)
# Value: yourusername.github.io`
      },
      {
        title: "07. Advanced Deployment with Vercel/Netlify (True CI/CD)",
        content: "Transition from basic GitHub Pages to a professional hosting platform (Vercel/Netlify) for production-grade CI/CD and atomic deployments.",
        videoUrl: "https://www.youtube.com/watch?v=4h8B080Mv4U",
        resources: [{ name: "Vercel CLI Docs", link: "https://vercel.com/docs/cli" }],
        code: `# Link your project and run production deploy
npm i -g vercel
vercel link
vercel --prod`
      },
      {
        title: "08. Setting up A Records and DNS Propagation",
        content: "Configure the necessary **A records** at your DNS provider to point the bare domain (e.g., `yourname.tech`) to the hosting platform's IP addresses. Monitor propagation.",
        videoUrl: "https://www.youtube.com/watch?v=QcNBLSSn8Vg",
        resources: [{ name: "Tool: DNS Checker (Check Propagation)", link: "https://www.whatsmydns.net/" }],
        code: `# Example A record setup (pointing to Vercel IP):
# Type: A
# Host: @
# Value: 76.76.21.21`
      }
    ]
  },
  {
    id: "ai-design",
    title: "Phase 4: Agentic AI for Design & Code Optimization",
    steps: [
      {
        title: "09. AI-Assisted Design & Wireframing",
        content: "Use Agentic AI tools (like Midjourney or Vercel's v0) to generate design mockups and wireframes for your portfolio based on simple text prompts. This accelerates the design phase.",
        videoUrl: "https://www.youtube.com/watch?v=f4idgaq2VqA",
        resources: [{ name: "Vercel v0 Tool", link: "https://v0.dev" }],
        code: `# Example AI Prompt for Design:
# "Design a dark-themed, minimalist portfolio 
# focused on full-stack development skills."`
      },
      {
        title: "10. Agentic Code Refinement & Security Check",
        content: "Leverage AI (like Gemini or Copilot) as your senior engineer peer. Paste complex functions to check for security vulnerabilities (e.g., XSS risks) and suggest performance refactoring.",
        videoUrl: "https://www.youtube.com/watch?v=g_aMpyMvQ9k",
        resources: [{ name: "Gemini Code Analysis Guide", link: "https://ai.google.dev/docs/code-analysis" }],
        code: `# AI Agent Console Query:
# Analyze the 'submitData' function in my 
# form component for SQL injection or XSS risks.`
      }
    ]
  }
];

// --- MAIN REACT COMPONENT ---

export default function LearnPage() {
  const [activePhase, setActivePhase] = useState("foundation");
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("tutorial");
  const [copyStatus, setCopyStatus] = useState(null);

  // Load active state from localStorage or default (Simulating persistence)
  useEffect(() => {
    const savedPhase = localStorage.getItem('prap_active_phase');
    const savedStep = localStorage.getItem('prap_active_step');
    if (savedPhase) setActivePhase(savedPhase);
    if (savedStep !== null) setActiveStep(parseInt(savedStep, 10));
  }, []);

  const saveProgress = (phaseId, stepIndex) => {
    localStorage.setItem('prap_active_phase', phaseId);
    localStorage.setItem('prap_active_step', stepIndex);
  };


  const currentPhase = phases.find(p => p.id === activePhase);
  const currentStep = currentPhase?.steps[activeStep];
  
  // Utility for Code Copy (MNC Standard UX)
  const copyCode = () => {
    if (currentStep?.code) {
      navigator.clipboard.writeText(currentStep.code);
      setCopyStatus("COPIED!");
      setTimeout(() => setCopyStatus(null), 1500);
    }
  };

  // Utility for YouTube Embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
      // Basic extraction of video ID from standard YouTube URL
      const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/youtu\.be\/|\/v\/|\/e\/|watch\?v=|\/user\/\S*#\w\/\w\/|\/yts\/|\/watch\?v=)([a-zA-Z0-9_-]{11})/);
      return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
    } catch (e) {
      return null;
    }
  };

  const embedUrl = getYouTubeEmbedUrl(currentStep?.videoUrl);

  const handleStepChange = (newStep) => {
    setActiveStep(newStep);
    setActiveTab('tutorial');
    saveProgress(activePhase, newStep);
  }

  const handlePhaseChange = (phaseId) => {
    setActivePhase(phaseId);
    setActiveStep(0);
    setActiveTab('tutorial');
    saveProgress(phaseId, 0);
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16 flex font-mono">
      {/* 1. Sidebar Navigation (Left Control Panel) */}
      <div className="w-80 bg-gray-900 border-r border-gray-700 fixed left-0 top-16 bottom-0 overflow-y-auto z-10 shadow-lg shadow-gray-900/50">
        <div className="p-6">
          <h2 className="text-green-400 font-bold text-lg mb-6">
            INDUSTRIAL_CURRICULUM_V2.0
          </h2>
          
          <nav className="space-y-2">
            {phases.map((phase) => (
              <div key={phase.id}>
                <button
                  onClick={() => handlePhaseChange(phase.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activePhase === phase.id
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30 font-bold'
                      : 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  }`}
                >
                  {phase.title}
                </button>
                
                {activePhase === phase.id && (
                  <div className="ml-4 mt-2 space-y-1 border-l border-gray-700">
                    {phase.steps.map((step, index) => (
                      <button
                        key={index}
                        onClick={() => handleStepChange(index)}
                        className={`block w-full text-left pl-4 py-2 rounded text-xs transition-colors ${
                          activeStep === index
                            ? 'text-blue-400 bg-gray-800 font-bold'
                            : 'text-gray-400 hover:text-blue-400'
                        }`}
                      >
                        {step.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 ml-80">
        <div className="max-w-6xl mx-auto p-8">
          {currentStep && (
            <>
              {/* VIDEO PLAYER SECTION (Primary Guide) */}
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
                      frameBorder="0"
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

              {/* Phase Header and Tabs */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-green-400 mb-2">
                  {currentPhase.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-sm">
                    {currentStep.title}
                  </span>
                </div>
              </div>

              {/* TABS: TUTORIAL & RESOURCES */}
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

              {/* Tab Content Rendering */}
              {activeTab === 'tutorial' ? (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                  {/* Step Content */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {currentStep.content}
                  </p>

                  {/* Code Block (Terminal Output Simulation) */}
                  <div className="bg-black border border-gray-600 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-green-400 text-sm">TERMINAL_COMMANDS</span>
                      <button 
                        onClick={copyCode}
                        className={`text-xs px-3 py-1 rounded transition-colors ${copyStatus ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-green-400 hover:bg-gray-700'}`}
                      >
                        {copyStatus || 'COPY_CODE'}
                      </button>
                    </div>
                    <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                      <code className="block">{currentStep.code}</code>
                    </pre>
                  </div>
                  
                  {/* AI Agent Interaction Section (Phase 4 Exclusive) */}
                  {currentPhase.id === "ai-design" && (
                    <div className="mt-8 bg-gray-900/50 border border-blue-500/30 rounded-lg p-6 animate-pulse-slow">
                      <h3 className="text-blue-400 font-bold text-lg mb-4">
                        🤖 AGENTIC_AI_GUIDANCE: The Peer Reviewer
                      </h3>
                      <p className="text-gray-300 mb-4">
                        **Industrial Approach:** Use the AI Agent to run simulated checks on your deployed code and design, focusing on **security, performance, and accessibility**.
                      </p>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                        Simulate AI Code Review
                      </button>
                      <div className="mt-4 bg-gray-800 p-3 rounded text-gray-400 text-xs">
                          // AGENT RESPONSE SIMULATION: Analyzing 'yourname.tech' for optimal resource loading...
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // RESOURCES TAB CONTENT
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                  <h3 className="text-blue-400 font-bold text-xl mb-4">
                      External Links & Downloads
                  </h3>
                  <ul className="space-y-4">
                      {currentStep.resources.map((res, index) => (
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
                      <li className="flex items-center gap-4 bg-gray-800 p-3 rounded-md border border-gray-700">
                          <span className="text-green-400">⭐</span>
                          <a 
                              href="https://education.github.com/pack"
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-400 hover:text-white font-bold transition-colors"
                          >
                              Access the FREE GitHub Student Developer Pack (CRITICAL STEP)
                          </a>
                      </li>
                      {(currentStep.title.includes('Domain') || currentStep.title.includes('04.')) && (
                        <>
                          <li className="flex items-center gap-4 bg-green-900/20 p-3 rounded-md border border-green-500/30">
                            <span className="text-green-400">🎁</span>
                            <div>
                              <div className="text-green-400 font-bold">Namecheap Offer: Free .me domain for 1 year + SSL certificate</div>
                              <div className="text-gray-400 text-sm">Available through GitHub Student Pack</div>
                            </div>
                          </li>
                          <li className="flex items-center gap-4 bg-blue-900/20 p-3 rounded-md border border-blue-500/30">
                            <span className="text-blue-400">🎁</span>
                            <div>
                              <div className="text-blue-400 font-bold">Name.com Offer: Free domain with 25+ extensions</div>
                              <div className="text-gray-400 text-sm">Choose from .live, .studio, .software, .app, .dev and more</div>
                            </div>
                          </li>
                        </>
                      )}
                  </ul>
                </div>
              )}


              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors shadow-md"
                >
                  ← PREVIOUS_STEP
                </button>
                
                <div className="flex gap-2">
                  {/* Step indicators */}
                  {currentPhase.steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === activeStep ? 'bg-green-400 shadow-lg shadow-green-500/50' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => handleStepChange(Math.min(currentPhase.steps.length - 1, activeStep + 1))}
                  disabled={activeStep === currentPhase.steps.length - 1}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm transition-colors shadow-lg shadow-green-600/50"
                >
                  NEXT_STEP →
                </button>
              </div>

              {/* Final CTA (After last step of the final phase) */}
              {activePhase === "ai-design" && activeStep === currentPhase.steps.length - 1 && (
                  <div className="mt-12 text-center border-t border-gray-700 pt-8">
                      <h2 className="text-3xl font-bold text-blue-400 mb-4">
                          CURRICULUM COMPLETE: VALIDATE WORKFLOW
                      </h2>
                      <p className="text-lg text-gray-300 mb-6">
                          You have mastered the industrial pipeline. Submit your live URL and assets for **Automated Health Monitoring** and official registration.
                      </p>
                      <a href="/dashboard">
                          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-bold transition-colors shadow-xl shadow-blue-500/40 animate-bounce-slow">
                              GO TO DASHBOARD & REGISTER ASSETS →
                          </button>
                      </a>
                  </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}