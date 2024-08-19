import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FerstPage from './pages/FerstPage';
import Secend from './pages/Secend';
import Semantic from './pages/Semantic';
import Spelling from './pages/Spelling';
import Multipel from './pages/Multipel';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FerstPage />} />
        <Route path="extract" element={<Secend />} />
        <Route path="semantic" element={<Semantic />} />
        <Route path="spelling" element={<Spelling />} />
        <Route path="multiple" element={<Multipel/>}/>

        <Route path="*" element={< FerstPage />} />

      </Routes>
    </BrowserRouter>
  )


}

export default App;
