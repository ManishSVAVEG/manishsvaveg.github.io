import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoPath from '@assets/Copilot_20260718_093228_1784351878407.png';

const links = [
  { name: 'HOME',     href: '#hero'     },
  { name: 'ABOUT',   href: '#about'    },
  { name: 'PROJECTS',href: '#projects' },
  { name: 'SKILLS',  href: '#skills'   },
  { name: 'GAME',    href: '#game'     },
  { name: 'CONTACT', href: '#contact'  },
];

export default function Navigation() {
  const [active, setActive]     = useState('HOME');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const mid = window.scrollY + window.innerHeight / 2;
      links.forEach(l => {
        const el = document.getElementById(l.href.slice(1));
        if (el && el.offsetTop <= mid && el.offsetTop + el.offsetHeight > mid)
          setActive(l.name);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLink = (link: typeof links[0], onClick?: () => void) => (
    <a
      key={link.name}
      href={link.href}
      onClick={onClick}
      className={`text-[10px] font-mono tracking-[0.2em] transition-all duration-300 relative pb-1
        ${active === link.name
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground/80'}`}
    >
      {link.name}
      {/* Active underline dot */}
      <span
        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 ${
          active === link.name
            ? 'w-4 h-[2px] bg-primary shadow-[0_0_8px_rgba(0,212,255,0.9)] opacity-100'
            : 'w-0 h-[2px] bg-primary opacity-0'
        }`}
      />
    </a>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-primary/15 shadow-[0_4px_40px_rgba(0,0,0,0.6),0_1px_0_rgba(0,212,255,0.08)]'
            : 'bg-transparent py-1'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group no-underline" onClick={() => setMenuOpen(false)}>
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 border border-primary/40 bg-card/80 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-primary/70 group-hover:bg-primary/10">
              <img
                src={logoPath}
                alt="Logo"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <span className="font-display font-bold text-sm sm:text-base tracking-[0.12em] text-foreground group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
              Manish Svaveg
            </span>
          </a>

          {/* Desktop nav pill */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 bg-card/60 backdrop-blur-xl px-5 lg:px-7 py-2.5 border border-border/40 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {links.map(l => navLink(l))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 text-[10px] font-mono text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary/70 hover:shadow-[0_0_15px_rgba(0,212,255,0.25)] transition-all duration-300 bg-background/40 backdrop-blur-sm tracking-widest uppercase"
          >
            <span>init</span>
            <span className="w-2 h-2 bg-primary rounded-sm animate-pulse shadow-[0_0_5px_rgba(0,212,255,0.8)]" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-50 group"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center shadow-[0_0_4px_rgba(0,212,255,0.6)]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-4 h-0.5 bg-primary/70 self-end"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center shadow-[0_0_4px_rgba(0,212,255,0.6)]"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {/* Decorative grid */}
            <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

            {/* Top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {links.map((l, i) => (
              <motion.a
                key={l.name}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06 }}
                className={`relative text-2xl font-display font-bold tracking-[0.15em] transition-all duration-300 group ${
                  active === l.name ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {l.name}
                {active === l.name && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_8px_rgba(0,212,255,0.8)] rounded-full" />
                )}
              </motion.a>
            ))}

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
