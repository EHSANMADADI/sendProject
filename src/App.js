import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FerstPage from './pages/FerstPage';
import Secend from './pages/Secend';
import Semantic from './pages/Semantic';
import Spelling from './pages/Spelling';
import Multipel from './pages/Multipel';
import MultipleNER from './pages/MultipleNER';
import MultiSemantic from './pages/MultiSemantic';
import MultiSplling from './pages/MultiSplling';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Multipel />} />
        {/* <Route path="extract" element={<Secend />} />
        <Route path="semantic" element={<Semantic />} />
        <Route path="spelling" element={<Spelling />} /> */}
        {/* <Route path="multiple" element={<Multipel/>}/> */}
        <Route path="extract" element={<MultipleNER/>}/>
        <Route path="semantic" element={<MultiSemantic/>}/>
        <Route path="*" element={< Multipel />} />
        <Route path="spelling" element={<MultiSplling/>}/>


      </Routes>
    </BrowserRouter>
  )


}

export default App;
