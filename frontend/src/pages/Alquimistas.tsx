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

  const cargarAlquimistas = () => {
    api
      .get("/alquimistas")
      .then((res) => setAlquimistas(res.data))
      .catch(() => setMensaje("❌ Error cargando alquimistas"));
  };

  useEffect(() => {
    cargarAlquimistas();
  }, []);

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
      cargarAlquimistas();
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al agregar alquimista");
    }
  };

  return (
    <div className="p-8 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-6 text-emerald-700 text-center">
        🧙‍♂️ Registro de Alquimistas
      </h1>

      {mensaje && (
        <div className="mb-6 text-center text-sm font-medium text-gray-700 bg-amber-50 border border-amber-200 py-2 rounded-md shadow-sm">
          {mensaje}
        </div>
      )}

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 mb-10 max-w-lg mx-auto border border-emerald-200 transition hover:shadow-2xl"
      >
        <h3 className="text-lg font-semibold mb-4 text-emerald-800">
          ✨ Agregar nuevo alquimista
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rango</label>
          <input
            type="text"
            value={rango}
            onChange={(e) => setRango(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Especialidad</label>
          <input
            type="text"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          Agregar Alquimista
        </button>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-emerald-100">
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
                <tr
                  key={a.id}
                  className="text-center hover:bg-emerald-50 transition duration-200"
                >
                  <td className="border border-gray-300 p-2">{a.id}</td>
                  <td className="border border-gray-300 p-2">{a.nombre}</td>
                  <td className="border border-gray-300 p-2">{a.rango}</td>
                  <td className="border border-gray-300 p-2">{a.especialidad}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-4 text-center text-gray-500"
                >
                  No hay alquimistas registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
