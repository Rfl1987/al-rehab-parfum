import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DevErrorConsole from './components/DevErrorConsole';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFab from './components/WhatsAppFab';
import About from './pages/About';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Product from './pages/Product';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppFab />
        {import.meta.env.DEV && <DevErrorConsole />}
      </div>
    </BrowserRouter>
  );
}