import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Top Fixed Header */}
        <Navbar />

        {/* Main Route View */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/:productId" element={<ProductDetailScreen />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
