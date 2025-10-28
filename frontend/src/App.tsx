import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Alquimistas from "./pages/Alquimistas";
import Transmutaciones from "./pages/Transmutaciones";
import Misiones from "./pages/Misiones";

function App() {
  return (
    <>
      <nav style={{ margin: "1rem" }}>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/alquimistas">Alquimistas</Link> |{" "}
        <Link to="/transmutaciones">Transmutaciones</Link> |{" "}
        <Link to="/misiones">Misiones</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alquimistas" element={<Alquimistas />} />
        <Route path="/transmutaciones" element={<Transmutaciones />} />
        <Route path="/misiones" element={<Misiones />} />
      </Routes>
    </>
  );
}

export default App;
