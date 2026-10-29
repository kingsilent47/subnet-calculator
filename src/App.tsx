import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-lg font-bold tracking-tight text-gray-900">Subnet Calculator</Link>
            <nav className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Privacy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Terms</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-4 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Subnet Calculator. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
