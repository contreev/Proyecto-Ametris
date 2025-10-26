import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Alquimista {
  id: number;
  nombre: string;
  rango: string;
  especialidad: string;
  created_at: string;
}

export default function Alquimistas() {
  const [alquimistas, setAlquimistas] = useState<Alquimista[]>([]);
  const [nombre, setNombre] = useState("");
  const [rango, setRango] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  // 🔹 Cargar lista al inicio
  const cargarAlquimistas = () => {
    api
      .get("/alquimistas")
      .then((res) => setAlquimistas(res.data))
      .catch(() => setMensaje("❌ Error cargando alquimistas"));
  };

  useEffect(() => {
    cargarAlquimistas();
  }, []);

  // 🔹 Crear un nuevo alquimista
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !rango || !especialidad) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      return;
    }

    try {
      await api.post("/alquimistas", { nombre, rango, especialidad });
      setMensaje("✅ Alquimista agregado correctamente");
      setNombre("");
      setRango("");
      setEspecialidad("");
      cargarAlquimistas(); // recargar lista
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al agregar alquimista");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4 text-green-700">Alquimistas</h2>

      {/* Mensaje de estado */}
      {mensaje && <p className="mb-4 text-center text-sm text-gray-700">{mensaje}</p>}

      {/* 🔹 Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-md mx-auto border border-gray-200"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Agregar nuevo alquimista</h3>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Rango</label>
          <input
            type="text"
            value={rango}
            onChange={(e) => setRango(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Especialidad</label>
          <input
            type="text"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Agregar Alquimista
        </button>
      </form>

      {/* 🔹 Tabla de alquimistas */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-green-100">
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Rango</th>
            <th className="border border-gray-300 p-2">Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {alquimistas.length > 0 ? (
            alquimistas.map((a) => (
              <tr key={a.id} className="text-center hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{a.id}</td>
                <td className="border border-gray-300 p-2">{a.nombre}</td>
                <td className="border border-gray-300 p-2">{a.rango}</td>
                <td className="border border-gray-300 p-2">{a.especialidad}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border border-gray-300 p-4 text-center text-gray-500">
                No hay alquimistas disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
