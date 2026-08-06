import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PariHome from './pages/PariHome';
import PariAbout from './pages/PariAbout';
import PariClientele from './pages/PariClientele';
import PariDistribution from './pages/PariDistribution';
import PariPartnerships from './pages/PariPartnerships';
import PariCaseStudies from './pages/PariCaseStudies';
import PariAIApps from './pages/PariAIApps';
import PariContact from './pages/PariContact';
import AdminLogin from './pages/AdminLogin';
import AdminLeads from './pages/AdminLeads';
import AdminTools from './pages/AdminTools';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PariHome />} />
        <Route path="/about" element={<PariAbout />} />
        <Route path="/clientele" element={<PariClientele />} />
        <Route path="/distribution" element={<PariDistribution />} />
        <Route path="/partnerships" element={<PariPartnerships />} />
        <Route path="/case-studies" element={<PariCaseStudies />} />
        <Route path="/ai-apps" element={<PariAIApps />} />
        <Route path="/contact" element={<PariContact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLeads />} />
        <Route path="/admin/tools" element={<AdminTools />} />
      </Routes>
    </Router>
  );
}

export default App;
