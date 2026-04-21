import React from 'react';

interface AdProps {
  type: 'banner' | 'side' | 'footer';
  className?: string;
}

const Ads: React.FC<AdProps> = ({ type, className = "" }) => {
  const styles: Record<string, string> = {
    banner: "w-full h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 border-dashed border-purple-500/20 rounded-xl flex items-center justify-center mb-8 overflow-hidden relative group cursor-pointer hover:border-purple-500/40 transition-all",
    side: "w-64 h-[600px] bg-gradient-to-b from-emerald-500/10 to-teal-500/10 border-2 border-dashed border-emerald-500/20 rounded-xl flex items-center justify-center sticky top-8 overflow-hidden group cursor-pointer hover:border-emerald-500/40 transition-all",
    footer: "w-full h-48 bg-gradient-to-t from-orange-500/10 to-pink-500/10 border-2 border-dashed border-orange-500/20 rounded-xl flex items-center justify-center mt-12 overflow-hidden group cursor-pointer hover:border-orange-500/40 transition-all"
  };

  const labels = {
    banner: "Premium Space - High Visibility Banner",
    side: "Featured Partner - Vertical Ad",
    footer: "Global Reach - Footer Placement"
  };

  const subLabels = {
    banner: "Boost your brand visibility here",
    side: "Targeted traffic for your products",
    footer: "Join our network of premium advertisers"
  };

  return (
    <div className={`${styles[type]} ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)] group-hover:opacity-75 transition-opacity" />
      <div className="flex flex-col items-center text-center px-4 relative z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 font-bold">Advertisement</span>
        <h4 className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">{labels[type]}</h4>
        <p className="text-xs text-muted-foreground/60 mt-1 max-w-[180px]">{subLabels[type]}</p>
        <div className="mt-4 px-3 py-1 bg-background/50 backdrop-blur-sm border border-foreground/5 rounded-full text-[10px] font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
          Learn More
        </div>
      </div>
    </div>
  );
};

export default Ads;
