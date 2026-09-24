'use client';

import { useEffect, useRef } from 'react';

// =====================================================
// 🔴 ضع أكواد الإعلانات الخاصة بك هنا (HTML / CSS / JS)
// 🔴 PASTE YOUR ACTUAL AD BANNER CODES HERE
// =====================================================
export const CUSTOM_AD_CODES: Record<string, string> = {
  "ad-header-banner": `
    <center><meta name="profiton-domain-verification" content="fe855b3578dab1ab12a947c131e812ce0cb484259665d92437980a896ba88e5d" /></div>

<br>
</div></center>
  `,

  "ad-sidebar-top": `
    <script data-grow-initializer="">!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZToyMTljM2Y3Ni01ZGJhLTQ1MjgtOTg1Zi04ZGEyM2Q2MDQzYTc=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();</script>
  `,

  "ad-sidebar-middle": ``,
};

interface AdSlotProps {
  id: string;
  type: 'header' | 'sidebar' | 'article' | 'footer';
}

export default function AdSlot({ id, type }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    const adCode = CUSTOM_AD_CODES[id] || '';
    if (adCode.trim() === '') return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = adCode;

    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    container.appendChild(fragment);

    const scripts = Array.from(container.querySelectorAll('script'));
    scripts.forEach((node) => {
      const oldScript = node as HTMLScriptElement;
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [id]);

  const labels: Record<string, string> = {
    "ad-header-banner": "Header Leaderboard Ad",
    "ad-sidebar-top": "Sidebar Top",
    "ad-sidebar-middle": "Sidebar Middle",
    "ad-sidebar-bottom": "Sidebar Bottom",
    "ad-article-mid": "In-Article Ad"
  };

  return (
    <div className="w-full select-none font-sans my-4">
      <div className="flex items-center justify-between px-1 mb-1.5 select-none opacity-60">
        <span className="text-[9px] font-extrabold font-mono tracking-widest text-gray-600 uppercase">
          SPONSOR ADS
        </span>
        <span className="text-[8px] font-mono text-gray-700 bg-white/[0.03] border border-white/5 px-1.5 py-0.5 rounded">
          {labels[id] || "Ad Placement"}
        </span>
      </div>
      <div ref={containerRef} className="w-full transition-all duration-300 overflow-x-auto" />
    </div>
  );
}
