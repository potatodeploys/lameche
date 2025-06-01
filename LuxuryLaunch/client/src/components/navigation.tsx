import { useEffect, useState } from "react";
import logoImage from "@assets/image_1748753040803.png";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: 'home' | 'scents' | 'faq' | 'preorder') => void;
  onEasterEggClick: () => void;
}

export default function Navigation({ activeTab, onTabChange, onEasterEggClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-container fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="logo-glow cursor-pointer" 
          onClick={() => onTabChange('home')}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full glow-effect overflow-hidden">
              <img 
                src={logoImage} 
                alt="La Mèche Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="nav-brand">
              <h1 className="font-serif text-2xl font-bold text-shimmer">
                La M
                <span 
                  id="easter-egg-trigger" 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEasterEggClick();
                  }}
                >
                  è
                </span>
                che
              </h1>
              <p className="text-sm text-muted-foreground font-light">Where Scent Meets Style</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-8">
          {[
            { id: 'home', label: 'Home' },
            { id: 'scents', label: 'Scents' },
            { id: 'faq', label: 'FAQ' },
            { id: 'preorder', label: 'Preorder' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab-button px-4 py-2 text-lg font-medium transition-all ${
                activeTab === tab.id ? 'active' : ''
              }`}
              onClick={() => onTabChange(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
