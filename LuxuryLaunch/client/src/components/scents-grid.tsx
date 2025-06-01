export default function ScentsGrid() {
  const scents = [
    {
      icon: "🌺",
      name: "Tropical Paradise",
      description: "A trip to the blue lagoon, enjoy this tropical taste.",
      tags: ["Tropical", "Fresh"],
      gradient: "from-orange-400 to-pink-400"
    },
    {
      icon: "🔥",
      name: "Toasted Marshmallow",
      description: "Celebrate new memories with this campfire.",
      tags: ["Sweet", "Warm"],
      gradient: "from-orange-300 to-red-400"
    },
    {
      icon: "💜",
      name: "Lavender",
      description: "Stop to smell the flowers with our vibrant floral scent.",
      tags: ["Floral", "Calming"],
      gradient: "from-purple-400 to-blue-400"
    },
    {
      icon: "🍦",
      name: "Vanilla",
      description: "Calm your senses with a classic vanilla scent.",
      tags: ["Classic", "Elegant"],
      gradient: "from-yellow-200 to-orange-300"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {scents.map((scent, index) => (
        <div 
          key={scent.name}
          className={`premium-border scent-card scroll-reveal entrance-delay-${index % 3 + 1}`}
        >
          <div className="premium-border-inner">
            <div className={`h-48 rounded-lg mb-4 bg-gradient-to-br ${scent.gradient} opacity-20 flex items-center justify-center relative overflow-hidden`}>
              <span className="text-4xl scent-icon">{scent.icon}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-3">{scent.name}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">{scent.description}</p>
            <div className="flex flex-wrap gap-2">
              {scent.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
