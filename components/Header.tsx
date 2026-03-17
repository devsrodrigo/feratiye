'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories, generateSlug } from '@/lib/recipes';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Recetas', href: '/recetas' },
  { label: 'Productos', href: '/productos' },
  { label: 'Historia', href: '/historia' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [recipesExpanded, setRecipesExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [megaMenuVisible, setMegaMenuVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleMegaEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuVisible(true);
  };

  const handleMegaLeave = () => {
    timeoutRef.current = setTimeout(() => setMegaMenuVisible(false), 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/feratiyelogo.png"
              alt="Fernando Atiye"
              width={140}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.label === 'Recetas' ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={handleMegaEnter}
                  onMouseLeave={handleMegaLeave}
                >
                  <Link
                    href={link.href}
                    className="nav-item text-sm text-dark hover:text-primary transition-colors py-6 inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        megaMenuVisible ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Mega Menu */}
                  <div
                    className={`absolute top-full -left-8 pt-2 transition-all duration-200 ${
                      megaMenuVisible
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-8 min-w-[700px]">
                      <p className="section-label text-xs mb-5 text-primary">
                        Explora por categoría
                      </p>
                      <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                        {categories.map((cat) => (
                          <Link
                            key={cat}
                            href={`/recetas?categoria=${generateSlug(cat)}`}
                            onClick={() => setMegaMenuVisible(false)}
                            className="text-dark/80 hover:text-primary transition-colors text-sm py-1 whitespace-nowrap"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-6 pt-5 border-t border-gray-100">
                        <Link
                          href="/recetas"
                          onClick={() => setMegaMenuVisible(false)}
                          className="text-primary text-sm uppercase tracking-wider hover:text-forest transition-colors"
                        >
                          Ver todas las recetas →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-item text-sm text-dark hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Social Icon (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.instagram.com/fernando.atiye/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark/50 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@fernandoatiye"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark/50 hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.15a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-2-.57l.01-.01V6.69h2z" />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-dark"
            aria-label="Menú"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`block h-0.5 w-6 bg-dark transform transition-all duration-300 origin-center ${
                  mobileOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-dark transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-dark transform transition-all duration-300 origin-center ${
                  mobileOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-20 bg-white z-40 lg:hidden transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 h-full overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.label === 'Recetas' ? (
                <div key={link.label}>
                  <button
                    onClick={() => setRecipesExpanded(!recipesExpanded)}
                    className="nav-item w-full flex items-center justify-between text-left text-lg text-dark py-3 border-b border-gray-100"
                  >
                    <span>Recetas</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        recipesExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      recipesExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 py-3 space-y-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat}
                          href={`/recetas?categoria=${generateSlug(cat)}`}
                          onClick={() => setMobileOpen(false)}
                          className="block text-dark/70 hover:text-primary transition-colors py-1.5 text-sm"
                        >
                          {cat}
                        </Link>
                      ))}
                      <Link
                        href="/recetas"
                        onClick={() => setMobileOpen(false)}
                        className="block text-primary uppercase tracking-wider text-xs pt-3 border-t border-gray-100 mt-3"
                      >
                        Ver todas →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="nav-item text-lg text-dark py-3 border-b border-gray-100"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Social Links */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="section-label text-xs mb-4">Sígueme</p>
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/fernando.atiye/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark/50 hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@fernandoatiye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark/50 hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46v-7.15a8.16 8.16 0 005.58 2.2v-3.45a4.85 4.85 0 01-2-.57l.01-.01V6.69h2z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@fernandoatiye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark/50 hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://x.com/fernandoatiye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark/50 hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
