import React, { useEffect, useState } from "react";

// 🔹 Interfaces
interface User {
  id: number;
  nombre: string;
  rol: string; // "alquimista" | "supervisor"
}

interface Mision {
  ID: number;
  titulo: string;
  descripcion: string;
  prioridad: string;
  estado: string;
  alquimista_id: number;
  materiales: string;
  alquimista?: {
    nombre: string;
  };
}

interface Props {
  user?: User; // <-- lo hacemos opcional
}

// 🔹 URL del backend
const API_URL = "http://localhost:8080/api/misiones";

const Misiones: React.FC<Props> = ({ user }) => {
  const [misiones, setMisiones] = useState<Mision[]>([]);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "media",
    alquimista_id: user?.id ?? 1,
    materiales: "",
  });

  const [modoSupervisor] = useState<boolean>(user?.rol === "supervisor");
  const [loading, setLoading] = useState<boolean>(false);

  // 🔹 Obtener misiones
  const fetchMisiones = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setMisiones(data);
    } catch (err) {
      console.error("Error al obtener misiones:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMisiones();
  }, []);

  // 🔹 Registrar nueva misión
  const registrarMision = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ ...form, titulo: "", descripcion: "", materiales: "" });
        fetchMisiones();
      }
    } catch (err) {
      console.error("Error al registrar misión:", err);
    }
  };

  // 🔹 Actualizar estado de misión (para supervisores)
  const actualizarEstado = async (id: number, nuevoEstado: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (res.ok) fetchMisiones();
    } catch (err) {
      console.error("Error al actualizar misión:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⚗️ Misiones</h1>

      {/* 🔸 Formulario */}
      <form onSubmit={registrarMision} className="mb-6">
        <div className="mb-2">
          <label>Título:</label>
          <input
            className="border p-1 ml-2"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label>Descripción:</label>
          <input
            className="border p-1 ml-2"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label>Prioridad:</label>
          <select
            className="border p-1 ml-2"
            value={form.prioridad}
            onChange={(e) => setForm({ ...form, prioridad: e.target.value })}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        >
          Registrar Misión
        </button>
      </form>

      {/* 🔸 Tabla de misiones */}
      {loading ? (
        <p>Cargando misiones...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">Título</th>
              <th className="p-2">Prioridad</th>
              <th className="p-2">Alquimista</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {misiones.map((m) => (
              <tr key={m.ID} className="border-t">
                <td className="p-2">{m.ID}</td>
                <td className="p-2">{m.titulo}</td>
                <td className="p-2 capitalize">{m.prioridad}</td>
                <td className="p-2">{m.alquimista?.nombre || "Desconocido"}</td>
                <td className="p-2 capitalize">{m.estado}</td>
                <td className="p-2">
                  {modoSupervisor && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => actualizarEstado(m.ID, "en progreso")}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Iniciar
                      </button>
                      <button
                        onClick={() => actualizarEstado(m.ID, "completada")}
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Completar
                      </button>
                      <button
                        onClick={() => actualizarEstado(m.ID, "rechazada")}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Misiones;
