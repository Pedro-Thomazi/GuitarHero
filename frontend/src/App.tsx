import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import ProductPage from "./pages/Product/Product"
import ScrollToTop from "./middlewares/ScrollToTop"
import Login from "./pages/Login/Login"
import { UserProvider } from "./context/UserContext"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreateProduct from "./pages/CreateProduct/CreateProduct"
import SearchPage from "./pages/SearchPage/SearchPage"

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:name/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}

export default App
