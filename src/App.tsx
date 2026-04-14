import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Overview from './pages/Overview';
import GettingStarted from './pages/GettingStarted';
import Tokens from './pages/Tokens';
import Components from './pages/Components';
import FlutterReference from './pages/FlutterReference';
import LayoutGrid from './pages/LayoutGrid';
import AdaptiveNavigation from './pages/AdaptiveNavigation';
import InputAccessibility from './pages/InputAccessibility';
import Patterns from './pages/Patterns';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/layout" element={<LayoutGrid />} />
          <Route path="/adaptive-navigation" element={<AdaptiveNavigation />} />
          <Route path="/input-accessibility" element={<InputAccessibility />} />
          <Route path="/components" element={<Components />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/flutter" element={<FlutterReference />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
