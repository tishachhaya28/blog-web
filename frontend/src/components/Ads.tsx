import React, { useEffect } from 'react';

interface AdProps {
  type: 'banner' | 'side' | 'footer';
  className?: string;
  adSlot?: string; // Optional: Google Ad Slot ID
  adClient?: string; // Optional: Google Client ID (ca-pub-...)
}

const Ads: React.FC<AdProps> = ({ type, className = "", adSlot, adClient }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle error", e);
    }
  }, []);

  const containerStyles: Record<string, string> = {
    banner: "w-full min-h-[90px] md:min-h-[120px] bg-muted/50 rounded-lg flex items-center justify-center mb-8 border border-dashed border-primary/20 overflow-hidden",
    side: "w-full min-w-[250px] min-h-[600px] bg-muted/50 rounded-lg flex items-center justify-center sticky top-8 border border-dashed border-primary/20",
    footer: "w-full min-h-[250px] bg-muted/50 rounded-lg flex items-center justify-center mt-12 border border-dashed border-primary/20"
  };

  // If no adClient is provided, show premium placeholders
  if (!adClient) {
    return (
      <div className={`${containerStyles[type]} ${className}`}>
        <div className="text-center p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Sponsored</p>
          <p className="text-sm font-medium text-foreground/70">Google Ad Space ({type})</p>
          <p className="text-xs text-muted-foreground/50 mt-1">Setup your Publisher ID to start earning</p>
        </div>
      </div>
    );
  }

  // Real Google Adsense structure
  return (
    <div className={`${containerStyles[type]} ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default Ads;
