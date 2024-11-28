import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Category from './pages/Category/Category';
import AppLayout from './layouts/AppLayout';
import PrivacyPolicy from './pages/legal/pages/PrivacyPolicy';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/' element={<AppLayout />}>
          <Route path="/categories/:category_slug" element={<Category />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;