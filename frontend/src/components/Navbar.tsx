import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🌿 Alquimia</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Inicio</Link>
        <Link to="/alquimistas" className="hover:text-gray-200">Alquimistas</Link>
      </div>
    </nav>
  );
}
