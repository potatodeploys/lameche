import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ScentsGrid from "@/components/scents-grid";
import FAQSection from "@/components/faq-section";
import PreorderForm from "@/components/preorder-form";
import SnakeGame from "@/components/snake-game";
import FloatingParticles from "@/components/floating-particles";

type TabType = 'home' | 'scents' | 'faq' | 'preorder';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isSnakeGameOpen, setIsSnakeGameOpen] = useState(false);

  // Scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleEasterEggClick = () => {
    setIsSnakeGameOpen(true);
  };

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      
      <Navigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onEasterEggClick={handleEasterEggClick}
      />

      <main className="relative z-10">
        {/* Home Tab Content */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <HeroSection onPreorderClick={() => setActiveTab('preorder')} />
            
            {/* Featured Scents Preview */}
            <section className="max-w-6xl mx-auto px-6 py-16">
              <h2 className="text-4xl font-bold text-center mb-12 scroll-reveal text-shimmer">
                Signature Collection
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="glass-card rounded-xl p-6 text-center scent-card scroll-reveal">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 opacity-80" 
                       style={{boxShadow: '0 0 30px rgba(251, 146, 60, 0.6), 0 0 60px rgba(236, 72, 153, 0.3)'}}></div>
                  <h3 className="text-xl font-semibold mb-3">Tropical Paradise</h3>
                  <p className="text-muted-foreground">A trip to the blue lagoon, enjoy this tropical taste.</p>
                </div>
                
                <div className="glass-card rounded-xl p-6 text-center scent-card scroll-reveal entrance-delay-1">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-300 to-red-400 opacity-80"
                       style={{boxShadow: '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)'}}></div>
                  <h3 className="text-xl font-semibold mb-3">Toasted Marshmallow</h3>
                  <p className="text-muted-foreground">Celebrate new memories with this campfire.</p>
                </div>
                
                <div className="glass-card rounded-xl p-6 text-center scent-card scroll-reveal entrance-delay-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-80"
                       style={{boxShadow: '0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)'}}></div>
                  <h3 className="text-xl font-semibold mb-3">Lavender</h3>
                  <p className="text-muted-foreground">Stop to smell the flowers with our vibrant floral scent.</p>
                </div>
              </div>
            </section>

            {/* Hidden Snake Game Section */}
            <section className="max-w-4xl mx-auto px-6 py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 scroll-reveal text-shimmer">
                  Hidden Surprise
                </h2>
                <p className="text-muted-foreground scroll-reveal">
                  Click the "è" in our logo to discover a special game
                </p>
              </div>
              
              <div className="glass-card rounded-xl p-8 text-center scroll-reveal">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent opacity-60 glow-effect flex items-center justify-center">
                    <span className="text-3xl">🐍</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Snake Game Easter Egg</h3>
                  <p className="text-muted-foreground mb-6">
                    We've hidden a classic Snake game in our website. Can you find the secret trigger? 
                    Hint: Look closely at our brand name in the navigation.
                  </p>
                  <button 
                    className="glass-button px-6 py-3 rounded-full"
                    onClick={() => setIsSnakeGameOpen(true)}
                  >
                    Play Snake Game
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Scents Tab Content */}
        {activeTab === 'scents' && (
          <div className="animate-fade-in pt-20">
            <div className="max-w-6xl mx-auto px-6 py-16">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 text-shimmer title-entrance font-serif">
                  Our Scent Library
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto subtitle-entrance">
                  Each candle is carefully crafted with premium ingredients to create an immersive sensory experience that transforms your space.
                </p>
              </div>
              <ScentsGrid />
            </div>
          </div>
        )}

        {/* FAQ Tab Content */}
        {activeTab === 'faq' && (
          <div className="animate-fade-in pt-20">
            <div className="max-w-4xl mx-auto px-6 py-16">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 text-shimmer title-entrance font-serif">
                  Frequently Asked Questions
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto subtitle-entrance">
                  Everything you need to know about La Mèche candles and our preorder process.
                </p>
              </div>
              <FAQSection />
            </div>
          </div>
        )}

        {/* Preorder Tab Content */}
        {activeTab === 'preorder' && (
          <div className="animate-fade-in pt-20">
            <div className="max-w-4xl mx-auto px-6 py-16 text-center">
              <div className="mb-16">
                <h1 className="text-5xl font-bold mb-6 text-shimmer title-entrance font-serif">
                  Join the La Mèche Experience
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto subtitle-entrance">
                  Be among the first to experience our luxury candle collection. Preorder now and receive an exclusive 10% discount code delivered directly to your inbox.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="text-center scroll-reveal">
                  <h3 className="text-xl font-semibold mb-2 text-primary">Exclusive Access</h3>
                  <p className="text-muted-foreground">Be the first to experience our signature scents</p>
                </div>
                <div className="text-center scroll-reveal entrance-delay-1">
                  <h3 className="text-xl font-semibold mb-2" style={{color: 'hsl(var(--lavender-mist))'}}>10% Discount</h3>
                  <p className="text-muted-foreground">Instant discount code sent to your email</p>
                </div>
              </div>
              
              <PreorderForm />
            </div>
          </div>
        )}
      </main>

      {/* Snake Game Modal */}
      <SnakeGame 
        isOpen={isSnakeGameOpen} 
        onClose={() => setIsSnakeGameOpen(false)} 
      />
    </div>
  );
}
