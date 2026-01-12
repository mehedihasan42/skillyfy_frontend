import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Registar from './components/Registar';
import Profile from './components/Profile';
import Home from './components/Home';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './Routes/ProtectedRoute';
import Navbar from './common/Navbar';
import CreateCourse from './Pages/Admin/CreateCourse';
import CourseDetail from './components/CourseDetail';
import CourseLessons from './components/CourseLessons';
import CourseMaterials from './components/CourseMaterials';
import PaymentSuccess from './components/PaymentSuccess';
import Quiz from './Pages/Quizs/Quiz';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registar' element={<Registar />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/metarial/:id" element={<CourseMaterials />} />
          <Route path='/course/:id' element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
          <Route path='/create_course' element={<CreateCourse />} />
          <Route path="/lessons/:id" element={<CourseLessons />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/lesson/:lessonId/quizzes" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
