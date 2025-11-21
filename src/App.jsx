import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Server, 
  Cloud, 
  Database, 
  Code, 
  Terminal, 
  Cpu, 
  Shield, 
  Menu, 
  X, 
  ChevronRight,
  Download,
  Bot,
  Sparkles,
  Loader,
  ArrowUpRight,
  MapPin,
  Award,
  Briefcase,
  Layers,
  Network,
  Zap,
  Workflow,
  Box,
  CheckCircle,
  BrainCircuit,
  Bell,
  RefreshCw,
  FileJson,
  Globe,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const AestheticPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // --- PITCH GENERATOR STATE ---
  const [pitchCompany, setPitchCompany] = useState('');
  const [pitchRole, setPitchRole] = useState('');
  const [generatedPitch, setGeneratedPitch] = useState('');
  const [isPitchLoading, setIsPitchLoading] = useState(false);
  
  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'automations', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resumeContext = `
    Name: Atharva Jagtap
    Role: DevOps & AI-Infrastructure Engineer
    Current Company: Prorigo Software Pvt. Ltd. (Client: Epicor)
    Experience: 2+ Years
    - DevOps Engineer at Prorigo: Monitors CI/CD, automates workflows, OS patching, AWS CloudWatch alerting.
    - Built automations for retrieving versioned files from S3 and sending alerts via SES/SNS.
    - Implemented Cross-VPC backup & restore for RDS.
    - Knowledge of AI/ML integration in Ops.
  `;

  const callGemini = async (prompt, systemInstruction) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response at the moment.";
    } catch (error) {
      return "Connection issue. Please try again.";
    }
  };

  const handleGeneratePitch = async () => {
    if (!pitchCompany || !pitchRole) return;
    setIsPitchLoading(true);
    const prompt = `Generate a professional, persuasive elevator pitch (max 3 sentences) for Atharva applying to ${pitchCompany} as a ${pitchRole}. Highlight his specific automations (S3/SES), cloud skills, and AI awareness.`;
    const systemPrompt = `You are Atharva. Write in first person. Professional tone. Context: ${resumeContext}`;
    const result = await callGemini(prompt, systemPrompt);
    setGeneratedPitch(result);
    setIsPitchLoading(false);
  };

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-white/20 selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .glass-card {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-card:hover {
          background: rgba(30, 30, 30, 0.7);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
        }
        
        .glass-nav {
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .ambient-glow-blue {
            background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
            filter: blur(120px);
            z-index: 0;
        }
        .ambient-glow-emerald {
            background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
            filter: blur(120px);
            z-index: 0;
        }

        .tech-marquee-container {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .tech-marquee {
          animation: scroll 40s linear infinite;
        }
      `}</style>

      <div className="fixed top-0 left-0 w-full h-full ambient-glow-blue pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] ambient-glow-emerald pointer-events-none" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-xl font-grotesk font-bold tracking-tight text-white flex items-center gap-2">
              <Terminal size={20} className="text-gray-400" />
              Atharva<span className="text-emerald-500">.ai</span>
            </div>
            
            <div className="hidden md:flex space-x-8 font-inter text-sm font-medium text-gray-400">
              {['Home', 'About', 'Experience', 'Automations', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className={`transition-colors hover:text-white ${activeSection === item.toLowerCase() ? 'text-white' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="md:hidden text-white">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 p-4 backdrop-blur-xl">
            {['Home', 'About', 'Experience', 'Automations', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="block w-full text-left py-3 px-4 text-sm text-gray-300 hover:bg-white/5 rounded-lg"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 relative z-10">
          
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-card text-xs font-inter text-gray-300 border border-white/10 shadow-lg">
              <div className="flex items-center gap-1.5">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span>2+ Years Experience</span>
              </div>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                 <BrainCircuit size={12} />
                 <span>AI-Driven Ops</span>
              </div>
            </div>
            
            {/* Main Headline */}
            <div>
              <h1 className="text-5xl md:text-7xl font-grotesk font-bold text-white leading-[1.1] tracking-tight mb-6">
                Atharva Jagtap
              </h1>
              <p className="text-2xl md:text-3xl text-gray-400 font-grotesk font-light">
                DevOps Engineer & <br className="hidden md:block" />
                <span className="text-white font-medium">AI Infrastructure Architect</span>
              </p>
            </div>
            
            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 font-inter leading-relaxed border-l-2 border-emerald-500/30 pl-6">
              I engineer intelligent systems that scale. Specializing in <span className="text-white">AWS Automation</span>, <span className="text-white">CI/CD Reliability</span>, and integrating <span className="text-white">AI/ML models</span> into operational workflows.
            </p>
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-inter pt-4 max-w-lg mx-auto lg:mx-0">
               <div className="flex items-center gap-3 text-gray-300 glass-card p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                  <Mail size={18} className="text-emerald-400" /> <span>athrvajagtap000@gmail.com</span>
               </div>
               <div className="flex items-center gap-3 text-gray-300 glass-card p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                  <Phone size={18} className="text-emerald-400" /> <span>+91 9518717686</span>
               </div>
               <div className="flex items-center gap-3 text-gray-300 glass-card p-3 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                  <MapPin size={18} className="text-emerald-400" /> <span>Pune, Maharashtra</span>
               </div>
               <a href="https://linkedin.com/in/atharva-jagtap-70275415b" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white bg-white/5 glass-card p-3 rounded-lg hover:bg-white/10 transition-colors border-white/20">
                  <Linkedin size={18} /> <span>LinkedIn Profile</span>
               </a>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
               <button 
                 onClick={() => {
                   const link = document.createElement('a');
                   link.href = '/AtharvaJ_resume.pdf'; 
                   link.download = 'Atharva_Jagtap_Resume.pdf';
                   alert("Downloading Resume...");
                 }}
                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors shadow-lg shadow-white/5"
               >
                 <Download size={18} /> Download CV
               </button>
            </div>
          </div>

          {/* Image Profile */}
          <div className="relative group">
             <div className="relative w-72 h-72 md:w-[420px] md:h-[420px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
                <img 
                    src="shared image.jpg" 
                    alt="Atharva Jagtap" 
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-1 ring-white/10 grayscale hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-[1.02]"
                    onError={(e) => { 
                      e.target.src = "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=AJ"; 
                    }}
                />
                {/* Glass Badge over Image */}
                <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl flex items-center gap-3 animate-bounce delay-1000 duration-3000">
                   <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <BrainCircuit className="text-emerald-400" size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400">AI Ops Status</p>
                      <p className="text-sm font-bold text-white">Online & Learning</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* Tech Marquee */}
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 tech-marquee-container overflow-hidden">
           <div className="flex gap-16 whitespace-nowrap tech-marquee items-center">
              {[
                "Amazon Web Services", "Terraform", "AI Integration", "Docker", "Kubernetes", "Jenkins", 
                "Azure DevOps", "Python", "LLM Ops", "PostgreSQL", "Ansible", "Linux Automation",
                "Amazon Web Services", "Terraform", "AI Integration", "Docker"
              ].map((tech, idx) => (
                 <span key={idx} className="text-gray-500 font-grotesk font-medium text-lg opacity-40 hover:opacity-100 hover:text-emerald-400 transition-all cursor-default">{tech}</span>
              ))}
           </div>
        </div>
      </section>

      {/* 1. About Me Section (Moved Up & Detailed) */}
      <section id="about" className="py-24 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-card p-10 rounded-3xl">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
               <div className="lg:w-2/3">
                  <h2 className="text-3xl font-grotesk font-bold text-white mb-6 flex items-center gap-3">
                    <Bot size={32} className="text-emerald-400" /> About Me
                  </h2>
                  <div className="space-y-6 text-gray-300 font-inter leading-relaxed text-lg">
                    <p>
                      I am a results-driven <strong>DevOps Engineer</strong> with a passion for building self-healing, scalable infrastructure. Currently maximizing efficiency at <strong className="text-white">Prorigo Software Pvt. Ltd.</strong>, I focus on bridging the gap between complex development cycles and operational stability.
                    </p>
                    <p>
                      My core expertise lies in the <strong>AWS Ecosystem</strong>, where I architect secure, high-availability environments. I am a strong advocate for <strong>Infrastructure as Code (IaC)</strong>, using Terraform and Ansible to eliminate configuration drift and manual errors.
                    </p>
                    <p>
                      Beyond traditional Ops, I am actively exploring the frontier of <strong>AI-driven DevOps</strong>. I leverage LLMs and machine learning to optimize alert thresholds, predict system bottlenecks, and automate routine incident responses, positioning myself at the intersection of reliability engineering and artificial intelligence.
                    </p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4">
                     <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400 flex items-center gap-2">
                        <Globe size={16} /> Pune, India
                     </div>
                     <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400 flex items-center gap-2">
                        <Briefcase size={16} /> Open to Relocation
                     </div>
                  </div>
               </div>
               
               {/* Side Stats in About */}
               <div className="lg:w-1/3 w-full">
                  <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-6">
                     <div>
                        <h4 className="text-white font-bold mb-2">Focus Areas</h4>
                        <div className="flex flex-wrap gap-2">
                           <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">Cloud Native</span>
                           <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20">DevSecOps</span>
                           <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full border border-purple-500/20">AI Integration</span>
                        </div>
                     </div>
                     <div className="pt-6 border-t border-white/10">
                        <h4 className="text-white font-bold mb-2">Soft Skills</h4>
                        <ul className="text-sm text-gray-400 space-y-2">
                           <li>• Strategic Problem Solving</li>
                           <li>• Cross-Functional Leadership</li>
                           <li>• Process Optimization</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Work Experience Section (Detailed) */}
      <section id="experience" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl font-grotesk font-bold text-white">Professional Experience</h2>
              <p className="text-gray-400 mt-2 font-inter">My career trajectory and impact.</p>
            </div>
            <div className="hidden md:block">
               <Briefcase className="text-white/20" size={48} />
            </div>
          </div>

          <div className="space-y-12">
            {/* Job 1 */}
            <div className="group relative pl-8 lg:pl-0">
              <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10"></div>
              
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
                 
                 {/* Date */}
                 <div className="lg:w-[45%] lg:text-right lg:pr-8 lg:pt-2">
                    <h3 className="text-2xl font-bold text-white font-grotesk">DevOps Engineer</h3>
                    <p className="text-white/60 font-medium text-lg mb-1">Prorigo Software Pvt. Ltd.</p>
                    <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium">
                      Mar 2024 - Present
                    </div>
                 </div>

                 {/* Dot */}
                 <div className="absolute left-0 lg:left-[50%] lg:-ml-[9px] top-3 w-[18px] h-[18px] rounded-full bg-[#050505] border-4 border-emerald-500 z-10"></div>

                 {/* Content */}
                 <div className="lg:w-[45%] lg:pl-8">
                    <div className="glass-card p-8 rounded-2xl relative">
                       <div className="space-y-6">
                          <div>
                             <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Server size={16} className="text-blue-400"/> Operational Excellence</h4>
                             <p className="text-sm text-gray-400 leading-relaxed">
                               Managing daily operational workflows for client <strong>Epicor</strong>. Took ownership of system stability, reducing manual intervention by ~40% through strategic automation of repetitive tasks.
                             </p>
                          </div>
                          <div>
                             <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Workflow size={16} className="text-purple-400"/> CI/CD & Pipelines</h4>
                             <p className="text-sm text-gray-400 leading-relaxed">
                               Deploying web, batch, API, and scheduler apps to testing environments via <strong>Azure DevOps</strong>. monitoring ETL pipelines and data loads to ensure data integrity and timely processing.
                             </p>
                          </div>
                          <div>
                             <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Shield size={16} className="text-emerald-400"/> Governance & Recovery</h4>
                             <p className="text-sm text-gray-400 leading-relaxed">
                               Configuring integrations and middleware for seamless handoffs. Logging daily issues and tracking fixes. Implemented Cross-VPC backup & restore for RDS PostgreSQL to guarantee disaster recovery compliance.
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Internship */}
            <div className="group relative pl-8 lg:pl-0">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
                 <div className="lg:w-[45%] lg:text-right lg:pr-8 lg:pt-2">
                    <h3 className="text-xl font-bold text-gray-400 font-grotesk">Intern</h3>
                    <p className="text-gray-500 font-medium text-lg mb-1">Globmind Technologies</p>
                 </div>
                 <div className="absolute left-0 lg:left-[50%] lg:-ml-[9px] top-3 w-[18px] h-[18px] rounded-full bg-[#050505] border-4 border-gray-700 z-10"></div>
                 <div className="lg:w-[45%] lg:pl-8">
                    <div className="glass-card p-6 rounded-2xl border-dashed border-white/10 bg-transparent">
                       <p className="text-gray-500 font-inter text-sm leading-relaxed">
                          Immersed in the full software development lifecycle. Gained foundational experience in technical leadership, team coordination, and project execution. Actively participated in volunteering initiatives, honing communication and collaborative skills.
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Engineered Automations (Detailed) */}
      <section id="automations" className="py-20 relative bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6">
              <div>
                <h2 className="text-4xl font-grotesk font-bold text-white">Engineered Automations</h2>
                <p className="text-gray-400 mt-2 font-inter">Custom scripts & solutions solving critical Ops challenges.</p>
              </div>
              <div className="hidden md:block">
                 <Zap className="text-emerald-500/50" size={48} />
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              {/* Automation 1: S3 Versioning */}
              <div className="glass-card p-8 rounded-2xl group relative overflow-hidden hover:border-emerald-500/30 transition-all">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FileJson size={80} />
                 </div>
                 <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-emerald-400">
                       <RefreshCw size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white font-grotesk">S3 Version Retrieval Bot</h3>
                       <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">AWS S3 • Python Boto3 • Lambda</p>
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Developed a sophisticated automation to interact with AWS S3 buckets. The system programmatically retrieves specific versions of files based on metadata or timestamp, eliminating manual rollback errors and saving 2+ hours during critical incidents.
                 </p>
              </div>

              {/* Automation 2: Alerting System */}
              <div className="glass-card p-8 rounded-2xl group relative overflow-hidden hover:border-emerald-500/30 transition-all">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Bell size={80} />
                 </div>
                 <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-emerald-400">
                       <Bell size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white font-grotesk">Critical Failure Alerting</h3>
                       <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">AWS SES • SNS • EventBridge</p>
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Architected a real-time notification mesh using Amazon SES (Simple Email Service) and SNS. The system detects pipeline failures or anomaly metrics immediately and routes rich-text email alerts to relevant stakeholders, significantly reducing Mean Time to Detect (MTTD).
                 </p>
              </div>

              {/* Automation 3: Security Patching */}
              <div className="glass-card p-8 rounded-2xl group relative overflow-hidden hover:border-emerald-500/30 transition-all">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield size={80} />
                 </div>
                 <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-emerald-400">
                       <Bot size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white font-grotesk">Automated Fleet Patching</h3>
                       <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Bash • Linux Systems Manager</p>
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Wrote robust Bash scripts to automate OS security patching across the entire server fleet. This script checks for updates, applies security-critical patches, and gracefully restarts services, ensuring compliance and reducing vulnerability windows to near-zero.
                 </p>
              </div>

              {/* Automation 4: DB Backup */}
              <div className="glass-card p-8 rounded-2xl group relative overflow-hidden hover:border-emerald-500/30 transition-all">
                 <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Database size={80} />
                 </div>
                 <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-emerald-400">
                       <Database size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white font-grotesk">Cross-VPC Disaster Recovery</h3>
                       <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">RDS • PostgreSQL • Networking</p>
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Implemented a complex Cross-VPC backup and restore strategy for RDS PostgreSQL databases. Utilized VPC Peering and snapshot sharing to guarantee business continuity and data availability even in the event of a total region or account compromise.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. Technical Arsenal (Moved Up) */}
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl font-grotesk font-bold text-white">Technical Arsenal</h2>
              <p className="text-gray-400 mt-2 font-inter">The toolkit I use to build and scale.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* AWS Cloud & Infrastructure */}
            <div className="glass-card p-10 rounded-3xl relative overflow-hidden">
               <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
                 <div className="p-3 bg-white/5 rounded-xl"><Cloud size={28} className="text-emerald-400" /></div>
                 <div>
                    <h3 className="font-bold text-white text-xl font-grotesk">Cloud Infrastructure</h3>
                    <p className="text-xs text-emerald-400 font-mono uppercase tracking-wider">Amazon Web Services</p>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-8 relative z-10">
                 <div className="space-y-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2">
                        <Network size={14} /> Compute & Net
                    </span>
                    <ul className="space-y-2 text-sm text-gray-300 font-inter">
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> EC2 & Autoscaling</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> Lambda (Serverless)</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> VPC & Networking</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> ELB/ALB/NLB</li>
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2">
                        <Database size={14} /> Storage & Gov
                    </span>
                    <ul className="space-y-2 text-sm text-gray-300 font-inter">
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> S3 & Glacier</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> RDS (SQL/MySQL)</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> CloudWatch</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> IAM & Security</li>
                    </ul>
                 </div>
               </div>
            </div>

            {/* DevOps & Tooling */}
            <div className="glass-card p-10 rounded-3xl relative overflow-hidden">
               <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
                 <div className="p-3 bg-white/5 rounded-xl"><Terminal size={28} className="text-emerald-400" /></div>
                 <div>
                    <h3 className="font-bold text-white text-xl font-grotesk">DevOps & AI Ops</h3>
                    <p className="text-xs text-emerald-400 font-mono uppercase tracking-wider">CI/CD & Automation</p>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-8 relative z-10">
                 <div className="space-y-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2">
                        <Box size={14} /> Orchestration
                    </span>
                    <ul className="space-y-2 text-sm text-gray-300 font-inter">
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> Terraform (IaC)</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> Ansible</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> Docker & K8s</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> CloudFormation</li>
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold flex items-center gap-2">
                        <Code size={14} /> Pipelines & AI
                    </span>
                    <ul className="space-y-2 text-sm text-gray-300 font-inter">
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> Jenkins / Azure DevOps</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> Bash / Python</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> AI/LLM Integration</li>
                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500/50" /> Automated Alerting</li>
                    </ul>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Engineering Projects (Renamed) */}
      <section id="projects" className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl font-grotesk font-bold text-white">Engineering Projects</h2>
              <p className="text-gray-400 mt-2 font-inter">End-to-end architectures delivered.</p>
            </div>
            <div className="hidden md:block">
               <Layers className="text-white/20" size={48} />
            </div>
          </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Project 1 */}
             <div className="glass-card p-8 rounded-2xl group hover:border-white/20 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/5">
                    <Server size={28} className="text-white" />
                  </div>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-white transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-grotesk">Pharmacy E-Commerce</h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                   <strong>Infrastructure Deployment:</strong> Scalable AWS Web App. Utilized EC2 for compute, RDS for DB, and ELB for traffic. Designed CI/CD pipelines for zero-downtime updates.
                </p>
                <div className="flex gap-2 text-xs text-white font-mono border-t border-white/10 pt-4 mt-auto">
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">AWS</span>
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Jenkins</span>
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Terraform</span>
                </div>
             </div>

             {/* Project 2 */}
             <div className="glass-card p-8 rounded-2xl group hover:border-white/20 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/5">
                    <Code size={28} className="text-white" />
                  </div>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-white transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-grotesk">Pharmacy Web App</h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                   <strong>Full Stack Dev:</strong> Java Spring MVC app with complex RBAC for Admin/Customer portals. Managing product catalogs and order logic securely.
                </p>
                <div className="flex gap-2 text-xs text-white font-mono border-t border-white/10 pt-4 mt-auto">
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Java</span>
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Spring</span>
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">MySQL</span>
                </div>
             </div>

             {/* Project 3 */}
             <div className="glass-card p-8 rounded-2xl group hover:border-white/20 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 rounded-xl bg-white/5">
                    <Cpu size={28} className="text-white" />
                  </div>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-white transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-grotesk">IoT Leak Detection</h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed flex-grow">
                   <strong>IoT & AI:</strong> Integrated hardware sensors with Q-Learning (ML) to detect hazardous gas leaks real-time, visualizing data on a dynamic dashboard.
                </p>
                <div className="flex gap-2 text-xs text-white font-mono border-t border-white/10 pt-4 mt-auto">
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">Python</span>
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">IoT</span>
                   <span className="px-2 py-1 rounded bg-white/5 border border-white/5">ML</span>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 7. Strategic Pillars Section (Bottom) */}
      <section id="pillars" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
           <h2 className="text-2xl font-grotesk font-bold text-white mb-10 text-center">Core Architectural Pillars</h2>
           <div className="grid md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="glass-card p-10 rounded-2xl group relative overflow-hidden">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors border border-white/5">
                    <Cloud className="text-white" size={28} />
                 </div>
                 <h3 className="text-2xl font-bold text-white font-grotesk mb-4">Cloud Architecture</h3>
                 <p className="text-sm text-gray-400 leading-relaxed font-inter">
                    Designing fault-tolerant, scalable AWS environments using VPCs, ELBs, and Autoscaling groups to ensure 99.99% uptime.
                 </p>
              </div>

              {/* Pillar 2 */}
              <div className="glass-card p-10 rounded-2xl group relative overflow-hidden">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors border border-white/5">
                    <Workflow className="text-white" size={28} />
                 </div>
                 <h3 className="text-2xl font-bold text-white font-grotesk mb-4">AI-Enhanced Automation</h3>
                 <p className="text-sm text-gray-400 leading-relaxed font-inter">
                    Leveraging AI to optimize scripts and eliminating manual toil through robust IaC (Terraform), streamlining deployments.
                 </p>
              </div>

              {/* Pillar 3 */}
              <div className="glass-card p-10 rounded-2xl group relative overflow-hidden">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors border border-white/5">
                    <Shield className="text-white" size={28} />
                 </div>
                 <h3 className="text-2xl font-bold text-white font-grotesk mb-4">Security & Governance</h3>
                 <p className="text-sm text-gray-400 leading-relaxed font-inter">
                    Implementing rigorous security protocols including automated OS patching, IAM role management, and WAF policies.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Education & Certifications (Detailed) */}
      <section id="education" className="py-24 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl font-grotesk font-bold text-white">Education & Certifications</h2>
              <p className="text-gray-400 mt-2 font-inter">Academic foundation & professional validations.</p>
            </div>
            <div className="hidden md:block">
               <GraduationCap className="text-white/20" size={48} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
             {/* Formal Education */}
             <div className="space-y-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen size={20} className="text-emerald-400"/> Academic Background</h3>
                <div className="space-y-6">
                   <div className="glass-card p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-white font-bold text-lg">Bachelor of Engineering</h4>
                         <span className="text-emerald-400 font-mono text-sm">8.36 CGPA</span>
                      </div>
                      <p className="text-white/70 font-medium">Computer Science</p>
                      <p className="text-gray-500 text-sm mb-3">SPPU Pune University</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         specialized in Systems Architecture, Database Management, and Object-Oriented Programming.
                      </p>
                   </div>

                   <div className="glass-card p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-white font-bold text-lg">Diploma in Engineering</h4>
                         <span className="text-emerald-400 font-mono text-sm">6.65 CGPA</span>
                      </div>
                      <p className="text-white/70 font-medium">Electrical Engineering</p>
                      <p className="text-gray-500 text-sm mb-3">MSBTE Jalgoan</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         Focused on circuit logic and hardware-software integration systems.
                      </p>
                   </div>
                </div>
             </div>

             {/* Certifications */}
             <div className="space-y-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Award size={20} className="text-emerald-400"/> Professional Certifications</h3>
                <div className="grid gap-6">
                   <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-white/5 rounded-xl"><Cloud size={24} className="text-blue-400" /></div>
                      <div>
                         <h4 className="text-white font-bold">Cloud Computing</h4>
                         <p className="text-gray-500 text-sm mb-2">Issued by Great Learning</p>
                         <p className="text-xs text-gray-400">Comprehensive training on Cloud Architecture, Virtualization, and SaaS/PaaS/IaaS models.</p>
                      </div>
                   </div>

                   <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-white/5 rounded-xl"><Globe size={24} className="text-purple-400" /></div>
                      <div>
                         <h4 className="text-white font-bold">Web Development</h4>
                         <p className="text-gray-500 text-sm mb-2">Issued by Internshala</p>
                         <p className="text-xs text-gray-400">Full-stack development principles, including REST APIs, Database connectivity, and Frontend logic.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact / Pitch Section */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

             <div className="flex items-center gap-2 mb-6 relative z-10">
               <Sparkles className="text-white" />
               <h2 className="text-2xl font-grotesk font-bold text-white">AI Recruiter Tools</h2>
             </div>
             
             <p className="text-gray-400 mb-8 text-sm relative z-10 max-w-xl">
               Generate a custom pitch explaining why I am the perfect fit for your team, powered by AI.
             </p>

             <div className="grid md:grid-cols-3 gap-4 relative z-10">
               <input 
                  type="text" 
                  placeholder="Company Name" 
                  className="bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-[#050505]/80 transition-all"
                  value={pitchCompany}
                  onChange={(e) => setPitchCompany(e.target.value)}
               />
               <input 
                  type="text" 
                  placeholder="Role Title" 
                  className="bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-[#050505]/80 transition-all"
                  value={pitchRole}
                  onChange={(e) => setPitchRole(e.target.value)}
               />
               <button 
                  onClick={handleGeneratePitch}
                  disabled={isPitchLoading}
                  className="bg-white text-black font-bold rounded-xl px-6 py-4 text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 shadow-lg shadow-white/10"
               >
                  {isPitchLoading ? <Loader className="animate-spin" size={16} /> : 'Generate Pitch'}
               </button>
             </div>

             {generatedPitch && (
               <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 text-gray-300 leading-relaxed animate-in fade-in slide-in-from-bottom-2 relative z-10 backdrop-blur-md">
                 <div className="flex gap-2 mb-3 text-white font-bold text-sm items-center">
                   <Bot size={16} /> Generated Pitch:
                 </div>
                 <p className="font-inter italic text-lg">"{generatedPitch}"</p>
               </div>
             )}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-white/5 text-gray-600 text-sm font-inter">
        <p className="mb-2">Designed & Built by Atharva Jagtap</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>

    </div>
  );
};

export default AestheticPortfolio;