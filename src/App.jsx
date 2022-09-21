import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, UpdateDataMhs } from './pages/pages.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UpdateDataMhs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
