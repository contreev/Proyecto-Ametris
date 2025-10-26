import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Alquimistas from "./pages/Alquimistas";
import Transmutaciones from "./pages/Transmutaciones";

function App() {
  return (
    <>
      <nav style={{ margin: "1rem" }}>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/alquimistas">Alquimistas</Link> |{" "}
        <Link to="/transmutaciones">Transmutaciones</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alquimistas" element={<Alquimistas />} />
        <Route path="/transmutaciones" element={<Transmutaciones />} />
      </Routes>
    </>
  );
}

export default App;
