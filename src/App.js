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
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* <Route path="extract" element={<Secend />} />
        <Route path="semantic" element={<Semantic />} />
        <Route path="spelling" element={<Spelling />} /> */}
        {/* <Route path="multiple" element={<Multipel/>}/> */}
        <Route path="Multipel/extract" element={<MultipleNER/>}/>
        <Route path="semantic" element={<MultiSemantic/>}/>
        <Route path="Multipel" element={< Multipel />} />
        <Route path="Multipel/spelling" element={<MultiSplling/>}/>
        <Route path='change' element={<ChangePassword/>} />


      </Routes>
    </BrowserRouter>
  )


}

export default App;
