import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import { Home } from "./pages/Home";
import { LanguageProvider } from "./context/settings";
import { Login } from "./pages/Login";
import { publicRoutes } from "./models";
import { AboutUs } from "./pages/About Us";
import { Cart } from "./pages/Cart";
import { DetailEvent } from "./pages/Detail";
import { Forgot } from "./pages/Forgot";

function App() {
  return (
    <>
      <LanguageProvider>
        <BrowserRouter>
          <Navbar />

          <article className="article_principal">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={publicRoutes.LOGIN} element={<Login />} />
              <Route path={publicRoutes.ABOUTUS} element={<AboutUs />} />
              <Route path={publicRoutes.MYORDERS} element={<Cart />} />
              <Route
                path={`/${publicRoutes.HOME}/${publicRoutes.DETAIL}`}
                element={<DetailEvent />}
              />
              <Route path={publicRoutes.FORGOT} element={<Forgot />} />
            </Routes>
          </article>

          <Footer />
        </BrowserRouter>
      </LanguageProvider>
    </>
  );
}

export default App;
