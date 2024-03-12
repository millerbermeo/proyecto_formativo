import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import MovimientosPage from "./pages/MovimientosPage";


function App() {

  return (
   <>
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route
       path="/dashboard" element={<DashboardPage/>}/>
          <Route
       path="/movimientos" element={<MovimientosPage/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}


export default App;
