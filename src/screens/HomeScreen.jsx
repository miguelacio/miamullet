import AntiGridHero from '../components/AntiGridHero';
import MarqueeTicker from '../components/MarqueeTicker';
import AntiGridGallery from '../components/AntiGridGallery';
import SpotlightSection from '../components/SpotlightSection';
import BlogSection from '../components/BlogSection';

export default function HomeScreen() {
  return (
    <main>
      <AntiGridHero />
      <MarqueeTicker />
      <AntiGridGallery />
      <SpotlightSection />
      <BlogSection />
    </main>
  );
}
