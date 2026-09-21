import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import ProjectGallery from '@/components/Projects/ProjectGallery';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <ProjectGallery />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
