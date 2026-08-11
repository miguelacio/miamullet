import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import BlogListScreen from './screens/BlogListScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="app-layout">
          {/* Top Fixed Header */}
          <Navbar />

          {/* Main Route View */}
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/category/:categorySlug" element={<CategoryScreen />} />
            <Route path="/blog" element={<BlogListScreen />} />
            <Route path="/blog/:postId" element={<BlogDetailScreen />} />
            <Route path="/:productId" element={<ProductDetailScreen />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  );
}
