import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"


function App() {

  return (
   <>
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
