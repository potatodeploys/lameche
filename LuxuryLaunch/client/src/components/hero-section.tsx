interface HeroSectionProps {
  onPreorderClick: () => void;
}

export default function HeroSection({ onPreorderClick }: HeroSectionProps) {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center text-center relative">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="mb-16">
          <h1 className="hero-title title-entrance font-serif">
            Luxury Candles
          </h1>
          <p className="hero-description subtitle-entrance">
            Experience the perfect blend of sophisticated fragrances and elegant design. 
            From tropical paradise to cozy evenings, discover scents that transform your 
            space into a sanctuary of tranquility and style.
          </p>
          <button 
            className="glass-button px-8 py-4 rounded-full text-lg font-semibold text-white hover-lift content-entrance"
            onClick={onPreorderClick}
          >
            <span className="mr-2">✨</span>
            Start Your Journey
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-left">
            <h2 className="text-3xl font-semibold text-primary font-serif scroll-reveal">
              Crafted for the Senses
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed scroll-reveal entrance-delay-1">
              Every La Mèche candle is hand-poured with premium soy wax and essential oils, 
              creating an immersive sensory experience that transforms any space into a 
              sanctuary of tranquility and style.
            </p>
            <div className="flex space-x-4 scroll-reveal entrance-delay-2">
              <div className="glass-card rounded-lg p-4 flex-1">
                <h4 className="font-semibold text-accent mb-2">Premium Ingredients</h4>
                <p className="text-sm text-muted-foreground">100% natural soy wax and essential oils</p>
              </div>
              <div className="glass-card rounded-lg p-4 flex-1">
                <h4 className="font-semibold text-accent mb-2">45+ Hours</h4>
                <p className="text-sm text-muted-foreground">Long-lasting burn time</p>
              </div>
            </div>
          </div>
          
          <div className="relative scroll-reveal entrance-delay-3">
            <div className="glass-card rounded-2xl p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 opacity-80 loading-pulse glow-effect flex items-center justify-center">
                <span className="text-4xl">🌺</span>
              </div>
              <h4 className="font-serif text-xl font-semibold mb-2">Tropical Paradise</h4>
              <p className="text-muted-foreground">A trip to the blue lagoon, enjoy this tropical taste.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
