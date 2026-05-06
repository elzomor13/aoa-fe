import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Institutes from '@/components/sections/Institutes';
import NewsEvents from '@/components/sections/NewsEvents';
import Admissions from '@/components/sections/Admissions';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-16 lg:gap-24">
        <Hero />
        <Institutes />
        <NewsEvents />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
