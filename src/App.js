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
import User from './pages/User/User';
import ExtendedFilePage from './pages/User/ExtendedFilePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Multipel />} />
        {/* <Route path="extract" element={<Secend />} />
        <Route path="semantic" element={<Semantic />} />
        <Route path="spelling" element={<Spelling />} /> */}
        {/* <Route path="multiple" element={<Multipel/>}/> */}
        <Route path="Multipel/extract" element={<MultipleNER />} />
        <Route path="semantic" element={<MultiSemantic />} />
        <Route path="Multipel" element={< Multipel />} />
        <Route path="Multipel/spelling" element={<MultiSplling />} />
        {/* <Route path='changePassword' element={<ChangePassword />} />
        <Route path='Admin/ListUser' element={<ListUser />} />
        <Route path='Admin/AddUser' element={<AddUsers />} />
        <Route path='UserPage/ExtractInfoFile' element={<User />} />
        <Route path='UserPage/extendedFile' element={<ExtendedFilePage/>}/> */}
        <Route path='*' element={<NotFound />} />


      </Routes>
    </BrowserRouter>
  )


}

export default App;
