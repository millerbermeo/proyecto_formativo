import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import MovimientosPage from "./pages/MovimientosPage";
import ActividadesPage from "./pages/jose/ActividadesPage";
import UsuariosPage from "./pages/ander/UsuariosPage";
import ElementosPage from "./pages/sebas/ElementosPage";


function App() {

  return (
   <>
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route
       path="/residuos" element={<DashboardPage/>}/>
          <Route
       path="/movimientos" element={<MovimientosPage/>}/>
       <Route
       path="/actividades" element={<ActividadesPage/>}/>
       <Route
       path="/usuarios" element={<UsuariosPage/>}/>
       <Route
       path="/elementos" element={<ElementosPage/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}


export default App;
