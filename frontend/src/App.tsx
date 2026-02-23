import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import ProductPage from "./pages/Product/Product"
import ScrollToTop from "./middlewares/ScrollToTop"
import Login from "./pages/Login/Login"
import { UserProvider } from "./context/UserContext"

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:name/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}

export default App
