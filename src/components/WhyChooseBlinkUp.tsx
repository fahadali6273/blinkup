'use client';
import Counter from './Counter';

export default function WhyChooseBlinkUp() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold gradient-text mb-10 animate-pulse">
          Why People Trust BlinkUp
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          BlinkUp brings trusted professionals to your doorstep for painting, renovation,
          cleaning, and more — with 100% satisfaction guaranteed.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Counter end={500} label="Projects Completed" />
          <Counter end={300} label="Happy Clients" />
          <Counter end={150} label="Expert Partners" />
          <Counter end={10} label="Years Experience" />
        </div>
      </div>
    </section>
  );
}
