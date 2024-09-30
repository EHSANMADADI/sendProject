import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Multipel from './pages/Multipel';
import MultipleNER from './pages/MultipleNER';
import MultiSemantic from './pages/MultiSemantic';
import MultiSplling from './pages/MultiSplling';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import NotFound from './pages/NotFound';
import ListUser from './pages/Admin/ListUser';
import AddUsers from './pages/Admin/AddUsers';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="extract" element={<Secend />} />
        <Route path="semantic" element={<Semantic />} />
        <Route path="spelling" element={<Spelling />} /> */}
        {/* <Route path="multiple" element={<Multipel/>}/> */}
        <Route path="Multipel/extract" element={<MultipleNER />} />
        <Route path="semantic" element={<MultiSemantic />} />
        <Route path="Multipel" element={< Multipel />} />
        <Route path="Multipel/spelling" element={<MultiSplling />} />
        <Route path='changePassword' element={<ChangePassword />} />
        <Route path='ListUser' element={<ListUser />} />
        <Route path='AddUser' element={<AddUsers />} />
        <Route path='*' element={<NotFound />} />


      </Routes>
    </BrowserRouter>
  )


}

export default App;
