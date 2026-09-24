import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jbzyx.cc.cd'),
  title: {
    default: 'BTCJBZY News | Clear Explanations of Digital Assets, Markets & Money',
    template: '%s | BTCJBZY News',
  },
  description: 'BTCJBZY News is an independent editorial publication that explains digital currencies, global markets, real estate, and personal finance in plain language — education, not hype.',
  keywords: ['BTCJBZY News', 'crypto explained', 'digital assets education', 'financial literacy', 'market analysis', 'personal finance guides'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jbzyx.cc.cd',
    siteName: 'BTCJBZY News',
    title: 'BTCJBZY News | Clear Explanations of Digital Assets, Markets & Money',
    description: 'Independent editorial coverage that explains digital currencies, global markets, real estate, and personal finance in plain, beginner-friendly language.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BTCJBZY News | Clear Explanations of Digital Assets, Markets & Money',
    description: 'Independent editorial coverage that explains digital currencies, global markets, and personal finance in plain language.',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="AeNogy_FSUyoQGAj41YXBFpLvSJryB3yOxQCu_BkRkY" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HW1Y42ZMYS" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-HW1Y42ZMYS');`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#060a13] text-gray-100 font-sans selection:bg-amber-500/30 selection:text-amber-50">
        {children}
      </body>
    </html>
  );
}
