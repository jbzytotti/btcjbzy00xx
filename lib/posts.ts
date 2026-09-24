import fs from 'fs';
import path from 'path';

export interface Post {
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  url: string;
  date: string;
  read_time: string;
  image_alt?: string;
}

const CONTENT_DIRS = ['crypto', 'finance', 'investing', 'trading'] as const;

const CATEGORY_OVERRIDES: Record<string, string> = {
  'aerospace-defense-2026': 'Finance',
  'ai-algorithmic-trading': 'Trading',
  'ai-hw-infra': 'Finance',
  'api-first-banking': 'Finance',
  'automate-budget': 'Finance',
  'biometric-finance': 'Finance',
  'carbon-credits-impact': 'Investing',
  'carbon-neutral-investing': 'Investing',
  'commercial-office-crisis': 'Investing',
  'commodity-trading-cycle': 'Trading',
  'condo-vs-house-rental': 'Investing',
  'cost-of-procrastination': 'Finance',
  'cybersec-banking': 'Finance',
  'cybersec-post-quantum': 'Finance',
  'death-of-cash': 'Finance',
  'digital-bank-runs': 'Finance',
  'diversification-strategy': 'Investing',
  'dividend-growth-portfolio': 'Investing',
  'eco-architecture-value': 'Investing',
  'embedded-finance': 'Finance',
  'emergency-fund-fast': 'Finance',
  'emerging-tech-stocks': 'Finance',
  'emotional-discipline-trading': 'Trading',
  'energy-stocks-future': 'Finance',
  'ev-infra-stocks': 'Finance',
  'fire-movement-2026': 'Finance',
  'forex-fundamentals': 'Trading',
  'fractional-shares-impact': 'Investing',
  'fraud-prevention-banking': 'Finance',
  'future-of-neobanks': 'Finance',
  'gentrification-investing': 'Investing',
  'hsa-wealth-building': 'Finance',
  'index-vs-picking': 'Investing',
  'logistics-investing': 'Investing',
  'luxury-real-estate-trends': 'Investing',
  'market-cap-vs-ev': 'Investing',
  'mastering-day-trading': 'Trading',
  'merchant-services-fees': 'Finance',
  'mortgage-refi-falling-rates': 'Finance',
  'open-banking-privacy': 'Finance',
  'options-trading-basics': 'Trading',
  'payment-orchestration': 'Finance',
  'pdt-rule-guide': 'Trading',
  'personalized-banking': 'Finance',
  'position-sizing-volatility': 'Trading',
  'proptech-future': 'Investing',
  'psychology-market-bubbles': 'Investing',
  'qe-impact': 'Finance',
  'rates-tech-stocks': 'Finance',
  'real-estate-trends-genz': 'Investing',
  'reits-passive-income': 'Investing',
  'retail-vs-institutions': 'Investing',
  'retirement-for-creators': 'Finance',
  'saving-first-home-2026': 'Finance',
  'scalable-side-hustles': 'Finance',
  'scalping-strats-trading': 'Trading',
  'semiconductor-stocks-dominance': 'Finance',
  'short-selling-guide': 'Trading',
  'short-term-rentals-saturation': 'Investing',
  'shorting-housing-market': 'Investing',
  'small-cap-potential': 'Investing',
  'smart-cities-market': 'Investing',
  'specialized-etfs-rise': 'Investing',
  'stop-loss-take-profit': 'Trading',
  'student-debt-myths': 'Finance',
  'student-loans-mortgage': 'Finance',
  'sustainable-investing-esg': 'Investing',
  'tax-efficiency-strat': 'Finance',
  'tax-hacks-nomads': 'Finance',
  'tiny-homes-investing': 'Investing',
  'tips-inflation-hedge': 'Investing',
  'top-10-safe-haven-stocks': 'Investing',
  'trust-estate-planning': 'Finance',
};

function resolveCategory(slug: string, fallback: string): string {
  return CATEGORY_OVERRIDES[slug] || fallback;
}

function getDirPath(dir: string): string {
  return path.join(process.cwd(), 'public', dir);
}

function parseFrontmatter(raw: string): Record<string, string> {
  const metadata: Record<string, string> = {};
  for (const line of raw.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) metadata[key] = value;
  }
  return metadata;
}

function calculateReadTime(body: string): string {
  const words = body.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;

  for (const dir of CONTENT_DIRS) {
    const dirPath = getDirPath(dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
    const defaultCategory = dir.charAt(0).toUpperCase() + dir.slice(1);

    for (const file of files) {
      const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
      const slug = file.replace(/\.md$/, '');
      const match = content.match(fmRegex);

      const fm = match ? parseFrontmatter(match[1]) : {};
      const body = match ? content.substring(match[0].length) : content;

      const metadata: Post = {
        title: fm.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        slug,
        category: resolveCategory(slug, fm.category || defaultCategory),
        description: fm.description || '',
        image: fm.image || '',
        url: `${dir}/${file}`,
        date: fm.date || '2026-07-16',
        read_time: fm.read_time || calculateReadTime(body),
      };

      posts.push(metadata);
    }
  }

  return posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find(p => p.slug === slug) || null;
}

export function getPostMarkdown(slug: string): { metadata: Record<string, string>; body: string } | null {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;

  for (const dir of CONTENT_DIRS) {
    const filePath = path.join(getDirPath(dir), `${slug}.md`);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const match = content.match(fmRegex);

    const parsed = match ? parseFrontmatter(match[1]) : {};
    if (parsed.category) parsed.category = resolveCategory(slug, parsed.category);

    return {
      metadata: parsed,
      body: match ? content.substring(match[0].length) : content,
    };
  }

  return null;
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  if (category === 'All') return posts;
  return posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
