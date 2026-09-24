'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Facebook, Twitter } from 'lucide-react';

const CATEGORIES = ['All', 'Crypto', 'Investing', 'Trading', 'Finance'];

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Header({ activeCategory, onCategoryChange, searchQuery, onSearchChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#060a13]/90 backdrop-blur-xl border-b border-white/5 z-40 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-0.5 select-none" style={{ fontFamily: 'var(--font-display)' }} title="btcjbzynews Home">
              <span className="text-amber-400">BTC</span>
              <span className="text-gray-500">JBZY</span>
              <span className="text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20 ml-0.5">NEWS</span>
            </Link>

            <div className="flex items-center gap-1.5 select-none border-l border-white/5 pl-3">
              <a href="https://www.facebook.com/profile.php?id=100077375229120" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-gray-500 hover:text-blue-400 hover:border-blue-400/20 hover:bg-blue-400/5 transition-all flex items-center gap-1" title="Facebook Page">
                <Facebook className="h-3.5 w-3.5" />
                <span className="text-[10px] font-semibold hidden sm:inline font-mono">FB</span>
              </a>
              <a href="https://x.com/jbzy2tech" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-gray-500 hover:text-amber-400 hover:border-amber-400/20 hover:bg-amber-400/5 transition-all flex items-center gap-1" title="Twitter Profile">
                <Twitter className="h-3.5 w-3.5" />
                <span className="text-[10px] font-semibold hidden sm:inline font-mono">X</span>
              </a>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-0.5">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
                    isSelected
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 text-gray-100 text-xs rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all font-sans placeholder:text-gray-600"
            />
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-gray-600" />
          </div>

          <Link href="/about" className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-200 transition-all font-sans">
            About Us
          </Link>
          <Link href="/contact" className="px-3 py-2 text-xs font-semibold text-gray-500 hover:text-gray-200 transition-all font-sans">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center lg:hidden gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-500 hover:text-white focus:outline-none bg-white/5 rounded-lg border border-white/5"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0a0f1c]/98 backdrop-blur-xl border-b border-white/5 px-4 py-6 shadow-2xl flex flex-col gap-4 z-50">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 text-gray-100 text-xs rounded-full pl-9 pr-4 py-3 focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-600"
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-600" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] uppercase tracking-wider text-gray-600 font-bold mb-1 font-mono">Sectors</div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { onCategoryChange(cat); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-gray-500 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-500 hover:text-white">About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-500 hover:text-white">Contact Us</Link>
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-500 hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      )}
    </header>
  );
}
