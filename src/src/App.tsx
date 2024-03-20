import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import { Home } from "./pages/Home";
import { LanguageProvider } from "./context/settings";
import { Login } from "./pages/Login";
import { publicRoutes } from "./Models";
import { AboutUs } from "./pages/About Us";
import { Cart } from "./pages/Cart";
import { DetailEvent } from "./pages/Detail";

function App() {
  return (
    <>
      <LanguageProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={publicRoutes.LOGIN} element={<Login />} />
            <Route path={publicRoutes.ABOUTUS} element={<AboutUs />} />
            <Route path={publicRoutes.MYORDERS} element={<Cart />} />
            <Route path={publicRoutes.DETAIL} element={<DetailEvent />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LanguageProvider>
    </>
  );
}

export default App;
