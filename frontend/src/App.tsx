import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import ProductPage from "./pages/Product/Product"
import ScrollToTop from "./middlewares/ScrollToTop"

function App() {

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:name/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
