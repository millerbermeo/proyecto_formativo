import { BrowserRouter, Route, Routes } from "react-router-dom"
import ResiduosPage from "./pages/ResiduosPage"
import LoginPage from "./pages/LoginPage"
import MovimientosPage from "./pages/MovimientosPage";
import UsuariosPages from "./pages/UsuariosPages";
import ElementosPage from "./pages/ElementosPage";


function App() {


   return (
      <>
         <BrowserRouter>
            <Routes>

               <Route path="/" element={<LoginPage />} />
               <Route
                  path="/residuos" element={<ResiduosPage />} />
               <Route
                  path="/movimientos" element={<MovimientosPage />} />
                                 <Route
                  path="/usuarios" element={<UsuariosPages />} />

<Route
                  path="/elementos" element={<ElementosPage />} />
            </Routes>


         </BrowserRouter>
      </>
   )

 

}


export default App;
