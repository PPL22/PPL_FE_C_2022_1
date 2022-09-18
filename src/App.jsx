import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/pages.js';

function App() {
  return (
    <BrowserRouter>
      <h1>Test</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
