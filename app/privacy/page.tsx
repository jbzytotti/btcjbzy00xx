import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use & Privacy Policy | BTCJBZY News',
  description: 'The terms of use, disclaimer, and privacy practices that govern your visit to BTCJBZY News.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#060a13] text-gray-100 flex flex-col font-sans">
      <header className="sticky top-0 bg-[#060a13]/90 backdrop-blur-xl border-b border-white/5 z-40 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-0.5 select-none" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-amber-400">BTC</span>
            <span className="text-gray-500">JBZY</span>
            <span className="text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20 ml-0.5">NEWS</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 flex-1">
        <section className="bg-[#0a1020] border border-white/5 rounded-2xl p-6 md:p-10 shadow-xl">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-amber-400 transition-all text-xs font-semibold mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-6 tracking-tight flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
            <FileText className="h-7 w-7 text-amber-400" /> Terms of Use & Privacy Policy
          </h1>
          <div className="text-gray-300 space-y-4 text-sm leading-relaxed">
            <p><strong>Last updated: August 2026</strong></p>
            <p>By accessing BTCJBZY News, you agree to the terms described on this page. Please read them carefully before using the site.</p>

            <h3 className="text-lg font-bold text-white mt-6">1. Educational Purpose Only</h3>
            <p>All content on BTCJBZY News is published for informational and educational purposes. Nothing on this website constitutes financial, investment, legal, or trading advice, and nothing should be read as a recommendation to buy, sell, or hold any asset. Digital assets and markets are volatile and may involve the risk of substantial loss. Always do your own research and consult a licensed professional before making financial decisions.</p>

            <h3 className="text-lg font-bold text-white mt-6">2. Intellectual Property</h3>
            <p>The text, layout, graphics, and structure on this website belong to BTCJBZY News. You may share links to our articles and quote short excerpts with attribution. Republishing full articles without permission is not allowed.</p>

            <h3 className="text-lg font-bold text-white mt-6">3. Content Accuracy Disclaimer</h3>
            <p>We aim to keep our content accurate and current, but markets and regulations change quickly. Information may become outdated, and occasional errors are possible. We are not liable for any decisions made based on the information published here.</p>

            <h3 className="text-lg font-bold text-white mt-6">4. Advertising & Third-Party Links</h3>
            <p>The website may display advertisements and link to external third-party websites. We do not control the content, policies, or practices of these third parties, and we are not responsible for them. Ads are served by third-party ad networks that may use cookies to tailor ads; see our cookie note below.</p>

            <h3 className="text-lg font-bold text-white mt-6">5. Privacy & Data Collection</h3>
            <p>We respect your privacy. BTCJBZY News does not require an account, and we do not collect or store personally identifiable information through this site. We may use standard analytics and caching to understand aggregate traffic and improve performance. Third-party ad partners may collect non-personal data via cookies to serve relevant advertisements. You can control cookies through your browser settings.</p>

            <h3 className="text-lg font-bold text-white mt-6">6. Changes to These Terms</h3>
            <p>We may update these terms from time to time. Continued use of the site after changes are posted means you accept the updated terms.</p>

            <h3 className="text-lg font-bold text-white mt-6">7. Contact</h3>
            <p>For questions about these terms, contact us at: <span className="text-amber-300 font-mono font-semibold">xwqisao8erzi.me@hotmail.com</span></p>
          </div>
        </section>
      </main>

      <footer className="bg-[#080d1a] border-t border-white/5 mt-20 py-8 px-4 md:px-8 text-center text-xs text-gray-600 font-mono">
        &copy; 2026 BTCJBZY News. All rights reserved.
      </footer>
    </div>
  );
}
