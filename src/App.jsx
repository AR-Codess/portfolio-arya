import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, 
  ExternalLink, Code2, Server, Database, 
  Terminal, Briefcase, GraduationCap, 
  Download, ChevronRight, Menu, X, LayoutTemplate
} from 'lucide-react';

// --- Custom Hooks ---

// Hook untuk efek mengetik (Typewriter)
const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

// --- Komponen Utama ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Kata-kata untuk efek ngetik di Hero
  const roles = ["Web Developer", "Backend Developer", "UI/UX Enthusiast"];
  const typedText = useTypewriter(roles);

  // Handle scroll untuk navbar sticky & glow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Pattern (Tech Grid) */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            A.B.E<span className="text-cyan-400">_</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium hover:text-cyan-400 transition-colors duration-300"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2 text-sm font-medium border border-cyan-500/50 text-cyan-400 rounded-md hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
            >
              Contact Me
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300 hover:text-cyan-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#0f0f0f] border-b border-white/10 p-4 flex flex-col space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.id)}
                className="text-left px-4 py-2 hover:bg-white/5 rounded-md text-slate-300 hover:text-cyan-400"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-md text-left"
            >
              Contact Me
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-start">
          <p className="text-cyan-400 font-mono mb-4 flex items-center gap-2">
            <Terminal size={16} /> Hello World, my name is
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            Arya Budi Evandi.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-500 mb-6 h-12 md:h-16 flex items-center">
            I'm a <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{typedText}</span><span className="animate-pulse text-cyan-400">|</span>
          </h2>
          <p className="max-w-2xl text-lg text-slate-400 leading-relaxed mb-10">
            Building scalable web solutions. Berawal dari desain visual (UI/UX), kini saya berfokus pada pengembangan sistem backend dan fullstack modern. Siap untuk menerjemahkan logika kompleks menjadi kode yang efisien dan desain yang memukau.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-md hover:bg-cyan-400 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] relative z-20"
            >
              View Projects <ChevronRight size={18} />
            </button>
            <a 
              href="/CV_Arya.pdf" 
              download="CV_Arya.pdf"
              className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-white rounded-md transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-white/10 relative z-20 cursor-pointer"
            >
              <Download size={18} /> Download CV
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 border-t border-white/10">
          <SectionHeader title="About Me" index="01" />
          <div className="grid md:grid-cols-2 gap-10 items-center mt-10">
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Saya adalah lulusan SMK yang memiliki passion kuat di dunia teknologi. Perjalanan karir saya dimulai dari pembelajaran mandiri (self-taught) di bidang <span className="text-cyan-400">Web Design (UI/UX)</span> melalui bimbingan intensif dari mentor ahli.
              </p>
              <p>
                Dalam 1 tahun terakhir, saya bersama pasangan mengembangkan bisnis web design dan startup. Pengalaman ini mengasah kemampuan saya tidak hanya dalam merancang visual, tetapi juga dalam implementasi kode <span className="text-cyan-400">Front-end</span> dan <span className="text-cyan-400">Backend</span> dasar.
              </p>
              <p>
                Saat ini, saya sedang mencari peluang *internship* atau posisi junior sebagai Web/Backend Developer untuk mengaplikasikan kemampuan logika pemrograman saya, seperti Python dan PHP (Laravel), dalam proyek berskala industri.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#111] border border-white/10 rounded-xl p-8 h-full flex flex-col justify-center">
                 <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                   <LayoutTemplate className="text-purple-400" /> Profil Singkat
                 </h3>
                 <ul className="space-y-3 text-sm">
                   <li className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-slate-500">Domisili</span>
                     <span className="text-slate-300">Nganjuk, Jawa Timur</span>
                   </li>
                   <li className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-slate-500">Pendidikan</span>
                     <span className="text-slate-300">SMK Kosgoro (TKJ)</span>
                   </li>
                   <li className="flex justify-between border-b border-white/5 pb-2">
                     <span className="text-slate-500">Fokus Utama</span>
                     <span className="text-slate-300">Web & Backend Dev</span>
                   </li>
                   <li className="flex justify-between pt-1">
                     <span className="text-slate-500">Soft Skills</span>
                     <span className="text-slate-300 text-right">Problem Solving, Teamwork, Adaptabilitas</span>
                   </li>
                 </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 border-t border-white/10">
          <SectionHeader title="Tech Stack" index="02" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <SkillCard title="Frontend & Design" icon={<Code2 className="text-cyan-400" size={24} />}>
              <SkillItem name="HTML5 & CSS3" level="90%" />
              <SkillItem name="JavaScript" level="80%" />
              <SkillItem name="React.js / Tailwind" level="75%" />
              <SkillItem name="Figma (UI/UX)" level="85%" />
            </SkillCard>

            <SkillCard title="Backend & Logic" icon={<Server className="text-purple-400" size={24} />}>
              <SkillItem name="Python" level="80%" />
              <SkillItem name="Django / REST API" level="70%" />
              <SkillItem name="PHP / Laravel" level="75%" />
              <SkillItem name="WordPress" level="85%" />
            </SkillCard>

            <SkillCard title="Database & Tools" icon={<Database className="text-green-400" size={24} />}>
              <SkillItem name="MySQL" level="80%" />
              <SkillItem name="Git / GitHub" level="75%" />
              <SkillItem name="Information Management" level="70%" />
              <SkillItem name="Microsoft Office" level="90%" />
            </SkillCard>

          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-20 border-t border-white/10">
          <SectionHeader title="Experience" index="03" />
          <div className="mt-10 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent">
            
            <TimelineItem 
              title="Freelancer | Pengembangan Web"
              company="Self-Employed / Startup"
              date="2025 - Sekarang"
              side="left"
              icon={<Code2 size={20} />}
            >
              <ul className="list-disc list-outside ml-4 mt-3 space-y-2 text-slate-400 text-sm">
                <li>Merancang dan mengembangkan 4 website klien secara penuh dari *wireframe* hingga *front-end* dasar.</li>
                <li>Mengimplementasikan desain UI/UX *mobile-friendly* menggunakan Figma dan WordPress.</li>
                <li>Menerapkan skill teknis HTML & CSS memastikan output *coding* yang rapi dan terstruktur.</li>
                <li>Mengelola komunikasi klien dan alur proyek, menjamin deadline terpenuhi 100%.</li>
              </ul>
            </TimelineItem>

            <TimelineItem 
              title="Internship AI 4 Jobs"
              company="PT Orbit Future Academy, Jakarta"
              date="2022 - 2023"
              side="right"
              icon={<Briefcase size={20} />}
            >
              <ul className="list-disc list-outside ml-4 mt-3 space-y-2 text-slate-400 text-sm">
                <li>Penyusunan karya ilmiah: "Pemanfaatan Website sebagai Media Promosi UMKM Desa".</li>
                <li>Melakukan riset mendalam, pengumpulan data primer/sekunder, dan analisis informasi.</li>
                <li>Menyusun laporan penelitian terstruktur dan mempresentasikannya di hadapan dewan penguji.</li>
              </ul>
            </TimelineItem>

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 border-t border-white/10">
          <SectionHeader title="Featured Projects" index="04" />
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <ProjectCard 
              title="Aplikasi Kasir Pintar"
              desc="Sistem Point of Sales (POS) berbasis web untuk manajemen inventaris, pencatatan transaksi real-time, dan pembuatan laporan harian."
              tech={["Python", "Django REST", "React", "MySQL"]}
              link="#"
            />

            <ProjectCard 
              title="Sistem Absensi & SPP"
              desc="Platform manajemen akademik pondok pesantren. Fitur meliputi absensi barcode, pencatatan pembayaran santri, dan rekap keuangan."
              tech={["Laravel", "PHP", "Tailwind CSS", "MySQL"]}
              link="#"
            />

            <ProjectCard 
              title="Personal Tech Portfolio"
              desc="Website portofolio interaktif dengan tema dark mode / tech dashboard. Menampilkan animasi halus dan arsitektur komponen modular."
              tech={["React.js", "Tailwind CSS", "Vite", "Lucide"]}
              link="#"
            />

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-20 border-t border-white/10">
          <SectionHeader title="Education" index="05" />
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="group bg-[#111] border border-white/10 hover:border-purple-500/50 rounded-xl p-8 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <GraduationCap size={120} className="text-purple-500" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">SMK Kosgoro Nganjuk</h3>
                  <p className="text-cyan-400 font-medium mb-4">Teknik Komputer & Jaringan</p>
                  <ul className="list-disc list-outside ml-4 space-y-2 text-slate-400 text-sm max-w-lg">
                    <li>Menempuh pendidikan dengan konsentrasi pada teknologi perangkat keras dan jaringan.</li>
                    <li>Aktif berpartisipasi dalam kegiatan yang mengasah analisis dan pemecahan masalah.</li>
                    <li>Mempelajari dasar-dasar IT yang menjadi landasan kuat untuk berkarir di bidang desain dan pengembangan web.</li>
                  </ul>
                </div>
                <div className="mt-6 md:mt-0 md:text-right">
                  <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-mono border border-purple-500/20">
                    2018 - 2021
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-white/10 text-center max-w-2xl mx-auto relative z-20">
          <p className="text-cyan-400 font-mono mb-4">06. What's Next?</p>
          <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Saya sedang terbuka untuk peluang *internship* atau peran *junior developer*. Jika perusahaan Anda membutuhkan talenta yang berdedikasi, mau belajar cepat, dan memiliki kombinasi skill desain & logika kode, mari berdiskusi!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <a href="mailto:arya0325@yahoo.com" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors relative z-20">
              <div className="p-3 bg-white/5 rounded-full"><Mail size={20} /></div>
              arya0325@yahoo.com
            </a>
            <a href="https://wa.me/6287895341656" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors relative z-20">
              <div className="p-3 bg-white/5 rounded-full"><Phone size={20} /></div>
              0878-9534-1656
            </a>
            <div className="flex items-center gap-3 text-slate-300">
              <div className="p-3 bg-white/5 rounded-full"><MapPin size={20} /></div>
              Nganjuk, Jatim
            </div>
          </div>

          <a href="mailto:arya0325@yahoo.com?subject=Halo%20Arya!%20Saya%20tertarik%20dengan%20portfolio%20Anda" className="relative z-20 cursor-pointer inline-block px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
            Kirim Pesan Email
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm relative z-20">
        <div className="flex justify-center gap-6 mb-4 relative z-20">
          <a href="https://github.com/AR-Codess" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors cursor-pointer block p-2">
            {/* Icon Github SVG Manual */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a5.25 5.25 0 0 0-1.5-3.8 4.3 4.3 0 0 0 0-3.8s-1.2-.3-3.9 1.5a13.38 13.38 0 0 0-7 0C6.2 1.6 5 1.9 5 1.9a4.3 4.3 0 0 0 0 3.8A5.25 5.25 0 0 0 3.5 9.5c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.02V22"/><path d="M9 20c-5 1.5-5-2.5-7-3"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/aryabudii/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors cursor-pointer block p-2">
            {/* Icon Linkedin SVG Manual */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
        <p>Built with React & Tailwind CSS. Designed by Arya Budi Evandi © 2026.</p>
      </footer>
    </div>
  );
}

// --- Komponen Pendukung ---

const SectionHeader = ({ title, index }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="text-cyan-400 font-mono text-xl">{index}.</span>
    <h2 className="text-3xl font-bold text-white">{title}</h2>
    <div className="h-px bg-white/10 flex-grow ml-4 max-w-xs"></div>
  </div>
);

const SkillCard = ({ title, icon, children }) => (
  <div className="bg-[#111] border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 group">
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
      <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const SkillItem = ({ name, level }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-slate-300">{name}</span>
      <span className="text-cyan-500 font-mono text-xs">{level}</span>
    </div>
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
        style={{ width: level }}
      ></div>
    </div>
  </div>
);

const TimelineItem = ({ title, company, date, side, icon, children }) => {
  const isLeft = side === 'left';
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-slate-800 text-cyan-400 absolute left-0 md:left-1/2 -translate-x-1/2 z-10 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300 shadow-[0_0_10px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]">
        {icon}
      </div>
      
      <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}>
        <div className="bg-[#111] p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-cyan-400 font-medium">{company}</p>
            </div>
            <span className="inline-block px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-slate-400 whitespace-nowrap self-start">
              {date}
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, desc, tech, link }) => (
  <div className="flex flex-col bg-[#111] border border-white/10 rounded-xl p-6 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)] transition-all duration-300 h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="text-cyan-400"><Terminal size={32} strokeWidth={1.5} /></div>
      <a href={link} className="text-slate-400 hover:text-cyan-400 transition-colors">
        <ExternalLink size={20} />
      </a>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
      {desc}
    </p>
    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
      {tech.map((t, i) => (
        <span key={i} className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded-sm">
          {t}
        </span>
      ))}
    </div>
  </div>
);