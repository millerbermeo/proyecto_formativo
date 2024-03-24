import { BrowserRouter, Route, Routes } from "react-router-dom"
import ResiduosPage from "./pages/ResiduosPage"
import LoginPage from "./pages/LoginPage"
import MovimientosPage from "./pages/MovimientosPage";


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
            </Routes>
         </BrowserRouter>
      </>
   )

 

}


export default App;
