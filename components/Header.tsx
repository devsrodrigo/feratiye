'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories, generateSlug, normalizeCategory, recipes } from '@/lib/recipes';
import { products } from '@/lib/products';
import { fuzzySearchItems } from '@/lib/search';
import SearchBar from './SearchBar';

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchPanelRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [mobileOpen]);

  const handleMegaEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaMenuVisible(true);
  };

  const handleMegaLeave = () => {
    timeoutRef.current = setTimeout(() => setMegaMenuVisible(false), 150);
  };

  const searchRecipes = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return [];

    return fuzzySearchItems(recipes, query, (recipe) => [
      recipe.title,
      recipe.category,
      recipe.description,
      recipe.ingredients.join(' '),
    ]).slice(0, 4);
  }, [searchQuery]);

  const searchProducts = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return [];

    return fuzzySearchItems(products, query, (product) => [
      product.name,
      product.description,
      product.longDescription,
    ]).slice(0, 3);
  }, [searchQuery]);

  const hasSearchResults = searchRecipes.length + searchProducts.length > 0;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <nav className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/feratiyelogo.png"
              alt="Fernando Atiye"
              width={184}
              height={64}
              className="h-14 w-auto"
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
              <svg className="w-5 h-5" viewBox="-0.323 -3.128 42.684 42.128" fill="currentColor">
                <path d="M14 15.599v-1.486A13.1 13.1 0 0 0 12.337 14C5.535 14 0 19.18 0 25.547 0 29.452 2.086 32.91 5.267 35c-2.13-2.132-3.315-4.942-3.313-7.861 0-6.276 5.377-11.394 12.046-11.54" />
                <path d="M14.327 32c2.876 0 5.221-2.273 5.328-5.107l.01-25.292h4.65A8.72 8.72 0 0 1 24.164 0h-6.35l-.011 25.293c-.106 2.832-2.453 5.105-5.328 5.105a5.329 5.329 0 0 1-2.476-.61A5.34 5.34 0 0 0 14.327 32m18.672-21.814V8.78a8.818 8.818 0 0 1-4.81-1.421A8.85 8.85 0 0 0 33 10.186" />
                <path d="M28 7.718A8.63 8.63 0 0 1 25.832 2h-1.697A8.735 8.735 0 0 0 28 7.718M12.325 20.065c-2.94.004-5.322 2.361-5.325 5.27A5.267 5.267 0 0 0 9.854 30a5.2 5.2 0 0 1-1.008-3.073c.003-2.91 2.385-5.268 5.325-5.271.55 0 1.075.09 1.572.244v-6.4a11.72 11.72 0 0 0-1.572-.114c-.092 0-.183.006-.274.007v4.916a5.286 5.286 0 0 0-1.572-.244" />
                <path d="M32.153 11v4.884a15.15 15.15 0 0 1-8.813-2.811V25.84c0 6.377-5.23 11.565-11.658 11.565-2.485 0-4.789-.778-6.682-2.097A11.67 11.67 0 0 0 13.528 39c6.429 0 11.659-5.188 11.659-11.564V14.668A15.15 15.15 0 0 0 34 17.478v-6.283A8.87 8.87 0 0 1 32.153 11" />
                <path d="M23.979 25.42V12.632A15.741 15.741 0 0 0 33 15.448v-4.89a9.083 9.083 0 0 1-4.912-2.82C26.016 6.431 24.586 4.358 24.132 2h-4.747l-.01 25.215c-.11 2.824-2.505 5.09-5.44 5.09-1.754-.002-3.398-.822-4.42-2.204-1.794-.913-2.919-2.716-2.92-4.682.003-2.92 2.44-5.285 5.45-5.289.56 0 1.098.09 1.608.245v-4.933C7.202 15.589 2 20.722 2 27.016c0 3.045 1.219 5.816 3.205 7.885A12.115 12.115 0 0 0 12.045 37c6.58 0 11.934-5.195 11.934-11.58" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@fernandoatiye"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark/50 hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://x.com/fernandoatiye"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark/50 hover:text-primary transition-colors"
              aria-label="X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="text-dark/50 hover:text-primary transition-colors"
              aria-label="Abrir búsqueda"
              aria-expanded={searchOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
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

        <div
          ref={searchPanelRef}
          className={`absolute right-6 top-full z-50 mt-2 w-[min(420px,calc(100vw-48px))] rounded-[2rem] border border-gray-200 bg-white p-4 shadow-2xl transition-all duration-200 ${
            searchOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          } hidden lg:block`}
        >
          <div className="mb-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar recetas o productos"
              inputRef={searchInputRef}
            />
          </div>
          <div className="space-y-4 max-h-72 overflow-y-auto">
            {searchQuery.trim() ? (
              hasSearchResults ? (
                <>
                  {searchRecipes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-dark/50">Recetas</p>
                      <div className="space-y-2">
                        {searchRecipes.map((recipe) => (
                          <Link
                            key={recipe.slug}
                            href={`/recetas/${recipe.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="block rounded-3xl border border-gray-100 bg-gray-50 p-3 transition hover:border-primary"
                          >
                            <p className="font-semibold text-sm text-dark">{recipe.title}</p>
                            <p className="text-[11px] text-dark/50">{normalizeCategory(recipe.category)}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {searchProducts.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-dark/50">Productos</p>
                      <div className="space-y-2">
                        {searchProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/productos/${product.slug}`}
                            onClick={() => setSearchOpen(false)}
                            className="block rounded-3xl border border-gray-100 bg-gray-50 p-3 transition hover:border-primary"
                          >
                            <p className="font-semibold text-sm text-dark">{product.name}</p>
                            <p className="text-[11px] text-dark/50">{product.price}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-dark/60">No se encontraron resultados. Prueba otra palabra.</p>
              )
            ) : (
              <p className="text-sm text-dark/60">Escribe algo para ver recetas y productos.</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-24 bg-white z-40 lg:hidden transition-all duration-300 transform ${
          mobileOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 h-full overflow-y-auto">
          <div className="flex flex-col gap-1">
            {searchOpen && (
              <div className="mb-6 rounded-[2rem] border border-gray-200 bg-gray-50 p-4">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Buscar recetas o productos"
                  inputRef={searchInputRef}
                />
                <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                  {searchQuery.trim() ? (
                    hasSearchResults ? (
                      <>
                        {searchRecipes.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-dark/50">Recetas</p>
                            <div className="space-y-2">
                              {searchRecipes.map((recipe) => (
                                <Link
                                  key={recipe.slug}
                                  href={`/recetas/${recipe.slug}`}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setMobileOpen(false);
                                  }}
                                  className="block rounded-3xl border border-gray-100 bg-white p-3 transition hover:border-primary"
                                >
                                  <p className="font-semibold text-sm text-dark">{recipe.title}</p>
                                  <p className="text-[11px] text-dark/50">{normalizeCategory(recipe.category)}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        {searchProducts.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-dark/50">Productos</p>
                            <div className="space-y-2">
                              {searchProducts.map((product) => (
                                <Link
                                  key={product.id}
                                  href={`/productos/${product.slug}`}
                                  onClick={() => {
                                    setSearchOpen(false);
                                    setMobileOpen(false);
                                  }}
                                  className="block rounded-3xl border border-gray-100 bg-white p-3 transition hover:border-primary"
                                >
                                  <p className="font-semibold text-sm text-dark">{product.name}</p>
                                  <p className="text-[11px] text-dark/50">{product.price}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-dark/60">No se encontraron resultados. Prueba otra palabra.</p>
                    )
                  ) : (
                    <p className="text-sm text-dark/60">Escribe algo para ver recetas y productos.</p>
                  )}
                </div>
              </div>
            )}
            {navLinks.map((link) =>
              link.label === 'Recetas' ? (
                <div key={link.label}>
                  <div className="flex items-center justify-between border-b border-gray-100">
                    <Link
                      href="/recetas"
                      onClick={() => setMobileOpen(false)}
                      className="nav-item text-lg text-dark py-3"
                    >
                      Recetas
                    </Link>
                    <button
                      type="button"
                      onClick={() => setRecipesExpanded(!recipesExpanded)}
                      className="p-3 text-dark"
                      aria-label={recipesExpanded ? 'Cerrar categorías de recetas' : 'Abrir categorías de recetas'}
                    >
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
                  </div>
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
                <svg className="w-6 h-6" viewBox="-0.323 -3.128 42.684 42.128" fill="currentColor">
                  <path d="M14 15.599v-1.486A13.1 13.1 0 0 0 12.337 14C5.535 14 0 19.18 0 25.547 0 29.452 2.086 32.91 5.267 35c-2.13-2.132-3.315-4.942-3.313-7.861 0-6.276 5.377-11.394 12.046-11.54" />
                  <path d="M14.327 32c2.876 0 5.221-2.273 5.328-5.107l.01-25.292h4.65A8.72 8.72 0 0 1 24.164 0h-6.35l-.011 25.293c-.106 2.832-2.453 5.105-5.328 5.105a5.329 5.329 0 0 1-2.476-.61A5.34 5.34 0 0 0 14.327 32m18.672-21.814V8.78a8.818 8.818 0 0 1-4.81-1.421A8.85 8.85 0 0 0 33 10.186" />
                  <path d="M28 7.718A8.63 8.63 0 0 1 25.832 2h-1.697A8.735 8.735 0 0 0 28 7.718M12.325 20.065c-2.94.004-5.322 2.361-5.325 5.27A5.267 5.267 0 0 0 9.854 30a5.2 5.2 0 0 1-1.008-3.073c.003-2.91 2.385-5.268 5.325-5.271.55 0 1.075.09 1.572.244v-6.4a11.72 11.72 0 0 0-1.572-.114c-.092 0-.183.006-.274.007v4.916a5.286 5.286 0 0 0-1.572-.244" />
                  <path d="M32.153 11v4.884a15.15 15.15 0 0 1-8.813-2.811V25.84c0 6.377-5.23 11.565-11.658 11.565-2.485 0-4.789-.778-6.682-2.097A11.67 11.67 0 0 0 13.528 39c6.429 0 11.659-5.188 11.659-11.564V14.668A15.15 15.15 0 0 0 34 17.478v-6.283A8.87 8.87 0 0 1 32.153 11" />
                  <path d="M23.979 25.42V12.632A15.741 15.741 0 0 0 33 15.448v-4.89a9.083 9.083 0 0 1-4.912-2.82C26.016 6.431 24.586 4.358 24.132 2h-4.747l-.01 25.215c-.11 2.824-2.505 5.09-5.44 5.09-1.754-.002-3.398-.822-4.42-2.204-1.794-.913-2.919-2.716-2.92-4.682.003-2.92 2.44-5.285 5.45-5.289.56 0 1.098.09 1.608.245v-4.933C7.202 15.589 2 20.722 2 27.016c0 3.045 1.219 5.816 3.205 7.885A12.115 12.115 0 0 0 12.045 37c6.58 0 11.934-5.195 11.934-11.58" />
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
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="mt-6 inline-flex items-center gap-2 text-dark/70 hover:text-primary transition-colors"
              aria-label="Abrir búsqueda"
              aria-expanded={searchOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              {searchOpen ? 'Cerrar búsqueda' : 'Buscar recetas'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
