import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />

          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
