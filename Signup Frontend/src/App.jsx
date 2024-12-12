import Email from "./EmailVerification/Email";
import Signup from "./Signup/Signup"
import Otp from "./otpGeneration/otpGenerate";
import Login from "./Loginpage/Login";
import InstructorDashboard from "./Instructor/InstructorDashboard";
import StudentDashboard from "./Student/StudentDashboard";



import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
  <BrowserRouter>
      <Routes>
      <Route path='/' element={<Email/>}/> 
      <Route path='/otp-page' element={<Otp/>}/> 
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/instructor' element={<InstructorDashboard />}/>
        <Route path='/student' element={<StudentDashboard />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
