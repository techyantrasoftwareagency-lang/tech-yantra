import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Blog from '@/components/sections/Blog';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Blog />
      <CTA />
    </main>
  );
}
