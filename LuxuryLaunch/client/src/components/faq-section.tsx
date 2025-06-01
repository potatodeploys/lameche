import { useState } from "react";

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes La Mèche candles special?",
      answer: "Our candles are handcrafted with premium soy wax and carefully curated fragrance oils. Each scent is designed to create an immersive experience that transforms your space into a sanctuary of luxury and comfort."
    },
    {
      question: "How long do the candles burn?",
      answer: "Our standard candles provide approximately 45-50 hours of burn time when used properly. We recommend trimming the wick to 1/4 inch before each use for optimal performance and longevity."
    },
    {
      question: "What is the preorder discount?",
      answer: "Preorder customers receive a unique 12-character discount code providing 10% off their purchase. The code is delivered instantly to your email and can be used when our candles officially launch."
    },
    {
      question: "When will the candles be available?",
      answer: "Available in person at available dates - check the posters around town or your local area for upcoming dates and locations."
    },
    {
      question: "Are the candles eco-friendly?",
      answer: "Yes! We use sustainable soy wax, lead-free cotton wicks, and recyclable glass containers. Our packaging is minimal and made from recycled materials whenever possible."
    },
    {
      question: "Can I customize scent combinations?",
      answer: "While our current collection features expertly crafted signature scents, we're exploring custom blending options for future releases. Preorder customers will have early access to any customization services we offer."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className={`faq-item glass-card rounded-lg p-6 ${expandedFAQ === index ? 'active' : ''} scroll-reveal`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div 
            className="faq-question flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="font-serif text-xl font-semibold">{faq.question}</h3>
            <span className={`faq-toggle text-2xl text-primary transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
          <div className={`faq-answer text-muted-foreground overflow-hidden transition-all duration-300 ${expandedFAQ === index ? 'max-h-96 pt-4' : 'max-h-0'}`}>
            <p className="leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
