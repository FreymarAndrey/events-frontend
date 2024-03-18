import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import { Home } from "./pages/Home";
// import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Home />
        {/* <Login /> */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
