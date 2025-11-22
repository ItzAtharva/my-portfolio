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
  GraduationCap,
  MessageSquare
} from 'lucide-react';

// --- CONFIGURATION: ADD YOUR MESSAGES HERE ---
const HERO_MESSAGES = [
  "Boosted overall efficiency by 90% and cut manual retrieval time by 80% by engineering a custom AWS S3 automation tool that enables users to query and download historical file versions via a UI.",
  "Architected a real-time notification mesh using Amazon SES and SNS, reducing Mean Time to Detect (MTTD) for critical pipeline failures."
];

// --- TYPEWRITER EFFECT COMPONENT ---
const TypewriterText = ({ text, isActive }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      return;
    }
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20); // Typing speed

    return () => clearInterval(timer);
  }, [text, isActive]);

  return <span>{displayedText}</span>;
};

// --- FIXED & ENHANCED 3D TILT CARD ---
const TiltCard = ({ children, className = "" }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <div 
      className={`relative transition-all duration-500 ease-out hover:scale-[1.02] hover:z-20 ${className}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
    >
      <div
        className="w-full h-full relative transform-gpu"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out' 
        }}
      >
        {/* Dynamic Glare */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none z-30 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${50 + rotate.y * 2.5}% ${50 - rotate.x * 2.5}%, rgba(255,255,255,0.1), transparent 50%)`,
            opacity: isHovered ? 1 : 0
          }}
        />
        {children}
      </div>
    </div>
  );
};

const AestheticPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  
  // --- MESSAGE POPUP STATE ---
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  // --- ADVANCED CURSOR & PARALLAX STATE ---
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorHovered, setCursorHovered] = useState(false);
  
  // Refs for parallax background elements
  const bgBlueRef = useRef(null);
  const bgEmeraldRef = useRef(null);

  // Message Cycling Logic (12 Seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsMessageVisible(false); // Start fade out
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % HERO_MESSAGES.length);
        setIsMessageVisible(true); // Start fade in + typing
      }, 500); 
    }, 12000); // 12 Seconds

    return () => clearInterval(interval);
  }, []);

  // Mouse position logic
  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      if (bgBlueRef.current && bgEmeraldRef.current) {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        bgBlueRef.current.style.transform = `translate(${x}px, ${y}px)`;
        bgEmeraldRef.current.style.transform = `translate(${-x}px, ${-y}px)`;
      }
    };

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(animateCursor);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button') || e.target.closest('.glass-card')) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    const animationFrame = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Scroll handler & Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'automations', 'skills', 'projects', 'education'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-gray-200 font-sans selection:bg-emerald-500/30 selection:text-white overflow-x-hidden cursor-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        /* Base Glass Card */
        .glass-card {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        
        .glass-nav {
          background: rgba(5, 5, 5, 0.7);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Parallax Blobs */
        .ambient-blob {
            position: fixed;
            border-radius: 50%;
            filter: blur(100px);
            z-index: 0;
            pointer-events: none;
            transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1); 
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

        /* --- CUSTOM CURSOR --- */
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
          border-radius: 50%;
        }

        .cursor-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          box-shadow: 0 0 10px #10b981;
        }

        .cursor-ring {
          width: 30px;
          height: 30px;
          border: 1px solid rgba(16, 185, 129, 0.5);
          transition: width 0.3s, height 0.3s, background-color 0.3s;
        }

        .cursor-ring.hovered {
          width: 60px;
          height: 60px;
          background-color: rgba(16, 185, 129, 0.1);
          border-color: #10b981;
          backdrop-filter: blur(2px);
        }

        /* --- SCROLL ANIMATIONS --- */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.5, 0, 0, 1);
        }

        .reveal-on-scroll.animate-reveal {
          opacity: 1;
          transform: translateY(0);
        }

        /* Bubble Animation */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* --- CUSTOM CURSOR ELEMENTS --- */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className={`cursor-ring ${cursorHovered ? 'hovered' : ''}`} />

      {/* --- PARALLAX BACKGROUNDS --- */}
      <div ref={bgBlueRef} className="ambient-blob top-0 left-0 w-[800px] h-[800px] bg-blue-900/10" />
      <div ref={bgEmeraldRef} className="ambient-blob bottom-0 right-0 w-[600px] h-[600px] bg-emerald-900/10" />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="text-xl font-grotesk font-bold tracking-tight text-white flex items-center gap-2 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <Terminal size={20} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
              Atharva<span className="text-emerald-500">.ai</span>
            </div>
            
            <div className="hidden md:flex space-x-8 font-inter text-sm font-medium text-gray-400">
              {['Home', 'About', 'Experience', 'Automations', 'Skills', 'Projects', 'Education'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className={`relative overflow-hidden px-2 py-1 transition-colors hover:text-white ${activeSection === item.toLowerCase() ? 'text-white' : ''}`}
                >
                  <span className="relative z-10">{item}</span>
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
                  )}
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
            {['Home', 'About', 'Experience', 'Automations', 'Skills', 'Projects', 'Education'].map((item) => (
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
          
          <div className="flex-1 text-center lg:text-left space-y-8 reveal-on-scroll">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-card text-xs font-inter text-gray-300 border border-white/10 shadow-lg hover:border-emerald-500/30 transition-colors">
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
               <div className="flex items-center gap-3 text-gray-300 glass-card p-3 rounded-lg hover:bg-white/5 transition-colors cursor-none pointer-events-auto">
                  <Mail size={18} className="text-emerald-400" /> <span>athrvajagtap000@gmail.com</span>
               </div>
               <div className="flex items-center gap-3 text-gray-300 glass-card p-3 rounded-lg hover:bg-white/5 transition-colors cursor-none pointer-events-auto">
                  <Phone size={18} className="text-emerald-400" /> <span>+91 9518717686</span>
               </div>
               <div className="flex items-center gap-3 text-gray-300 glass-card p-3 rounded-lg hover:bg-white/5 transition-colors cursor-none pointer-events-auto">
                  <MapPin size={18} className="text-emerald-400" /> <span>Pune, Maharashtra</span>
               </div>
               <a href="https://linkedin.com/in/atharva-jagtap-70275415b" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white bg-white/5 glass-card p-3 rounded-lg hover:bg-white/10 transition-colors border-white/20 cursor-none pointer-events-auto">
                  <Linkedin size={18} /> <span>LinkedIn Profile</span>
               </a>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
               <a 
                 href="/AtharvaJ_resume.pdf" 
                 download="Atharva_Jagtap_Resume.pdf"
                 className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition-all shadow-lg shadow-white/5 hover:shadow-emerald-500/20 hover:-translate-y-1 cursor-none pointer-events-auto"
               >
                 <Download size={18} /> Download CV
               </a>
            </div>
          </div>

          {/* Image Profile with Chat Popup */}
          <div className="relative group reveal-on-scroll">
             <div className="relative w-72 h-72 md:w-[420px] md:h-[420px] transition-transform duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
                <img 
                    src="shared image.jpg" 
                    alt="Atharva Jagtap" 
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-1 ring-white/10 grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                    onError={(e) => { 
                      e.target.src = "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=AJ"; 
                    }}
                />
                
                {/* Glass Badge over Image (Bottom Right) */}
                <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl flex items-center gap-3 animate-bounce delay-1000 duration-3000 hover:animate-none">
                   <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <BrainCircuit className="text-emerald-400" size={20} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400">AI Ops Status</p>
                      <p className="text-sm font-bold text-white">Online & Learning</p>
                   </div>
                </div>

                {/* DYNAMIC MESSAGE POPUP - Pointing to Image */}
                <div 
                  className={`absolute bottom-16 -left-8 md:-left-80 w-[22rem] md:w-[28rem] p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-white/5 transition-all duration-700 transform animate-float z-20 ${isMessageVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
                >
                  {/* Content */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 backdrop-blur-md">
                      <MessageSquare size={18} className="text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-emerald-400 font-bold mb-1 tracking-wider uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Latest Deployment
                      </p>
                      <div className="text-xs text-gray-100 leading-relaxed font-inter min-h-[60px]">
                        <TypewriterText text={HERO_MESSAGES[currentMessageIndex]} isActive={isMessageVisible} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Pointer - Rotated Square (Cleanest Glassmorphism Method) */}
                  <div className="absolute top-1/2 -right-2 w-4 h-4 bg-white/5 border-t border-r border-white/10 transform -translate-y-1/2 rotate-45 backdrop-blur-2xl"></div>
                </div>

             </div>
          </div>
        </div>
        
        {/* Tech Marquee */}
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 tech-marquee-container overflow-hidden reveal-on-scroll">
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

      {/* 1. About Me Section */}
      <section id="about" className="py-24 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-card p-10 rounded-3xl reveal-on-scroll hover:border-emerald-500/20 transition-colors duration-500">
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
                     <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400 flex items-center gap-2 hover:bg-white/10 transition-colors">
                        <Globe size={16} /> Pune, India
                     </div>
                     <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400 flex items-center gap-2 hover:bg-white/10 transition-colors">
                        <Briefcase size={16} /> Open to Relocation
                     </div>
                  </div>
               </div>
               
               {/* Side Stats in About */}
               <div className="lg:w-1/3 w-full">
                  <TiltCard className="glass-card p-6 rounded-2xl bg-black/20 border border-white/5 space-y-6">
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
                  </TiltCard>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Work Experience Section (Detailed) */}
      <section id="experience" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6 reveal-on-scroll">
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
            <div className="group relative pl-8 lg:pl-0 reveal-on-scroll">
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
                 <div className="absolute left-0 lg:left-[50%] lg:-ml-[9px] top-3 w-[18px] h-[18px] rounded-full bg-[#050505] border-4 border-emerald-500 z-10 shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>

                 {/* Content */}
                 <div className="lg:w-[45%] lg:pl-8">
                    <TiltCard className="glass-card p-8 rounded-2xl">
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
                    </TiltCard>
                 </div>
              </div>
            </div>

            {/* Internship */}
            <div className="group relative pl-8 lg:pl-0 reveal-on-scroll">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
                 <div className="lg:w-[45%] lg:text-right lg:pr-8 lg:pt-2">
                    <h3 className="text-xl font-bold text-gray-400 font-grotesk">Intern</h3>
                    <p className="text-gray-500 font-medium text-lg mb-1">Globmind Technologies</p>
                 </div>
                 <div className="absolute left-0 lg:left-[50%] lg:-ml-[9px] top-3 w-[18px] h-[18px] rounded-full bg-[#050505] border-4 border-gray-700 z-10"></div>
                 <div className="lg:w-[45%] lg:pl-8">
                    <div className="glass-card p-6 rounded-2xl border-dashed border-white/10 bg-transparent hover:bg-white/5 transition-colors">
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

      {/* 3. Engineered Automations */}
      <section id="automations" className="py-20 relative bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6 reveal-on-scroll">
              <div>
                <h2 className="text-4xl font-grotesk font-bold text-white">Engineered Automations</h2>
                <p className="text-gray-400 mt-2 font-inter">Custom scripts & solutions solving critical Ops challenges.</p>
              </div>
              <div className="hidden md:block">
                 <Zap className="text-emerald-500/50" size={48} />
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <TiltCard className="glass-card p-8 rounded-2xl reveal-on-scroll">
                 <div className="absolute top-0 right-0 p-6 opacity-5">
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
              </TiltCard>

              <TiltCard className="glass-card p-8 rounded-2xl reveal-on-scroll">
                 <div className="absolute top-0 right-0 p-6 opacity-5">
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
                    Architected a real-time notification mesh using Amazon SES and SNS. The system detects pipeline failures or anomaly metrics immediately and routes rich-text email alerts to relevant stakeholders, significantly reducing Mean Time to Detect (MTTD).
                 </p>
              </TiltCard>

              <TiltCard className="glass-card p-8 rounded-2xl reveal-on-scroll">
                 <div className="absolute top-0 right-0 p-6 opacity-5">
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
              </TiltCard>

              <TiltCard className="glass-card p-8 rounded-2xl reveal-on-scroll">
                 <div className="absolute top-0 right-0 p-6 opacity-5">
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
                    Implemented a complex Cross-VPC backup and restore strategy for RDS PostgreSQL databases. Utilized VPC Peering and snapshot sharing to guarantee business continuity.
                 </p>
              </TiltCard>
           </div>
        </div>
      </section>

      {/* 4. Technical Arsenal */}
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6 reveal-on-scroll">
            <div>
              <h2 className="text-4xl font-grotesk font-bold text-white">Technical Arsenal</h2>
              <p className="text-gray-400 mt-2 font-inter">The toolkit I use to build and scale.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <TiltCard className="glass-card p-10 rounded-3xl relative overflow-hidden reveal-on-scroll">
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
            </TiltCard>

            <TiltCard className="glass-card p-10 rounded-3xl relative overflow-hidden reveal-on-scroll">
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
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 5. Engineering Projects */}
      <section id="projects" className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6 reveal-on-scroll">
            <div>
              <h2 className="text-4xl font-grotesk font-bold text-white">Engineering Projects</h2>
              <p className="text-gray-400 mt-2 font-inter">End-to-end architectures delivered.</p>
            </div>
            <div className="hidden md:block">
               <Layers className="text-white/20" size={48} />
            </div>
          </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <TiltCard className="glass-card p-8 rounded-2xl flex flex-col reveal-on-scroll">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/5">
                    <Server size={28} className="text-white" />
                  </div>
                  <ArrowUpRight className="text-white" />
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
             </TiltCard>

             <TiltCard className="glass-card p-8 rounded-2xl flex flex-col reveal-on-scroll">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/5">
                    <Code size={28} className="text-white" />
                  </div>
                  <ArrowUpRight className="text-white" />
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
             </TiltCard>

             <TiltCard className="glass-card p-8 rounded-2xl flex flex-col reveal-on-scroll">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 rounded-xl bg-white/5">
                    <Cpu size={28} className="text-white" />
                  </div>
                  <ArrowUpRight className="text-white" />
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
             </TiltCard>
           </div>
        </div>
      </section>

      {/* 6. Education & Certifications */}
      <section id="education" className="py-24 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6 reveal-on-scroll">
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
             <div className="space-y-8 reveal-on-scroll">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen size={20} className="text-emerald-400"/> Academic Background</h3>
                <div className="space-y-6">
                   <TiltCard className="glass-card p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-white font-bold text-lg">Bachelor of Engineering</h4>
                         <span className="text-emerald-400 font-mono text-sm">8.36 CGPA</span>
                      </div>
                      <p className="text-white/70 font-medium">Computer Science</p>
                      <p className="text-gray-500 text-sm mb-3">SPPU Pune University</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         Specialized in Systems Architecture, Database Management, and Object-Oriented Programming. Built strong foundations in algorithm design and software engineering principles.
                      </p>
                   </TiltCard>

                   <TiltCard className="glass-card p-6 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-white font-bold text-lg">Diploma in Engineering</h4>
                         <span className="text-emerald-400 font-mono text-sm">6.65 CGPA</span>
                      </div>
                      <p className="text-white/70 font-medium">Electrical Engineering</p>
                      <p className="text-gray-500 text-sm mb-3">MSBTE Jalgoan</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         Focused on circuit logic, control systems, and hardware-software integration. Gained practical experience in IoT and embedded systems.
                      </p>
                   </TiltCard>
                </div>
             </div>

             {/* Certifications */}
             <div className="space-y-8 reveal-on-scroll">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Award size={20} className="text-emerald-400"/> Professional Certifications</h3>
                <div className="grid gap-6">
                   <TiltCard className="glass-card p-6 rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-white/5 rounded-xl"><Cloud size={24} className="text-blue-400" /></div>
                      <div>
                         <h4 className="text-white font-bold">Cloud Computing</h4>
                         <p className="text-gray-500 text-sm mb-2">Issued by Great Learning</p>
                         <p className="text-xs text-gray-400 leading-relaxed">
                           Comprehensive training on Cloud Architecture, Virtualization technologies, and SaaS/PaaS/IaaS delivery models. Covered AWS core services including EC2, S3, and VPC networking.
                         </p>
                      </div>
                   </TiltCard>

                   <TiltCard className="glass-card p-6 rounded-2xl flex items-start gap-4">
                      <div className="p-3 bg-white/5 rounded-xl"><Globe size={24} className="text-purple-400" /></div>
                      <div>
                         <h4 className="text-white font-bold">Web Development</h4>
                         <p className="text-gray-500 text-sm mb-2">Issued by Internshala</p>
                         <p className="text-xs text-gray-400 leading-relaxed">
                           Full-stack development principles, including designing REST APIs, managing Database connectivity, and implementing responsive Frontend logic using HTML/CSS and JS frameworks.
                         </p>
                      </div>
                   </TiltCard>
                </div>
             </div>
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