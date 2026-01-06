import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Registar from './components/Registar';
import Profile from './components/Profile';
import Home from './components/Home';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './Routes/ProtectedRoute';
import Navbar from './common/Navbar';
import CreateCourse from './Pages/Admin/CreateCourse';

function App() {

  return (
   <AuthProvider>
    <BrowserRouter>
    <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/registar' element={<Registar/>} />
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path='/create_course' element={<CreateCourse/>} />
   </Routes>
   </BrowserRouter>
   </AuthProvider>
  )
}

export default App
