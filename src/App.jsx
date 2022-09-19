import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login } from './pages/pages.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
